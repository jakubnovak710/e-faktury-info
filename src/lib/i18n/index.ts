/**
 * i18n module placeholder.
 * Enable with: features.i18n = true in config/features.config.ts
 *
 * When implementing:
 * 1. Create dictionaries: src/lib/i18n/dictionaries/{sk,en,cs}.json
 * 2. Create getDictionary() helper
 * 3. Add locale detection to middleware
 * 4. Use [locale] dynamic route segment: src/app/[locale]/
 * 5. Add hreflang tags via metadata
 *
 * Example dictionary (sk.json):
 * ```json
 * {
 *   "nav": { "home": "Domov", "about": "O nás", "contact": "Kontakt" },
 *   "hero": { "title": "Vitajte", "cta": "Začať" }
 * }
 * ```
 */

export const I18N_READY = false;

export const defaultLocale = 'sk';
export const supportedLocales = ['sk', 'en', 'cs'] as const;
export type Locale = (typeof supportedLocales)[number];
