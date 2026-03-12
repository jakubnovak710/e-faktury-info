# Self-Healing Pipeline

## Overview

Automated error detection → AI analysis → fix PR → deploy cycle.

```
User encounters error
  → Sentry captures it
    → Webhook fires to /api/webhooks/sentry
      → Email: admin gets technical details, client gets "we're on it"
      → GitHub Action triggered (repository_dispatch)
        → Claude API analyzes error + codebase context
          → Creates fix branch + PR
            → CI runs (lint, typecheck, tests, build)
              → PASS: PR ready for review/merge
              → FAIL: PR closed, admin notified
```

## Setup

### 1. Sentry

1. Create project at [sentry.io](https://sentry.io)
2. Set env vars: `SENTRY_DSN`, `SENTRY_AUTH_TOKEN`
3. Create webhook integration:
   - URL: `https://your-domain.com/api/webhooks/sentry`
   - Events: Error, Issue
4. Set `SENTRY_WEBHOOK_SECRET` from webhook settings

### 2. GitHub Secrets

Add to repository Settings → Secrets → Actions:
- `ANTHROPIC_API_KEY` — Claude API key
- Optionally: `SMTP_*` vars for email notifications from CI

### 3. Email Configuration

Environment variables (per project):
- `EMAIL_FROM_NAME` — project/brand name shown in emails
- `ADMIN_EMAIL` — developer receiving technical notifications
- `CLIENT_EMAILS` — client contacts (comma-separated)

## Email Notifications

| Event | Admin Gets | Client Gets |
|-------|-----------|-------------|
| Error detected | Stack trace + Sentry link | "We detected an issue, working on it" |
| Fix started | PR link + Claude analysis | (nothing — don't spam) |
| Fix succeeded | Deploy status | "Issue resolved" |
| Fix failed | Rollback info + manual action needed | "Team has been notified" |

## Files

| File | Purpose |
|------|---------|
| `src/app/api/webhooks/sentry/route.ts` | Webhook receiver, HMAC validation |
| `.github/workflows/self-heal.yml` | GitHub Action workflow |
| `scripts/self-healing/analyze-error.mjs` | Claude API error analysis |
| `src/lib/email/notify.ts` | Email notification orchestrator |
| `src/lib/email/templates/` | HTML email templates |

## Testing

Dev-only endpoint for testing email flow:
```
GET /api/test-email?type=error
GET /api/test-email?type=fix-started
GET /api/test-email?type=fix-success
GET /api/test-email?type=fix-failed
```

## Future: Agent SDK Upgrade

The pipeline can be upgraded to use Claude Agent SDK for more intelligent fixing:
- Agent reads entire codebase (not just error context)
- Runs tests iteratively until they pass
- Multi-step debugging with tool use (Read, Edit, Bash, Grep)
- See `docs/agent-sdk-upgrade.md` for implementation plan
