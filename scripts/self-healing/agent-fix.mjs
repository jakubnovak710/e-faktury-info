#!/usr/bin/env node

/**
 * Self-healing Agent — Claude Agent SDK
 *
 * Uses Claude Agent SDK to autonomously analyze errors, read the codebase,
 * apply fixes, and run tests iteratively until they pass.
 *
 * Inputs (env vars):
 *   ERROR_MESSAGE — the error string from Sentry
 *   SENTRY_URL — link to Sentry issue
 *   ERROR_URL — URL where error occurred
 *   ANTHROPIC_API_KEY — Claude API key
 *   GITHUB_OUTPUT — GitHub Actions output file
 *
 * Outputs (GitHub Actions):
 *   has_fix — "true" if agent successfully fixed the error
 *   analysis — summary of what was done
 */

import { appendFileSync } from 'fs';

const {
  ERROR_MESSAGE,
  SENTRY_URL,
  ERROR_URL,
  ANTHROPIC_API_KEY,
  GITHUB_OUTPUT,
} = process.env;

function setOutput(name, value) {
  if (GITHUB_OUTPUT) {
    appendFileSync(GITHUB_OUTPUT, `${name}=${value}\n`);
  }
}

if (!ANTHROPIC_API_KEY) {
  console.error('ANTHROPIC_API_KEY not set');
  setOutput('has_fix', 'false');
  setOutput('analysis', 'Missing ANTHROPIC_API_KEY');
  process.exit(0);
}

async function runAgent() {
  // Dynamic import — the package may not be installed in all environments
  const { query } = await import('@anthropic-ai/claude-agent-sdk');

  const prompt = `You are a senior developer debugging a production error in a Next.js 15 TypeScript project.

## Error Details
- **Error:** ${ERROR_MESSAGE}
${SENTRY_URL ? `- **Sentry:** ${SENTRY_URL}` : ''}
${ERROR_URL ? `- **URL where error occurred:** ${ERROR_URL}` : ''}

## Your Task
1. **Find the root cause.** Use Grep and Glob to search the codebase for relevant files. Read any file that might be related to the error.
2. **Fix the error.** Use Edit to make the minimal necessary change. Do NOT refactor unrelated code.
3. **Verify the fix.** Run \`pnpm build\` and \`pnpm test\` via Bash. If they fail, analyze the output and fix again.
4. **Iterate** until build and tests pass, or you've tried 3 times maximum.

## Rules
- NEVER use hardcoded colors — use CSS variables (var(--token-name))
- NEVER introduce \`any\` types
- Keep changes minimal — fix only what's broken
- Read CLAUDE.md first for project conventions

## Output
After fixing, print a one-paragraph summary of:
- Root cause
- What you changed
- Which files were modified`;

  let result = '';
  let hasResult = false;

  for await (const message of query({
    prompt,
    options: {
      cwd: process.cwd(),
      model: 'claude-sonnet-4-6',
      allowedTools: ['Read', 'Edit', 'Glob', 'Grep', 'Bash'],
      permissionMode: 'bypassPermissions',
      allowDangerouslySkipPermissions: true,
      maxTurns: 30,
      systemPrompt: {
        type: 'preset',
        preset: 'claude_code',
        append: '\nYou are running in a CI environment as a self-healing agent. Fix the error autonomously. No human is watching — do your best.',
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

// ── Main ─────────────────────────────────────────────────────────────────────

try {
  console.log(`🤖 Self-healing agent starting...`);
  console.log(`Error: ${ERROR_MESSAGE}`);

  const { hasResult, result } = await runAgent();

  if (hasResult && result) {
    console.log(`\n✅ Agent completed. Summary:\n${result}`);
    setOutput('has_fix', 'true');
    // Escape newlines for GitHub Actions output
    setOutput('analysis', result.replace(/\n/g, ' ').slice(0, 500));
  } else {
    console.log('❌ Agent did not produce a result');
    setOutput('has_fix', 'false');
    setOutput('analysis', 'Agent could not determine a fix');
  }
} catch (error) {
  console.error('Agent failed:', error.message);
  setOutput('has_fix', 'false');
  setOutput('analysis', `Agent error: ${error.message}`);
}
