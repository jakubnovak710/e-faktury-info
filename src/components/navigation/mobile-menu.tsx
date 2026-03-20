'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send } from 'lucide-react';
import { navigationConfig } from '@config/navigation.config';
import { resolveIcon } from './mega-menu';

// ---------------------------------------------------------------------------
// MobileTabBar — 3 tabs at top of mobile menu
// ---------------------------------------------------------------------------

interface MobileTabBarProps {
  activeTab: string;
  onTabChange: (id: string) => void;
}

export function MobileTabBar({ activeTab, onTabChange }: MobileTabBarProps) {
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
          className="flex-1 cursor-pointer rounded-lg px-3 py-2.5 text-center text-sm font-bold transition-all duration-200"
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

// ---------------------------------------------------------------------------
// MobileTabContent — link list for active tab
// ---------------------------------------------------------------------------

export function MobileTabContent({ groupId }: { groupId: string }) {
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
              className="flex cursor-pointer items-start gap-3 rounded-xl p-4 transition-all duration-200"
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

// ---------------------------------------------------------------------------
// MobileNewsletterCTA — bottom newsletter form
// ---------------------------------------------------------------------------

export function MobileNewsletterCTA() {
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
          className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-bold transition-all duration-200 active:scale-95"
          style={{
            backgroundColor: 'var(--accent)',
            color: 'var(--bg-base)',
          }}
        >
          <Send className="h-3.5 w-3.5" />
          Odoberať
        </button>
      </form>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MobileMenu — tab-based mobile menu with focus trap
// ---------------------------------------------------------------------------

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('sprievodca');
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on route change
  useEffect(() => { onClose(); }, [pathname, onClose]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const timer = setTimeout(() => {
      if (!menuRef.current) return;
      const focusableEls = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, input, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableEls.length > 0) focusableEls[0]!.focus();
    }, 100);

    function trapFocus(e: KeyboardEvent) {
      if (!menuRef.current) return;
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab') return;

      const focusableEls = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, input, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableEls.length === 0) return;
      const first = focusableEls[0]!;
      const last = focusableEls[focusableEls.length - 1]!;

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }

    document.addEventListener('keydown', trapFocus);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', trapFocus);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto lg:hidden"
          style={{ backgroundColor: 'var(--bg-surface)' }}
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
