'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu, ArrowRight, ChevronDown, Sun, Moon, FileText,
} from 'lucide-react';
import { useTheme } from '@jakubnovak710/universal-web-core/components/providers/theme-provider';
import { cn } from '@jakubnovak710/universal-web-core/lib/utils';
import { navigationConfig } from '@config/navigation.config';
import { MegaMenuPanel } from './mega-menu';
import { MobileMenu } from './mobile-menu';

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
// DefaultLogo with optional subtitle
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
// DesktopNavTriggers — group label buttons that open mega menu
// ---------------------------------------------------------------------------

interface DesktopNavTriggersProps {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}

function DesktopNavTriggers({ onOpen, onClose, isOpen }: DesktopNavTriggersProps) {
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
