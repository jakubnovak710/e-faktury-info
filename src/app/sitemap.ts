/**
 * Dynamic Sitemap Generator
 *
 * Generates sitemap.xml from filesystem-based content collections.
 * Auto-discovers all content by scanning collection directories.
 *
 * NOTE: i18n (hreflang) is disabled until pages move under [locale]/.
 * Currently all pages live at root paths: /co-je-e-faktura, /integracie, etc.
 */

import type { MetadataRoute } from 'next';
import { siteConfig } from '@config/site.config';
import { getCollectionSlugs } from '@/lib/collections';

interface SitemapEntry {
  path: string;
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

async function buildEntries(): Promise<SitemapEntry[]> {
  const [erpSlugs, glossarySlugs, industrySlugs, faqSlugs, blogSlugs] = await Promise.all([
    getCollectionSlugs('erp-systems'),
    getCollectionSlugs('glossary'),
    getCollectionSlugs('industries'),
    getCollectionSlugs('faq'),
    getCollectionSlugs('blog'),
  ]);

  const entries: SitemapEntry[] = [];

  // Homepage
  entries.push({ path: '/', priority: 1.0, changeFrequency: 'weekly' });

  // Pillar pages
  const pillarPages = [
    '/co-je-e-faktura', '/kedy-zacne-platit-e-faktura', '/ako-sa-pripravit-na-e-fakturu',
    '/e-faktura-pre-zivnostnikov', '/e-faktura-pre-male-firmy', '/e-faktura-pre-uctovnikov',
    '/legislativa-e-faktura', '/peppol-slovensko', '/pokuty-za-e-fakturu', '/digitalni-postari',
  ];
  for (const path of pillarPages) {
    entries.push({ path, priority: 0.9, changeFrequency: 'weekly' });
  }

  // Hub pages
  for (const path of ['/integracie', '/blog']) {
    entries.push({ path, priority: 0.8, changeFrequency: 'daily' });
  }
  for (const path of ['/slovnik', '/odvetvia', '/otazky', '/porovnanie', '/sluzby']) {
    entries.push({ path, priority: 0.7, changeFrequency: 'monthly' });
  }
  for (const path of ['/kontakt', '/o-nas']) {
    entries.push({ path, priority: 0.5, changeFrequency: 'monthly' });
  }

  // Programmatic pages (auto-discovered from filesystem)
  for (const slug of erpSlugs) {
    entries.push({ path: `/integracie/${slug}`, priority: 0.7, changeFrequency: 'monthly' });
  }
  for (const slug of glossarySlugs) {
    entries.push({ path: `/slovnik/${slug}`, priority: 0.6, changeFrequency: 'monthly' });
  }
  for (const slug of industrySlugs) {
    entries.push({ path: `/odvetvia/${slug}`, priority: 0.5, changeFrequency: 'monthly' });
  }
  for (const slug of faqSlugs) {
    entries.push({ path: `/otazky/${slug}`, priority: 0.5, changeFrequency: 'monthly' });
  }
  for (const slug of blogSlugs) {
    entries.push({ path: `/blog/${slug}`, priority: 0.8, changeFrequency: 'weekly' });
  }

  // Legal
  for (const path of ['/ochrana-sukromia', '/obchodne-podmienky']) {
    entries.push({ path, priority: 0.3, changeFrequency: 'yearly' });
  }

  return entries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const now = new Date();
  const entries = await buildEntries();

  return entries.map((entry) => ({
    url: `${baseUrl}${entry.path === '/' ? '' : entry.path}`,
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
