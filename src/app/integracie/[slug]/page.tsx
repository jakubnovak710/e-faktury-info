/**
 * ERP Integration Detail Page (Programmatic)
 *
 * Generated from src/data/erp-systems.ts for each ERP system.
 * Each page targets: "{name} e-faktúra", "{name} Peppol"
 *
 * Uniqueness strategy (>40%): unique description, pros/cons, peppolStatusNote,
 * features list, target audience, pricing — all different per system.
 *
 * Schema: SoftwareApplication + Article + BreadcrumbList + FAQPage JSON-LD
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, XCircle, ExternalLink, Clock, Calendar, HelpCircle } from 'lucide-react';
import { createMetadata } from '@jakubnovak710/universal-web-core/lib/metadata';
import { siteConfig } from '@config/site.config';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PartnerCTA } from '@/components/partner-cta';
import { erpSystems, type ErpSystem } from '@/data/erp-systems';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getErp(slug: string): ErpSystem | undefined {
  return erpSystems.find((e) => e.slug === slug);
}

export function generateStaticParams() {
  return erpSystems.map((erp) => ({ slug: erp.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const erp = getErp(slug);
  if (!erp) return {};

  return createMetadata({
    title: `${erp.name} a e-faktúra — Peppol integrácia a pripravenosť`,
    description: `Kompletný sprievodca e-faktúrou v ${erp.name}. Stav Peppol integrácie, kroky nastavenia, výhody a nevýhody. ${erp.vendor}.`,
    keywords: [`${erp.name} e-faktúra`, `${erp.name} Peppol`, `${erp.name} elektronická fakturácia`, erp.vendor],
  });
}

const STATUS_LABEL = {
  ready: { text: 'Peppol Ready', className: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', Icon: CheckCircle2 },
  'in-progress': { text: 'Pripravuje sa', className: 'text-amber-400 bg-amber-500/10 border-amber-500/20', Icon: Clock },
  planned: { text: 'Plánované', className: 'text-blue-400 bg-blue-500/10 border-blue-500/20', Icon: Calendar },
  unknown: { text: 'Neznámy', className: 'text-gray-400 bg-gray-500/10 border-gray-500/20', Icon: HelpCircle },
} as const;

export default async function ErpDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const erp = getErp(slug);
  if (!erp) notFound();

  const status = STATUS_LABEL[erp.peppolStatus];
  const otherErps = erpSystems.filter((e) => e.slug !== slug).slice(0, 4);

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: erp.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, Windows',
    url: erp.website,
    offers: erp.pricingFrom ? { '@type': 'Offer', price: '0', priceCurrency: 'EUR', description: erp.pricingFrom } : undefined,
    author: { '@type': 'Organization', name: erp.vendor },
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${erp.name} a e-faktúra — Peppol integrácia`,
    datePublished: '2026-03-20',
    dateModified: '2026-03-20',
    author: { '@type': 'Organization', name: '8888 Servis s. r. o.' },
    publisher: { '@type': 'Organization', name: 'e-Faktúry.info', url: siteConfig.url },
    mainEntityOfPage: `${siteConfig.url}/integracie/${slug}`,
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <Breadcrumbs
        locale="sk"
        items={[
          { label: 'Integrácie', href: '/integracie' },
          { label: erp.name },
        ]}
      />

      <article className="prose prose-invert max-w-none">
        {/* Header */}
        <div className="not-prose mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-black text-[var(--text-primary)] sm:text-4xl">
              {erp.name} a e-faktúra
            </h1>
            <p className="mt-1 text-sm text-[var(--text-muted)]">{erp.vendor}</p>
          </div>
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider ${status.className}`}>
            <status.Icon className="h-4 w-4" />
            {status.text}
          </span>
        </div>

        {/* Description */}
        <p className="text-lg text-[var(--text-secondary)]">{erp.descriptionSk}</p>

        <p className="rounded-lg border border-[var(--accent)]/20 bg-[var(--bg-surface)] p-4 text-sm">
          <strong>Posledná aktualizácia:</strong> Marec 2026 |{' '}
          <strong>Web:</strong>{' '}
          <a href={erp.website} target="_blank" rel="noopener" className="text-[var(--accent)]">
            {erp.website.replace('https://', '')} <ExternalLink className="ml-1 inline h-3 w-3" />
          </a>
          {erp.pricingFrom && <> | <strong>Cena:</strong> {erp.pricingFrom}</>}
        </p>

        {/* Peppol status */}
        <h2 className="font-black text-[var(--text-primary)]">Stav Peppol integrácie</h2>
        <p>{erp.peppolStatusNote}</p>
        {erp.peppolDate && (
          <p className="text-sm text-[var(--text-muted)]">
            Očakávaný termín: <strong>{erp.peppolDate}</strong>
          </p>
        )}

        {/* Technical support */}
        <h2 className="font-black text-[var(--text-primary)]">Technická podpora</h2>
        <div className="overflow-x-auto">
          <table>
            <tbody>
              <tr>
                <td>API podpora</td>
                <td>{erp.apiSupport ? <CheckCircle2 className="inline h-4 w-4 text-emerald-400" /> : <XCircle className="inline h-4 w-4 text-red-400" />} {erp.apiSupport ? 'Áno' : 'Nie'}</td>
              </tr>
              <tr>
                <td>XML export</td>
                <td>{erp.xmlExport ? <CheckCircle2 className="inline h-4 w-4 text-emerald-400" /> : <XCircle className="inline h-4 w-4 text-red-400" />} {erp.xmlExport ? 'Áno' : 'Nie'}</td>
              </tr>
              <tr>
                <td>UBL 2.1 podpora</td>
                <td>{erp.ublSupport ? <CheckCircle2 className="inline h-4 w-4 text-emerald-400" /> : <XCircle className="inline h-4 w-4 text-red-400" />} {erp.ublSupport ? 'Áno' : 'Nie'}</td>
              </tr>
              <tr>
                <td>ISDOC podpora</td>
                <td>{erp.isdocSupport ? <CheckCircle2 className="inline h-4 w-4 text-emerald-400" /> : <XCircle className="inline h-4 w-4 text-red-400" />} {erp.isdocSupport ? 'Áno' : 'Nie'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Features */}
        <h2 className="font-black text-[var(--text-primary)]">Funkcie</h2>
        <ul>
          {erp.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        {/* Target audience */}
        <h2 className="font-black text-[var(--text-primary)]">Pre koho je {erp.name} vhodný</h2>
        <ul>
          {erp.targetAudience.map((a) => (
            <li key={a}>
              {a === 'freelancer' && <Link href="/e-faktura-pre-zivnostnikov" className="text-[var(--accent)]">Živnostníci a SZČO</Link>}
              {a === 'small-business' && <Link href="/e-faktura-pre-male-firmy" className="text-[var(--accent)]">Malé firmy</Link>}
              {a === 'medium-business' && 'Stredné firmy'}
              {a === 'enterprise' && 'Veľké podniky'}
              {a === 'accountant' && <Link href="/e-faktura-pre-uctovnikov" className="text-[var(--accent)]">Účtovníci a kancelárie</Link>}
            </li>
          ))}
        </ul>

        {/* Pros & Cons */}
        <h2 className="font-black text-[var(--text-primary)]">Výhody a nevýhody</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
            <p className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-emerald-400">Výhody</p>
            <ul className="space-y-1 text-sm">
              {erp.prosAndCons.pros.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
            <p className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-red-400">Nevýhody</p>
            <ul className="space-y-1 text-sm">
              {erp.prosAndCons.cons.map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Partner CTA */}
        <PartnerCTA partner="digitalnipostari" pagePath={`/integracie/${slug}`} locale="sk" />

        {/* Alternatives */}
        <h2 className="font-black text-[var(--text-primary)]">Alternatívy</h2>
        <ul>
          {otherErps.map((alt) => (
            <li key={alt.slug}>
              <Link href={`/integracie/${alt.slug}`} className="text-[var(--accent)]">
                {alt.name}
              </Link>{' '}
              — {alt.vendor} ({STATUS_LABEL[alt.peppolStatus].text})
            </li>
          ))}
        </ul>

        <p>
          <Link href="/integracie" className="text-[var(--accent)]">
            Zobraziť všetky {erpSystems.length} systémov <ArrowRight className="ml-1 inline h-4 w-4" />
          </Link>
        </p>

        {/* Preparation CTA */}
        <div className="rounded-lg border border-[var(--accent)]/20 bg-[var(--bg-surface)] p-6 text-center">
          <p className="font-black text-[var(--text-primary)]">Potrebujete pomoc s prípravou?</p>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Prečítajte si{' '}
            <Link href="/ako-sa-pripravit-na-e-fakturu" className="text-[var(--accent)]">
              kompletný sprievodca prípravou na e-faktúru
            </Link>
          </p>
        </div>
      </article>
    </main>
  );
}
