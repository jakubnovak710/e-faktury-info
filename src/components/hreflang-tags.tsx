/**
 * Hreflang Tags Component
 *
 * Generates <link rel="alternate" hreflang="..."> tags for all locales.
 * Place in <head> of the locale layout.
 *
 * Rules (per SEO plan):
 * - Self-referencing tag for current locale
 * - Alternate tags for all other locales
 * - x-default points to /en/ (international fallback)
 * - Bidirectional: SK→EN and EN→SK on every page
 * - Canonical: self-referencing per locale
 *
 * Usage:
 *   <HreflangTags locale="sk" pathname="/co-je-e-faktura" />
 */

import { i18nConfig, type Locale } from '@/i18n/config';
import { siteConfig } from '@config/site.config';

interface HreflangTagsProps {
  /** Current locale */
  locale: Locale;
  /** Current pathname WITHOUT locale prefix (e.g. "/co-je-e-faktura") */
  pathname: string;
}

/**
 * Maps SK slugs to EN equivalents for known routes.
 * For routes without explicit mapping, the same slug is used.
 */
const SLUG_MAP: Record<string, Record<string, string>> = {
  sk: {},
  en: {
    '/co-je-e-faktura': '/what-is-e-invoice',
    '/kedy-zacne-platit-e-faktura': '/when-does-e-invoice-start',
    '/ako-sa-pripravit-na-e-fakturu': '/how-to-prepare-for-e-invoice',
    '/e-faktura-pre-zivnostnikov': '/e-invoice-for-freelancers',
    '/e-faktura-pre-male-firmy': '/e-invoice-for-small-businesses',
    '/e-faktura-pre-uctovnikov': '/e-invoice-for-accountants',
    '/legislativa-e-faktura': '/e-invoice-legislation',
    '/peppol-slovensko': '/peppol-slovakia',
    '/pokuty-za-e-fakturu': '/e-invoice-penalties',
    '/digitalni-postari': '/digital-postmen',
    '/integracie': '/integrations',
    '/slovnik': '/glossary',
    '/porovnanie': '/comparison',
    '/otazky': '/faq',
    '/blog': '/blog',
    '/kontakt': '/contact',
    '/o-nas': '/about',
    '/sluzby': '/services',
    '/ochrana-sukromia': '/privacy-policy',
    '/obchodne-podmienky': '/terms-of-service',
  },
};

function getLocalizedPath(pathname: string, targetLocale: Locale): string {
  if (targetLocale === 'sk') return pathname;

  const map = SLUG_MAP[targetLocale] ?? {};
  return map[pathname] ?? pathname;
}

export function HreflangTags({ locale, pathname }: HreflangTagsProps) {
  const baseUrl = siteConfig.url;

  return (
    <>
      {i18nConfig.locales.map((loc) => {
        const localizedPath = getLocalizedPath(pathname, loc);
        const href = `${baseUrl}/${loc}${localizedPath}`;
        return (
          <link key={loc} rel="alternate" hrefLang={loc} href={href} />
        );
      })}
      {/* x-default points to English version (international fallback) */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${baseUrl}/${i18nConfig.xDefaultLocale}${getLocalizedPath(pathname, i18nConfig.xDefaultLocale)}`}
      />
      {/* Canonical — self-referencing for current locale */}
      <link
        rel="canonical"
        href={`${baseUrl}/${locale}${getLocalizedPath(pathname, locale)}`}
      />
    </>
  );
}
