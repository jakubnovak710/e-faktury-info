/**
 * Industries Hub Page
 *
 * Cluster — Informational intent. Lists all industries with e-invoicing specifics.
 * Target keywords: "e-faktúra odvetvia", "e-faktúra stavebníctvo",
 *                  "e-faktúra IT", "elektronická faktúra podľa odvetvia"
 *
 * Data source: src/content/industries/{slug}.mdx (filesystem collection)
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { createMetadata } from '@jakubnovak710/universal-web-core/lib/metadata';
import { ContentLayout } from '@/components/layouts/content-layout';
import { getCollection } from '@/lib/collections';
import { industrySchema } from '@/content/industries/_schema';

export async function generateMetadata(): Promise<Metadata> {
  const entries = await getCollection('industries', industrySchema);

  return createMetadata({
    title: 'E-faktúra podľa odvetvia — Špecifická príprava pre vaše odvetvie',
    description: `Príprava na e-faktúru podľa odvetvia. ${entries.length} odvetví so špecifickými výzvami a odporúčaniami. Stavebníctvo, IT, maloobchod, gastro a ďalšie.`,
    keywords: ['e-faktúra odvetvia', 'e-faktúra stavebníctvo', 'e-faktúra IT', 'elektronická faktúra podľa odvetvia'],
  });
}

export default async function OdvetviaHubPage() {
  const entries = await getCollection('industries', industrySchema);

  return (
    <ContentLayout
      locale="sk"
      breadcrumbs={[{ label: 'Odvetvia' }]}
      maxWidth="xl"
    >
      <div className="not-prose text-center">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
          {entries.length} odvetví
        </p>
        <h1 className="mt-2 text-3xl font-black text-[var(--text-primary)] sm:text-4xl">
          E-faktúra podľa odvetvia
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">
          Každé odvetvie má špecifické výzvy pri prechode na elektronickú fakturáciu.
          Nájdite odporúčania presne pre vaše podnikanie.
        </p>
      </div>

      {/* Industries Grid */}
      <div className="not-prose mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <Link
            key={entry.slug}
            href={`/odvetvia/${entry.slug}`}
            className="group rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 transition-all hover:border-[var(--accent)]/30 hover:shadow-lg hover:shadow-[var(--accent)]/5"
          >
            <h2 className="text-lg font-black text-[var(--text-primary)] group-hover:text-[var(--accent)]">
              {entry.data.nameSk}
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              {entry.data.descriptionSk}
            </p>

            <div className="mt-3 flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 text-[var(--accent)]" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                {entry.data.typicalChallengesSk.length} výziev
              </span>
            </div>

            <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100">
              Zobraziť detail <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="not-prose mt-12 text-center">
        <p className="text-sm text-[var(--text-secondary)]">
          Hľadáte konkrétny softvér?{' '}
          <Link href="/integracie" className="text-[var(--accent)] hover:underline">
            Pozrite si prehľad integrácií
          </Link>{' '}
          alebo si prečítajte{' '}
          <Link href="/ako-sa-pripravit-na-e-fakturu" className="text-[var(--accent)] hover:underline">
            ako sa pripraviť na e-faktúru
          </Link>
          .
        </p>
      </div>
    </ContentLayout>
  );
}
