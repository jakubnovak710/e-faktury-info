/**
 * Glossary Term Detail Page (Programmatic)
 *
 * Generated from src/data/glossary.ts for each term.
 * Each page targets: "{term} vysvetlenie", "čo je {term}"
 *
 * Schema: DefinedTerm + Article + BreadcrumbList JSON-LD
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Tag, BookOpen } from 'lucide-react';
import { createMetadata } from '@jakubnovak710/universal-web-core/lib/metadata';
import { siteConfig } from '@config/site.config';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { glossaryTerms, type GlossaryTerm } from '@/data/glossary';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getTerm(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((t) => t.slug === slug);
}

export function generateStaticParams() {
  return glossaryTerms.map((term) => ({ slug: term.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const term = getTerm(slug);
  if (!term) return {};

  return createMetadata({
    title: `${term.term} — Slovník e-fakturácie`,
    description: term.shortDefinitionSk,
    keywords: [`${term.term} vysvetlenie`, `čo je ${term.term}`, `${term.termEn}`, 'slovník e-fakturácia'],
  });
}

const CATEGORY_LABEL = {
  technical: 'Technický pojem',
  legal: 'Legislatívny pojem',
  business: 'Obchodný pojem',
} as const;

export default async function SlovnikDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const term = getTerm(slug);
  if (!term) notFound();

  const relatedTerms = term.relatedSlugs
    .map((rs) => glossaryTerms.find((t) => t.slug === rs))
    .filter((t): t is GlossaryTerm => t !== undefined);

  const definedTermJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.term,
    description: term.shortDefinitionSk,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Slovník e-fakturácie',
    },
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${term.term} — Slovník e-fakturácie`,
    datePublished: '2026-03-20',
    dateModified: '2026-03-20',
    author: { '@type': 'Organization', name: '8888 Servis s. r. o.' },
    publisher: { '@type': 'Organization', name: 'e-Faktúry.info', url: siteConfig.url },
    mainEntityOfPage: `${siteConfig.url}/slovnik/${slug}`,
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <Breadcrumbs
        locale="sk"
        items={[
          { label: 'Slovník', href: '/slovnik' },
          { label: term.term },
        ]}
      />

      <article className="prose prose-invert max-w-none">
        {/* Header */}
        <div className="not-prose mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-black text-[var(--text-primary)] sm:text-4xl">
                {term.term}
              </h1>
              <p className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
                {term.termEn}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
              <Tag className="h-3 w-3" />
              {CATEGORY_LABEL[term.category]}
            </span>
          </div>
        </div>

        {/* Definition */}
        <div className="not-prose rounded-lg border border-[var(--accent)]/20 bg-[var(--bg-surface)] p-6">
          <p className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
            Definícia
          </p>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
            {term.shortDefinitionSk}
          </p>
        </div>

        {/* English definition */}
        <div className="not-prose mt-4 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-4">
          <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
            English
          </p>
          <p className="text-sm leading-relaxed text-[var(--text-muted)]">
            {term.shortDefinitionEn}
          </p>
        </div>

        {/* Placeholder for full content */}
        <div className="not-prose mt-8 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 text-center">
          <BookOpen className="mx-auto h-8 w-8 text-[var(--text-muted)]" />
          <p className="mt-2 font-black text-[var(--text-primary)]">
            Podrobný popis pripravujeme
          </p>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Kompletné vysvetlenie pojmu {term.term} s príkladmi z praxe bude
            čoskoro k dispozícii.
          </p>
        </div>

        {/* Related terms */}
        {relatedTerms.length > 0 && (
          <div className="not-prose mt-10">
            <h2 className="mb-4 text-xl font-black text-[var(--text-primary)]">
              Súvisiace pojmy
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedTerms.map((rt) => (
                <Link
                  key={rt.slug}
                  href={`/slovnik/${rt.slug}`}
                  className="group flex items-start gap-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 transition-all hover:border-[var(--accent)]/30 hover:shadow-lg hover:shadow-[var(--accent)]/5"
                >
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                  <div>
                    <p className="font-black text-[var(--text-primary)] group-hover:text-[var(--accent)]">
                      {rt.term}
                    </p>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                      {rt.shortDefinitionSk.slice(0, 100)}...
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="not-prose mt-10">
          <Link
            href="/slovnik"
            className="inline-flex items-center gap-2 text-[var(--accent)] transition-colors hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Späť na slovník pojmov
          </Link>
        </div>
      </article>
    </main>
  );
}
