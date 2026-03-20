/**
 * Industry Detail Page (Programmatic)
 *
 * Generated from src/data/industries.ts for each industry.
 * Each page targets: "e-faktura {industry}", "elektronicka faktura {industry}"
 *
 * Uniqueness strategy (>40%): unique description, challenges, recommendations,
 * cross-referenced ERP systems — all different per industry.
 *
 * Schema: Article + BreadcrumbList JSON-LD
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle2, Lightbulb } from 'lucide-react';
import { createMetadata } from '@jakubnovak710/universal-web-core/lib/metadata';
import { siteConfig } from '@config/site.config';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PartnerCTA } from '@/components/partner-cta';
import { industries, type Industry } from '@/data/industries';
import { erpSystems } from '@/data/erp-systems';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};

  return createMetadata({
    title: `E-faktura pre ${industry.nameSk} — vyzvy a odporucania`,
    description: `${industry.descriptionSk} Typicke vyzvy, odporucane softvery a prakticke rady pre prechod na e-fakturu.`,
    keywords: [
      `e-faktura ${industry.nameSk.toLowerCase()}`,
      `elektronicka faktura ${industry.nameSk.toLowerCase()}`,
      `Peppol ${industry.nameSk.toLowerCase()}`,
    ],
  });
}

export default async function IndustryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  // Cross-reference ERP systems
  const recommendedErps = industry.commonErpSlugs
    .map((erpSlug) => erpSystems.find((e) => e.slug === erpSlug))
    .filter(Boolean);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `E-faktura pre ${industry.nameSk} — vyzvy a odporucania`,
    datePublished: '2026-03-20',
    dateModified: '2026-03-20',
    author: { '@type': 'Organization', name: '8888 Servis s. r. o.' },
    publisher: { '@type': 'Organization', name: 'e-Faktury.info', url: siteConfig.url },
    mainEntityOfPage: `${siteConfig.url}/odvetvia/${slug}`,
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <Breadcrumbs
        locale="sk"
        items={[
          { label: 'Odvetvia', href: '/odvetvia' },
          { label: industry.nameSk },
        ]}
      />

      <article className="prose prose-invert max-w-none">
        {/* Header */}
        <div className="not-prose mb-8">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Odvetvie
          </p>
          <h1 className="mt-2 text-3xl font-black text-[var(--text-primary)] sm:text-4xl">
            E-faktura pre {industry.nameSk}
          </h1>
        </div>

        {/* Description */}
        <p className="text-lg text-[var(--text-secondary)]">{industry.descriptionSk}</p>

        {/* Typical Challenges */}
        <h2 className="font-black text-[var(--text-primary)]">
          <AlertTriangle className="mr-2 inline h-5 w-5 text-[var(--accent)]" />
          Typicke vyzvy
        </h2>
        <ul>
          {industry.typicalChallengesSk.map((challenge) => (
            <li key={challenge}>{challenge}</li>
          ))}
        </ul>

        {/* Recommended Software */}
        <h2 className="font-black text-[var(--text-primary)]">
          <CheckCircle2 className="mr-2 inline h-5 w-5 text-emerald-400" />
          Odporucane softvery
        </h2>
        <p className="text-sm text-[var(--text-secondary)]">
          Tieto fakturacne a uctovne systemy su najcastejsie pouzivane v odvetvi {industry.nameSk.toLowerCase()}:
        </p>
        <div className="not-prose mt-4 grid gap-3 sm:grid-cols-2">
          {recommendedErps.map((erp) =>
            erp ? (
              <Link
                key={erp.slug}
                href={`/integracie/${erp.slug}`}
                className="group rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 transition-all hover:border-[var(--accent)]/30"
              >
                <p className="font-black text-[var(--text-primary)] group-hover:text-[var(--accent)]">
                  {erp.name}
                </p>
                <p className="mt-0.5 text-xs text-[var(--text-muted)]">{erp.vendor}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[var(--accent)]">
                  Zobrazit detail <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ) : null,
          )}
        </div>

        {/* Recommendations */}
        <h2 className="font-black text-[var(--text-primary)]">
          <Lightbulb className="mr-2 inline h-5 w-5 text-[var(--accent)]" />
          Nase odporucania
        </h2>
        <div className="rounded-lg border border-[var(--accent)]/20 bg-[var(--bg-surface)] p-5">
          <p className="text-[var(--text-secondary)]">{industry.recommendationsSk}</p>
        </div>

        {/* Partner CTA */}
        <PartnerCTA partner="8888" pagePath={`/odvetvia/${slug}`} locale="sk" />

        {/* Navigation Links */}
        <div className="not-prose mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/odvetvia"
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)] transition-opacity hover:opacity-80"
          >
            <ArrowLeft className="h-4 w-4" />
            Vsetky odvetvia
          </Link>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/integracie"
              className="inline-flex items-center gap-1 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
            >
              Prehlad integracii <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/ako-sa-pripravit-na-e-fakturu"
              className="inline-flex items-center gap-1 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
            >
              Ako sa pripravit <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
