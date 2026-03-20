/**
 * Pillar Page: Čo je e-faktúra
 *
 * Cluster 1 — TOP PRIORITY (highest volume keywords)
 * Target keywords: "čo je e-faktúra", "elektronická faktúra", "e-faktúra slovensko"
 * Content: 2000+ words, comprehensive pillar page
 * Schema: Article + FAQPage + BreadcrumbList JSON-LD
 *
 * Internal links to:
 * - /kedy-zacne-platit-e-faktura (Cluster 2)
 * - /ako-sa-pripravit-na-e-fakturu (Cluster 4)
 * - /peppol-slovensko (Cluster 7)
 * - /pokuty-za-e-fakturu (Cluster 5)
 * - /integracie (Cluster 8)
 * - /digitalni-postari (Cluster 6 → digitalnipostari.sk bridge)
 *
 * Partner auto-links:
 * - 8888.sk (accounting mention)
 * - digitalnipostari.sk (digital postman mention)
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { createMetadata } from '@jakubnovak710/universal-web-core/lib/metadata';
import { ContentLayout } from '@/components/layouts/content-layout';
import { buildArticleJsonLd } from '@/components/seo';
import { PartnerCTA } from '@/components/partner-cta';

export function generateMetadata(): Metadata {
  return createMetadata({
    title: 'Čo je e-faktúra — Kompletný sprievodca elektronickou fakturáciou',
    description:
      'Čo je e-faktúra (elektronická faktúra), ako funguje, koho sa týka a kedy bude povinná na Slovensku. Všetko o XML formáte, Peppol sieti a digitálnych poštároch.',
    keywords: [
      'čo je e-faktúra',
      'elektronická faktúra',
      'e-faktúra slovensko',
      'e-fakturácia',
      'povinná e-faktúra 2027',
      'XML faktúra',
      'Peppol',
    ],
  });
}

export default function CoJeEFakturaPage() {
  const articleJsonLd = buildArticleJsonLd({
    headline: 'Čo je e-faktúra — Kompletný sprievodca elektronickou fakturáciou na Slovensku',
    description: 'Čo je e-faktúra, ako funguje, koho sa týka a kedy bude povinná na Slovensku.',
    path: '/co-je-e-faktura',
  });

  // FAQ JSON-LD (embedded FAQ section)
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Je PDF faktúra to isté ako e-faktúra?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nie. PDF faktúra je len obrázok faktúry, nie je strojovo čitateľná. E-faktúra je štruktúrovaný XML súbor podľa EN 16931, ktorý systémy vedia automaticky spracovať.',
        },
      },
      {
        '@type': 'Question',
        name: 'Musí neplatiteľ DPH vystavovať e-faktúry?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nie, neplatitelia DPH nemajú povinnosť vystavovať e-faktúry (minimálne do 30.6.2030). Ale musia byť schopní e-faktúry prijímať — teda potrebujú registráciu v Peppol sieti.',
        },
      },
      {
        '@type': 'Question',
        name: 'V akom formáte musí byť e-faktúra?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'E-faktúra musí byť vo formáte XML podľa európskeho štandardu EN 16931 (Peppol BIS Billing 3.0, založený na UBL 2.1).',
        },
      },
    ],
  };

  return (
    <ContentLayout
      locale="sk"
      breadcrumbs={[
        { label: 'Sprievodca', href: '/co-je-e-faktura' },
        { label: 'Čo je e-faktúra' },
      ]}
      jsonLd={[articleJsonLd, faqJsonLd]}
      hero={{
        title: 'Čo je e-faktúra',
        description:
          'Od 1. januára 2027 bude na Slovensku povinná elektronická faktúra (e-faktúra) pre všetkých platiteľov DPH. Ak podnikáte, táto zmena sa s najväčšou pravdepodobnosťou týka aj vás. V tomto sprievodcovi sa dozviete všetko, čo potrebujete vedieť.',
        lastUpdated: 'Marec 2026',
        sources: ['Zákon 385/2025 Z.z.', 'Finančná správa SR'],
        readingTime: 12,
      }}
    >

        {/* ── Definícia ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Definícia: Čo presne je e-faktúra?
        </h2>

        <p>
          E-faktúra je faktúra vyhotovená, zaslaná a prijatá v{' '}
          <strong>štruktúrovanom elektronickom formáte <a href="https://sk.wikipedia.org/wiki/Kateg%C3%B3ria:XML" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)]">XML</a></strong> podľa
          európskeho štandardu{' '}
          <Link href="/slovnik/en-16931" className="text-[var(--accent)]">
            EN 16931
          </Link>
          . Na rozdiel od bežnej PDF faktúry obsahuje údaje v strojovo
          čitateľnom formáte, ktorý účtovný program vie automaticky spracovať
          — bez manuálneho prepisovania.
        </p>

        <p>
          Kľúčový rozdiel: <strong>PDF faktúra je ako fotka dokumentu</strong>{' '}
          — vyzerá pekne, ale počítač nevie automaticky prečítať čísla a údaje.
          E-faktúra je <strong>štruktúrovaný súbor s dátami</strong> — ako
          tabuľka v Exceli, kde každý údaj má svoje presné miesto.
        </p>

        {/* ── PDF vs e-faktúra ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          PDF faktúra vs. e-faktúra: aký je rozdiel?
        </h2>

        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>PDF faktúra</th>
                <th>E-faktúra (XML)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Formát</td>
                <td>PDF (obrázok)</td>
                <td>XML (štruktúrované dáta)</td>
              </tr>
              <tr>
                <td>Strojové spracovanie</td>
                <td style={{ color: 'var(--color-danger)' }}>
                  <XCircle className="mr-1 inline h-4 w-4" /> Nie
                </td>
                <td style={{ color: 'var(--color-success)' }}>
                  <CheckCircle2 className="mr-1 inline h-4 w-4" /> Áno
                </td>
              </tr>
              <tr>
                <td>Manuálne prepisovanie</td>
                <td style={{ color: 'var(--color-danger)' }}>Potrebné</td>
                <td style={{ color: 'var(--color-success)' }}>Automatické</td>
              </tr>
              <tr>
                <td>Doručenie</td>
                <td>E-mail, pošta</td>
                <td>Peppol sieť</td>
              </tr>
              <tr>
                <td>Reporting fin. správe</td>
                <td>Manuálne / DPH priznanie</td>
                <td>Automaticky v reálnom čase</td>
              </tr>
              <tr>
                <td>Právny status od 2027</td>
                <td style={{ color: 'var(--color-danger)' }}>
                  <AlertTriangle className="mr-1 inline h-4 w-4" /> Nespĺňa
                  zákon (B2B)
                </td>
                <td style={{ color: 'var(--color-success)' }}>
                  <CheckCircle2 className="mr-1 inline h-4 w-4" /> Povinný
                  formát
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Ako funguje ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Ako funguje e-fakturácia?
        </h2>

        <p>
          E-fakturácia na Slovensku funguje cez{' '}
          <Link href="/peppol-slovensko" className="text-[var(--accent)]">
            Peppol sieť
          </Link>{' '}
          — medzinárodnú infraštruktúru používanú v takmer 20 krajinách EÚ.
          Proces vyzerá takto:
        </p>

        <ol>
          <li>
            <strong>Vystavíte faktúru</strong> vo vašom účtovnom programe
            (Pohoda, SuperFaktúra, iDoklad...).
          </li>
          <li>
            Softvér vygeneruje <strong>XML súbor</strong> podľa EN 16931.
          </li>
          <li>
            XML sa odošle cez vášho{' '}
            <Link href="/digitalni-postari" className="text-[var(--accent)]">
              digitálneho poštára
            </Link>{' '}
            (certifikovaný Access Point).
          </li>
          <li>
            Poštár odošle faktúru cez Peppol sieť poštárovi príjemcu.
          </li>
          <li>
            Príjemca dostane faktúru vo svojom systéme —{' '}
            <strong>automaticky spracovanú</strong>.
          </li>
          <li>
            Údaje sa <strong>v reálnom čase</strong> odošlú aj <a href="https://www.financnasprava.sk/sk/titulna-stranka" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)]">finančnej správe</a>.
          </li>
        </ol>

        {/* ── Koho sa týka ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Koho sa týka povinná e-faktúra?
        </h2>

        <p>
          Od 1.1.2027 sa povinnosť vystavovať e-faktúry vzťahuje na{' '}
          <strong>všetkých platiteľov <a href="https://sk.wikipedia.org/wiki/Da%C5%88_z_pridanej_hodnoty" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)]">DPH</a></strong> usadených na Slovensku pri
          tuzemských transakciách:
        </p>

        <ul>
          <li>
            <strong>S.r.o. a a.s.</strong> — všetky obchodné spoločnosti
            (platitelia DPH). Viac v{' '}
            <Link href="/e-faktura-pre-male-firmy" className="text-[var(--accent)]">
              sprievodcovi pre malé firmy
            </Link>
            .
          </li>
          <li>
            <strong>SZČO / živnostníci</strong> — ak ste platiteľ DPH. Detaily
            v{' '}
            <Link href="/e-faktura-pre-zivnostnikov" className="text-[var(--accent)]">
              sprievodcovi pre živnostníkov
            </Link>
            .
          </li>
          <li>
            <strong>Neziskové organizácie</strong> — ak sú platiteľmi DPH.
          </li>
          <li>
            <strong>Štátne inštitúcie</strong> — B2G transakcie.
          </li>
        </ul>

        <div className="rounded-lg border border-[var(--color-warning-border)] bg-[var(--color-warning-muted)] p-4">
          <p className="text-sm">
            <strong>Dôležité:</strong> Neplatitelia DPH nemusia e-faktúry{' '}
            <em>vystavovať</em> (minimálne do 30.6.2030), ale{' '}
            <strong>musia byť schopní ich prijímať</strong>. To znamená, že aj
            neplatiteľ DPH potrebuje registráciu v Peppol sieti a digitálneho
            poštára.
          </p>
        </div>

        <p>
          E-faktúra sa vzťahuje na <strong>B2B</strong> (firma → firma) a{' '}
          <strong>B2G</strong> (firma → štát) transakcie.{' '}
          <strong>B2C transakcie</strong> (firma → spotrebiteľ) sú oslobodené —
          stačí bloček alebo klasická faktúra.
        </p>

        {/* Partner CTA — 8888.sk */}
        <PartnerCTA partner="8888" pagePath="/co-je-e-faktura" locale="sk" />

        {/* ── Technické detaily ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Technické požiadavky
        </h2>

        <ul>
          <li>
            <strong>Formát:</strong> XML podľa{' '}
            <Link href="/slovnik/en-16931" className="text-[var(--accent)]">
              EN 16931
            </Link>{' '}
            (
            <Link href="/slovnik/peppol-bis-billing" className="text-[var(--accent)]">
              Peppol BIS Billing 3.0
            </Link>
            , založený na{' '}
            <Link href="/slovnik/ubl-21" className="text-[var(--accent)]">
              UBL 2.1
            </Link>
            )
          </li>
          <li>
            <strong>Doručenie:</strong> Cez{' '}
            <Link href="/peppol-slovensko" className="text-[var(--accent)]">
              Peppol sieť
            </Link>{' '}
            prostredníctvom certifikovaného{' '}
            <Link href="/digitalni-postari" className="text-[var(--accent)]">
              digitálneho poštára
            </Link>
          </li>
          <li>
            <strong>Identifikácia:</strong>{' '}
            <Link href="/slovnik/peppol-id" className="text-[var(--accent)]">
              Peppol ID
            </Link>{' '}
            (formát 0245:XXXXXXXXXX, kde X = vaše DIČ)
          </li>
          <li>
            <strong>Reporting:</strong> Údaje sa automaticky odosielajú
            finančnej správe v reálnom čase (
            <Link href="/slovnik/e-reporting" className="text-[var(--accent)]">
              e-reporting
            </Link>
            )
          </li>
        </ul>

        {/* ── Termíny ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Kľúčové termíny
        </h2>

        <ul>
          <li>
            <strong>Q2 2026:</strong> Dobrovoľná fáza — môžete začať testovať
          </li>
          <li>
            <strong>1.1.2027:</strong> Povinná e-faktúra pre tuzemské B2B/B2G
            transakcie
          </li>
          <li>
            <strong>1.7.2027:</strong> Povinná certifikovaná doručovacia služba
          </li>
          <li>
            <strong>1.7.2030:</strong> Rozšírenie na cezhraničné transakcie
            (ViDA smernica)
          </li>
        </ul>

        <p>
          Podrobný prehľad termínov nájdete na stránke{' '}
          <Link href="/kedy-zacne-platit-e-faktura" className="text-[var(--accent)]">
            Kedy začne platiť e-faktúra
          </Link>
          .
        </p>

        {/* ── Pokuty ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Čo hrozí za nesplnenie?
        </h2>

        <p>
          Pokuta za nevystavenie alebo nesprávne údaje v e-faktúre je až{' '}
          <strong>10 000 EUR</strong>. Pri opakovanom porušení až{' '}
          <strong>100 000 EUR</strong>. Podrobnosti na stránke{' '}
          <Link href="/pokuty-za-e-fakturu" className="text-[var(--accent)]">
            Pokuty a sankcie za e-faktúru
          </Link>
          .
        </p>

        {/* ── Ako sa pripraviť ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Ako sa pripraviť?
        </h2>

        <ol>
          <li>
            <strong>Overte svoj softvér</strong> — skontrolujte Peppol
            pripravenosť na{' '}
            <Link href="/integracie" className="text-[var(--accent)]">
              prehľade integrácií
            </Link>
          </li>
          <li>
            <strong>Vyberte si digitálneho poštára</strong> — porovnanie na{' '}
            <a
              href="https://digitalnipostari.sk"
              target="_blank"
              rel="noopener"
              className="text-[var(--accent)]"
            >
              digitalnipostari.sk
            </a>
          </li>
          <li>
            <strong>Zaregistrujte sa v Peppol</strong> — cez vybraného poštára
          </li>
          <li>
            <strong>Otestujte</strong> — v dobrovoľnej fáze 2026
          </li>
        </ol>

        <p>
          Kompletný postup v{' '}
          <Link href="/ako-sa-pripravit-na-e-fakturu" className="text-[var(--accent)]">
            sprievodcovi prípravou na e-faktúru
            <ArrowRight className="ml-1 inline h-4 w-4" />
          </Link>
        </p>

        {/* ── FAQ sekcia ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Časté otázky o e-faktúre
        </h2>

        <h3 className="font-black text-[var(--text-primary)]">
          Je PDF faktúra to isté ako e-faktúra?
        </h3>
        <p>
          Nie. PDF faktúra je len obrázok faktúry — nie je strojovo čitateľná.
          E-faktúra je štruktúrovaný XML súbor podľa EN 16931, ktorý systémy
          vedia automaticky spracovať. Od 1.1.2027 PDF faktúra nebude spĺňať
          zákonné požiadavky pre tuzemské B2B transakcie.
        </p>

        <h3 className="font-black text-[var(--text-primary)]">
          Musí neplatiteľ DPH vystavovať e-faktúry?
        </h3>
        <p>
          Nie, neplatitelia DPH nemajú povinnosť vystavovať e-faktúry
          (minimálne do 30.6.2030). Ale musia byť schopní e-faktúry prijímať —
          teda potrebujú registráciu v Peppol sieti a digitálneho poštára.
        </p>

        <h3 className="font-black text-[var(--text-primary)]">
          V akom formáte musí byť e-faktúra?
        </h3>
        <p>
          E-faktúra musí byť vo formáte XML podľa európskeho štandardu EN 16931
          (Peppol BIS Billing 3.0, založený na UBL 2.1). Obsahuje všetky
          povinné údaje faktúry v štruktúrovanej forme.
        </p>

        {/* Partner CTA — digitalnipostari.sk */}
        <PartnerCTA
          partner="digitalnipostari"
          pagePath="/co-je-e-faktura"
          locale="sk"
        />

        {/* ── Záver ── */}
        <h2 className="font-black text-[var(--text-primary)]">Záver</h2>

        <p>
          E-faktúra nie je len ďalšia byrokratická povinnosť — je to
          príležitosť na <strong>automatizáciu a zefektívnenie</strong> vašej
          fakturácie. Firmy, ktoré sa pripravia včas, budú mať hladký prechod
          a vyhnú sa pokutám.
        </p>

        <p>
          <strong>Začnite ešte dnes:</strong> Overte svoj softvér na{' '}
          <Link href="/integracie" className="text-[var(--accent)]">
            stránke integrácií
          </Link>
          , prečítajte si{' '}
          <Link href="/ako-sa-pripravit-na-e-fakturu" className="text-[var(--accent)]">
            sprievodcu prípravou
          </Link>{' '}
          a{' '}
          <Link href="/kedy-zacne-platit-e-faktura" className="text-[var(--accent)]">
            sledujte termíny
          </Link>
          .
        </p>
    </ContentLayout>
  );
}
