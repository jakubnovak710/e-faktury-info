/**
 * Glossary Hub Page — Slovník pojmov e-fakturácie
 *
 * Cluster: Informational. Lists all glossary terms grouped by category.
 * Target keywords: "slovník e-fakturácia", "pojmy e-faktúra", "čo je Peppol"
 *
 * Data source: src/data/glossary.ts (programmatic — all pages generated from data)
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Scale, Briefcase, Cpu } from 'lucide-react';
import { createMetadata } from '@jakubnovak710/universal-web-core/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { glossaryTerms, type GlossaryTerm } from '@/data/glossary';

export function generateMetadata(): Metadata {
  return createMetadata({
    title: 'Slovník pojmov e-fakturácie',
    description: `Kompletný slovník ${glossaryTerms.length} pojmov elektronickej fakturácie. Peppol, UBL, EN 16931, ViDA, IS EFA a ďalšie — jednoducho vysvetlené.`,
    keywords: ['slovník e-fakturácia', 'pojmy e-faktúra', 'čo je Peppol', 'čo je UBL', 'e-fakturácia vysvetlenie'],
  });
}

const CATEGORY_CONFIG = {
  technical: {
    label: 'Technické',
    icon: Cpu,
    description: 'Štandardy, formáty a technológie',
  },
  legal: {
    label: 'Legislatívne',
    icon: Scale,
    description: 'Zákony, smernice a predpisy',
  },
  business: {
    label: 'Obchodné',
    icon: Briefcase,
    description: 'Obchodné pojmy a transakcie',
  },
} as const;

type Category = GlossaryTerm['category'];

export default function SlovnikHubPage() {
  const grouped = glossaryTerms.reduce<Record<Category, GlossaryTerm[]>>(
    (acc, term) => {
      acc[term.category].push(term);
      return acc;
    },
    { technical: [], legal: [], business: [] },
  );

  const categoryOrder: Category[] = ['technical', 'legal', 'business'];

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <Breadcrumbs locale="sk" items={[{ label: 'Slovník' }]} />

      <div className="text-center">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
          {glossaryTerms.length} pojmov
        </p>
        <h1 className="mt-2 text-3xl font-black text-[var(--text-primary)] sm:text-4xl">
          Slovník pojmov elektronickej fakturácie
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">
          Neviete, čo znamená Peppol, UBL alebo EN 16931? Tu nájdete zrozumiteľné
          vysvetlenie všetkých dôležitých pojmov súvisiacich s e-fakturáciou na
          Slovensku.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-8 flex justify-center gap-6">
        {categoryOrder.map((cat) => {
          const config = CATEGORY_CONFIG[cat];
          const CatIcon = config.icon;
          return (
            <div key={cat} className="text-center">
              <CatIcon className="mx-auto h-5 w-5 text-[var(--accent)]" />
              <p className="mt-1 text-2xl font-black text-[var(--text-primary)]">
                {grouped[cat].length}
              </p>
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                {config.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Grouped terms */}
      <div className="mt-12 space-y-12">
        {categoryOrder.map((cat) => {
          const config = CATEGORY_CONFIG[cat];
          const CatIcon = config.icon;
          const terms = grouped[cat];

          return (
            <section key={cat}>
              <div className="mb-4 flex items-center gap-2">
                <CatIcon className="h-5 w-5 text-[var(--accent)]" />
                <h2 className="text-xl font-black text-[var(--text-primary)]">
                  {config.label}
                </h2>
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  — {config.description}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {terms.map((term) => (
                  <Link
                    key={term.slug}
                    href={`/slovnik/${term.slug}`}
                    className="group rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 transition-all hover:border-[var(--accent)]/30 hover:shadow-lg hover:shadow-[var(--accent)]/5"
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-black text-[var(--text-primary)] group-hover:text-[var(--accent)]">
                        {term.term}
                      </h3>
                      <BookOpen className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent)]" />
                    </div>
                    <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                      {term.termEn}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {term.shortDefinitionSk}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <p className="text-sm text-[var(--text-secondary)]">
          Chýba vám nejaký pojem?{' '}
          <Link href="/co-je-e-faktura" className="text-[var(--accent)] hover:underline">
            Prečítajte si kompletného sprievodcu e-faktúrou
          </Link>{' '}
          alebo sa pozrite na{' '}
          <Link href="/casova-os" className="text-[var(--accent)] hover:underline">
            časovú os zavedenia
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
