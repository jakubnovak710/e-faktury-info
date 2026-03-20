/**
 * Industries Hub Page
 *
 * Cluster — Informational intent. Lists all industries with e-invoicing specifics.
 * Target keywords: "e-faktura odvetvia", "e-faktura stavebnictvo",
 *                  "e-faktura IT", "elektronicka faktura podla odvetvia"
 *
 * Data source: src/data/industries.ts (programmatic — all pages generated from data)
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { createMetadata } from '@jakubnovak710/universal-web-core/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { industries } from '@/data/industries';

export function generateMetadata(): Metadata {
  return createMetadata({
    title: 'E-faktúra podľa odvetvia — Špecifická príprava pre vaše odvetvie',
    description: `Príprava na e-faktúru podľa odvetvia. ${industries.length} odvetví so špecifickými výzvami a odporúčaniami. Stavebníctvo, IT, maloobchod, gastro a ďalšie.`,
    keywords: ['e-faktúra odvetvia', 'e-faktúra stavebníctvo', 'e-faktúra IT', 'elektronická faktúra podľa odvetvia'],
  });
}

export default function OdvetviaHubPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <Breadcrumbs locale="sk" items={[{ label: 'Odvetvia' }]} />

      <div className="text-center">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
          {industries.length} odvetví
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
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => (
          <Link
            key={industry.slug}
            href={`/odvetvia/${industry.slug}`}
            className="group rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 transition-all hover:border-[var(--accent)]/30 hover:shadow-lg hover:shadow-[var(--accent)]/5"
          >
            <h2 className="text-lg font-black text-[var(--text-primary)] group-hover:text-[var(--accent)]">
              {industry.nameSk}
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              {industry.descriptionSk}
            </p>

            <div className="mt-3 flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 text-[var(--accent)]" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                {industry.typicalChallengesSk.length} výziev
              </span>
            </div>

            <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100">
              Zobraziť detail <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <p className="text-sm text-[var(--text-secondary)]">
          Hladate konkretny softver?{' '}
          <Link href="/integracie" className="text-[var(--accent)] hover:underline">
            Pozrite si prehlad integracii
          </Link>{' '}
          alebo si precitajte{' '}
          <Link href="/ako-sa-pripravit-na-e-fakturu" className="text-[var(--accent)] hover:underline">
            ako sa pripravit na e-fakturu
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
