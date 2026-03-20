/**
 * Article JSON-LD Schema Builder
 *
 * Generates consistent Article structured data across all content pages.
 * Reduces duplication — every page was manually constructing this.
 *
 * Usage:
 *   const schema = buildArticleJsonLd({
 *     headline: 'Čo je e-faktúra',
 *     description: '...',
 *     path: '/co-je-e-faktura',
 *   });
 */

import { siteConfig } from '@config/site.config';

interface ArticleJsonLdOptions {
  headline: string;
  description?: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
}

export function buildArticleJsonLd({
  headline,
  description,
  path,
  datePublished = '2026-03-20',
  dateModified = '2026-03-20',
}: ArticleJsonLdOptions): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    ...(description && { description }),
    datePublished,
    dateModified,
    author: {
      '@type': 'Organization',
      name: '8888 Servis s. r. o.',
    },
    publisher: {
      '@type': 'Organization',
      name: 'e-Faktúry.info',
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}${path}`,
  };
}
