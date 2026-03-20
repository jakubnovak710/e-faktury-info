/**
 * Language Switcher Component
 *
 * Renders a toggle/dropdown to switch between SK and EN.
 * Tracks language switch events via Umami analytics.
 *
 * Usage:
 *   <LanguageSwitcher locale="sk" pathname="/co-je-e-faktura" />
 */

'use client';

import Link from 'next/link';
import { Globe } from 'lucide-react';
import { i18nConfig, type Locale } from '@/i18n/config';
import { trackLanguageSwitch } from '@/lib/analytics';

interface LanguageSwitcherProps {
  /** Current active locale */
  locale: Locale;
  /** Current pathname WITHOUT locale prefix */
  pathname: string;
}

export function LanguageSwitcher({ locale, pathname }: LanguageSwitcherProps) {
  const otherLocale = locale === 'sk' ? 'en' : 'sk';
  const otherName = i18nConfig.localeNames[otherLocale];

  function handleClick() {
    trackLanguageSwitch(locale, otherLocale);
  }

  return (
    <Link
      href={`/${otherLocale}${pathname}`}
      locale={otherLocale}
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
      title={`Switch to ${otherName}`}
    >
      <Globe className="h-4 w-4" />
      <span className="font-mono text-xs font-bold uppercase tracking-widest">
        {otherLocale.toUpperCase()}
      </span>
    </Link>
  );
}
