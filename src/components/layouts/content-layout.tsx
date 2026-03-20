/**
 * Content Layout — Reusable wrapper for all content pages
 *
 * Provides consistent structure:
 * - Max-width container with responsive padding
 * - Breadcrumbs navigation
 * - Article wrapper with prose styling
 * - Optional JSON-LD injection
 *
 * Usage:
 *   <ContentLayout
 *     locale="sk"
 *     breadcrumbs={[{ label: 'Sprievodca', href: '/co-je-e-faktura' }, { label: 'Čo je e-faktúra' }]}
 *     jsonLd={[articleJsonLd, faqJsonLd]}
 *   >
 *     <h1>...</h1>
 *     <p>...</p>
 *   </ContentLayout>
 */

import { Breadcrumbs, type BreadcrumbItem } from '@/components/breadcrumbs';
import type { Locale } from '@/i18n/config';

interface ContentLayoutProps {
  children: React.ReactNode;
  locale: Locale;
  breadcrumbs: BreadcrumbItem[];
  jsonLd?: Record<string, unknown>[];
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

const MAX_WIDTH_CLASSES = {
  sm: 'max-w-2xl',
  md: 'max-w-3xl',
  lg: 'max-w-4xl',
  xl: 'max-w-5xl',
} as const;

export function ContentLayout({
  children,
  locale,
  breadcrumbs,
  jsonLd,
  maxWidth = 'md',
}: ContentLayoutProps) {
  return (
    <main className={`mx-auto ${MAX_WIDTH_CLASSES[maxWidth]} px-4 py-16 sm:px-6 lg:px-8`}>
      {jsonLd?.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Breadcrumbs locale={locale} items={breadcrumbs} />

      <article className="prose prose-invert max-w-none">
        {children}
      </article>
    </main>
  );
}
