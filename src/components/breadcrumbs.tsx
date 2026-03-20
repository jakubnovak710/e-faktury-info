/**
 * Breadcrumbs Component with BreadcrumbList JSON-LD
 *
 * Renders visual breadcrumb navigation + structured data for Google rich snippets.
 * Automatically generates BreadcrumbList schema markup.
 *
 * Usage:
 *   <Breadcrumbs
 *     locale="sk"
 *     items={[
 *       { label: 'Sprievodca', href: '/co-je-e-faktura' },
 *       { label: 'Čo je e-faktúra' },
 *     ]}
 *   />
 *
 * Rules (per SEO plan):
 * - All pages must have BreadcrumbList JSON-LD
 * - Pattern: Domov > Sekcia > Stránka
 */

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { siteConfig } from '@config/site.config';
import type { Locale } from '@/i18n/config';

export interface BreadcrumbItem {
  /** Display label */
  label: string;
  /** Link href (omit for current page — last item) */
  href?: string;
}

interface BreadcrumbsProps {
  locale: Locale;
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ locale, items }: BreadcrumbsProps) {
  const homeLabel = locale === 'sk' ? 'Domov' : 'Home';
  const baseUrl = siteConfig.url;

  // Build full items list with Home
  const allItems: BreadcrumbItem[] = [
    { label: homeLabel, href: `/${locale}` },
    ...items,
  ];

  // JSON-LD BreadcrumbList schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${baseUrl}${item.href}` } : {}),
    })),
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Visual breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center gap-1 text-sm text-[var(--text-muted)]"
      >
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const isHome = index === 0;

          return (
            <span key={index} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight className="h-3 w-3 shrink-0" />
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 transition-colors hover:text-[var(--text-primary)]"
                >
                  {isHome && <Home className="h-3.5 w-3.5" />}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span className="text-[var(--text-secondary)]">
                  {item.label}
                </span>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
