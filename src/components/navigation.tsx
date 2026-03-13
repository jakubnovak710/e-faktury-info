'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, ArrowRight, Code } from 'lucide-react';
import { useTheme } from '@jakubnovak710/universal-web-core/components/providers/theme-provider';
import { cn } from '@jakubnovak710/universal-web-core/lib/utils';
import { navigationConfig } from '@config/navigation.config';
import { MagneticButton } from '@/components/magnetic-button';
import { ShimmerButton } from '@/components/shimmer-button';

// ---------------------------------------------------------------------------
// Nav link with animated underline
// ---------------------------------------------------------------------------

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'group relative px-1 py-2 text-sm font-medium transition-colors duration-200',
        isActive ? 'font-bold' : '',
      )}
      style={{ color: isActive ? 'var(--accent)' : 'var(--text-secondary)' }}
    >
      {label}
      <span
        className={cn(
          'absolute bottom-0 left-0 h-[2px] transition-all duration-300 ease-out',
          isActive ? 'w-full' : 'w-0 group-hover:w-full',
        )}
        style={{ backgroundColor: 'var(--accent)' }}
        aria-hidden="true"
      />
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Scroll hide/show hook
// ---------------------------------------------------------------------------

function useScrollDirection() {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setAtTop(y < 20);
        if (y > 100) {
          setHidden(y > lastY.current);
        } else {
          setHidden(false);
        }
        lastY.current = y;
        ticking.current = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { hidden, atTop };
}

// ---------------------------------------------------------------------------
// Mobile menu overlay
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
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40" // design-tokens-ignore
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} // design-tokens-ignore
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            className="fixed right-0 top-0 z-50 flex h-full w-80 max-w-[85vw] flex-col px-8 py-6"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderLeft: '1px solid var(--border-subtle)',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <button
              onClick={onClose}
              className="mb-10 flex h-10 w-10 cursor-pointer items-center justify-center self-end rounded-xl transition-all hover:scale-110 active:scale-95"
              style={{ backgroundColor: 'var(--fill-subtle)', color: 'var(--text-muted)' }}
              aria-label="Zavrieť menu"
            >
              <X className="h-5 w-5" />
            </button>

            <nav className="flex flex-col gap-2">
              {navigationConfig.header.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center rounded-xl px-4 py-3 text-base font-medium transition-all duration-200',
                        isActive ? 'font-bold' : '',
                      )}
                      style={{
                        color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                        backgroundColor: isActive ? 'var(--fill-subtle)' : 'transparent',
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

            <motion.div
              className="mt-auto pb-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
            >
              <ShimmerButton href="/kontakt" className="w-full justify-center" onClick={onClose}>
                Kontakt
                <ArrowRight className="h-4 w-4" />
              </ShimmerButton>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Default logo
// ---------------------------------------------------------------------------

function DefaultLogo() {
  const pathname = usePathname();
  const content = (
    <div className="flex items-center gap-2.5">
      <div
        className="flex h-7 w-7 items-center justify-center rounded-lg"
        style={{
          backgroundColor: 'var(--accent)',
          boxShadow: '0 0 12px var(--accent-glow)',
        }}
      >
        <Code className="h-3.5 w-3.5" style={{ color: 'var(--bg-base)' }} />
      </div>
      <span className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>
        Universal Web
      </span>
    </div>
  );

  if (pathname === '/') return content;
  return <Link href="/">{content}</Link>;
}

// ---------------------------------------------------------------------------
// Floating Island Navigation
// ---------------------------------------------------------------------------

interface NavigationProps {
  logo?: React.ReactNode;
  className?: string;
}

export function Navigation({ logo, className }: NavigationProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { hidden, atTop } = useScrollDirection();

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Filter last nav item as CTA
  const allLinks = navigationConfig.header;
  const navLinks = allLinks.slice(0, -1);
  const ctaLink = allLinks[allLinks.length - 1]!;

  return (
    <>
      <motion.nav
        className={cn(
          'fixed left-1/2 z-40 flex items-center gap-1 px-2 py-2 md:gap-2 md:px-4',
          className,
        )}
        style={{
          backgroundColor: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-border)',
          borderRadius: '9999px',
          boxShadow: atTop
            ? '0 4px 30px var(--glass-shadow)'
            : '0 8px 40px var(--glass-shadow)',
        }}
        initial={{ x: '-50%', y: 0 }}
        animate={{
          x: '-50%',
          y: hidden ? -80 : 16,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      >
        {/* Logo */}
        <div className="pl-2 pr-2 md:pr-4">
          {logo ?? <DefaultLogo />}
        </div>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((item) => (
            <MagneticButton key={item.href} strength={0.2} maxDistance={6}>
              <NavLink href={item.href} label={item.label} />
            </MagneticButton>
          ))}

          {/* Separator */}
          <div
            className="mx-2 h-5 w-px"
            style={{ backgroundColor: 'var(--border-default)' }}
            aria-hidden="true"
          />

          {/* CTA */}
          <MagneticButton strength={0.25} maxDistance={8}>
            <ShimmerButton href={ctaLink.href} className="rounded-full px-5 py-2 text-xs">
              {ctaLink.label}
              <ArrowRight className="h-3.5 w-3.5" />
            </ShimmerButton>
          </MagneticButton>

          {/* Theme toggle */}
          <MagneticButton
            onClick={toggleTheme}
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95"
            style={{ backgroundColor: 'var(--fill-subtle)', color: 'var(--text-muted)' }}
            aria-label={theme === 'dark' ? 'Svetlý režim' : 'Tmavý režim'}
            strength={0.3}
            maxDistance={6}
          >
            {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </MagneticButton>
        </div>

        {/* Mobile: theme + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all active:scale-95"
            style={{ backgroundColor: 'var(--fill-subtle)', color: 'var(--text-muted)' }}
            aria-label={theme === 'dark' ? 'Svetlý režim' : 'Tmavý režim'}
          >
            {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all active:scale-95"
            style={{ backgroundColor: 'var(--fill-subtle)', color: 'var(--text-muted)' }}
            aria-label="Menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </motion.nav>

      <MobileMenu isOpen={mobileOpen} onClose={closeMobile} />
    </>
  );
}
