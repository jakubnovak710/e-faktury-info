# CLAUDE.md — Universal Web Project Rules

## ABSOLUTE RULES (NEVER VIOLATE)

### 1. Design Tokens Are Sacred
- NEVER use hardcoded colors: no `#hex`, no `rgb()`, no `bg-gray-800`, no `text-white`
- ALWAYS use CSS variables: `var(--bg-surface)`, `var(--text-primary)`, `var(--accent)`
- The ONLY exception: gradient color-stops inside `linear-gradient()` when CSS vars don't work
- Tailwind classes that map to tokens are OK: `bg-surface`, `text-primary`, `text-accent`
- If a token doesn't exist, ADD it to the design system — don't bypass it

### 2. Global Config First
- Colors: `config/design.config.ts` → generated CSS variables
- Features: `config/features.config.ts` — check before importing optional modules
- Site info: `config/site.config.ts`
- Navigation: `config/navigation.config.ts`
- SEO: `config/seo.config.ts`
- Security: `config/security.config.ts`
- NEVER create ad-hoc colors, font sizes, spacing values, shadows, or border-radius

### 3. Component Hierarchy — Check Before Creating
1. `src/components/design-system/` — preset-specific components (cards, buttons, effects)
2. `src/components/ui/` — shadcn/ui primitives
3. `src/components/layout/` — header, footer, sidebar, nav
4. Only create NEW components if nothing exists

### 4. Typography Rules
- Headings: `font-black` (weight 900), display font
- Body: `font-normal` (weight 400), body font
- Labels/meta: `font-mono`, `uppercase`, `tracking-widest`, 9-10px, `font-bold`
- NEVER use `font-bold` for headings (use `font-black`)
- NEVER use emoji as UI icons (use `lucide-react`)

### 5. Feature Flags
- Before importing optional modules (auth, db, i18n, analytics, email):
  check `config/features.config.ts`
- Pattern: `if (features.auth) { ... }` or conditional dynamic import
- Never add unconditional imports of optional dependencies

### 6. File Locations
| What | Where |
|------|-------|
| Pages | `src/app/` (Next.js App Router) |
| Shared components | `src/components/` |
| Logic/utilities | `src/lib/` |
| Hooks | `src/hooks/` |
| Types | `src/types/` |
| Config | `config/` (root level) |
| Presets | `presets/` (root level) |
| Tests | `tests/` (mirrors src structure) |
| Scripts | `scripts/` |

### 7. Code Quality
- TypeScript strict mode — ZERO `any` types
- All components must have proper TypeScript interfaces
- All API routes must validate input with Zod
- All forms use React Hook Form + Zod
- Export shared types from `src/types/`

### 8. SEO Requirements
- Every page MUST have metadata (use `createMetadata()` from `@/lib/metadata`)
- Content pages MUST include JSON-LD structured data
- All images MUST have alt text
- Use semantic HTML elements

### 9. Security
- All user input MUST be sanitized
- API routes MUST use rate limiting
- Forms MUST have CSRF protection
- Never expose secrets in client code
- Never use `dangerouslySetInnerHTML` without sanitization

### 10. Motion/Animation
- Use Motion for React (`motion/react`) for component animations
- Use CSS keyframes (in `effects.css`) for ambient effects
- NEVER use instant state changes — always animate transitions
- Stagger lists: 60ms between items

### 11. Styling Anti-Patterns — NEVER DO
| Never | Instead |
|-------|---------|
| `bg-gray-800`, `text-white`, `border-gray-700` | CSS variables via Tailwind: `bg-surface`, `text-primary` |
| Hardcoded hex/rgb for backgrounds or text | CSS variables: `var(--bg-surface)` |
| Solid border colors | Semi-transparent borders: `var(--border-default)` |
| Traditional `box-shadow` in dark mode | Colored glow: `0 0 20px var(--accent-glow)` |
| `font-bold` for headings | `font-black` (weight 900) |
| Emojis as UI icons | `lucide-react` icons |
| Static lists (instant appear) | Staggered entrance animations |

## TECH STACK
- Next.js 15 (App Router) + TypeScript strict
- Tailwind CSS v4 + shadcn/ui
- pnpm package manager
- Design presets: Glass UI (default), Clean Modern, Corporate

## NEW PROJECT SETUP

Keď user chce vytvoriť nový klientsky projekt z tejto šablóny:

### Fáza 1: Repo & Základy
1. Vytvor nové GitHub repo (user poskytne názov)
2. Push šablónu: `git remote set-url origin <new-repo-url> && git push -u origin main`
3. Spusti `pnpm setup` — interaktívny wizard nastaví: názov, popis, URL, locale, preset, features, SMTP, .env.local

### Fáza 2: Deployment
4. Vercel: user pripojí repo cez Vercel dashboard, nastaví env vars z `.env.local`
5. Doména: user pridá custom doménu vo Vercel → aktualizuj `NEXT_PUBLIC_SITE_URL` v `.env.local` a Vercel env vars
6. Over: `pnpm build` musí prejsť lokálne

### Fáza 3: Obsah & Navigácia
7. `config/navigation.config.ts` — uprav navigáciu podľa klientových stránok
8. `config/site.config.ts` — over/uprav socials, creator info
9. Logo: vlož SVG do `public/` a aktualizuj referencie
10. Favicon: `public/favicon.ico` + `public/apple-touch-icon.png`

### Fáza 4: Programovanie
11. Vytvor stránky v `src/app/` podľa navigácie
12. Dodržiavaj ABSOLUTE RULES vyššie
13. Po každej stránke: `pnpm build && pnpm lint`

### Checklist pred launch
- [ ] `pnpm build` OK
- [ ] Všetky env vars nastavené vo Vercel
- [ ] Meta tagy + OG images na každej stránke
- [ ] Favicon + apple-touch-icon
- [ ] robots.txt + sitemap (auto-generované Next.js)
- [ ] HTTPS funguje na custom doméne
