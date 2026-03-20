/**
 * Industry Detail Page (Programmatic)
 *
 * Data source: src/content/industries/{slug}.mdx (filesystem collection)
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
import { ContentLayout } from '@/components/layouts/content-layout';
import { buildArticleJsonLd } from '@/components/seo';
import { SourceBox } from '@/components/source-box';
import { PartnerCTA } from '@/components/partner-cta';
import { getCollection, getCollectionEntry, getCollectionSlugs } from '@/lib/collections';
import { industrySchema } from '@/content/industries/_schema';
import { erpSchema } from '@/content/erp-systems/_schema';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getCollectionSlugs('industries');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getCollectionEntry('industries', slug, industrySchema);
  if (!entry) return {};

  return createMetadata({
    title: `E-faktúra pre ${entry.data.nameSk} — výzvy a odporúčania`,
    description: `${entry.data.descriptionSk} Typické výzvy, odporúčané softvéry a praktické rady pre prechod na e-faktúru.`,
    keywords: [
      `e-faktúra ${entry.data.nameSk.toLowerCase()}`,
      `elektronická faktúra ${entry.data.nameSk.toLowerCase()}`,
      `Peppol ${entry.data.nameSk.toLowerCase()}`,
    ],
  });
}

export default async function IndustryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = await getCollectionEntry('industries', slug, industrySchema);
  if (!entry) notFound();

  const industry = entry.data;

  // Cross-reference ERP systems from filesystem collection
  const erpEntries = await getCollection('erp-systems', erpSchema);
  const recommendedErps = industry.commonErpSlugs
    .map((erpSlug) => erpEntries.find((e) => e.slug === erpSlug))
    .filter(Boolean);

  const articleJsonLd = buildArticleJsonLd({
    headline: `E-faktúra pre ${industry.nameSk} — výzvy a odporúčania`,
    description: `${industry.descriptionSk} Typické výzvy, odporúčané softvéry a praktické rady pre prechod na e-faktúru.`,
    path: `/odvetvia/${slug}`,
  });

  return (
    <ContentLayout
      locale="sk"
      breadcrumbs={[
        { label: 'Odvetvia', href: '/odvetvia' },
        { label: industry.nameSk },
      ]}
      jsonLd={[articleJsonLd]}
    >
      {/* Header */}
      <div className="not-prose mb-8">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
          Odvetvie
        </p>
        <h1 className="mt-2 text-3xl font-black text-[var(--text-primary)] sm:text-4xl">
          E-faktúra pre {industry.nameSk}
        </h1>
      </div>

      {/* Description */}
      <p className="text-lg text-[var(--text-secondary)]">{industry.descriptionSk}</p>

      {/* Typical Challenges */}
      <h2 className="font-black text-[var(--text-primary)]">
        <AlertTriangle className="mr-2 inline h-5 w-5 text-[var(--accent)]" />
        Typické výzvy
      </h2>
      <ul>
        {industry.typicalChallengesSk.map((challenge) => (
          <li key={challenge}>{challenge}</li>
        ))}
      </ul>

      {/* Recommended Software */}
      <h2 className="font-black text-[var(--text-primary)]">
        <CheckCircle2 className="mr-2 inline h-5 w-5 text-[var(--accent)]" />
        Odporúčané softvéry
      </h2>
      <p className="text-sm text-[var(--text-secondary)]">
        Tieto fakturačné a účtovné systémy sú najčastejšie používané v odvetví {industry.nameSk.toLowerCase()}:
      </p>
      <div className="not-prose mt-4 grid gap-3 sm:grid-cols-2">
        {recommendedErps.map((erpEntry) =>
          erpEntry ? (
            <Link
              key={erpEntry.slug}
              href={`/integracie/${erpEntry.slug}`}
              className="group rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 transition-all hover:border-[var(--accent)]/30"
            >
              <p className="font-black text-[var(--text-primary)] group-hover:text-[var(--accent)]">
                {erpEntry.data.name}
              </p>
              <p className="mt-0.5 text-xs text-[var(--text-muted)]">{erpEntry.data.vendor}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[var(--accent)]">
                Zobraziť detail <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ) : null,
        )}
      </div>

      {/* Recommendations */}
      <h2 className="font-black text-[var(--text-primary)]">
        <Lightbulb className="mr-2 inline h-5 w-5 text-[var(--accent)]" />
        Naše odporúčania
      </h2>
      <div className="rounded-lg border border-[var(--accent)]/20 bg-[var(--bg-surface)] p-5">
        <p className="text-[var(--text-secondary)]">{industry.recommendationsSk}</p>
      </div>

      {/* Source Box */}
      <SourceBox
        lastUpdated="Marec 2026"
        sources={['Zákon 385/2025 Z.z.', 'Finančná správa SR']}
      />

      {/* Partner CTA */}
      <PartnerCTA partner="8888" pagePath={`/odvetvia/${slug}`} locale="sk" />

      {/* Navigation Links */}
      <div className="not-prose mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/odvetvia"
          className="inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)] transition-opacity hover:opacity-80"
        >
          <ArrowLeft className="h-4 w-4" />
          Všetky odvetvia
        </Link>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/integracie"
            className="inline-flex items-center gap-1 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
          >
            Prehľad integrácií <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/ako-sa-pripravit-na-e-fakturu"
            className="inline-flex items-center gap-1 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
          >
            Ako sa pripraviť <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </ContentLayout>
  );
}
