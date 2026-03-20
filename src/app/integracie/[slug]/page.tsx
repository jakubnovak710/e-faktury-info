/**
 * ERP Integration Detail Page (Programmatic)
 *
 * Data source: src/content/erp-systems/{slug}.mdx (filesystem collection)
 * Schema: SoftwareApplication + Article + BreadcrumbList JSON-LD
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, XCircle, Clock, Calendar, HelpCircle } from 'lucide-react';
import { createMetadata } from '@jakubnovak710/universal-web-core/lib/metadata';
import { ContentLayout } from '@/components/layouts/content-layout';
import { SourceBox } from '@/components/source-box';
import { PartnerCTA } from '@/components/partner-cta';
import { buildArticleJsonLd } from '@/components/seo';
import { getCollection, getCollectionEntry, getCollectionSlugs } from '@/lib/collections';
import { erpSchema } from '@/content/erp-systems/_schema';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getCollectionSlugs('erp-systems');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getCollectionEntry('erp-systems', slug, erpSchema);
  if (!entry) return {};

  return createMetadata({
    title: `${entry.data.name} a e-faktúra — Peppol integrácia a pripravenosť`,
    description: `Kompletný sprievodca e-faktúrou v ${entry.data.name}. Stav Peppol integrácie, kroky nastavenia, výhody a nevýhody.`,
    keywords: [`${entry.data.name} e-faktúra`, `${entry.data.name} Peppol`, entry.data.vendor],
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
  const entry = await getCollectionEntry('erp-systems', slug, erpSchema);
  if (!entry) notFound();

  const erp = entry.data;
  const status = STATUS_LABEL[erp.peppolStatus];
  const allEntries = await getCollection('erp-systems', erpSchema);
  const otherErps = allEntries.filter((e) => e.slug !== slug).slice(0, 4);

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: erp.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, Windows',
    url: erp.website,
    ...(erp.pricingFrom && {
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR', description: erp.pricingFrom },
    }),
    author: { '@type': 'Organization', name: erp.vendor },
  };

  const articleJsonLd = buildArticleJsonLd({
    headline: `${erp.name} a e-faktúra — Peppol integrácia`,
    path: `/integracie/${slug}`,
  });

  return (
    <ContentLayout
      locale="sk"
      breadcrumbs={[{ label: 'Integrácie', href: '/integracie' }, { label: erp.name }]}
      jsonLd={[softwareJsonLd, articleJsonLd]}
    >
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

      <p className="text-lg text-[var(--text-secondary)]">{erp.descriptionSk}</p>

      <SourceBox
        lastUpdated="Marec 2026"
        sources={[
          `${erp.vendor}`,
          erp.website.replace('https://', ''),
        ]}
      />

      <h2 className="font-black text-[var(--text-primary)]">Stav Peppol integrácie</h2>
      <p>{erp.peppolStatusNote}</p>
      {erp.peppolDate && (
        <p className="text-sm text-[var(--text-muted)]">Očakávaný termín: <strong>{erp.peppolDate}</strong></p>
      )}

      <h2 className="font-black text-[var(--text-primary)]">Technická podpora</h2>
      <div className="overflow-x-auto">
        <table>
          <tbody>
            {[
              { label: 'API podpora', value: erp.apiSupport },
              { label: 'XML export', value: erp.xmlExport },
              { label: 'UBL 2.1 podpora', value: erp.ublSupport },
              { label: 'ISDOC podpora', value: erp.isdocSupport },
            ].map((row) => (
              <tr key={row.label}>
                <td>{row.label}</td>
                <td>
                  {row.value
                    ? <><CheckCircle2 className="inline h-4 w-4 text-emerald-400" /> Áno</>
                    : <><XCircle className="inline h-4 w-4 text-red-400" /> Nie</>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="font-black text-[var(--text-primary)]">Funkcie</h2>
      <ul>{erp.features.map((f) => <li key={f}>{f}</li>)}</ul>

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

      <h2 className="font-black text-[var(--text-primary)]">Výhody a nevýhody</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
          <p className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-emerald-400">Výhody</p>
          <ul className="space-y-1 text-sm">
            {erp.pros.map((p) => (
              <li key={p} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /><span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <p className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-red-400">Nevýhody</p>
          <ul className="space-y-1 text-sm">
            {erp.cons.map((c) => (
              <li key={c} className="flex items-start gap-2">
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" /><span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* MDX body content (how-to guide) */}
      {entry.content.trim() && (
        <div className="mt-8" dangerouslySetInnerHTML={{ __html: entry.content }} />
      )}

      <PartnerCTA partner="digitalnipostari" pagePath={`/integracie/${slug}`} locale="sk" />

      <h2 className="font-black text-[var(--text-primary)]">Alternatívy</h2>
      <ul>
        {otherErps.map((alt) => (
          <li key={alt.slug}>
            <Link href={`/integracie/${alt.slug}`} className="text-[var(--accent)]">{alt.data.name}</Link>
            {' — '}{alt.data.vendor} ({STATUS_LABEL[alt.data.peppolStatus].text})
          </li>
        ))}
      </ul>
      <p>
        <Link href="/integracie" className="text-[var(--accent)]">
          Zobraziť všetky systémy <ArrowRight className="ml-1 inline h-4 w-4" />
        </Link>
      </p>

      <div className="rounded-lg border border-[var(--accent)]/20 bg-[var(--bg-surface)] p-6 text-center">
        <p className="font-black text-[var(--text-primary)]">Potrebujete pomoc s prípravou?</p>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          <Link href="/ako-sa-pripravit-na-e-fakturu" className="text-[var(--accent)]">Kompletný sprievodca prípravou na e-faktúru</Link>
        </p>
      </div>
    </ContentLayout>
  );
}
