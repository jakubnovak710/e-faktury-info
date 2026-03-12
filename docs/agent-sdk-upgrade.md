# Self-Healing: Agent SDK Upgrade

## What Changed

The self-healing pipeline was upgraded from a simple Claude API call (send error → get patch) to a full **Claude Agent SDK** agent that autonomously debugs and fixes errors.

### Before (v1 — Claude API)
```
Error → send to Claude API with limited context → receive JSON with patch → git apply
```
**Limitations:**
- Could only see files we manually included (head -50)
- Single-shot — no iteration if fix didn't work
- Patch format errors caused failures
- No ability to run tests or verify fix

### After (v2 — Agent SDK)
```
Error → Agent with Read/Edit/Glob/Grep/Bash tools → agent reads codebase,
        edits files, runs build+tests, iterates until passing → commit
```
**Capabilities:**
- Reads CLAUDE.md for project conventions
- Uses Glob/Grep to find relevant files autonomously
- Edits files directly (no fragile patch format)
- Runs `pnpm build` and `pnpm test` to verify
- Iterates up to 30 turns if needed
- Full codebase access, not just snippets

## Files

| File | Purpose |
|------|---------|
| `scripts/self-healing/agent-fix.mjs` | Agent SDK script (new, primary) |
| `scripts/self-healing/analyze-error.mjs` | Original Claude API script (kept as fallback) |
| `.github/workflows/self-heal.yml` | Updated workflow using agent |

## How It Works

1. **Sentry webhook** fires to `/api/webhooks/sentry`
2. **Email notifications** sent (admin: technical details, client: "we're on it")
3. **GitHub Action** triggered via `repository_dispatch`
4. **Agent SDK** runs with these tools:
   - `Read` — read any file in the repo
   - `Edit` — make precise edits
   - `Glob` — find files by pattern
   - `Grep` — search file contents
   - `Bash` — run build, tests, any command
5. Agent **reads CLAUDE.md** first (project conventions)
6. Agent **finds and fixes** the error
7. Agent **runs build + tests** to verify
8. If fix works → **commit, push, create PR**
9. If fix fails → **notify admin**

## Configuration

### Required GitHub Secrets
- `ANTHROPIC_API_KEY` — Claude API key (used by Agent SDK)

### Optional
- `SITE_URL` + `NOTIFY_SECRET` — for email notifications via webhook

## Cost Considerations

Agent SDK uses more tokens than a single API call (the agent may make 5-20 tool calls per fix). Estimated cost per self-healing run:
- Simple fix: ~$0.10-0.30 (Sonnet 4.6)
- Complex fix: ~$0.50-1.50 (Sonnet 4.6)

The model is set to `claude-sonnet-4-6` for cost efficiency. For harder bugs, change to `claude-opus-4-6` in `agent-fix.mjs`.

## Fallback

The original `analyze-error.mjs` script is kept as a fallback. To revert:
1. Change the workflow step to run `analyze-error.mjs` instead of `agent-fix.mjs`
2. Restore the old patch-based apply step
