/**
 * Audience Page: E-faktúra pre živnostníkov
 *
 * Cluster 3 — HIGH CONVERSION audience-specific content
 * Target keywords: "e-faktúra živnostník", "e-faktúra SZČO", "e-faktúra neplatiteľ DPH",
 *                  "e-faktúra paušálne výdavky"
 *
 * Partner auto-links:
 * - 8888.sk (accounting for freelancers)
 * - sroihned.sk (transition to s.r.o. mention)
 * - digitalnipostari.sk (digital postman selection)
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, XCircle, AlertTriangle } from 'lucide-react';
import { createMetadata } from '@jakubnovak710/universal-web-core/lib/metadata';
import { siteConfig } from '@config/site.config';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PartnerCTA } from '@/components/partner-cta';

export function generateMetadata(): Metadata {
  return createMetadata({
    title: 'E-faktúra pre živnostníkov a SZČO — Čo musíte vedieť',
    description:
      'Kompletný sprievodca e-faktúrou pre živnostníkov a SZČO. Platiteľ DPH, neplatiteľ DPH, paušálne výdavky — kto musí vystavovať a kto len prijímať e-faktúry.',
    keywords: [
      'e-faktúra živnostník',
      'e-faktúra SZČO',
      'e-faktúra neplatiteľ DPH',
      'e-faktúra paušálne výdavky',
      'povinná e-faktúra živnosť',
    ],
  });
}

export default function EFakturaPreZivnostnikovPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'E-faktúra pre živnostníkov a SZČO — Čo musíte vedieť',
    description: 'Kompletný sprievodca e-faktúrou pre živnostníkov a SZČO na Slovensku.',
    datePublished: '2026-03-20',
    dateModified: '2026-03-20',
    author: { '@type': 'Organization', name: '8888 Servis s. r. o.' },
    publisher: { '@type': 'Organization', name: 'e-Faktúry.info', url: siteConfig.url },
    mainEntityOfPage: `${siteConfig.url}/e-faktura-pre-zivnostnikov`,
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Musí živnostník s paušálnymi výdavkami vystavovať e-faktúry?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ak ste platiteľ DPH — áno, od 1.1.2027 musíte vystavovať e-faktúry. Ak nie ste platiteľ DPH — nemusíte vystavovať, ale musíte vedieť e-faktúry prijímať, čo znamená registráciu v Peppol sieti.',
        },
      },
      {
        '@type': 'Question',
        name: 'Potrebuje neplatiteľ DPH digitálneho poštára?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Áno. Aj neplatiteľ DPH musí byť schopný prijímať e-faktúry od svojich dodávateľov. Na to potrebuje registráciu u digitálneho poštára (Peppol Access Point).',
        },
      },
      {
        '@type': 'Question',
        name: 'Koľko bude stáť prechod na e-faktúru pre živnostníka?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pre živnostníkov s moderným online fakturačným systémom (SuperFaktúra, Billdu, iDoklad) môže byť prechod takmer bezplatný — stačí aktivovať Peppol modul. Poplatok digitálnemu poštárovi sa pohybuje rádovo v jednotkách EUR mesačne.',
        },
      },
    ],
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Breadcrumbs
        locale="sk"
        items={[
          { label: 'Pre koho', href: '/e-faktura-pre-zivnostnikov' },
          { label: 'Pre živnostníkov' },
        ]}
      />

      <article className="prose prose-invert max-w-none">
        <h1 className="font-black text-[var(--text-primary)]">
          E-faktúra pre živnostníkov a SZČO
        </h1>

        <p className="text-lg text-[var(--text-secondary)]">
          Ak podnikáte ako živnostník alebo SZČO, e-faktúra sa vás týka —
          otázka je len <strong>v akom rozsahu</strong>. Záleží na tom, či ste
          platiteľ DPH alebo nie. Tento sprievodca vám vysvetlí presne, čo
          musíte urobiť.
        </p>

        <p className="rounded-lg border border-[var(--accent)]/20 bg-[var(--bg-surface)] p-4 text-sm">
          <strong>Posledná aktualizácia:</strong> Marec 2026 |{' '}
          <strong>Zdroj:</strong> Zákon 385/2025 Z.z., FAQ Finančnej správy SR
        </p>

        {/* ── Platiteľ vs neplatiteľ ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Platiteľ DPH vs. neplatiteľ DPH — kľúčový rozdiel
        </h2>

        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Povinnosť</th>
                <th>Platiteľ DPH</th>
                <th>Neplatiteľ DPH</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vystavovať e-faktúry</td>
                <td className="text-red-400">
                  <AlertTriangle className="mr-1 inline h-4 w-4" /> Povinné od
                  1.1.2027
                </td>
                <td className="text-emerald-400">
                  <XCircle className="mr-1 inline h-4 w-4" /> Nepovinné (do
                  30.6.2030)
                </td>
              </tr>
              <tr>
                <td>Prijímať e-faktúry</td>
                <td className="text-red-400">
                  <AlertTriangle className="mr-1 inline h-4 w-4" /> Povinné
                </td>
                <td className="text-red-400">
                  <AlertTriangle className="mr-1 inline h-4 w-4" /> Povinné
                </td>
              </tr>
              <tr>
                <td>Registrácia v Peppol</td>
                <td className="text-red-400">Povinná</td>
                <td className="text-red-400">Povinná (na príjem)</td>
              </tr>
              <tr>
                <td>Digitálny poštár</td>
                <td className="text-red-400">Povinný</td>
                <td className="text-red-400">Povinný (na príjem)</td>
              </tr>
              <tr>
                <td>Real-time reporting</td>
                <td className="text-red-400">Povinné</td>
                <td className="text-emerald-400">
                  <XCircle className="mr-1 inline h-4 w-4" /> Nie
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Pre platiteľa DPH ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Ak ste platiteľ DPH (§4 alebo §7)
        </h2>

        <p>
          Od <strong>1. januára 2027</strong> musíte všetky tuzemské B2B
          faktúry vystavovať ako e-faktúry vo formáte XML. To zahŕňa:
        </p>

        <ul>
          <li>Faktúry za služby pre firmy a SZČO</li>
          <li>Faktúry za dodanie tovaru iným podnikateľom</li>
          <li>Opravné doklady (dobropisy, ťarchopisy)</li>
          <li>Zálohové faktúry podliehajúce DPH</li>
        </ul>

        <p>
          <strong>Výnimka:</strong> Faktúry pre spotrebiteľov (B2C) — ak
          fakturujete bežným ľuďom (nie firmám), e-faktúra nie je povinná.
          Stačí klasická faktúra alebo bloček.
        </p>

        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-sm">
            <strong>Lehota:</strong> E-faktúru musíte vystaviť a odoslať do{' '}
            <strong>10 dní</strong> od dodania (skrátenie z pôvodných 15 dní).
            Pokuta za nedodržanie: až{' '}
            <Link href="/pokuty-za-e-fakturu" className="text-[var(--accent)]">
              10 000 EUR
            </Link>
            .
          </p>
        </div>

        {/* ── Pre neplatiteľa DPH ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Ak NIE ste platiteľ DPH
        </h2>

        <p>
          Dobrá správa: <strong>nemusíte vystavovať e-faktúry</strong>
          (minimálne do 30.6.2030). Ale je tu háčik:
        </p>

        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <p className="text-sm">
            <strong>Dôležité:</strong> Aj ako neplatiteľ DPH{' '}
            <strong>musíte byť schopní prijímať e-faktúry</strong> od vašich
            dodávateľov (platiteľov DPH). To znamená, že potrebujete:
          </p>
          <ul className="mt-2 text-sm">
            <li>Registráciu u digitálneho poštára</li>
            <li>Peppol ID (vaše DIČ)</li>
          </ul>
        </div>

        <p>
          Ak nakupujete od veľkoobchodov, IT firiem, alebo iných dodávateľov
          čo sú platitelia DPH — oni vám budú posielať e-faktúry. Musíte ich
          vedieť prijať.
        </p>

        {/* ── Paušálne výdavky ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Paušálne výdavky a e-faktúra
        </h2>

        <p>
          Používate paušálne výdavky (60% z príjmov)? Aj na vás sa vzťahuje
          povinnosť <strong>prijímať</strong> e-faktúry. Hoci skutočné výdavky
          nedokladujete, vaši dodávatelia — platitelia DPH — vám budú posielať
          e-faktúry cez Peppol.
        </p>

        <p>
          <strong>Prakticky:</strong> Stačí sa zaregistrovať u digitálneho
          poštára. Niektorí ponúkajú aj bezplatné účty pre príjem e-faktúr.
        </p>

        {/* Partner CTA — 8888.sk */}
        <PartnerCTA partner="8888" pagePath="/e-faktura-pre-zivnostnikov" locale="sk" />

        {/* ── Čo urobiť teraz ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Čo urobiť teraz — praktický checklist
        </h2>

        <h3 className="font-black text-[var(--text-primary)]">
          Pre platiteľov DPH:
        </h3>
        <ol>
          <li>
            Overte, či váš fakturačný softvér podporuje Peppol →{' '}
            <Link href="/integracie" className="text-[var(--accent)]">
              Prehľad softvérov
            </Link>
          </li>
          <li>
            Vyberte si digitálneho poštára →{' '}
            <a
              href="https://digitalnipostari.sk"
              target="_blank"
              rel="noopener"
              className="text-[var(--accent)]"
            >
              digitalnipostari.sk
            </a>
          </li>
          <li>Zaregistrujte sa v Peppol sieti</li>
          <li>Otestujte v dobrovoľnej fáze (od Q2 2026)</li>
          <li>
            Ak si nie ste istí, poraďte sa s{' '}
            <a
              href="https://8888.sk"
              target="_blank"
              rel="noopener"
              className="text-[var(--accent)]"
            >
              účtovníkom
            </a>
          </li>
        </ol>

        <h3 className="font-black text-[var(--text-primary)]">
          Pre neplatiteľov DPH:
        </h3>
        <ol>
          <li>
            Zaregistrujte sa u digitálneho poštára (aj bezplatne) →{' '}
            <a
              href="https://digitalnipostari.sk"
              target="_blank"
              rel="noopener"
              className="text-[var(--accent)]"
            >
              digitalnipostari.sk
            </a>
          </li>
          <li>Získajte Peppol ID</li>
          <li>Informujte dodávateľov o vašom Peppol ID</li>
        </ol>

        {/* ── Aký softvér vybrať ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Aký fakturačný softvér pre živnostníka?
        </h2>

        <p>
          Pre živnostníkov odporúčame jednoduché online fakturačné systémy s
          Peppol podporou:
        </p>

        <ul>
          <li>
            <Link href="/integracie/superfaktura" className="text-[var(--accent)]">
              <strong>SuperFaktúra</strong>
            </Link>{' '}
            — Peppol ready, free tier, silné API
          </li>
          <li>
            <Link href="/integracie/billdu" className="text-[var(--accent)]">
              <strong>Billdu</strong>
            </Link>{' '}
            — Peppol ready, slovenský produkt, od 3.99 EUR/mes
          </li>
          <li>
            <Link href="/integracie/idoklad" className="text-[var(--accent)]">
              <strong>iDoklad</strong>
            </Link>{' '}
            — 300 000+ používateľov, Peppol v príprave
          </li>
          <li>
            <Link href="/integracie/fintoro" className="text-[var(--accent)]">
              <strong>Fintoro</strong>
            </Link>{' '}
            — Peppol ready, moderné rozhranie
          </li>
        </ul>

        <p>
          Kompletné porovnanie na{' '}
          <Link href="/integracie" className="text-[var(--accent)]">
            stránke integrácií <ArrowRight className="ml-1 inline h-4 w-4" />
          </Link>
        </p>

        {/* ── Prechod na s.r.o. ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Zvažujete prechod na s.r.o.?
        </h2>

        <p>
          S povinnou e-faktúrou prichádzajú aj ďalšie povinnosti. Niektorí
          živnostníci zvažujú prechod na s.r.o. kvôli daňovej optimalizácii.
          Ak uvažujete o založení firmy, pozrite si{' '}
          <a
            href="https://sroihned.sk"
            target="_blank"
            rel="noopener"
            className="text-[var(--accent)]"
          >
            jednoduchý proces založenia s.r.o. online
          </a>
          . Pre s.r.o. sú povinnosti rovnaké — sprievodca v{' '}
          <Link href="/e-faktura-pre-male-firmy" className="text-[var(--accent)]">
            e-faktúra pre malé firmy
          </Link>
          .
        </p>

        {/* Partner CTA — digitalnipostari.sk */}
        <PartnerCTA
          partner="digitalnipostari"
          pagePath="/e-faktura-pre-zivnostnikov"
          locale="sk"
        />

        {/* ── FAQ ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Časté otázky živnostníkov o e-faktúre
        </h2>

        <h3 className="font-black text-[var(--text-primary)]">
          Musí živnostník s paušálnymi výdavkami vystavovať e-faktúry?
        </h3>
        <p>
          Ak ste platiteľ DPH — áno, od 1.1.2027 musíte vystavovať e-faktúry.
          Ak nie ste platiteľ DPH — nemusíte vystavovať, ale musíte vedieť
          e-faktúry prijímať, čo znamená registráciu v Peppol sieti.
        </p>

        <h3 className="font-black text-[var(--text-primary)]">
          Potrebuje neplatiteľ DPH digitálneho poštára?
        </h3>
        <p>
          Áno. Aj neplatiteľ DPH musí byť schopný prijímať e-faktúry od
          svojich dodávateľov. Na to potrebuje registráciu u digitálneho
          poštára (Peppol Access Point).
        </p>

        <h3 className="font-black text-[var(--text-primary)]">
          Koľko bude stáť prechod na e-faktúru pre živnostníka?
        </h3>
        <p>
          Pre živnostníkov s moderným online fakturačným systémom (SuperFaktúra,
          Billdu, iDoklad) môže byť prechod takmer bezplatný — stačí aktivovať
          Peppol modul. Poplatok digitálnemu poštárovi sa pohybuje rádovo v
          jednotkách EUR mesačne.
        </p>

        {/* ── Záver ── */}
        <h2 className="font-black text-[var(--text-primary)]">Záver</h2>

        <p>
          E-faktúra sa týka <strong>každého živnostníka</strong> — buď ako
          vystavovateľa (platiteľ DPH) alebo ako príjemcu (neplatiteľ DPH).
          Nepodceňte prípravu — začnite ešte dnes:
        </p>

        <ul>
          <li>
            Prečítajte si{' '}
            <Link href="/co-je-e-faktura" className="text-[var(--accent)]">
              čo je e-faktúra
            </Link>
          </li>
          <li>
            Pozrite{' '}
            <Link href="/ako-sa-pripravit-na-e-fakturu" className="text-[var(--accent)]">
              sprievodcu prípravou
            </Link>
          </li>
          <li>
            Overte softvér na{' '}
            <Link href="/integracie" className="text-[var(--accent)]">
              stránke integrácií
            </Link>
          </li>
          <li>
            Sledujte{' '}
            <Link href="/kedy-zacne-platit-e-faktura" className="text-[var(--accent)]">
              termíny
            </Link>
          </li>
        </ul>
      </article>
    </main>
  );
}
