'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, ChevronDown, Sun, Moon, FileText, Phone } from 'lucide-react';
import { useTheme } from '@jakubnovak710/universal-web-core/components/providers/theme-provider';
import { cn } from '@jakubnovak710/universal-web-core/lib/utils';
import { navigationConfig } from '@config/navigation.config';

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
// Desktop nav link with active pill + dot indicator
// ---------------------------------------------------------------------------

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'relative flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-semibold transition-all duration-200',
        isActive ? 'font-bold' : 'border-transparent',
      )}
      style={{
        color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
        backgroundColor: isActive ? 'var(--fill-subtle)' : 'transparent',
        borderColor: isActive ? 'var(--accent)' : undefined,
        boxShadow: isActive ? '0 1px 3px var(--glass-shadow)' : undefined,
      }}
    >
      {label}
      {isActive && (
        <span
          className="absolute -bottom-1 -right-1 z-20 h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: 'var(--accent)' }}
          aria-hidden="true"
        />
      )}
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Dropdown nav item
// ---------------------------------------------------------------------------

interface DropdownChild {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

function NavDropdown({
  label,
  items,
  isOpen,
  onToggle,
  onMouseEnter,
  onMouseLeave,
}: {
  label: string;
  items: DropdownChild[];
  isOpen: boolean;
  onToggle: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const pathname = usePathname();
  const isChildActive = items.some((child) => pathname === child.href);

  return (
    <div className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <button
        onClick={onToggle}
        className={cn(
          'flex cursor-pointer items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-semibold transition-all duration-200',
          isChildActive ? 'font-bold' : 'border-transparent',
        )}
        style={{
          color: isChildActive ? 'var(--text-primary)' : 'var(--text-secondary)',
          backgroundColor: isChildActive ? 'var(--fill-subtle)' : 'transparent',
          borderColor: isChildActive ? 'var(--accent)' : undefined,
        }}
      >
        {label}
        <ChevronDown
          size={14}
          className={cn('transition-transform duration-200', isOpen && 'rotate-180')}
        />
        {isChildActive && (
          <span
            className="absolute -bottom-1 -right-1 z-20 h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: 'var(--accent)' }}
            aria-hidden="true"
          />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute left-0 top-full z-50 w-64 pt-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{ transformOrigin: 'top left' }}
          >
            <div
              className="overflow-hidden rounded-xl p-2"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
                boxShadow: '0 8px 32px var(--glass-shadow)',
              }}
            >
              {items.map((child) => {
                const isActive = pathname === child.href;
                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors"
                    style={{
                      color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                      backgroundColor: isActive ? 'var(--fill-subtle)' : 'transparent',
                    }}
                  >
                    {child.icon && (
                      <span
                        className="rounded-md p-1.5"
                        style={{
                          backgroundColor: isActive ? 'var(--bg-surface)' : 'var(--fill-subtle)',
                          color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                        }}
                      >
                        {child.icon}
                      </span>
                    )}
                    {child.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mobile overlay menu (full-screen, slide-down)
// ---------------------------------------------------------------------------

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => { onClose(); }, [pathname, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const ctaLabel = navigationConfig.ctaLabel ?? 'Kontakt';
  const ctaTarget = navigationConfig.ctaAction === 'newsletter' ? '#newsletter' : '/contact';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] overflow-y-auto md:hidden"
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
          <div className="flex min-h-full flex-col px-6 pb-12 pt-32">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-6 top-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-all active:scale-95"
              style={{ backgroundColor: 'var(--fill-subtle)', color: 'var(--text-muted)' }}
              aria-label="Zavrieť menu"
            >
              <X size={24} />
            </button>

            {/* Nav items — staggered cards */}
            <nav className="flex flex-col gap-3">
              {navigationConfig.header.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center rounded-xl p-4 text-xl font-bold transition-all"
                      style={{
                        color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                        backgroundColor: 'var(--fill-subtle)',
                        borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent',
                      }}
                      onClick={onClose}
                    >
                      {item.label}
                      {isActive && (
                        <span
                          className="ml-auto h-2 w-2 rounded-full"
                          style={{ backgroundColor: 'var(--accent)' }}
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom CTA block */}
            <motion.div
              className="mt-auto rounded-2xl p-6"
              style={{ backgroundColor: 'var(--bg-overlay)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Link
                href={ctaTarget}
                className="flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all active:scale-95"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--bg-base)',
                }}
                onClick={onClose}
              >
                {ctaLabel}
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
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
// Navigation — 8888.sk floating bar style
// ---------------------------------------------------------------------------

interface NavigationProps {
  logo?: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export function Navigation({ logo, subtitle, className }: NavigationProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const isScrolled = useScrollState();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = navigationConfig.header;
  const ctaLabel = navigationConfig.ctaLabel ?? 'Kontakt';
  const ctaTarget = navigationConfig.ctaAction === 'newsletter' ? '#newsletter' : '/contact';

  return (
    <>
      <header
        className={cn(
          'fixed left-0 right-0 z-50 px-4 transition-all duration-500 ease-in-out',
          isScrolled ? 'top-4' : 'top-6',
          className,
        )}
      >
        <nav
          className="mx-auto flex max-w-6xl items-center justify-between rounded-xl py-2 pl-4 pr-2 transition-all duration-300"
          style={{
            backgroundColor: 'var(--glass-bg)',
            backdropFilter: isScrolled ? 'blur(20px)' : 'blur(8px)',
            WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'blur(8px)',
            border: `1px solid ${isScrolled ? 'var(--border-default)' : 'var(--glass-border)'}`,
            boxShadow: isScrolled
              ? '0 8px 40px var(--glass-shadow)'
              : '0 4px 20px var(--glass-shadow)',
          }}
        >
          {/* Logo */}
          <div className="z-50 flex-shrink-0">
            {logo ?? <DefaultLogo subtitle={subtitle} />}
          </div>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex" ref={dropdownRef}>
            {navLinks.map((item) => {
              const navItem = item as typeof item & {
                type?: 'link' | 'dropdown';
                children?: DropdownChild[];
              };

              if (navItem.type === 'dropdown' && navItem.children) {
                return (
                  <NavDropdown
                    key={navItem.label}
                    label={navItem.label}
                    items={navItem.children}
                    isOpen={activeDropdown === navItem.label}
                    onToggle={() =>
                      setActiveDropdown(activeDropdown === navItem.label ? null : navItem.label)
                    }
                    onMouseEnter={() => setActiveDropdown(navItem.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  />
                );
              }

              return <NavLink key={item.href} href={item.href} label={item.label} />;
            })}
          </div>

          {/* Right side: CTA + theme + hamburger */}
          <div className="flex items-center gap-3">

            {/* CTA button (md+) */}
            <Link
              href={ctaTarget}
              className="hidden items-center gap-2 rounded-lg border-b-2 px-5 py-2.5 text-sm font-bold shadow-lg transition-all hover:shadow-xl active:translate-y-0.5 md:flex"
              style={{
                backgroundColor: 'var(--bg-overlay)',
                color: 'var(--text-primary)',
                borderBottomColor: 'var(--border-strong)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent)';
                e.currentTarget.style.color = 'var(--bg-base)';
                e.currentTarget.style.boxShadow = '0 4px 20px var(--accent-glow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-overlay)';
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              {ctaLabel}
              <ArrowRight size={16} style={{ color: 'var(--accent-secondary)' }} />
            </Link>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-all hover:scale-110 active:scale-95"
              style={{ backgroundColor: 'var(--fill-subtle)', color: 'var(--text-muted)' }}
              aria-label={theme === 'dark' ? 'Svetlý režim' : 'Tmavý režim'}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Mobile hamburger */}
            <button
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border-b-2 transition-all active:translate-y-[2px] active:border-b-0 md:hidden"
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
        </nav>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={closeMobile} />
    </>
  );
}
