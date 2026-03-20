/**
 * Glossary Term Detail Page (Programmatic)
 *
 * Data source: src/content/glossary/{slug}.mdx (filesystem collection)
 * Schema: DefinedTerm + Article JSON-LD
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createMetadata } from '@jakubnovak710/universal-web-core/lib/metadata';
import { ContentLayout } from '@/components/layouts/content-layout';
import { buildArticleJsonLd } from '@/components/seo';
import { getCollection, getCollectionEntry, getCollectionSlugs } from '@/lib/collections';
import { glossarySchema } from '@/content/glossary/_schema';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getCollectionSlugs('glossary');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getCollectionEntry('glossary', slug, glossarySchema);
  if (!entry) return {};

  return createMetadata({
    title: `${entry.data.term} — Slovník e-fakturácie`,
    description: entry.data.shortDefinitionSk,
    keywords: [entry.data.term, entry.data.termEn, 'e-faktúra slovník'],
  });
}

const CATEGORY_LABELS = {
  technical: 'Technický pojem',
  legal: 'Legislatívny pojem',
  business: 'Obchodný pojem',
} as const;

export default async function GlossaryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = await getCollectionEntry('glossary', slug, glossarySchema);
  if (!entry) notFound();

  const term = entry.data;

  const definedTermJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.term,
    description: term.shortDefinitionSk,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Slovník e-fakturácie',
      url: 'https://e-faktury.info/slovnik',
    },
  };

  const articleJsonLd = buildArticleJsonLd({
    headline: `${term.term} — Slovník e-fakturácie`,
    description: term.shortDefinitionSk,
    path: `/slovnik/${slug}`,
  });

  // Load related terms
  const allTerms = await getCollection('glossary', glossarySchema);
  const related = term.relatedSlugs
    .map((rs) => allTerms.find((t) => t.slug === rs))
    .filter(Boolean);

  return (
    <ContentLayout
      locale="sk"
      breadcrumbs={[{ label: 'Slovník', href: '/slovnik' }, { label: term.term }]}
      jsonLd={[definedTermJsonLd, articleJsonLd]}
    >
      <div className="not-prose mb-6 flex items-center gap-3">
        <h1 className="text-3xl font-black text-[var(--text-primary)]">{term.term}</h1>
        <span className="rounded-full border border-[var(--border-default)] px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
          {CATEGORY_LABELS[term.category]}
        </span>
      </div>

      {term.termEn !== term.term && (
        <p className="text-sm text-[var(--text-muted)]">
          Anglicky: <strong>{term.termEn}</strong>
        </p>
      )}

      {/* Definition */}
      <div className="rounded-lg border border-[var(--accent)]/20 bg-[var(--bg-surface)] p-5">
        <p className="text-lg text-[var(--text-primary)]">{term.shortDefinitionSk}</p>
      </div>

      <p className="text-sm text-[var(--text-muted)]">
        <strong>English:</strong> {term.shortDefinitionEn}
      </p>

      {/* MDX body — extended explanation */}
      {entry.content.trim() && (
        <div className="mt-6" dangerouslySetInnerHTML={{ __html: entry.content }} />
      )}

      {/* Related terms */}
      {related.length > 0 && (
        <>
          <h2 className="font-black text-[var(--text-primary)]">Súvisiace pojmy</h2>
          <ul>
            {related.map((r) => r && (
              <li key={r.slug}>
                <Link href={`/slovnik/${r.slug}`} className="text-[var(--accent)]">
                  {r.data.term}
                </Link>
                {' — '}{r.data.shortDefinitionSk.slice(0, 80)}...
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="mt-8">
        <Link href="/slovnik" className="inline-flex items-center gap-1 text-sm text-[var(--accent)] hover:underline">
          <ArrowLeft className="h-4 w-4" /> Späť na slovník
        </Link>
      </div>
    </ContentLayout>
  );
}
