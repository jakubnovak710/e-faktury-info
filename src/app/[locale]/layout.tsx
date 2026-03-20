/**
 * Locale-aware layout
 *
 * This layout wraps all pages under /sk/... and /en/...
 * It provides:
 * - Correct html lang attribute
 * - Hreflang tags in <head>
 * - Translation context for client components
 * - Locale-specific metadata defaults
 *
 * Route: /[locale]/*
 */

import { notFound } from 'next/navigation';
import { HreflangTags } from '@/components/hreflang-tags';
import { i18nConfig, isValidLocale, type Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n/get-translations';
import { TranslationsProvider } from '@/i18n/use-translations';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * Generate static params for all locales (SSG)
 */
export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: localeParam } = await params;

  if (!isValidLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const t = await getTranslations(locale);

  return (
    <>
      <head>
        {/* Hreflang for SEO — each page should pass its own pathname */}
        <HreflangTags locale={locale} pathname="" />
      </head>
      <TranslationsProvider locale={locale} translations={t}>
        {children}
      </TranslationsProvider>
    </>
  );
}
