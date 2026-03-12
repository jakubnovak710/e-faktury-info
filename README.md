# Universal Web

A production-ready Next.js boilerplate framework for client projects. Configure once, deploy anywhere, maintain automatically.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 + CSS variables |
| Components | shadcn/ui + Radix UI primitives |
| Animation | Motion (Framer Motion) |
| Email | Nodemailer + React Email templates |
| Testing | Vitest (unit) + Playwright (e2e) |
| CI/CD | Self-healing pipeline (Claude Agent SDK) |
| Package Manager | pnpm |

## Quick Start

```bash
# Clone and install
pnpm install

# Run interactive setup (picks preset, configures site)
pnpm setup

# Start development server
pnpm dev
```

The dev server starts at `http://localhost:3000` with Turbopack enabled.

## Design Presets

Three built-in presets cover the most common client needs:

| Preset | Style | Primary Use |
|---|---|---|
| `glass-ui` | Dark-first glassmorphism, blur layers, neon accents | SaaS, developer tools, creative agencies |
| `clean-modern` | Light-first, generous whitespace, system fonts | Blogs, portfolios, landing pages |
| `corporate` | Navy palette, serif headings, structured layouts | Law firms, finance, enterprise |

### Switching Presets

Edit `config/design.config.ts` and set the active preset:

```ts
export const designConfig = {
  preset: 'glass-ui', // 'glass-ui' | 'clean-modern' | 'corporate'
  // ...
}
```

Then regenerate CSS variables:

```bash
pnpm generate:tokens
```

## Design Token System

All visual properties flow from a single source of truth in `config/design.config.ts`. The token generator reads this config and outputs CSS custom properties consumed by Tailwind and component styles.

```
config/design.config.ts  -->  pnpm generate:tokens  -->  CSS variables  -->  Tailwind + components
```

Verify token integrity at any time:

```bash
pnpm verify:tokens
```

## Project Structure

```
config/
  site.config.ts          # Site name, URL, metadata defaults
  design.config.ts        # Active preset, token overrides
  features.config.ts      # Feature flags (auth, db, i18n, analytics)
  security.config.ts      # CSP, CORS, rate limiting, CSRF
  seo.config.ts           # Meta, JSON-LD, sitemap, robots, llms.txt
  navigation.config.ts    # Nav items, footer links
  email.config.ts         # SMTP, notification templates

presets/
  glass-ui/               # Dark glassmorphism tokens + components
  clean-modern/           # Light minimal tokens + components
  corporate/              # Navy/serif tokens + components

src/
  app/                    # Next.js App Router pages + layouts
  components/             # UI components (shadcn/ui based)
  lib/                    # Utilities, helpers, server actions
  hooks/                  # Custom React hooks
  styles/                 # Global CSS, generated token files
  types/                  # Shared TypeScript types
```

## Feature Flags

Optional modules are gated behind feature flags in `config/features.config.ts`. Disabled features produce zero bundle overhead.

```ts
export const featuresConfig = {
  auth: false,       // Authentication (next-auth)
  db: false,         // Database layer (Drizzle + Postgres)
  i18n: false,       // Internationalization
  analytics: false,  // Analytics integration
}
```

## Security

Enterprise security is configured in `config/security.config.ts`:

- **Content Security Policy** -- strict CSP headers with nonce-based script loading
- **CORS** -- configurable allowed origins
- **Rate Limiting** -- per-route request throttling
- **CSRF Protection** -- token-based form protection
- **Input Sanitization** -- server-side validation on all inputs

## SEO + GEO

Configured in `config/seo.config.ts`:

- Automatic `<meta>` tags and Open Graph from site config
- JSON-LD structured data (Organization, WebSite, Article)
- Auto-generated `sitemap.xml` and `robots.txt`
- `llms.txt` for LLM discoverability

## Email Notifications

Two notification tiers via Nodemailer:

- **Admin emails** -- technical alerts (build failures, errors, security events)
- **Client emails** -- friendly, branded status updates

Configure SMTP and templates in `config/email.config.ts`.

## Self-Healing CI Pipeline

The CI pipeline uses Claude Agent SDK to automatically recover from failures:

1. CI run fails (lint, typecheck, test, build)
2. Claude Agent analyzes the failure output
3. Agent generates a fix and opens a PR
4. On merge, pipeline re-runs to verify

See [docs/self-healing.md](docs/self-healing.md) for configuration details.

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm test` | Run unit tests (Vitest) |
| `pnpm test:e2e` | Run end-to-end tests (Playwright) |
| `pnpm generate:tokens` | Generate CSS variables from design config |
| `pnpm verify:tokens` | Verify design token integrity |
| `pnpm setup` | Interactive project setup wizard |

## Deployment

**Primary: Vercel**

Connect the repository to Vercel. The framework is optimized for Vercel's Edge Runtime and ISR. No additional configuration required.

**Secondary: Hetzner**

For self-hosted deployments, use Docker with the included `Dockerfile` or deploy via Node.js directly. Configure environment variables per `config/site.config.ts`.

## License

Private. All rights reserved.
