/**
 * Partner CTA Box Component — Glass UI Edition
 *
 * Premium CTA card for partner sites with:
 * - Glass morphism background
 * - Accent gradient border glow
 * - Hover animation
 * - Analytics tracking
 *
 * Marketing Psychology:
 * - Nudge (non-aggressive but visible)
 * - Visual Anchor (accent border draws eye)
 * - Authority (recommended badge)
 */

'use client';

import { ExternalLink } from 'lucide-react';
import { trackPartnerClick } from '@/lib/analytics';
import { getPartnerLink } from '@/lib/auto-linker';
import type { Locale } from '@/i18n/config';

interface PartnerCTAProps {
  partner: string;
  pagePath: string;
  locale: Locale;
  title?: string;
  description?: string;
}

const PARTNER_DEFAULTS: Record<string, { titleSk: string; titleEn: string; descriptionSk: string; descriptionEn: string }> = {
  '8888': {
    titleSk: 'Potrebujete pomoc s účtovníctvom?',
    titleEn: 'Need help with accounting?',
    descriptionSk: 'Profesionálna účtovná kancelária pre podnikateľov na Slovensku.',
    descriptionEn: 'Professional accounting firm for businesses in Slovakia.',
  },
  sroihned: {
    titleSk: 'Zakladáte novú firmu?',
    titleEn: 'Starting a new business?',
    descriptionSk: 'Založte si s.r.o. rýchlo a jednoducho online.',
    descriptionEn: 'Register your company quickly and easily online.',
  },
  digitalnipostari: {
    titleSk: 'Hľadáte digitálneho poštára?',
    titleEn: 'Looking for a digital postman?',
    descriptionSk: 'Kompletný zoznam a porovnanie certifikovaných digitálnych poštárov.',
    descriptionEn: 'Complete list and comparison of certified digital postmen.',
  },
};

export function PartnerCTA({ partner, pagePath, locale, title, description }: PartnerCTAProps) {
  const link = getPartnerLink(partner, pagePath, locale);
  if (!link) return null;

  const defaults = PARTNER_DEFAULTS[partner];
  const displayTitle = title ?? (locale === 'sk' ? defaults?.titleSk : defaults?.titleEn) ?? '';
  const displayDescription = description ?? (locale === 'sk' ? defaults?.descriptionSk : defaults?.descriptionEn) ?? '';

  function handleClick() {
    if (link) trackPartnerClick(link.url, pagePath);
  }

  return (
    <aside className="not-prose group relative my-10 overflow-hidden rounded-xl border border-[var(--accent)]/20 transition-all hover:border-[var(--accent)]/40">
      {/* Glass background */}
      <div className="absolute inset-0 bg-[var(--bg-surface)]/80 backdrop-blur-sm" />

      {/* Glow effect */}
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
        style={{ background: 'var(--accent)' }}
      />

      <div className="relative flex items-start gap-4 p-6">
        <div className="flex-1">
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">
            {locale === 'sk' ? 'Odporúčame' : 'Recommended'}
          </p>
          <p className="mt-2 text-lg font-black text-[var(--text-primary)]">
            {displayTitle}
          </p>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            {displayDescription}
          </p>
          <a
            href={link.url}
            target="_blank"
            rel="noopener"
            onClick={handleClick}
            className="mt-4 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
            style={{
              background: 'var(--accent)',
              boxShadow: '0 0 20px var(--accent-glow, rgba(37, 99, 235, 0.3))',
            }}
          >
            {link.anchor}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </aside>
  );
}
