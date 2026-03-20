/**
 * ERP Integrations Hub Page
 *
 * Cluster 8 — Commercial intent.
 * Data source: src/content/erp-systems/ (filesystem-based collection)
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Clock, Calendar, HelpCircle } from 'lucide-react';
import { createMetadata } from '@jakubnovak710/universal-web-core/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ContentDisclaimer } from '@/components/content-disclaimer';
import { getCollection } from '@/lib/collections';
import { erpSchema } from '@/content/erp-systems/_schema';

export function generateMetadata(): Metadata {
  return createMetadata({
    title: 'Integrácie — Prehľad softvérov pripravených na e-faktúru',
    description:
      'Prehľad účtovných a fakturačných softvérov na Slovensku a ich pripravenosť na Peppol e-fakturáciu. Pohoda, Omega, SuperFaktúra, iDoklad a ďalšie.',
    keywords: ['fakturačný softvér slovensko', 'e-faktúra softvér', 'Peppol integrácia', 'porovnanie fakturačných softvérov'],
  });
}

const STATUS_CONFIG = {
  ready: { label: 'Peppol Ready', icon: CheckCircle2, style: { color: 'var(--color-success)', backgroundColor: 'var(--color-success-muted)', borderColor: 'var(--color-success-border)' } },
  'in-progress': { label: 'Pripravuje sa', icon: Clock, style: { color: 'var(--color-warning)', backgroundColor: 'var(--color-warning-muted)', borderColor: 'var(--color-warning-border)' } },
  planned: { label: 'Plánované', icon: Calendar, style: { color: 'var(--color-info)', backgroundColor: 'var(--color-info-muted)', borderColor: 'var(--color-info-border)' } },
  unknown: { label: 'Neznámy stav', icon: HelpCircle, style: { color: 'var(--text-muted)', backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-default)' } },
} as const;

export default async function IntegracieHubPage() {
  const entries = await getCollection('erp-systems', erpSchema);
  const readyCount = entries.filter((e) => e.data.peppolStatus === 'ready').length;
  const inProgressCount = entries.filter((e) => e.data.peppolStatus === 'in-progress').length;

  return (
    <main className="mx-auto max-w-5xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
      <Breadcrumbs locale="sk" items={[{ label: 'Integrácie' }]} />

      <div className="text-center">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
          {entries.length} softvérov
        </p>
        <h1 className="mt-2 text-3xl font-black text-[var(--text-primary)] sm:text-4xl">
          Je váš softvér pripravený na e-faktúru?
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">
          Prehľad účtovných a fakturačných softvérov na Slovensku a ich
          pripravenosť na povinnú e-fakturáciu cez Peppol od 1.1.2027.
        </p>

        <div className="mt-8 flex justify-center gap-6">
          <div className="text-center">
            <p className="text-2xl font-black" style={{ color: 'var(--color-success)' }}>{readyCount}</p>
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Peppol Ready</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-[var(--color-warning)]">{inProgressCount}</p>
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Pripravuje sa</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-[var(--text-primary)]">{entries.length}</p>
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Celkom</p>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map(({ slug, data: erp }) => {
          const status = STATUS_CONFIG[erp.peppolStatus];
          const StatusIcon = status.icon;

          return (
            <Link
              key={slug}
              href={`/integracie/${slug}`}
              className="group rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 transition-all hover:border-[var(--accent)]/30 hover:shadow-lg hover:shadow-[var(--accent)]/5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-black text-[var(--text-primary)] group-hover:text-[var(--accent)]">{erp.name}</h2>
                  <p className="text-xs text-[var(--text-muted)]">{erp.vendor}</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider" style={status.style}>
                  <StatusIcon className="h-3 w-3" />
                  {status.label}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                {erp.descriptionSk.slice(0, 120)}...
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {erp.apiSupport && <span className="rounded bg-[var(--bg-elevated)] px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">API</span>}
                {erp.ublSupport && <span className="rounded bg-[var(--bg-elevated)] px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">UBL</span>}
                {erp.isdocSupport && <span className="rounded bg-[var(--bg-elevated)] px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">ISDOC</span>}
              </div>
              {erp.pricingFrom && <p className="mt-2 text-xs text-[var(--text-muted)]">{erp.pricingFrom}</p>}
            </Link>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-[var(--text-secondary)]">
          Neviete sa rozhodnúť? Prečítajte si{' '}
          <Link href="/ako-sa-pripravit-na-e-fakturu" className="text-[var(--accent)] hover:underline">ako vybrať správny softvér</Link>.
        </p>
      </div>

      <div className="mt-8">
        <ContentDisclaimer variant="article" />
      </div>
    </main>
  );
}
