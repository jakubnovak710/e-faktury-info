/**
 * i18n Configuration
 *
 * Defines supported locales and default locale for the site.
 * Used by middleware (locale detection + redirect) and all page components.
 *
 * URL structure: /sk/... and /en/...
 * Root / redirects to /sk/ (default locale)
 * x-default hreflang points to /en/ (international fallback)
 */

export const i18nConfig = {
  /** All supported locales */
  locales: ['sk', 'en'] as const,

  /** Default locale — used for redirects from / */
  defaultLocale: 'sk' as const,

  /** Locale used as x-default in hreflang (international fallback) */
  xDefaultLocale: 'en' as const,

  /** Human-readable locale names (for language switcher) */
  localeNames: {
    sk: 'Slovenčina',
    en: 'English',
  } as const,
} as const;

export type Locale = (typeof i18nConfig.locales)[number];

/**
 * Check if a string is a valid locale
 */
export function isValidLocale(value: string): value is Locale {
  return (i18nConfig.locales as readonly string[]).includes(value);
}
