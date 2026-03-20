'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, ArrowRight, ChevronDown, Sun, Moon,
  FileText, Calendar, ClipboardCheck, AlertTriangle,
  Briefcase, Building2, Calculator, Factory,
  Puzzle, BookOpen, HelpCircle, ExternalLink,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useTheme } from '@jakubnovak710/universal-web-core/components/providers/theme-provider';
import { cn } from '@jakubnovak710/universal-web-core/lib/utils';
import { navigationConfig } from '@config/navigation.config';
import type { MegaMenuGroup, PromoPartner } from '@config/navigation.config';

// ---------------------------------------------------------------------------
// Icon resolver — maps config string names to Lucide components
// ---------------------------------------------------------------------------

const ICON_MAP: Record<string, LucideIcon> = {
  FileText, Calendar, ClipboardCheck, AlertTriangle,
  Briefcase, Building2, Calculator, Factory,
  Puzzle, BookOpen, HelpCircle,
};

function resolveIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? FileText;
}

// ---------------------------------------------------------------------------
// Scroll state hook — simple isScrolled (always visible, no hide/show)
// ---------------------------------------------------------------------------

function useScrollState() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return isScrolled;
}

// ---------------------------------------------------------------------------
// Default logo with optional subtitle
// ---------------------------------------------------------------------------

function DefaultLogo({ subtitle }: { subtitle?: string }) {
  const pathname = usePathname();
  const content = (
    <div className="group flex flex-col leading-none">
      <div className="flex items-center gap-2.5">
        <div
          className="flex h-7 w-7 items-center justify-center rounded-lg"
          style={{
            backgroundColor: 'var(--accent)',
            boxShadow: '0 0 12px var(--accent-glow)',
          }}
        >
          <FileText className="h-3.5 w-3.5" style={{ color: 'var(--bg-base)' }} />
        </div>
        <span
          className="text-lg font-black tracking-tight transition-colors"
          style={{ color: 'var(--text-primary)' }}
        >
          e-Faktúry.info
        </span>
      </div>
      {subtitle && (
        <span
          className="pl-[38px] text-[10px] font-bold uppercase tracking-[0.2em] transition-colors"
          style={{ color: 'var(--text-muted)' }}
        >
          {subtitle}
        </span>
      )}
    </div>
  );

  if (pathname === '/') return content;
  return <Link href="/">{content}</Link>;
}

// ---------------------------------------------------------------------------
// MegaMenuColumn — renders one group of mega menu items with hover effects
// ---------------------------------------------------------------------------

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
            className="group/item flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 transition-colors duration-200"
            style={{
              backgroundColor: isActive ? 'var(--fill-subtle)' : undefined,
              borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.backgroundColor = 'var(--fill-subtle)';
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
            }}
            aria-current={isActive ? 'page' : undefined}
          >
            <span
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 group-hover/item:!text-[var(--accent)]"
              style={{
                backgroundColor: isActive ? 'var(--bg-surface)' : 'var(--fill-subtle)',
                color: isActive ? 'var(--accent)' : 'var(--text-muted)',
              }}
            >
              <Icon className="h-4 w-4" />
            </span>
            <div>
              <span
                className="text-sm font-black transition-colors duration-200 group-hover/item:!text-[var(--text-primary)]"
                style={{ color: isActive ? 'var(--accent)' : 'var(--text-secondary)' }}
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

// ---------------------------------------------------------------------------
// PromoCard — premium partner promotion with gradient border + glow
// ---------------------------------------------------------------------------

function PromoCard({ partner }: { partner: PromoPartner }) {
  return (
    <div
      className="group/promo relative h-full cursor-pointer overflow-hidden rounded-xl p-[1px] transition-shadow duration-300 hover:shadow-lg"
      style={{
        background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
        boxShadow: '0 0 0 var(--accent-glow)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 0 24px var(--accent-glow)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 0 0 var(--accent-glow)';
      }}
    >
      {/* Inner card */}
      <div
        className="flex h-full flex-col justify-between rounded-[11px] p-5"
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
            <p
              className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: 'var(--text-muted)' }}
            >
              Tip pre vás
            </p>
          </div>
          <h3 className="mt-3 text-lg font-black" style={{ color: 'var(--text-primary)' }}>
            {partner.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {partner.description}
          </p>
        </div>
        <a
          href={partner.url}
          target="_blank"
          rel="noopener"
          className="mt-5 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition-all duration-200 hover:scale-[1.02] active:scale-95"
          style={{
            background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
            color: 'var(--bg-base)',
            boxShadow: '0 4px 16px var(--accent-glow)',
          }}
        >
          {partner.cta}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MegaMenuPanel — OPAQUE full-width dropdown with 3 columns + promo
// ---------------------------------------------------------------------------

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
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div
            className="mx-auto grid max-w-6xl grid-cols-4 gap-6 rounded-2xl p-6"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              boxShadow: '0 12px 48px var(--glass-shadow), 0 0 0 1px var(--border-subtle)',
            }}
          >
            {navigationConfig.megaMenu.map((group) => (
              <MegaMenuColumn key={group.id} group={group} />
            ))}
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

// ---------------------------------------------------------------------------
// DesktopNavTriggers — group label buttons that open mega menu
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// ThemeToggle — dark/light mode switch
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// NavbarCTA — newsletter subscribe button
// ---------------------------------------------------------------------------

function NavbarCTA() {
  return (
    <Link
      href="/#newsletter"
      className="hidden cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-95 lg:flex"
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

// ---------------------------------------------------------------------------
// MobileMenu — placeholder (will be replaced in Task 4)
// ---------------------------------------------------------------------------

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

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
          style={{ backgroundColor: 'var(--bg-surface)' }}
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <button
            onClick={onClose}
            className="absolute right-6 top-6 z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-all active:scale-95"
            style={{ backgroundColor: 'var(--fill-subtle)', color: 'var(--text-muted)' }}
            aria-label="Zavrieť menu"
          >
            <X size={24} />
          </button>
          <div className="flex flex-1 items-center justify-center">
            <p style={{ color: 'var(--text-muted)' }}>Menu — pripravuje sa</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Navigation — main exported component with mega menu
// ---------------------------------------------------------------------------

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

          {/* Mega menu panel */}
          <MegaMenuPanel
            isOpen={megaMenuOpen}
             
            partner={navigationConfig.promoPartners[promoIndex]!}
            onMouseEnter={openMegaMenu}
            onMouseLeave={closeMegaMenu}
          />
        </nav>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={closeMobile} />
    </>
  );
}
