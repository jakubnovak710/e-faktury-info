'use client';

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
// PromoCard — premium partner promotion with gradient border + glow
// ---------------------------------------------------------------------------

export function PromoCard({ partner }: { partner: PromoPartner }) {
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

interface MegaMenuPanelProps {
  isOpen: boolean;
  partner: PromoPartner;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function MegaMenuPanel({ isOpen, partner, onMouseEnter, onMouseLeave }: MegaMenuPanelProps) {
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
