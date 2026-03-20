/**
 * i18n barrel export
 *
 * Single import point for all i18n utilities:
 *   import { i18nConfig, type Locale, getTranslations, useTranslations } from '@/i18n';
 */

export { i18nConfig, isValidLocale, type Locale } from './config';
export { getTranslations, getTranslationsSync } from './get-translations';
export { TranslationsProvider, useTranslations } from './use-translations';
export type { Translations } from './sk';
