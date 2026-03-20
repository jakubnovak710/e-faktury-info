/**
 * Partner CTA Box Component
 *
 * Visual call-to-action card for partner sites (8888.sk, sroihned.sk, digitalnipostari.sk).
 * Glass UI styled. Max 1 per page.
 *
 * Tracks clicks via Umami analytics.
 *
 * Usage:
 *   <PartnerCTA
 *     partner="8888"
 *     pagePath="/e-faktura-pre-zivnostnikov"
 *     locale="sk"
 *   />
 */

'use client';

import { ExternalLink } from 'lucide-react';
import { trackPartnerClick } from '@/lib/analytics';
import { getPartnerLink } from '@/lib/auto-linker';
import type { Locale } from '@/i18n/config';

interface PartnerCTAProps {
  /** Partner identifier: '8888' | 'sroihned' | 'digitalnipostari' */
  partner: string;
  /** Current page path for anchor rotation and analytics */
  pagePath: string;
  /** Current locale */
  locale: Locale;
  /** Optional custom title override */
  title?: string;
  /** Optional custom description override */
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

export function PartnerCTA({
  partner,
  pagePath,
  locale,
  title,
  description,
}: PartnerCTAProps) {
  const link = getPartnerLink(partner, pagePath, locale);
  if (!link) return null;

  const defaults = PARTNER_DEFAULTS[partner];
  const displayTitle = title ?? (locale === 'sk' ? defaults?.titleSk : defaults?.titleEn) ?? '';
  const displayDescription = description ?? (locale === 'sk' ? defaults?.descriptionSk : defaults?.descriptionEn) ?? '';

  function handleClick() {
    if (link) trackPartnerClick(link.url, pagePath);
  }

  return (
    <aside className="my-8 rounded-xl border border-[var(--accent)]/20 bg-[var(--bg-surface)] p-6">
      <p className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
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
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90"
      >
        {link.anchor}
        <ExternalLink className="h-4 w-4" />
      </a>
    </aside>
  );
}
