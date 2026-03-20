# Navigation Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current narrow dropdown navigation with a full-width mega menu on desktop, tab-based mobile menu, and move navigation + footer into root layout so they appear on all pages.

**Architecture:** Single `navigation.tsx` component rewrite with local sub-components (DesktopNav, MegaMenuPanel, MobileMenu, MobileTabBar). Config restructured to add `megaMenu` groups while keeping `header` flat array for core type contract. CTA changed to newsletter anchor link.

**Tech Stack:** Next.js 15 App Router, TypeScript strict, Tailwind CSS v4, Motion (motion/react), lucide-react, @jakubnovak710/universal-web-core

**Spec:** `docs/superpowers/specs/2026-03-20-navigation-redesign-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `config/navigation.config.ts` | Rewrite | Mega menu groups + flat header + promo partners, remove phone |
| `src/app/layout.tsx` | Modify | Add Navigation + Footer imports (stays Server Component) |
| `src/app/page.tsx` | Modify | Remove Navigation + Footer imports |
| `src/components/navigation.tsx` | Rewrite | Full navigation: desktop mega menu + mobile tabs + CTA |

---

## Task 1: Restructure navigation config

**Files:**
- Rewrite: `config/navigation.config.ts`

- [ ] **Step 1: Define local types and rewrite config**

The core `NavigationConfig` type requires `header: NavItem[]`. We extend it with mega menu data. `NavItem` has: `label, href, icon?, external?, children?`. No `description` field, so mega menu items use a local type.

**Note:** Footer columns are restructured to remove dead links (`/peppol-slovensko`, `/digitalni-postari`, `/porovnanie`, `/o-nas`, `/sluzby`, `/kontakt`, `/blog`). The spec says footer is "unchanged" but the current footer references non-existent pages — fixing them here is the correct call.

```ts
// config/navigation.config.ts
import type { NavigationConfig } from '@jakubnovak710/universal-web-core/types';

/* ── Local mega menu types ─────────────────────────────── */

export interface MegaMenuItem {
  label: string;
  href: string;
  description: string;
  icon: string;
}

export interface MegaMenuGroup {
  id: string;
  label: string;
  children: MegaMenuItem[];
}

export interface PromoPartner {
  title: string;
  description: string;
  url: string;
  cta: string;
}

export interface ExtendedNavigationConfig extends NavigationConfig {
  megaMenu: MegaMenuGroup[];
  ctaLabel: string;
  ctaAction: 'newsletter';
  promoPartners: PromoPartner[];
}

/* ── Config ────────────────────────────────────────────── */

export const navigationConfig: ExtendedNavigationConfig = {
  // Flat header for core type contract
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
  ctaAction: 'newsletter',

  promoPartners: [
    { title: '8888.sk', description: 'Profesionálne vedenie účtovníctva', url: 'https://8888.sk', cta: 'Zobraziť ponuku' },
    { title: 'Digitálni poštári', description: 'Porovnanie certifikovaných digitálnych poštárov', url: 'https://digitalnipostari.sk', cta: 'Porovnať poštárov' },
    { title: 'sroihned.sk', description: 'Založenie s.r.o. online za 24 hodín', url: 'https://sroihned.sk', cta: 'Založiť firmu' },
  ],

  footer: {
    columns: [
      {
        title: 'Sprievodca',
        links: [
          { label: 'Čo je e-faktúra', href: '/co-je-e-faktura' },
          { label: 'Kedy začne platiť', href: '/kedy-zacne-platit-e-faktura' },
          { label: 'Ako sa pripraviť', href: '/ako-sa-pripravit-na-e-fakturu' },
          { label: 'Pokuty a sankcie', href: '/pokuty-za-e-fakturu' },
        ],
      },
      {
        title: 'Riešenia',
        links: [
          { label: 'Integrácie', href: '/integracie' },
          { label: 'Slovník pojmov', href: '/slovnik' },
          { label: 'Otázky a odpovede', href: '/otazky' },
        ],
      },
      {
        title: 'O nás',
        links: [
          { label: 'Ochrana súkromia', href: '/ochrana-sukromia' },
          { label: 'Obchodné podmienky', href: '/obchodne-podmienky' },
        ],
      },
    ],
  },

  bottomBar: [
    { label: 'Domov', href: '/', icon: 'Home' },
    { label: 'Sprievodca', href: '/co-je-e-faktura', icon: 'BookOpen' },
    { label: 'Integrácie', href: '/integracie', icon: 'Puzzle' },
    { label: 'Otázky', href: '/otazky', icon: 'HelpCircle' },
  ],
};
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd /Users/jakub/e-faktury-info && npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: No errors related to navigation.config.ts

- [ ] **Step 3: Commit**

```bash
git add config/navigation.config.ts
git commit -m "refactor(nav): restructure navigation config with mega menu groups"
```

---

## Task 2: Move Navigation + Footer to root layout

**Files:**
- Modify: `src/app/layout.tsx` (stays Server Component — client components create automatic boundary)
- Modify: `src/app/page.tsx` (remove Navigation + Footer imports)

- [ ] **Step 1: Add Navigation and Footer imports to layout.tsx**

In `src/app/layout.tsx`, add these imports:
```ts
import { Navigation } from '@/components/navigation';
import { Footer } from '@jakubnovak710/universal-web-core/components/layout/footer';
```

Wrap `{children}` with Navigation above and Footer below:
```tsx
<body className="antialiased">
  <CoreConfigProvider config={...}>
    <ThemeProvider>
      <Navigation />
      {children}
      <Footer />
      <UmamiProvider />
      <EngagementTracker />
    </ThemeProvider>
  </CoreConfigProvider>
</body>
```

**Important:** Do NOT add `'use client'` to layout.tsx. The Navigation client component import creates an automatic client boundary.

- [ ] **Step 2: Remove Navigation and Footer from homepage**

In `src/app/page.tsx`:
- Remove import: `import { Navigation } from '@/components/navigation';`
- Remove import: `import { Footer } from '@jakubnovak710/universal-web-core/components/layout/footer';`
- Remove `<Navigation />` from JSX (line 168)
- Remove `<Footer />` from JSX (line 659)

- [ ] **Step 3: Verify build**

Run: `cd /Users/jakub/e-faktury-info && pnpm build 2>&1 | tail -20`
Expected: Build succeeds. Homepage and subpages both show navigation.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/page.tsx
git commit -m "refactor(nav): move Navigation + Footer to root layout for all pages"
```

---

## Task 3: Rewrite navigation — Desktop mega menu

**Files:**
- Rewrite: `src/components/navigation.tsx`

This is the largest task. Build the desktop portion first, mobile in Task 4.

- [ ] **Step 1: Write the icon resolver utility**

The config stores icon names as strings. We need a map to resolve them to lucide components:

```tsx
import {
  FileText, Calendar, ClipboardCheck, AlertTriangle,
  Briefcase, Building2, Calculator, Factory,
  Puzzle, BookOpen, HelpCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  FileText, Calendar, ClipboardCheck, AlertTriangle,
  Briefcase, Building2, Calculator, Factory,
  Puzzle, BookOpen, HelpCircle,
};

function resolveIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? FileText;
}
```

- [ ] **Step 2: Keep useScrollState and DefaultLogo from existing code**

Copy these unchanged from the current `navigation.tsx`:
- `useScrollState()` hook (lines 16-28)
- `DefaultLogo()` component (lines 294-328)

- [ ] **Step 3: Build MegaMenuColumn component**

```tsx
function MegaMenuColumn({ group }: { group: MegaMenuGroup }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-1">
      <p
        className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
        style={{ color: 'var(--text-muted)' }}
      >
        {group.label}
      </p>
      {group.children.map((item) => {
        const Icon = resolveIcon(item.icon);
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="group/item flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors"
            style={{
              backgroundColor: isActive ? 'var(--fill-subtle)' : 'transparent',
              borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
            }}
            aria-current={isActive ? 'page' : undefined}
          >
            <span
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors"
              style={{
                backgroundColor: isActive ? 'var(--bg-surface)' : 'var(--fill-subtle)',
                color: isActive ? 'var(--accent)' : 'var(--text-muted)',
              }}
            >
              <Icon className="h-4 w-4" />
            </span>
            <div>
              <span
                className="text-sm font-black transition-colors"
                style={{ color: isActive ? 'var(--accent)' : 'var(--text-primary)' }}
              >
                {item.label}
              </span>
              <p className="mt-0.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                {item.description}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 4: Build PromoCard component**

```tsx
function PromoCard({ partner }: { partner: PromoPartner }) {
  return (
    <div
      className="flex h-full flex-col justify-between rounded-xl p-5"
      style={{
        backgroundColor: 'var(--bg-overlay)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div>
        <p
          className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ color: 'var(--text-muted)' }}
        >
          Tip pre vás
        </p>
        <h3 className="mt-2 text-lg font-black" style={{ color: 'var(--text-primary)' }}>
          {partner.title}
        </h3>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
          {partner.description}
        </p>
      </div>
      <a
        href={partner.url}
        target="_blank"
        rel="noopener"
        className="mt-4 flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-bold transition-all hover:shadow-lg active:scale-95"
        style={{
          backgroundColor: 'var(--accent)',
          color: 'var(--bg-base)',
          boxShadow: '0 0 12px var(--accent-glow)',
        }}
      >
        {partner.cta}
      </a>
    </div>
  );
}
```

- [ ] **Step 5: Build MegaMenuPanel component**

Full-width panel with 3 columns + promo card. Uses AnimatePresence for enter/exit. Panel itself handles mouse enter/leave to prevent close when crossing the gap between triggers and panel. Exit animation uses 150ms easeIn per spec.

```tsx
function MegaMenuPanel({
  isOpen,
  partner,
  onMouseEnter,
  onMouseLeave,
}: {
  isOpen: boolean;
  partner: PromoPartner;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute left-0 right-0 top-full z-50 pt-3"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{
            duration: 0.2,
            ease: 'easeOut',
          }}
          // Override exit transition for faster close
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div
            className="mx-auto grid max-w-6xl grid-cols-4 gap-6 rounded-2xl p-6"
            style={{
              backgroundColor: 'var(--glass-bg)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid var(--border-default)',
              boxShadow: '0 8px 40px var(--glass-shadow)',
            }}
          >
            {navigationConfig.megaMenu.map((group) => (
              <MegaMenuColumn key={group.id} group={group} />
            ))}
            {/* Promo card with crossfade on partner change */}
            <AnimatePresence mode="wait">
              <motion.div
                key={partner.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <PromoCard partner={partner} />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 6: Build the DesktopNav trigger buttons**

Group labels as `<button>` elements that trigger mega menu open:

```tsx
function DesktopNavTriggers({
  onOpen,
  onClose,
  isOpen,
}: {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}) {
  const pathname = usePathname();

  return (
    <div className="hidden items-center gap-1 lg:flex" onMouseLeave={onClose}>
      {navigationConfig.megaMenu.map((group) => {
        const isChildActive = group.children.some((c) => pathname === c.href);
        return (
          <button
            key={group.id}
            className={cn(
              'flex cursor-pointer items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-bold transition-all duration-200',
              isChildActive ? 'font-black' : 'border-transparent',
            )}
            style={{
              color: isChildActive ? 'var(--text-primary)' : 'var(--text-secondary)',
              backgroundColor: isChildActive ? 'var(--fill-subtle)' : 'transparent',
              borderColor: isChildActive ? 'var(--accent)' : undefined,
            }}
            onMouseEnter={onOpen}
            onClick={onOpen}
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            {group.label}
            <ChevronDown
              size={14}
              className={cn('transition-transform duration-200', isOpen && 'rotate-180')}
            />
          </button>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 7: Build ThemeToggle and NavbarCTA sub-components**

```tsx
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-all hover:scale-110 active:scale-95"
      style={{ backgroundColor: 'var(--fill-subtle)', color: 'var(--text-muted)' }}
      aria-label={theme === 'dark' ? 'Svetlý režim' : 'Tmavý režim'}
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

function NavbarCTA() {
  return (
    <Link
      href="/#newsletter"
      className="hidden items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold shadow-lg transition-all hover:shadow-xl active:scale-95 lg:flex"
      style={{
        backgroundColor: 'var(--accent)',
        color: 'var(--bg-base)',
        boxShadow: '0 0 12px var(--accent-glow)',
      }}
    >
      {navigationConfig.ctaLabel}
      <ArrowRight size={16} />
    </Link>
  );
}
```

- [ ] **Step 8: Wire up the main Navigation component (desktop only, mobile placeholder)**

Complete Navigation component with all state, click-outside handler, escape key, and full JSX:

```tsx
interface NavigationProps {
  logo?: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export function Navigation({ logo, subtitle, className }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);
  const isScrolled = useScrollState();
  const navRef = useRef<HTMLElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const openMegaMenu = useCallback(() => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    if (!megaMenuOpen) {
      setPromoIndex((i) => (i + 1) % navigationConfig.promoPartners.length);
    }
    setMegaMenuOpen(true);
  }, [megaMenuOpen]);

  const closeMegaMenu = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => setMegaMenuOpen(false), 150);
  }, []);

  // Escape key closes mega menu
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setMegaMenuOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  // Click outside closes mega menu
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMegaMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          'fixed left-0 right-0 z-50 px-4 transition-all duration-500 ease-in-out',
          isScrolled ? 'top-4' : 'top-6',
          className,
        )}
      >
        <nav
          className="relative mx-auto flex max-w-6xl items-center justify-between rounded-xl py-2 pl-4 pr-2 transition-all duration-300"
          style={{
            backgroundColor: 'var(--glass-bg)',
            backdropFilter: isScrolled ? 'blur(20px)' : 'blur(8px)',
            WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'blur(8px)',
            border: `1px solid ${isScrolled ? 'var(--border-default)' : 'var(--glass-border)'}`,
            boxShadow: isScrolled
              ? '0 8px 40px var(--glass-shadow)'
              : '0 4px 20px var(--glass-shadow)',
          }}
          aria-label="Hlavná navigácia"
        >
          {/* Logo */}
          <div className="z-50 flex-shrink-0">
            {logo ?? <DefaultLogo subtitle={subtitle} />}
          </div>

          {/* Desktop nav triggers */}
          <DesktopNavTriggers
            onOpen={openMegaMenu}
            onClose={closeMegaMenu}
            isOpen={megaMenuOpen}
          />

          {/* Right side: CTA + theme + hamburger */}
          <div className="flex items-center gap-3">
            <NavbarCTA />
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border-b-2 transition-all active:translate-y-[2px] active:border-b-0 lg:hidden"
              style={{
                backgroundColor: 'var(--fill-subtle)',
                color: 'var(--text-secondary)',
                borderBottomColor: 'var(--border-default)',
              }}
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
            >
              <Menu size={18} />
            </button>
          </div>

          {/* Mega menu panel — positioned relative to nav */}
          <MegaMenuPanel
            isOpen={megaMenuOpen}
            partner={navigationConfig.promoPartners[promoIndex]}
            onMouseEnter={openMegaMenu}
            onMouseLeave={closeMegaMenu}
          />
        </nav>
      </header>

      {/* Mobile menu — placeholder, built in Task 4 */}
      <MobileMenu isOpen={mobileOpen} onClose={closeMobile} />
    </>
  );
}
```

**Note:** Arrow-key navigation within mega menu items is deferred to a follow-up task. Enter/Space on trigger buttons already opens the panel, and Tab navigates through links naturally. Full roving tabindex would add ~50 lines of complexity for minimal UX gain on a content site.

- [ ] **Step 9: Verify build compiles**

Run: `cd /Users/jakub/e-faktury-info && pnpm build 2>&1 | tail -20`
Expected: Build succeeds. Desktop shows mega menu on hover.

- [ ] **Step 10: Commit**

```bash
git add src/components/navigation.tsx
git commit -m "feat(nav): desktop mega menu with 3 columns and promo card"
```

---

## Task 4: Rewrite navigation — Mobile tab menu

**Files:**
- Modify: `src/components/navigation.tsx`

- [ ] **Step 1: Build MobileTabBar component**

```tsx
function MobileTabBar({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (id: string) => void;
}) {
  return (
    <div
      className="flex gap-1 rounded-xl p-1"
      style={{ backgroundColor: 'var(--fill-subtle)' }}
      role="tablist"
    >
      {navigationConfig.megaMenu.map((group) => (
        <button
          key={group.id}
          role="tab"
          aria-selected={activeTab === group.id}
          className={cn(
            'flex-1 cursor-pointer rounded-lg px-3 py-2.5 text-center text-sm font-bold transition-all duration-200',
          )}
          style={{
            backgroundColor: activeTab === group.id ? 'var(--bg-surface)' : 'transparent',
            color: activeTab === group.id ? 'var(--accent)' : 'var(--text-muted)',
            boxShadow: activeTab === group.id ? '0 1px 3px var(--glass-shadow)' : 'none',
          }}
          onClick={() => onTabChange(group.id)}
        >
          {group.label}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Build MobileTabContent component**

```tsx
function MobileTabContent({ groupId }: { groupId: string }) {
  const pathname = usePathname();
  const group = navigationConfig.megaMenu.find((g) => g.id === groupId);
  if (!group) return null;

  return (
    <motion.div
      key={groupId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-2"
      role="tabpanel"
    >
      {group.children.map((item, i) => {
        const Icon = resolveIcon(item.icon);
        const isActive = pathname === item.href;
        return (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
          >
            <Link
              href={item.href}
              className="flex items-start gap-3 rounded-xl p-4 transition-all"
              style={{
                backgroundColor: 'var(--fill-subtle)',
                borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent',
              }}
              aria-current={isActive ? 'page' : undefined}
            >
              <span
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: isActive ? 'var(--bg-surface)' : 'var(--bg-overlay)',
                  color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                }}
              >
                <Icon className="h-4.5 w-4.5" />
              </span>
              <div>
                <span
                  className="text-base font-black"
                  style={{ color: isActive ? 'var(--accent)' : 'var(--text-primary)' }}
                >
                  {item.label}
                </span>
                <p className="mt-0.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                  {item.description}
                </p>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
```

- [ ] **Step 3: Build MobileNewsletterCTA component**

```tsx
function MobileNewsletterCTA() {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ backgroundColor: 'var(--bg-overlay)' }}
    >
      <p className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>
        Buďte vždy o krok vpred
      </p>
      <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
        Novinky o e-faktúre priamo do schránky. Žiadny spam.
      </p>
      <form className="mt-3 flex gap-2" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          required
          placeholder="vas@email.sk"
          className="flex-1 rounded-lg border px-3 py-2.5 text-sm"
          style={{
            borderColor: 'var(--border-default)',
            backgroundColor: 'var(--bg-surface)',
            color: 'var(--text-primary)',
          }}
        />
        <button
          type="submit"
          className="shrink-0 rounded-lg px-4 py-2.5 text-sm font-bold transition-all active:scale-95"
          style={{
            backgroundColor: 'var(--accent)',
            color: 'var(--bg-base)',
          }}
        >
          Odoberať
        </button>
      </form>
    </div>
  );
}
```

- [ ] **Step 4: Rewrite MobileMenu with tabs**

Replace the existing MobileMenu function. Key structure:
- Full-screen overlay (same animation as before)
- Close button top-right
- MobileTabBar at top (default tab: 'sprievodca')
- AnimatePresence + MobileTabContent below tabs
- MobileNewsletterCTA pinned at bottom
- Closes on route change (existing `useEffect` pattern)
- Body scroll lock (existing pattern)

```tsx
function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('sprievodca');

  useEffect(() => { onClose(); }, [pathname, onClose]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto lg:hidden"
          style={{
            backgroundColor: 'var(--bg-surface)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-all active:scale-95"
            style={{ backgroundColor: 'var(--fill-subtle)', color: 'var(--text-muted)' }}
            aria-label="Zavrieť menu"
          >
            <X size={24} />
          </button>

          <div className="flex flex-1 flex-col gap-6 px-6 pb-6 pt-24">
            {/* Tab bar */}
            <MobileTabBar activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Tab content */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <MobileTabContent groupId={activeTab} />
              </AnimatePresence>
            </div>

            {/* Newsletter CTA */}
            <MobileNewsletterCTA />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 5: Add focus trap to MobileMenu**

When mobile menu is open, focus should be trapped inside it. Use a simple `useFocusTrap` approach:

```tsx
// Add this inside MobileMenu, after the isOpen check:
const menuRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (!isOpen || !menuRef.current) return;
  const focusableEls = menuRef.current.querySelectorAll<HTMLElement>(
    'a[href], button, input, [tabindex]:not([tabindex="-1"])'
  );
  if (focusableEls.length === 0) return;

  const first = focusableEls[0];
  const last = focusableEls[focusableEls.length - 1];
  first.focus();

  function trapFocus(e: KeyboardEvent) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    if (e.key === 'Escape') onClose();
  }

  document.addEventListener('keydown', trapFocus);
  return () => document.removeEventListener('keydown', trapFocus);
}, [isOpen, onClose]);
```

Add `ref={menuRef}` to the outer `<motion.div>` of the mobile menu.

- [ ] **Step 6: Update hamburger breakpoint from md to lg**

In the main Navigation component, change:
- Hamburger button: `md:hidden` → `lg:hidden`
- Desktop nav container: `md:flex` → `lg:flex` (already done in DesktopNavTriggers)
- CTA button: `md:flex` → `lg:flex`
- Mobile overlay: `md:hidden` → `lg:hidden` (already in MobileMenu)

- [ ] **Step 7: Verify build + test on mobile viewport**

Run: `cd /Users/jakub/e-faktury-info && pnpm build 2>&1 | tail -20`
Expected: Build succeeds. Test in browser at 360px width — tabs visible, content switches.

- [ ] **Step 8: Commit**

```bash
git add src/components/navigation.tsx
git commit -m "feat(nav): mobile tab menu with newsletter CTA and focus trap"
```

---

## Task 5: Final cleanup and verification

**Files:**
- Possible: `src/components/navigation.tsx` (split if > 500 lines)

- [ ] **Step 1: Check line count**

Run: `wc -l src/components/navigation.tsx`

If > 500 lines, extract into `src/components/navigation/` directory:
- `index.ts` — barrel export
- `navigation.tsx` — main component + hooks
- `mega-menu.tsx` — MegaMenuPanel, MegaMenuColumn, PromoCard
- `mobile-menu.tsx` — MobileMenu, MobileTabBar, MobileTabContent, MobileNewsletterCTA
- `icons.ts` — ICON_MAP + resolveIcon

If <= 500 lines, keep as single file.

- [ ] **Step 2: Full build + lint**

Run: `cd /Users/jakub/e-faktury-info && pnpm build && pnpm lint`
Expected: Both pass.

- [ ] **Step 3: Smoke test all pages**

Open in browser and verify navigation appears on:
- `/` (homepage)
- `/co-je-e-faktura` (content page)
- `/integracie` (listing page)
- `/slovnik` (listing page)
- `/ochrana-sukromia` (legal page)

Verify:
- Desktop: mega menu opens on hover, all 3 columns + promo card visible
- Desktop: CTA "Odoberať novinky" scrolls/navigates to `/#newsletter`
- Mobile: hamburger opens overlay with 3 tabs
- Mobile: tab switching works, newsletter form visible at bottom
- Theme toggle works in both desktop and mobile

- [ ] **Step 4: Final commit if any cleanup was done**

```bash
git add -A
git commit -m "chore(nav): cleanup and finalize navigation redesign"
```
