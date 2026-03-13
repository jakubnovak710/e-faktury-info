#!/usr/bin/env node

/**
 * Self-healing Pipeline v3 — Multi-Agent (Triage → Fix → Verify)
 *
 * Cost-optimized: haiku for triage+verify, sonnet only for fixing.
 * Estimated cost per run: ~$0.16-0.31
 *
 * Flow:
 *   1. Triage (haiku)  — classify error, decide if auto-fixable
 *   2. Fix (sonnet)    — find root cause, apply minimal fix, retry up to 2x
 *   3. Verify (haiku)  — independent review of the diff
 *   4. Fallback        — revert if verify rejects
 *
 * Inputs (env vars):
 *   ERROR_LOG_FILE     — path to file with full CI error output
 *   ERROR_TYPE         — what failed: "lint", "typecheck", "build", "test"
 *   SENTRY_URL         — (optional) Sentry issue link
 *   ERROR_URL          — (optional) URL where error occurred
 *   ANTHROPIC_API_KEY  — Claude API key
 *   GITHUB_OUTPUT      — GitHub Actions output file
 *
 * Outputs (GitHub Actions):
 *   has_fix       — "true" if pipeline succeeded end-to-end
 *   analysis      — summary (max 500 chars)
 *   triage_result — "fixable", "not-fixable", or "needs-human"
 *   attempt       — which fix attempt succeeded (1 or 2)
 */

import { appendFileSync, readFileSync } from 'fs';
import { execSync } from 'child_process';

const {
  ERROR_LOG_FILE,
  ERROR_LOG,
  ERROR_TYPE,
  SENTRY_URL,
  ERROR_URL,
  ANTHROPIC_API_KEY,
  GITHUB_OUTPUT,
} = process.env;

const errorLog = ERROR_LOG_FILE ? safeRead(ERROR_LOG_FILE) : (ERROR_LOG || 'No error log');

function safeRead(p) { try { return readFileSync(p, 'utf8'); } catch { return ''; } }
function setOutput(k, v) { if (GITHUB_OUTPUT) appendFileSync(GITHUB_OUTPUT, `${k}=${v}\n`); }
function log(phase, msg) { console.log(`[${phase}] ${msg}`); }
function truncate(text, n = 150) {
  const lines = text.split('\n');
  return lines.length <= n ? text : `...(${lines.length - n} lines cut)\n${lines.slice(-n).join('\n')}`;
}

if (!ANTHROPIC_API_KEY) {
  console.error('ANTHROPIC_API_KEY not set');
  setOutput('has_fix', 'false');
  setOutput('analysis', 'Missing ANTHROPIC_API_KEY');
  process.exit(0);
}

// ── Shared agent runner ───────────────────────────────────────────────────────

let _query;
async function getQuery() {
  if (!_query) {
    const sdk = await import('@anthropic-ai/claude-agent-sdk');
    _query = sdk.query;
  }
  return _query;
}

async function runAgent(prompt, model, maxTurns, tools, appendSystem = '') {
  const query = await getQuery();
  let result = '';
  for await (const msg of query({
    prompt,
    options: {
      cwd: process.cwd(),
      model,
      allowedTools: tools,
      maxTurns,
      systemPrompt: {
        type: 'preset',
        preset: 'claude_code',
        append: `\nYou are in CI. No human is watching. ${appendSystem}`,
      },
    },
  })) {
    if ('result' in msg) result = msg.result;
  }
  return result;
}

function shell(cmd, timeout = 300_000) {
  return execSync(cmd, { stdio: 'pipe', timeout }).toString();
}

// ── Phase 1: Triage (haiku — fast & cheap) ────────────────────────────────────

async function triage() {
  log('TRIAGE', 'Classifying error with haiku...');

  const errorSnippet = truncate(errorLog, 80);
  const prompt = `You are a CI triage bot. Analyze this error and classify it.

## Error Type: ${ERROR_TYPE || 'unknown'}

## Error Output (last 80 lines)
\`\`\`
${errorSnippet}
\`\`\`

## Task
1. Read the error output carefully.
2. Classify: is this auto-fixable by an AI agent?

Reply with EXACTLY one of these lines (nothing else):
- FIXABLE: <one-line description of what needs fixing>
- NOT_FIXABLE: <reason why a human is needed>
- CONFIG_ISSUE: <what config/env var is missing>`;

  const result = await runAgent(
    prompt,
    'claude-haiku-4-5-20251001',
    5,
    ['Read', 'Glob', 'Grep'],
    'You are the TRIAGE agent. Only classify — do NOT fix anything.'
  );

  log('TRIAGE', `Result: ${result.trim()}`);

  if (result.includes('FIXABLE:')) {
    const desc = result.match(/FIXABLE:\s*(.+)/)?.[1] || '';
    return { action: 'fixable', description: desc.trim() };
  }
  if (result.includes('CONFIG_ISSUE:')) {
    const desc = result.match(/CONFIG_ISSUE:\s*(.+)/)?.[1] || '';
    return { action: 'config', description: desc.trim() };
  }
  return { action: 'not-fixable', description: result.trim() };
}

// ── Phase 2: Fix (sonnet — capable, with retry) ──────────────────────────────

async function fix(triageDescription, attempt, previousError) {
  log('FIX', `Attempt ${attempt}/2 — sonnet...`);

  const errorSnippet = truncate(errorLog, 200);

  let prompt = `You are fixing a CI failure in a Next.js 15 TypeScript project.

## Triage Assessment
${triageDescription}

## Error Type: ${ERROR_TYPE || 'unknown'}

## Full Error Output
\`\`\`
${errorSnippet}
\`\`\``;

  if (attempt > 1 && previousError) {
    prompt += `

## PREVIOUS FIX FAILED — try a different approach
\`\`\`
${truncate(previousError, 80)}
\`\`\``;
  }

  prompt += `

## Instructions
1. Read CLAUDE.md first for project rules.
2. Find the root cause using Glob/Grep/Read.
3. Apply the MINIMAL fix using Edit. Do NOT refactor.
4. Verify: run the commands that failed:
${(ERROR_TYPE || '').includes('lint') ? '   - pnpm lint\n   - pnpm tsc --noEmit' : ''}
${(ERROR_TYPE || '').includes('build') ? '   - pnpm build' : ''}
${(ERROR_TYPE || '').includes('test') ? '   - pnpm test -- --run' : ''}
   - Always end with: pnpm build
5. If verify fails, fix again (max 3 internal iterations).

## Rules
- NEVER hardcoded colors — use CSS variables or Tailwind token classes
- NEVER introduce \`any\` types
- Minimal changes only

## Output
When done, print:
FIXED: <one-line summary of what you changed>
FILES: <comma-separated list>`;

  const result = await runAgent(
    prompt,
    'claude-sonnet-4-6',
    40,
    ['Read', 'Edit', 'Glob', 'Grep', 'Bash'],
    `You are the FIX agent (attempt ${attempt}/2). Fix autonomously.`
  );

  log('FIX', `Agent output: ${result.slice(0, 200)}`);
  return result;
}

// ── Phase 3: Verify (haiku — independent review) ─────────────────────────────

async function verify() {
  log('VERIFY', 'Independent verification with haiku...');

  // Get the diff
  let diff;
  try {
    diff = shell('git diff');
  } catch {
    return { ok: false, reason: 'Could not get git diff' };
  }

  if (!diff.trim()) {
    return { ok: false, reason: 'No changes were made by the fix agent' };
  }

  // Run build check independently
  log('VERIFY', 'Running pnpm build...');
  try {
    const checks = [];
    const et = (ERROR_TYPE || '').toLowerCase();
    if (et.includes('lint')) checks.push('pnpm lint', 'pnpm tsc --noEmit');
    if (et.includes('typecheck')) checks.push('pnpm tsc --noEmit');
    if (et.includes('build')) checks.push('pnpm build');
    if (et.includes('test')) checks.push('pnpm test -- --run');
    if (!checks.includes('pnpm build')) checks.push('pnpm build');

    for (const cmd of [...new Set(checks)]) {
      log('VERIFY', `  ${cmd}`);
      shell(cmd);
      log('VERIFY', `  PASSED`);
    }
  } catch (e) {
    const stderr = e.stderr?.toString().slice(-1000) || '';
    const stdout = e.stdout?.toString().slice(-1000) || '';
    return { ok: false, reason: `Build failed:\n${stdout}\n${stderr}` };
  }

  // Haiku reviews the diff for quality/safety
  log('VERIFY', 'Haiku reviewing diff quality...');
  const diffSnippet = truncate(diff, 100);

  const prompt = `You are a code review bot. Review this diff from an automated fix.

## Original Error: ${ERROR_TYPE || 'unknown'}

## Diff
\`\`\`diff
${diffSnippet}
\`\`\`

## Check these:
1. Does the fix address the original error?
2. Are there any hardcoded colors (must use CSS variables)?
3. Are there any \`any\` types introduced?
4. Is the change minimal and safe?
5. Could this break something else?

Reply with EXACTLY one line:
- APPROVED: <reason>
- REJECTED: <what's wrong>`;

  const result = await runAgent(
    prompt,
    'claude-haiku-4-5-20251001',
    3,
    ['Read'],
    'You are the VERIFY agent. Review only — do NOT modify files.'
  );

  log('VERIFY', `Review: ${result.trim()}`);

  if (result.includes('APPROVED:')) {
    return { ok: true, reason: result.trim() };
  }
  return { ok: false, reason: result.trim() };
}

// ── Main Pipeline ─────────────────────────────────────────────────────────────

const MAX_FIX_ATTEMPTS = 2;

try {
  log('PIPELINE', 'Self-healing v3 (multi-agent) starting...');
  log('PIPELINE', `Error type: ${ERROR_TYPE || 'unknown'}`);
  log('PIPELINE', `Error log: ${errorLog.length} chars`);

  // ── Phase 1: Triage ──
  const triageResult = await triage();
  setOutput('triage_result', triageResult.action);
  log('PIPELINE', `Triage: ${triageResult.action} — ${triageResult.description}`);

  if (triageResult.action === 'not-fixable') {
    log('PIPELINE', 'Triage says not auto-fixable. Stopping.');
    setOutput('has_fix', 'false');
    setOutput('analysis', `Not auto-fixable: ${triageResult.description}`.slice(0, 500));
    process.exit(0);
  }

  if (triageResult.action === 'config') {
    log('PIPELINE', 'Triage says config/env issue. Stopping.');
    setOutput('has_fix', 'false');
    setOutput('analysis', `Config issue (needs human): ${triageResult.description}`.slice(0, 500));
    process.exit(0);
  }

  // ── Phase 2: Fix (with retry) ──
  let fixSucceeded = false;
  let lastVerifyError = null;
  let successAttempt = 0;

  for (let attempt = 1; attempt <= MAX_FIX_ATTEMPTS; attempt++) {
    log('PIPELINE', `\n${'─'.repeat(50)}`);
    log('PIPELINE', `FIX ATTEMPT ${attempt}/${MAX_FIX_ATTEMPTS}`);

    // Reset changes if retry
    if (attempt > 1) {
      log('PIPELINE', 'Resetting changes for fresh attempt...');
      try { shell('git checkout -- .'); } catch { /* ignore */ }
    }

    const fixResult = await fix(triageResult.description, attempt, lastVerifyError);

    if (!fixResult || (!fixResult.includes('FIXED:') && !fixResult.includes('FILES:'))) {
      log('PIPELINE', 'Fix agent did not report success. Trying verify anyway...');
    }

    // ── Phase 3: Verify ──
    const verifyResult = await verify();

    if (verifyResult.ok) {
      log('PIPELINE', `VERIFIED on attempt ${attempt}!`);
      fixSucceeded = true;
      successAttempt = attempt;

      const summary = fixResult.match(/FIXED:\s*(.+)/)?.[1] || fixResult.slice(-300);
      setOutput('has_fix', 'true');
      setOutput('attempt', String(attempt));
      setOutput('analysis', summary.replace(/\n/g, ' ').slice(0, 500));
      break;
    } else {
      log('PIPELINE', `Verify REJECTED: ${verifyResult.reason.slice(0, 200)}`);
      lastVerifyError = verifyResult.reason;
    }
  }

  if (!fixSucceeded) {
    log('PIPELINE', 'All attempts failed. Reverting changes...');
    try { shell('git checkout -- .'); } catch { /* ignore */ }
    setOutput('has_fix', 'false');
    setOutput('analysis', `Failed after ${MAX_FIX_ATTEMPTS} attempts. Last: ${(lastVerifyError || '').slice(0, 400)}`);
  }

  log('PIPELINE', `\nPipeline ${fixSucceeded ? 'SUCCEEDED' : 'FAILED'}`);
} catch (error) {
  console.error('Pipeline crashed:', error);
  try { shell('git checkout -- .'); } catch { /* ignore */ }
  setOutput('has_fix', 'false');
  setOutput('analysis', `Pipeline crash: ${error.message}`);
}
