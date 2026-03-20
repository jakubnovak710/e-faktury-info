'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText, Calendar, ClipboardCheck, AlertTriangle,
  Briefcase, Building2, Calculator, Factory,
  Puzzle, BookOpen, HelpCircle, ExternalLink,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { navigationConfig } from '@config/navigation.config';
import type { MegaMenuGroup, PromoPartner } from '@config/navigation.config';

const PROMO_INTERVAL_MS = 5000;

// ---------------------------------------------------------------------------
// Icon resolver — maps config string names to Lucide components
// ---------------------------------------------------------------------------

export const ICON_MAP: Record<string, LucideIcon> = {
  FileText, Calendar, ClipboardCheck, AlertTriangle,
  Briefcase, Building2, Calculator, Factory,
  Puzzle, BookOpen, HelpCircle,
};

export function resolveIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? FileText;
}

// ---------------------------------------------------------------------------
// MegaMenuColumn — renders one group of mega menu items with hover effects
// ---------------------------------------------------------------------------

export function MegaMenuColumn({ group }: { group: MegaMenuGroup }) {
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
// PromoCard — premium partner card with progress bar + dot navigation
// ---------------------------------------------------------------------------

interface PromoCardProps {
  partner: PromoPartner;
  currentIndex: number;
  totalCount: number;
  /** Key resets on partner change to restart progress bar animation */
  progressKey: number;
}

export function PromoCard({ partner, currentIndex, totalCount, progressKey }: PromoCardProps) {
  return (
    <div
      className="group/promo relative flex h-full cursor-pointer flex-col overflow-hidden rounded-xl p-[1px] transition-shadow duration-300 hover:shadow-lg"
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
        className="flex flex-1 flex-col rounded-[11px] p-5"
        style={{ backgroundColor: 'var(--bg-surface)' }}
      >
        {/* Header: label + dots */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
            <p
              className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: 'var(--text-muted)' }}
            >
              Tip pre vás
            </p>
          </div>
          {/* Dot navigation */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalCount }).map((_, i) => (
              <span
                key={i}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === currentIndex ? '12px' : '6px',
                  backgroundColor: i === currentIndex ? 'var(--accent)' : 'var(--border-default)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="mt-3 flex-1">
          <p
            className="font-mono text-[10px] font-bold uppercase tracking-[0.15em]"
            style={{ color: 'var(--accent)' }}
          >
            {partner.tagline}
          </p>
          <h3 className="mt-1.5 text-lg font-black" style={{ color: 'var(--text-primary)' }}>
            {partner.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {partner.description}
          </p>
        </div>

        {/* CTA button */}
        <a
          href={partner.url}
          target="_blank"
          rel="noopener"
          className="mt-4 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition-all duration-200 hover:scale-[1.02] active:scale-95"
          style={{
            background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
            color: 'var(--bg-base)',
            boxShadow: '0 4px 16px var(--accent-glow)',
          }}
        >
          {partner.cta}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>

        {/* Progress bar — resets on partner change via key */}
        <div
          className="mt-3 h-0.5 w-full overflow-hidden rounded-full"
          style={{ backgroundColor: 'var(--border-subtle)' }}
        >
          <motion.div
            key={progressKey}
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, var(--accent), var(--accent-secondary))',
            }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: PROMO_INTERVAL_MS / 1000, ease: 'linear' }}
          />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MegaMenuPanel — OPAQUE full-width dropdown with 3 columns + auto-rotating promo
// ---------------------------------------------------------------------------

interface MegaMenuPanelProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function MegaMenuPanel({ isOpen, onMouseEnter, onMouseLeave }: MegaMenuPanelProps) {
  const partners = navigationConfig.promoPartners;
  const [promoIndex, setPromoIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  // Auto-rotate every 5s while open; reset on each open
  useEffect(() => {
    if (!isOpen) return;

    // Use a microtask to reset — avoids "setState in effect body" lint rule
    const resetId = requestAnimationFrame(() => {
      setPromoIndex(0);
      setProgressKey((k) => k + 1);
    });

    const timerId = setInterval(() => {
      setPromoIndex((i) => (i + 1) % partners.length);
      setProgressKey((k) => k + 1);
    }, PROMO_INTERVAL_MS);

    return () => {
      cancelAnimationFrame(resetId);
      clearInterval(timerId);
    };
  }, [isOpen, partners.length]);

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
                key={promoIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <PromoCard
                  partner={partners[promoIndex]!}
                  currentIndex={promoIndex}
                  totalCount={partners.length}
                  progressKey={progressKey}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
