/**
 * Content Layout — Reusable wrapper for all content pages
 *
 * Provides consistent structure:
 * - Max-width container with responsive padding
 * - Optional hero section (ContentPageHero)
 * - Article wrapper with prose styling
 * - JSON-LD injection
 * - Navigation + Footer (if standalone = true)
 */

import type { Locale } from '@/i18n/config';
import { ContentPageHero } from './content-page-hero';
import type { BreadcrumbItem } from '@/components/breadcrumbs';
import { ContentDisclaimer } from '@/components/content-disclaimer';

interface ContentLayoutProps {
  children: React.ReactNode;
  locale: Locale;
  breadcrumbs: BreadcrumbItem[];
  jsonLd?: Record<string, unknown>[];
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  /** Show legal disclaimer on content pages (default: true) */
  disclaimer?: boolean;
  /** Hero section props — if provided, renders ContentPageHero */
  hero?: {
    title: string;
    description?: string;
    lastUpdated?: string;
    sources?: string[];
    readingTime?: number;
    badge?: React.ReactNode;
  };
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
  hero,
  disclaimer = true,
}: ContentLayoutProps) {
  return (
    <main className={`mx-auto ${MAX_WIDTH_CLASSES[maxWidth]} px-4 pt-24 pb-16 sm:px-6 lg:px-8`}>
      {jsonLd?.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {hero ? (
        <ContentPageHero
          locale={locale}
          breadcrumbs={breadcrumbs}
          title={hero.title}
          description={hero.description}
          lastUpdated={hero.lastUpdated}
          sources={hero.sources}
          readingTime={hero.readingTime}
          badge={hero.badge}
        />
      ) : null}

      <article className="prose max-w-none">
        {disclaimer && <ContentDisclaimer variant="article" />}
        {children}
        {disclaimer && <ContentDisclaimer variant="article" />}
      </article>
    </main>
  );
}
