/**
 * FAQ Hub Page
 *
 * Lists all FAQ categories with accordion previews (first 3 items per category).
 * Includes FAQPage JSON-LD with ALL FAQ items across all categories for rich snippets.
 *
 * Target keywords: "e-faktúra otázky", "e-faktúra FAQ", "elektronická fakturácia otázky"
 * Data source: src/content/faq/*.mdx (filesystem-based collection)
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronDown, ChevronRight, HelpCircle } from 'lucide-react';
import { createMetadata } from '@jakubnovak710/universal-web-core/lib/metadata';
import { getCollection } from '@/lib/collections';
import { faqCategorySchema } from '@/content/faq/_schema';
import { ContentLayout } from '@/components/layouts/content-layout';
import { buildFaqJsonLd } from '@/components/seo';

export async function generateMetadata(): Promise<Metadata> {
  const entries = await getCollection('faq', faqCategorySchema);
  const totalItems = entries.reduce((sum, e) => sum + e.data.items.length, 0);

  return createMetadata({
    title: 'Otázky a odpovede o e-faktúre',
    description: `Najčastejšie otázky o elektronickej fakturácii na Slovensku. ${entries.length} kategórií, ${totalItems} otázok — základy, technické detaily, legislatíva aj príprava.`,
    keywords: [
      'e-faktúra otázky',
      'e-faktúra FAQ',
      'elektronická fakturácia otázky',
      'Peppol otázky',
      'e-faktúra Slovensko',
    ],
  });
}

export default async function OtazkyHubPage() {
  const entries = await getCollection('faq', faqCategorySchema);
  const totalItems = entries.reduce((sum, e) => sum + e.data.items.length, 0);

  // FAQPage JSON-LD with ALL items across all categories
  const faqJsonLd = buildFaqJsonLd(
    entries.flatMap((entry) =>
      entry.data.items.map((item) => ({
        question: item.questionSk,
        answer: item.answerSk,
      })),
    ),
  );

  return (
    <ContentLayout
      locale="sk"
      breadcrumbs={[{ label: 'Otázky' }]}
      jsonLd={[faqJsonLd]}
      maxWidth="xl"
    >
      <div className="text-center">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
          {totalItems} otázok v {entries.length} kategóriách
        </p>
        <h1 className="mt-2 text-3xl font-black text-[var(--text-primary)] sm:text-4xl">
          Otázky a odpovede o e-faktúre
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">
          Najčastejšie otázky o povinnej elektronickej fakturácii na Slovensku.
          Základy, technické detaily, legislatíva aj praktická príprava.
        </p>
      </div>

      {/* Category cards with accordion previews */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {entries.map((entry) => (
          <div
            key={entry.slug}
            className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 transition-all hover:border-[var(--accent)]/30 hover:shadow-lg hover:shadow-[var(--accent)]/5"
          >
            {/* Category header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-black text-[var(--text-primary)]">
                  {entry.data.nameSk}
                </h2>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {entry.data.descriptionSk}
                </p>
              </div>
              <span className="ml-3 inline-flex shrink-0 items-center gap-1 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                <HelpCircle className="h-3 w-3" />
                {entry.data.items.length}
              </span>
            </div>

            {/* First 3 FAQ items as accordion preview */}
            <div className="mt-4">
              {entry.data.items.slice(0, 3).map((item) => (
                <details
                  key={item.id}
                  className="group border-b border-[var(--border-default)]"
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

            {/* Link to full category */}
            {entry.data.items.length > 3 && (
              <Link
                href={`/otazky/${entry.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-sm text-[var(--accent)] transition-colors hover:underline"
              >
                Zobraziť všetkých {entry.data.items.length} otázok
                <ChevronRight className="h-4 w-4" />
              </Link>
            )}
            {entry.data.items.length <= 3 && (
              <Link
                href={`/otazky/${entry.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-sm text-[var(--accent)] transition-colors hover:underline"
              >
                Zobraziť kategóriu
                <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <p className="text-sm text-[var(--text-secondary)]">
          Nenašli ste odpoveď? Prečítajte si{' '}
          <Link
            href="/co-je-e-faktura"
            className="text-[var(--accent)] hover:underline"
          >
            kompletného sprievodcu e-faktúrou
          </Link>{' '}
          alebo zistite{' '}
          <Link
            href="/ako-sa-pripravit-na-e-fakturu"
            className="text-[var(--accent)] hover:underline"
          >
            ako sa pripraviť
          </Link>
          .
        </p>
      </div>
    </ContentLayout>
  );
}
