/**
 * Self-healing error analysis script.
 * Uses Claude API to analyze the error and suggest a fix.
 *
 * Inputs (env vars): ERROR_MESSAGE, SENTRY_URL, ERROR_URL, ANTHROPIC_API_KEY
 * Outputs (GitHub Actions): has_fix, analysis, fix_patch
 */

import { readFileSync, appendFileSync } from 'fs';
import { execSync } from 'child_process';

const { ERROR_MESSAGE, SENTRY_URL, ERROR_URL, ANTHROPIC_API_KEY, GITHUB_OUTPUT } = process.env;

if (!ANTHROPIC_API_KEY) {
  console.error('ANTHROPIC_API_KEY not set');
  setOutput('has_fix', 'false');
  process.exit(0);
}

function setOutput(name, value) {
  if (GITHUB_OUTPUT) {
    appendFileSync(GITHUB_OUTPUT, `${name}=${value}\n`);
  }
}

// Gather project context
function getProjectContext() {
  const files = execSync('find src -name "*.ts" -o -name "*.tsx" | head -50', {
    encoding: 'utf-8',
  }).trim();

  // Try to find relevant files based on error message
  let relevantCode = '';
  try {
    const grepResult = execSync(
      `grep -rl "${ERROR_MESSAGE.slice(0, 40).replace(/['"]/g, '')}" src/ --include="*.ts" --include="*.tsx" 2>/dev/null | head -3`,
      { encoding: 'utf-8' }
    ).trim();

    if (grepResult) {
      for (const file of grepResult.split('\n')) {
        relevantCode += `\n--- ${file} ---\n${readFileSync(file, 'utf-8').slice(0, 2000)}\n`;
      }
    }
  } catch {
    // grep found nothing, that's ok
  }

  return { files, relevantCode };
}

async function analyzeWithClaude() {
  const { files, relevantCode } = getProjectContext();

  const prompt = `You are a senior developer fixing a production error in a Next.js 15 TypeScript project.

ERROR: ${ERROR_MESSAGE}
${SENTRY_URL ? `Sentry: ${SENTRY_URL}` : ''}
${ERROR_URL ? `URL: ${ERROR_URL}` : ''}

PROJECT FILES:
${files}

${relevantCode ? `RELEVANT CODE:\n${relevantCode}` : ''}

Analyze the error and provide:
1. Root cause analysis (2-3 sentences)
2. A git patch that fixes the issue

Respond in this exact JSON format:
{
  "analysis": "...",
  "has_fix": true,
  "patch": "--- a/path/to/file\\n+++ b/path/to/file\\n@@ ...\\n..."
}

If you cannot determine a fix, set has_fix to false and patch to empty string.`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Claude API error: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  const text = data.content[0]?.text ?? '';

  // Parse JSON from response (handle markdown code blocks)
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Could not parse Claude response');

  return JSON.parse(jsonMatch[0]);
}

try {
  console.log(`Analyzing error: ${ERROR_MESSAGE}`);
  const result = await analyzeWithClaude();

  setOutput('has_fix', result.has_fix ? 'true' : 'false');
  setOutput('analysis', result.analysis ?? 'No analysis available');

  if (result.has_fix && result.patch) {
    // Write patch to temp file for git apply
    const fs = await import('fs');
    fs.writeFileSync('/tmp/fix.patch', result.patch);
    setOutput('fix_patch', result.patch);
    console.log('Fix patch generated');
  }

  console.log(`Analysis: ${result.analysis}`);
} catch (error) {
  console.error('Analysis failed:', error.message);
  setOutput('has_fix', 'false');
  setOutput('analysis', `Analysis failed: ${error.message}`);
}
