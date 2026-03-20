/**
 * Translation loader
 *
 * Dynamically imports the correct translation file based on locale.
 * Used in server components and pages to get type-safe translations.
 *
 * Usage:
 *   const t = await getTranslations('sk');
 *   t.nav.home // "Domov"
 *
 *   // Or synchronous (after initial load):
 *   const t = getTranslationsSync('sk');
 */

import type { Locale } from './config';
import type { Translations } from './sk';

const translationCache = new Map<Locale, Translations>();

/**
 * Async translation loader — use in server components
 */
export async function getTranslations(locale: Locale): Promise<Translations> {
  if (translationCache.has(locale)) {
    return translationCache.get(locale)!;
  }

  const mod = locale === 'sk'
    ? await import('./sk')
    : await import('./en');

  const translations = mod.default;
  translationCache.set(locale, translations);
  return translations;
}

/**
 * Sync translation loader — use when you know translations are cached
 * Falls back to Slovak if not cached yet
 */
export function getTranslationsSync(locale: Locale): Translations {
  if (translationCache.has(locale)) {
    return translationCache.get(locale)!;
  }

  // Synchronous fallback — import sk directly
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const sk = require('./sk').default as Translations;
  translationCache.set('sk', sk);
  return sk;
}
