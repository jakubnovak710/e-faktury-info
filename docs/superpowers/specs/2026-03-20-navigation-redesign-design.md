# Navigation Redesign — e-faktury.info

**Date:** 2026-03-20
**Status:** Approved

## Problem

1. `<Navigation />` is only imported in `src/app/page.tsx` — subpages have no navigation
2. Desktop dropdown is a narrow 264px popover — not a mega menu
3. Mobile menu is a flat list placeholder with no accordion/tabs for children
4. CTA "Kontrola pripravenosti" links to non-existent `/nastroje/kontrola-pripravenosti`
5. Phone placeholder `+421 XXX XXX XXX` is meaningless
6. Nav config doesn't reflect actual page inventory (missing `/otazky`, `/odvetvia`; includes non-existent `/blog`)

## Design

### 1. Navigation in root layout

Move `<Navigation />` from `src/app/page.tsx` into `src/app/layout.tsx` so it renders on every page automatically. Remove the per-page import from homepage.

### 2. Types

The core package defines `NavigationConfig` with a required `header: NavItem[]` field. We keep `header` populated (flattened mega menu links) so core components (footer, bottomBar) still work. Mega menu data lives on an extended local type.

```ts
// Local types in navigation config
interface MegaMenuItem {
  label: string;
  href: string;
  description: string;
  icon: string; // lucide-react icon name
}

interface MegaMenuGroup {
  id: string;
  label: string;
  children: MegaMenuItem[];
}

interface PromoPartner {
  title: string;
  description: string;
  url: string;
  cta: string;
}

// Extends NavigationConfig from core package
interface ExtendedNavigationConfig extends NavigationConfig {
  megaMenu: MegaMenuGroup[];
  ctaLabel: string;
  ctaAction: 'newsletter';
  promoPartners: PromoPartner[];
}
```

### 3. Navigation config restructure

Replace flat `header[]` with 3 mega menu groups. Keep `header` populated with flattened links for type contract and any core components that read it. Remove `phone` field. Change CTA to newsletter.

**Links removed from current config (non-existent pages):**
- `/blog` — no page exists, removed from header and bottomBar
- `/legislativa-e-faktura` — was in Sprievodca children, no page exists

**Links added:**
- `/odvetvia` — exists, added to "Pre koho" group
- `/otazky` — exists, added to "Nástroje" group

**bottomBar update:** Replace `/blog` with `/otazky`.

```ts
// config/navigation.config.ts
export const navigationConfig: ExtendedNavigationConfig = {
  // header stays populated (flattened) for core type contract
  header: [
    { label: 'Čo je e-faktúra', href: '/co-je-e-faktura' },
    { label: 'Kedy začne platiť', href: '/kedy-zacne-platit-e-faktura' },
    { label: 'Ako sa pripraviť', href: '/ako-sa-pripravit-na-e-fakturu' },
    { label: 'Pokuty a sankcie', href: '/pokuty-za-e-fakturu' },
    { label: 'Pre živnostníkov', href: '/e-faktura-pre-zivnostnikov' },
    { label: 'Pre malé firmy', href: '/e-faktura-pre-male-firmy' },
    { label: 'Pre účtovníkov', href: '/e-faktura-pre-uctovnikov' },
    { label: 'Odvetvia', href: '/odvetvia' },
    { label: 'Integrácie', href: '/integracie' },
    { label: 'Slovník pojmov', href: '/slovnik' },
    { label: 'Otázky a odpovede', href: '/otazky' },
  ],
  megaMenu: [
    {
      id: 'sprievodca',
      label: 'Sprievodca',
      children: [
        { label: 'Čo je e-faktúra', href: '/co-je-e-faktura', description: 'Kompletný sprievodca elektronickou fakturáciou', icon: 'FileText' },
        { label: 'Kedy začne platiť', href: '/kedy-zacne-platit-e-faktura', description: 'Termíny, fázy a kľúčové dátumy', icon: 'Calendar' },
        { label: 'Ako sa pripraviť', href: '/ako-sa-pripravit-na-e-fakturu', description: '4 kroky k pripravenosti na e-faktúru', icon: 'ClipboardCheck' },
        { label: 'Pokuty a sankcie', href: '/pokuty-za-e-fakturu', description: 'Čo hrozí za nesplnenie povinností', icon: 'AlertTriangle' },
      ],
    },
    {
      id: 'pre-koho',
      label: 'Pre koho',
      children: [
        { label: 'Pre živnostníkov', href: '/e-faktura-pre-zivnostnikov', description: 'SZČO a paušálne výdavky', icon: 'Briefcase' },
        { label: 'Pre malé firmy', href: '/e-faktura-pre-male-firmy', description: 'S.r.o., a.s. a platitelia DPH', icon: 'Building2' },
        { label: 'Pre účtovníkov', href: '/e-faktura-pre-uctovnikov', description: 'Nové povinnosti a služby pre klientov', icon: 'Calculator' },
        { label: 'Odvetvia', href: '/odvetvia', description: 'Špecifiká podľa odvetvia', icon: 'Factory' },
      ],
    },
    {
      id: 'nastroje',
      label: 'Nástroje',
      children: [
        { label: 'Integrácie', href: '/integracie', description: 'Pripravenosť ERP a fakturačných systémov', icon: 'Puzzle' },
        { label: 'Slovník pojmov', href: '/slovnik', description: 'e-faktúra, Peppol, EN 16931 a ďalšie', icon: 'BookOpen' },
        { label: 'Otázky a odpovede', href: '/otazky', description: 'Najčastejšie otázky o e-faktúre', icon: 'HelpCircle' },
      ],
    },
  ],
  ctaLabel: 'Odoberať novinky',
  ctaAction: 'newsletter', // triggers newsletter modal/scroll
  promoPartners: [
    { title: '8888.sk', description: 'Profesionálne vedenie účtovníctva', url: 'https://8888.sk', cta: 'Zobraziť ponuku' },
    { title: 'Digitálni poštári', description: 'Porovnanie certifikovaných digitálnych poštárov', url: 'https://digitalnipostari.sk', cta: 'Porovnať poštárov' },
    { title: 'sroihned.sk', description: 'Založenie s.r.o. online za 24 hodín', url: 'https://sroihned.sk', cta: 'Založiť firmu' },
  ],
  footer: {
    // ... unchanged
  },
  bottomBar: [
    { label: 'Domov', href: '/', icon: 'Home' },
    { label: 'Sprievodca', href: '/co-je-e-faktura', icon: 'BookOpen' },
    { label: 'Integrácie', href: '/integracie', icon: 'Puzzle' },
    { label: 'Otázky', href: '/otazky', icon: 'HelpCircle' },
  ],
};
```

### 3. Desktop mega menu (full-width panel)

**Trigger:** Hover on any mega menu group label in the navbar.

**Layout:**
- Full-width panel anchored below the floating navbar (same max-w-6xl)
- Glass UI styling: `backdrop-filter: blur(20px)`, `var(--glass-bg)`, `var(--border-default)`, `var(--glass-shadow)`
- **3 content columns** (one per group) + **1 promo column** on the right
- Each item: lucide icon (in subtle bg circle) + title (font-black) + description (text-muted, text-xs)
- Active page highlight: accent left border + accent icon color
- Smooth enter/exit animation via Motion (`opacity`, `y`, `scale`)

**Promo card (4th column):**
- Rotating partner card from `promoPartners` config
- Rotates **sequentially on each mega menu open** (not on a timer)
- MonoLabel "TIP PRE VÁS" header
- Partner title (font-black), description, accent CTA button
- Glass card with slightly elevated bg

**Behavior:**
- Opens on hover (desktop), closes on mouse leave with 150ms delay
- Only one group highlighted at a time (all columns visible simultaneously — single panel, not per-group)
- Close on Escape key
- Close on click outside
- **Keyboard:** Group labels are `<button>` elements. Enter/Space opens the panel. Arrow keys navigate items within. Tab moves between groups.

### 4. Mobile menu (full-screen overlay with tab bar)

**Layout:**
- Full-screen overlay (same as current) with slide-down animation
- **Tab bar** at top: 3 tabs — "Sprievodca" | "Pre koho" | "Nástroje"
  - Pill-style active indicator with accent underline
  - Horizontal scroll if needed (won't be — words are short enough for 360px)
- Below tabs: list of links for active tab
  - Each link: icon + title + description (compact card style)
  - Staggered entrance animation (60ms between items)
  - Active page: accent left border
- Tab switch: crossfade animation

**Newsletter CTA (bottom):**
- Fixed at bottom of overlay
- Glass card with newsletter signup form (email input + submit button)
- "Žiadny spam" reassurance text

**Close:** X button top-right, also closes on route change (existing behavior).

### 5. Navbar CTA button

- Replace "Kontrola pripravenosti" with "Odoberať novinky"
- On click: navigate to `/#newsletter` (scrolls on homepage, navigates + scrolls from subpages)
- Newsletter modal is **out of scope** for this step — simple anchor navigation is sufficient
- Accent background with shimmer effect on hover
- Hidden on mobile (newsletter CTA is in mobile menu bottom)

### 6. Files to modify

| File | Action |
|---|---|
| `config/navigation.config.ts` | Restructure to mega menu format, remove phone |
| `src/app/layout.tsx` | Add `<Navigation />` import. **Stays Server Component** — the client `<Navigation />` creates an automatic client boundary. Do NOT add `'use client'`. |
| `src/app/page.tsx` | Remove `<Navigation />` import |
| `src/components/navigation.tsx` | Full rewrite — mega menu desktop + tab mobile |
| Content pages using `ContentLayout` | No changes needed (nav comes from layout) |

### 7. Component architecture

```
navigation.tsx (main export)
├── useScrollState()          — existing, keep
├── DefaultLogo()             — existing, keep
├── DesktopNav                — new: renders mega menu trigger labels
│   └── MegaMenuPanel         — new: full-width dropdown with 3 cols + promo
│       ├── MegaMenuColumn    — new: single column of links
│       └── PromoCard         — new: rotating partner card
├── MobileMenu                — rewrite: full-screen with tabs
│   ├── MobileTabBar          — new: 3 tabs with pill indicator
│   ├── MobileTabContent      — new: link list for active tab
│   └── MobileNewsletterCTA   — new: bottom newsletter form
├── NavbarCTA                 — new: newsletter button
└── ThemeToggle               — extract from current inline code
```

Single file (`navigation.tsx`) — all sub-components are local, not exported. Target ~400-500 lines. **If implementation exceeds 500 lines**, extract into `src/components/navigation/` directory with `index.ts` barrel export, splitting `PromoCard` and `MobileNewsletterCTA` into separate files.

### 8. Animation specs

| Element | Animation | Duration | Easing |
|---|---|---|---|
| Mega menu panel enter | opacity 0→1, y -8→0 | 200ms | easeOut |
| Mega menu panel exit | opacity 1→0, y 0→-8 | 150ms | easeIn |
| Mobile overlay enter | opacity 0→1, y -100%→0 | 500ms | [0.25,0.46,0.45,0.94] |
| Mobile tab switch | crossfade opacity | 200ms | easeInOut |
| Mobile link items | stagger opacity+y | 60ms gap, 300ms each | easeOut |
| Promo card rotate | crossfade | 300ms | easeInOut |

### 9. Accessibility

- Mega menu: `role="navigation"`, `aria-expanded`, `aria-haspopup="true"`
- Focus trap in mobile menu
- Escape key closes both mega menu and mobile menu
- Tab navigation through mega menu items
- `aria-current="page"` on active link

### 11. Responsive breakpoints

- **Mobile** (`< lg` / < 1024px): Full-screen overlay with tab bar
- **Desktop** (`>= lg` / 1024px+): Floating navbar with mega menu panel
- Breakpoint pushed from current `md` (768px) to `lg` (1024px) — mega menu with 3 columns + promo needs at least ~1000px to breathe
- Tablet (768-1024px) gets mobile experience — tab bar works well at this width

### 12. Psychology rationale (from loaded skills)

- **Hick's Law**: 3 clear categories reduce decision paralysis vs. flat list of 8+ items
- **Progressive Disclosure**: mega menu shows descriptions only on hover/open — less cognitive load in navbar
- **Serial Position Effect**: most important items (Sprievodca) first, conversion items (Nástroje) last
- **Visual Hierarchy**: promo card draws attention via contrast within the mega menu
- **Foot-in-the-Door**: newsletter CTA is low-commitment entry point, builds toward partner conversion
- **Mere Exposure Effect**: partner promo in mega menu creates familiarity without being aggressive
- **Goal-Gradient Effect**: mobile tab bar shows clear sections, user knows where they are in the navigation
