/**
 * Content Page Hero — Visual header for pillar/audience/detail pages
 *
 * Provides:
 * - Gradient background with subtle Glass UI feel
 * - Breadcrumbs integrated
 * - H1 with font-black
 * - Description text
 * - Optional meta info (date, reading time, tags)
 * - Optional badge (e.g. Peppol readiness status)
 *
 * Marketing Psychology:
 * - Visual Hierarchy (Selective Attention) — clear page identity
 * - Authority signals (E-E-A-T) — source date, author info
 * - Framing Effect — sets context before content
 *
 * Usage:
 *   <ContentPageHero
 *     locale="sk"
 *     breadcrumbs={[{ label: 'Sprievodca' }, { label: 'Čo je e-faktúra' }]}
 *     title="Čo je e-faktúra"
 *     description="Kompletný sprievodca..."
 *     lastUpdated="Marec 2026"
 *     sources={['Zákon 385/2025 Z.z.']}
 *   />
 */

import { Calendar, Clock } from 'lucide-react';
import { Breadcrumbs, type BreadcrumbItem } from '@/components/breadcrumbs';
import type { Locale } from '@/i18n/config';

interface ContentPageHeroProps {
  locale: Locale;
  breadcrumbs: BreadcrumbItem[];
  title: string;
  description?: string;
  lastUpdated?: string;
  sources?: string[];
  readingTime?: number;
  badge?: React.ReactNode;
}

export function ContentPageHero({
  locale,
  breadcrumbs,
  title,
  description,
  lastUpdated,
  sources,
  readingTime,
  badge,
}: ContentPageHeroProps) {
  return (
    <div className="relative mb-10 overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)]">
      {/* Subtle gradient glow */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: 'var(--accent-glow, rgba(37, 99, 235, 0.3))' }}
      />

      <div className="relative px-6 pb-8 pt-6 sm:px-8">
        <Breadcrumbs locale={locale} items={breadcrumbs} />

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-black leading-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
              {title}
            </h1>

            {description && (
              <p className="mt-4 max-w-2xl text-lg text-[var(--text-secondary)]">
                {description}
              </p>
            )}
          </div>

          {badge && <div className="shrink-0">{badge}</div>}
        </div>

        {/* Meta info bar */}
        {(lastUpdated || readingTime || sources) && (
          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-[var(--border-default)] pt-4 text-xs text-[var(--text-muted)]">
            {lastUpdated && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {lastUpdated}
              </span>
            )}
            {readingTime && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {readingTime} min {locale === 'sk' ? 'čítania' : 'read'}
              </span>
            )}
            {sources && sources.length > 0 && (
              <span>
                <strong>Zdroj:</strong> {sources.join(', ')}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
