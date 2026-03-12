# Architecture

## Overview

Universal Web is a production-ready Next.js 15 boilerplate designed to be copy-pasted and customized per client. It provides enterprise-grade security, SEO, design system, and optional self-healing capabilities out of the box.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 App Router |
| Language | TypeScript strict (zero `any`) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Design | 3 presets: Glass UI, Clean Modern, Corporate |
| Package Manager | pnpm |
| Forms | React Hook Form + Zod |
| SEO | Metadata, OG images, JSON-LD, sitemap, robots, canonical |
| GEO | llms.txt for AI crawlers |
| Email | Nodemailer + HTML templates |
| Security | CSP, HSTS, rate limiting, CSRF, XSS prevention |
| Self-Healing | Sentry → GitHub Action → Claude API → auto-fix PR |
| Testing | Vitest + Playwright |
| CI/CD | GitHub Actions |
| Auto-updates | Renovate Bot |

## Design Token System

The design token pipeline is the core architectural decision:

```
presets/glass-ui/     →  config/design.config.ts  →  scripts/generate-design-tokens.ts
presets/clean-modern/     (single source of truth)     ↓
presets/corporate/                                  src/styles/design-tokens.css
                                                       ↓
                                                    Tailwind @theme → utility classes
                                                       ↓
                                                    Components use var(--token-name)
```

### Switching Presets

1. Change import in `config/design.config.ts`: `import preset from '@presets/clean-modern'`
2. Run `pnpm generate:tokens`
3. Done — entire visual identity changes without touching components

### Customizing Per Client

Override specific values in `design.config.ts`:
```typescript
const design: DesignPreset = {
  ...glassUi,
  colors: {
    dark: { ...glassUi.colors.dark, accent: '#your-brand-color' },
    light: { ...glassUi.colors.light, accent: '#your-brand-color' },
  },
};
```

## Feature Flags

Optional modules are controlled via `config/features.config.ts`:

```typescript
export const features = {
  auth: false,      // Auth.js v5
  database: false,  // Drizzle + Neon
  i18n: false,      // Internationalization
  analytics: false, // Umami
  email: true,      // Nodemailer
};
```

Disabled features are tree-shaken — zero runtime overhead.

## Directory Structure

```
├── config/              # All configuration (single source of truth)
├── presets/              # Design presets (self-contained theme definitions)
│   ├── glass-ui/        # Dark-first glassmorphism
│   ├── clean-modern/    # Light-first, clean
│   └── corporate/       # Professional, conservative
├── src/
│   ├── app/             # Next.js App Router pages + API routes
│   ├── components/
│   │   ├── design-system/  # Preset-aware components
│   │   ├── ui/             # shadcn/ui primitives
│   │   ├── layout/         # Header, footer, nav
│   │   ├── seo/            # JSON-LD, breadcrumbs
│   │   └── forms/          # Contact, newsletter
│   ├── lib/
│   │   ├── security/       # Headers, CSP, rate limit, CSRF, sanitize
│   │   ├── email/          # Transport, templates, send, notify
│   │   └── ...             # Utils, metadata, motion, fonts
│   ├── hooks/              # Custom React hooks
│   ├── styles/             # Global CSS, design tokens, effects
│   └── types/              # Shared TypeScript types
├── scripts/                # Token generation, verification, self-healing
├── tests/                  # Unit + E2E tests
└── .github/workflows/      # CI + self-healing pipelines
```

## Security Architecture

Middleware chain (every request):
1. Security headers (HSTS, X-Frame-Options, X-Content-Type, Referrer-Policy, Permissions-Policy)
2. CSP with nonce support
3. Rate limiting on `/api/` routes (sliding window)
4. CSRF protection on state-changing endpoints

## Self-Healing Pipeline

```
Sentry error → webhook → email(admin:error, client:issue)
  → GitHub Action → Claude API analysis → fix PR → CI
    → PASS: review + merge → deploy → email(admin:success, client:resolved)
    → FAIL: close PR → email(admin:failure, client:"team notified")
```

## Email System

Per-project configuration via environment variables:
- `SMTP_*` — SMTP server credentials
- `EMAIL_FROM` / `EMAIL_FROM_NAME` — sender identity (customize per client)
- `ADMIN_EMAIL` — developer/admin notifications
- `CLIENT_EMAILS` — client-facing notifications (comma-separated)
