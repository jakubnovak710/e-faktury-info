/**
 * Glossary Hub Page
 *
 * Data source: src/content/glossary/ (filesystem collection)
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Scale, Briefcase } from 'lucide-react';
import { createMetadata } from '@jakubnovak710/universal-web-core/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { getCollection, type CollectionEntry } from '@/lib/collections';
import { glossarySchema, type GlossaryEntry } from '@/content/glossary/_schema';

export function generateMetadata(): Metadata {
  return createMetadata({
    title: 'Slovník pojmov e-fakturácie',
    description: 'Slovník pojmov elektronickej fakturácie — Peppol, UBL, EN 16931, digitálny poštár, XML a ďalšie vysvetlené jednoducho.',
    keywords: ['slovník e-faktúra', 'peppol vysvetlenie', 'e-fakturácia pojmy'],
  });
}

const CATEGORY_CONFIG = {
  technical: { label: 'Technické', icon: BookOpen, className: 'text-[var(--color-info)]' },
  legal: { label: 'Legislatívne', icon: Scale, className: 'text-[var(--color-warning)]' },
  business: { label: 'Obchodné', icon: Briefcase, className: 'text-[var(--color-success)]' },
} as const;

function groupByCategory(entries: CollectionEntry<GlossaryEntry>[]) {
  const groups: Record<string, CollectionEntry<GlossaryEntry>[]> = {};
  for (const entry of entries) {
    const cat = entry.data.category;
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(entry);
  }
  return groups;
}

export default async function SlovnikHubPage() {
  const entries = await getCollection('glossary', glossarySchema);
  entries.sort((a, b) => a.data.term.localeCompare(b.data.term, 'sk'));
  const groups = groupByCategory(entries);

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Breadcrumbs locale="sk" items={[{ label: 'Slovník' }]} />

      <div className="text-center">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
          {entries.length} pojmov
        </p>
        <h1 className="mt-2 text-3xl font-black text-[var(--text-primary)] sm:text-4xl">
          Slovník pojmov elektronickej fakturácie
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">
          Všetky dôležité pojmy súvisiace s e-faktúrou, Peppol sieťou a elektronickou fakturáciou na Slovensku.
        </p>
      </div>

      {(Object.keys(CATEGORY_CONFIG) as Array<keyof typeof CATEGORY_CONFIG>).map((category) => {
        const config = CATEGORY_CONFIG[category];
        const items = groups[category] ?? [];
        if (items.length === 0) return null;
        const CategoryIcon = config.icon;

        return (
          <div key={category} className="mt-12">
            <h2 className="flex items-center gap-2 text-xl font-black text-[var(--text-primary)]">
              <CategoryIcon className={`h-5 w-5 ${config.className}`} />
              {config.label}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {items.map(({ slug, data }) => (
                <Link
                  key={slug}
                  href={`/slovnik/${slug}`}
                  className="group rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 transition-all hover:border-[var(--accent)]/30"
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-black text-[var(--text-primary)] group-hover:text-[var(--accent)]">{data.term}</h3>
                    <span className="text-xs text-[var(--text-muted)]">{data.termEn}</span>
                  </div>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {data.shortDefinitionSk.slice(0, 100)}...
                  </p>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </main>
  );
}
