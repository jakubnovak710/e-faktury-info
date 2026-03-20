/**
 * Dynamic Sitemap Generator
 *
 * Generates sitemap.xml from:
 * 1. Core static pages (navigation config)
 * 2. Programmatic pages (ERP integrations, glossary, industries, FAQ)
 * 3. Locale prefixes (/sk/... and /en/...)
 * 4. Hreflang annotations (xmlns:xhtml) for each locale pair
 *
 * Priority tiers:
 * - 1.0: Homepage
 * - 0.9: Pillar pages (core content)
 * - 0.8: Blog
 * - 0.7: Programmatic pages (integrations, glossary)
 * - 0.5: Industry pages, FAQ
 * - 0.3: Legal pages
 *
 * Per SEO plan section 7.2
 */

import type { MetadataRoute } from 'next';
import { siteConfig } from '@config/site.config';
import { i18nConfig } from '@/i18n/config';
import { erpSystems } from '@/data/erp-systems';
import { glossaryTerms } from '@/data/glossary';
import { industries } from '@/data/industries';
import { faqCategories } from '@/data/faq';

const LEGAL_PATHS = new Set(['/ochrana-sukromia', '/obchodne-podmienky']);

const PILLAR_PATHS = new Set([
  '/co-je-e-faktura',
  '/kedy-zacne-platit-e-faktura',
  '/ako-sa-pripravit-na-e-fakturu',
  '/e-faktura-pre-zivnostnikov',
  '/e-faktura-pre-male-firmy',
  '/e-faktura-pre-uctovnikov',
  '/legislativa-e-faktura',
  '/peppol-slovensko',
  '/pokuty-za-e-fakturu',
  '/digitalni-postari',
]);

interface SitemapEntry {
  path: string;
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

function buildEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];

  // Homepage
  entries.push({ path: '/', priority: 1.0, changeFrequency: 'weekly' });

  // Pillar pages
  for (const path of PILLAR_PATHS) {
    entries.push({ path, priority: 0.9, changeFrequency: 'weekly' });
  }

  // Hub pages
  entries.push({ path: '/integracie', priority: 0.8, changeFrequency: 'weekly' });
  entries.push({ path: '/slovnik', priority: 0.7, changeFrequency: 'monthly' });
  entries.push({ path: '/odvetvia', priority: 0.7, changeFrequency: 'monthly' });
  entries.push({ path: '/otazky', priority: 0.7, changeFrequency: 'monthly' });
  entries.push({ path: '/porovnanie', priority: 0.7, changeFrequency: 'monthly' });
  entries.push({ path: '/blog', priority: 0.8, changeFrequency: 'daily' });

  // Service + about pages
  entries.push({ path: '/sluzby', priority: 0.7, changeFrequency: 'monthly' });
  entries.push({ path: '/kontakt', priority: 0.5, changeFrequency: 'monthly' });
  entries.push({ path: '/o-nas', priority: 0.5, changeFrequency: 'monthly' });

  // ERP integration pages (programmatic)
  for (const erp of erpSystems) {
    entries.push({ path: `/integracie/${erp.slug}`, priority: 0.7, changeFrequency: 'monthly' });
  }

  // Glossary pages (programmatic)
  for (const term of glossaryTerms) {
    entries.push({ path: `/slovnik/${term.slug}`, priority: 0.6, changeFrequency: 'monthly' });
  }

  // Industry pages (programmatic)
  for (const industry of industries) {
    entries.push({ path: `/odvetvia/${industry.slug}`, priority: 0.5, changeFrequency: 'monthly' });
  }

  // FAQ category pages
  for (const category of faqCategories) {
    entries.push({ path: `/otazky/${category.slug}`, priority: 0.5, changeFrequency: 'monthly' });
  }

  // Legal pages
  for (const path of LEGAL_PATHS) {
    entries.push({ path, priority: 0.3, changeFrequency: 'yearly' });
  }

  return entries;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date();
  const entries = buildEntries();

  // Generate entries for each locale
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const entry of entries) {
    for (const locale of i18nConfig.locales) {
      // Build alternates for hreflang
      const alternates: Record<string, string> = {};
      for (const altLocale of i18nConfig.locales) {
        alternates[altLocale] = `${baseUrl}/${altLocale}${entry.path === '/' ? '' : entry.path}`;
      }

      sitemapEntries.push({
        url: `${baseUrl}/${locale}${entry.path === '/' ? '' : entry.path}`,
        lastModified: now,
        changeFrequency: entry.changeFrequency,
        priority: entry.priority,
        alternates: {
          languages: alternates,
        },
      });
    }
  }

  return sitemapEntries;
}
