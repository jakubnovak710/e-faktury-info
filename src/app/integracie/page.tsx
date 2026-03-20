/**
 * ERP Integrations Hub Page
 *
 * Cluster 8 — Commercial intent. Lists all ERP/invoicing systems with Peppol readiness status.
 * Target keywords: "fakturačný softvér slovensko", "porovnanie fakturačných softvérov",
 *                  "e-faktúra softvér", "ERP systém e-faktúra"
 *
 * Data source: src/data/erp-systems.ts (programmatic — all pages generated from data)
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Clock, Calendar, HelpCircle } from 'lucide-react';
import { createMetadata } from '@jakubnovak710/universal-web-core/lib/metadata';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { erpSystems } from '@/data/erp-systems';

export function generateMetadata(): Metadata {
  return createMetadata({
    title: 'Integrácie — Prehľad softvérov pripravených na e-faktúru',
    description: `Prehľad ${erpSystems.length} účtovných a fakturačných softvérov na Slovensku a ich pripravenosť na Peppol e-fakturáciu. Pohoda, Omega, SuperFaktúra, iDoklad a ďalšie.`,
    keywords: ['fakturačný softvér slovensko', 'e-faktúra softvér', 'Peppol integrácia', 'porovnanie fakturačných softvérov'],
  });
}

const STATUS_CONFIG = {
  ready: { label: 'Peppol Ready', icon: CheckCircle2, className: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  'in-progress': { label: 'Pripravuje sa', icon: Clock, className: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  planned: { label: 'Plánované', icon: Calendar, className: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  unknown: { label: 'Neznámy stav', icon: HelpCircle, className: 'text-gray-400 bg-gray-500/10 border-gray-500/20' },
} as const;

export default function IntegracieHubPage() {
  const readyCount = erpSystems.filter((e) => e.peppolStatus === 'ready').length;
  const inProgressCount = erpSystems.filter((e) => e.peppolStatus === 'in-progress').length;

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <Breadcrumbs locale="sk" items={[{ label: 'Integrácie' }]} />

      <div className="text-center">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
          {erpSystems.length} softvérov
        </p>
        <h1 className="mt-2 text-3xl font-black text-[var(--text-primary)] sm:text-4xl">
          Je váš softvér pripravený na e-faktúru?
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">
          Prehľad účtovných a fakturačných softvérov na Slovensku a ich
          pripravenosť na povinnú e-fakturáciu cez Peppol od 1.1.2027.
        </p>

        {/* Stats */}
        <div className="mt-8 flex justify-center gap-6">
          <div className="text-center">
            <p className="text-2xl font-black text-emerald-400">{readyCount}</p>
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
              Peppol Ready
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-amber-400">{inProgressCount}</p>
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
              Pripravuje sa
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-[var(--text-primary)]">{erpSystems.length}</p>
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
              Celkom
            </p>
          </div>
        </div>
      </div>

      {/* ERP Grid */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {erpSystems.map((erp) => {
          const status = STATUS_CONFIG[erp.peppolStatus];
          const StatusIcon = status.icon;

          return (
            <Link
              key={erp.slug}
              href={`/integracie/${erp.slug}`}
              className="group rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 transition-all hover:border-[var(--accent)]/30 hover:shadow-lg hover:shadow-[var(--accent)]/5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-black text-[var(--text-primary)] group-hover:text-[var(--accent)]">
                    {erp.name}
                  </h2>
                  <p className="text-xs text-[var(--text-muted)]">{erp.vendor}</p>
                </div>
                <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${status.className}`}>
                  <StatusIcon className="h-3 w-3" />
                  {status.label}
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                {erp.descriptionSk.slice(0, 120)}...
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {erp.apiSupport && (
                  <span className="rounded bg-[var(--bg-elevated)] px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">API</span>
                )}
                {erp.ublSupport && (
                  <span className="rounded bg-[var(--bg-elevated)] px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">UBL</span>
                )}
                {erp.isdocSupport && (
                  <span className="rounded bg-[var(--bg-elevated)] px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)]">ISDOC</span>
                )}
              </div>

              {erp.pricingFrom && (
                <p className="mt-2 text-xs text-[var(--text-muted)]">{erp.pricingFrom}</p>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <p className="text-sm text-[var(--text-secondary)]">
          Neviete sa rozhodnúť? Prečítajte si{' '}
          <Link href="/ako-sa-pripravit-na-e-fakturu" className="text-[var(--accent)] hover:underline">
            ako vybrať správny softvér
          </Link>{' '}
          alebo porovnajte na{' '}
          <Link href="/porovnanie" className="text-[var(--accent)] hover:underline">
            stránke porovnaní
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
