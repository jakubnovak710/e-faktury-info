/**
 * FAQ Category Page (Programmatic)
 *
 * Generated from src/content/faq/*.mdx for each FAQ category.
 * Shows all FAQ items in the category as accordions.
 *
 * Target keywords: "{category} e-faktúra", "otázky {category}"
 * Schema: FAQPage JSON-LD for this category's items
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, ChevronRight } from 'lucide-react';
import { createMetadata } from '@jakubnovak710/universal-web-core/lib/metadata';
import { getCollection, getCollectionEntry, getCollectionSlugs } from '@/lib/collections';
import { faqCategorySchema } from '@/content/faq/_schema';
import { ContentLayout } from '@/components/layouts/content-layout';
import { buildFaqJsonLd } from '@/components/seo';

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const slugs = await getCollectionSlugs('faq');
  return slugs.map((slug) => ({ category: slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  const entry = await getCollectionEntry('faq', category, faqCategorySchema);
  if (!entry) return {};

  return createMetadata({
    title: `${entry.data.nameSk} — Otázky o e-faktúre`,
    description: `${entry.data.descriptionSk} ${entry.data.items.length} otázok a odpovedí o elektronickej fakturácii na Slovensku.`,
    keywords: [
      `${entry.data.nameSk.toLowerCase()} e-faktúra`,
      'e-faktúra FAQ',
      'elektronická fakturácia otázky',
    ],
  });
}

export default async function FaqCategoryPage({ params }: PageProps) {
  const { category } = await params;
  const entry = await getCollectionEntry('faq', category, faqCategorySchema);
  if (!entry) notFound();

  const allEntries = await getCollection('faq', faqCategorySchema);
  const otherEntries = allEntries.filter((e) => e.slug !== category);

  // FAQPage JSON-LD for this category
  const faqJsonLd = buildFaqJsonLd(
    entry.data.items.map((item) => ({
      question: item.questionSk,
      answer: item.answerSk,
    })),
  );

  return (
    <ContentLayout
      locale="sk"
      breadcrumbs={[
        { label: 'Otázky', href: '/otazky' },
        { label: entry.data.nameSk },
      ]}
      jsonLd={[faqJsonLd]}
    >
      {/* Header */}
      <div className="mb-8">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
          {entry.data.items.length} otázok
        </p>
        <h1 className="mt-2 text-3xl font-black text-[var(--text-primary)] sm:text-4xl">
          {entry.data.nameSk}
        </h1>
        <p className="mt-4 text-[var(--text-secondary)]">
          {entry.data.descriptionSk}
        </p>
      </div>

      {/* All FAQ items as accordions */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-6">
        {entry.data.items.map((item) => (
          <details
            key={item.id}
            className="group border-b border-[var(--border-default)] last:border-b-0"
          >
            <summary className="flex cursor-pointer items-center justify-between py-4 text-left text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]">
              <span className="pr-4 font-bold">{item.questionSk}</span>
              <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <p className="pb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
              {item.answerSk}
            </p>
          </details>
        ))}
      </div>

      {/* Back to hub */}
      <div className="mt-8">
        <Link
          href="/otazky"
          className="inline-flex items-center gap-1 text-sm text-[var(--accent)] transition-colors hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Späť na všetky otázky
        </Link>
      </div>

      {/* Other categories */}
      <div className="mt-12">
        <h2 className="text-xl font-black text-[var(--text-primary)]">
          Ďalšie kategórie
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {otherEntries.map((other) => (
            <Link
              key={other.slug}
              href={`/otazky/${other.slug}`}
              className="group flex items-center justify-between rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 transition-all hover:border-[var(--accent)]/30 hover:shadow-lg hover:shadow-[var(--accent)]/5"
            >
              <div>
                <p className="font-black text-[var(--text-primary)] group-hover:text-[var(--accent)]">
                  {other.data.nameSk}
                </p>
                <p className="mt-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                  {other.data.items.length} otázok
                </p>
              </div>
              <ChevronRight className="h-5 w-5 shrink-0 text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent)]" />
            </Link>
          ))}
        </div>
      </div>

      {/* Preparation CTA */}
      <div className="mt-12 rounded-lg border border-[var(--accent)]/20 bg-[var(--bg-surface)] p-6 text-center">
        <p className="font-black text-[var(--text-primary)]">
          Potrebujete pomoc s prípravou?
        </p>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Prečítajte si{' '}
          <Link
            href="/ako-sa-pripravit-na-e-fakturu"
            className="text-[var(--accent)] hover:underline"
          >
            kompletný sprievodca prípravou na e-faktúru
          </Link>
        </p>
      </div>
    </ContentLayout>
  );
}
