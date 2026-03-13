#!/usr/bin/env node

/**
 * Self-healing Agent v2 — Claude Agent SDK
 *
 * Robust self-healing pipeline with:
 * - Full error log context (not just "build failure")
 * - Built-in verify + retry loop (max 2 attempts)
 * - Structured output for CI integration
 *
 * Inputs (env vars):
 *   ERROR_LOG       — full error output from failed CI step
 *   ERROR_TYPE      — what failed: "lint", "typecheck", "build", "test", or combo
 *   SENTRY_URL      — (optional) link to Sentry issue
 *   ERROR_URL       — (optional) URL where error occurred
 *   ANTHROPIC_API_KEY — Claude API key
 *   GITHUB_OUTPUT   — GitHub Actions output file
 *
 * Outputs (GitHub Actions):
 *   has_fix    — "true" if agent successfully fixed and verified
 *   analysis   — summary of what was done (max 500 chars)
 *   attempt    — which attempt succeeded (1 or 2)
 */

import { appendFileSync, readFileSync } from 'fs';

const {
  ERROR_LOG,
  ERROR_LOG_FILE,
  ERROR_TYPE,
  SENTRY_URL,
  ERROR_URL,
  ANTHROPIC_API_KEY,
  GITHUB_OUTPUT,
} = process.env;

// Read error log from file if provided (avoids env var size limits)
const errorLog = ERROR_LOG_FILE
  ? safeRead(ERROR_LOG_FILE)
  : (ERROR_LOG || 'No error log provided');

function safeRead(path) {
  try {
    return readFileSync(path, 'utf8');
  } catch {
    return `Could not read error log file: ${path}`;
  }
}

function setOutput(name, value) {
  if (GITHUB_OUTPUT) {
    appendFileSync(GITHUB_OUTPUT, `${name}=${value}\n`);
  }
}

function log(msg) {
  console.log(`[self-heal] ${msg}`);
}

if (!ANTHROPIC_API_KEY) {
  console.error('ANTHROPIC_API_KEY not set');
  setOutput('has_fix', 'false');
  setOutput('analysis', 'Missing ANTHROPIC_API_KEY');
  process.exit(0);
}

// Truncate error log to last 200 lines to stay within prompt limits
function truncateLog(text, maxLines = 200) {
  const lines = text.split('\n');
  if (lines.length <= maxLines) return text;
  return `... (${lines.length - maxLines} lines truncated)\n` + lines.slice(-maxLines).join('\n');
}

function buildPrompt(attempt, previousError) {
  const errorContext = truncateLog(errorLog);

  let prompt = `You are a senior developer fixing a CI failure in a Next.js 15 TypeScript project.

## CI Failure Details
- **What failed:** ${ERROR_TYPE || 'unknown'}
${SENTRY_URL ? `- **Sentry:** ${SENTRY_URL}` : ''}
${ERROR_URL ? `- **URL:** ${ERROR_URL}` : ''}

## Full Error Output
\`\`\`
${errorContext}
\`\`\`
`;

  if (attempt > 1 && previousError) {
    prompt += `
## IMPORTANT: Previous Fix Attempt Failed
Your previous fix did not work. The verification step produced this error:
\`\`\`
${truncateLog(previousError, 100)}
\`\`\`
Analyze WHY your previous fix was wrong and try a different approach.
`;
  }

  prompt += `
## Your Task
1. **Read CLAUDE.md first** — understand project conventions before touching code.
2. **Analyze the error.** The full error output is above. Identify the root cause.
3. **Find relevant files.** Use Glob and Grep to locate the problematic code.
4. **Apply the minimal fix.** Use Edit — do NOT refactor unrelated code.
5. **Verify your fix.** Run the appropriate commands via Bash:
   - If lint failed: \`pnpm lint\`
   - If typecheck failed: \`pnpm tsc --noEmit\`
   - If build failed: \`pnpm build\`
   - If test failed: \`pnpm test -- --run\`
   - Always finish with: \`pnpm build\` (must pass before done)
6. **If verification fails**, analyze the new error and fix again (max 3 iterations within this run).

## Rules
- NEVER use hardcoded colors — use CSS variables (var(--token-name))
- NEVER introduce \`any\` types
- Keep changes minimal — fix only what's broken
- Do NOT add comments explaining your fix
- Do NOT refactor surrounding code

## Output Format
When done, print EXACTLY this format:
---RESULT---
STATUS: SUCCESS or FAILURE
FILES: comma-separated list of modified files
SUMMARY: one-paragraph description of root cause and fix
---END---`;

  return prompt;
}

async function runAgent(attempt, previousError) {
  const { query } = await import('@anthropic-ai/claude-agent-sdk');

  const prompt = buildPrompt(attempt, previousError);

  log(`Attempt ${attempt} — sending to agent...`);

  let result = '';
  let hasResult = false;

  for await (const message of query({
    prompt,
    options: {
      cwd: process.cwd(),
      model: 'claude-sonnet-4-6',
      allowedTools: ['Read', 'Edit', 'Glob', 'Grep', 'Bash'],
      maxTurns: 40,
      systemPrompt: {
        type: 'preset',
        preset: 'claude_code',
        append: `\nYou are running in CI as a self-healing agent (attempt ${attempt}/2). Fix the error autonomously. No human is watching — do your best. Always verify your fix by running the build.`,
      },
    },
  })) {
    if ('result' in message) {
      result = message.result;
      hasResult = true;
    }
  }

  return { hasResult, result };
}

function parseResult(result) {
  const statusMatch = result.match(/STATUS:\s*(SUCCESS|FAILURE)/i);
  const filesMatch = result.match(/FILES:\s*(.+)/i);
  const summaryMatch = result.match(/SUMMARY:\s*(.+)/i);

  return {
    success: statusMatch ? statusMatch[1].toUpperCase() === 'SUCCESS' : false,
    files: filesMatch ? filesMatch[1].trim() : '',
    summary: summaryMatch ? summaryMatch[1].trim() : result.slice(-500),
  };
}

// ── Main ──────────────────────────────────────────────────────────────────────

const MAX_ATTEMPTS = 2;

try {
  log('Self-healing agent v2 starting...');
  log(`Error type: ${ERROR_TYPE || 'unknown'}`);
  log(`Error log length: ${errorLog.length} chars`);

  let lastVerifyError = null;
  let finalResult = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    log(`\n${'='.repeat(60)}`);
    log(`ATTEMPT ${attempt}/${MAX_ATTEMPTS}`);
    log('='.repeat(60));

    const { hasResult, result } = await runAgent(attempt, lastVerifyError);

    if (!hasResult || !result) {
      log(`Attempt ${attempt}: Agent did not produce a result`);
      continue;
    }

    const parsed = parseResult(result);
    log(`Agent reports: ${parsed.success ? 'SUCCESS' : 'FAILURE'}`);
    log(`Files: ${parsed.files}`);
    log(`Summary: ${parsed.summary}`);

    // Even if agent says SUCCESS, do our own verify
    log('Running independent verification...');
    const { execSync } = await import('child_process');

    try {
      // Run all checks sequentially
      const checks = [];
      const errorType = (ERROR_TYPE || '').toLowerCase();

      if (errorType.includes('lint')) checks.push('pnpm lint');
      if (errorType.includes('typecheck')) checks.push('pnpm tsc --noEmit');
      if (errorType.includes('build')) checks.push('pnpm build');
      if (errorType.includes('test')) checks.push('pnpm test -- --run');

      // Always run build as final check
      if (!checks.includes('pnpm build')) checks.push('pnpm build');

      for (const cmd of checks) {
        log(`  Running: ${cmd}`);
        execSync(cmd, { stdio: 'pipe', timeout: 300_000 });
        log(`  PASSED: ${cmd}`);
      }

      log(`\nAttempt ${attempt}: ALL CHECKS PASSED`);
      finalResult = { ...parsed, attempt };
      break;
    } catch (verifyError) {
      const stderr = verifyError.stderr?.toString() || '';
      const stdout = verifyError.stdout?.toString() || '';
      lastVerifyError = `Command failed: ${verifyError.message}\n\nSTDOUT:\n${stdout.slice(-2000)}\n\nSTDERR:\n${stderr.slice(-2000)}`;
      log(`Attempt ${attempt}: Verification FAILED`);
      log(`Verify error: ${lastVerifyError.slice(0, 200)}...`);

      if (attempt < MAX_ATTEMPTS) {
        log('Will retry with error context...');
      }
    }
  }

  if (finalResult) {
    log(`\nSelf-healing SUCCEEDED on attempt ${finalResult.attempt}`);
    setOutput('has_fix', 'true');
    setOutput('attempt', String(finalResult.attempt));
    setOutput('analysis', finalResult.summary.replace(/\n/g, ' ').slice(0, 500));
  } else {
    log('\nSelf-healing FAILED after all attempts');
    setOutput('has_fix', 'false');
    setOutput('analysis', lastVerifyError
      ? `Agent could not fix: ${lastVerifyError.slice(0, 400)}`
      : 'Agent could not determine a fix');
  }
} catch (error) {
  console.error('Agent crashed:', error);
  setOutput('has_fix', 'false');
  setOutput('analysis', `Agent crash: ${error.message}`);
}
