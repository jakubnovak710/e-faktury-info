/**
 * Pillar Page: Ako sa pripraviť na e-faktúru
 *
 * Cluster 4 — HIGH VALUE (how-to keywords)
 * Target keywords: "ako sa pripraviť na e-faktúru", "príprava na e-fakturáciu", "e-faktúra postup"
 * Content: 1500+ words, practical step-by-step guide
 * Schema: Article + HowTo JSON-LD (rich snippets!)
 *
 * Internal links to:
 * - /co-je-e-faktura (Cluster 1)
 * - /kedy-zacne-platit-e-faktura (Cluster 2)
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
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Search,
  Monitor,
  Mail,
  Network,
  TestTube,
  Users,
  Calendar,
} from 'lucide-react';
import { createMetadata } from '@jakubnovak710/universal-web-core/lib/metadata';
import { siteConfig } from '@config/site.config';
import { ContentLayout } from '@/components/layouts/content-layout';
import { buildArticleJsonLd } from '@/components/seo';
import { PartnerCTA } from '@/components/partner-cta';

export function generateMetadata(): Metadata {
  return createMetadata({
    title: 'Ako sa pripraviť na e-faktúru — Praktický sprievodca krok za krokom',
    description:
      'Kompletný postup prípravy na e-fakturáciu na Slovensku. 6 krokov: audit softvéru, výber digitálneho poštára, Peppol registrácia, testovanie a školenie zamestnancov.',
    keywords: [
      'ako sa pripraviť na e-faktúru',
      'príprava na e-fakturáciu',
      'e-faktúra postup',
      'e-faktúra kroky',
      'Peppol registrácia',
      'digitálny poštár výber',
      'e-fakturácia návod',
    ],
  });
}

export default function AkoSaPripravetiNaEFakturu() {
  const pageUrl = `${siteConfig.url}/ako-sa-pripravit-na-e-fakturu`;

  const articleJsonLd = buildArticleJsonLd({
    headline: 'Ako sa pripraviť na e-faktúru — Praktický sprievodca krok za krokom',
    description:
      'Kompletný postup prípravy na e-fakturáciu na Slovensku. 6 krokov od auditu softvéru po školenie zamestnancov.',
    path: '/ako-sa-pripravit-na-e-fakturu',
  });

  // HowTo JSON-LD (rich snippets)
  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Ako sa pripraviť na e-faktúru na Slovensku',
    description:
      'Praktický sprievodca prípravou na povinnú e-fakturáciu na Slovensku — od auditu súčasného stavu po testovanie a školenie.',
    totalTime: 'P14D',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'EUR',
      value: '0',
    },
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Audit aktuálneho stavu',
        text: 'Zistite, aký fakturačný softvér používate, overte jeho Peppol podporu a skontrolujte počet B2B faktúr mesačne.',
        url: `${pageUrl}#krok-1`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Výber fakturačného softvéru',
        text: 'Ak váš súčasný softvér nepodporuje Peppol a UBL, vyberte nový. Kľúčové kritériá: Peppol ready, API integrácia, podpora UBL 2.1.',
        url: `${pageUrl}#krok-2`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Výber digitálneho poštára',
        text: 'Vyberte si certifikovaného Peppol Access Point providera. Porovnajte cenu, podporu, SLA a dostupné integrácie.',
        url: `${pageUrl}#krok-3`,
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Registrácia v Peppol sieti',
        text: 'Získajte Peppol ID vo formáte 0245:XXXXXXXXXX cez vybraného digitálneho poštára. Proces trvá 1-2 pracovné dni.',
        url: `${pageUrl}#krok-4`,
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Testovanie v dobrovoľnej fáze',
        text: 'Od Q2 2026 môžete odosielať testovacie faktúry, overiť prijímanie a vyladiť celý proces pred povinným spustením.',
        url: `${pageUrl}#krok-5`,
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'Úprava interných procesov',
        text: 'Zaškoľte zamestnancov, aktualizujte interné workflow a informujte dodávateľov aj odberateľov o zmene.',
        url: `${pageUrl}#krok-6`,
      },
    ],
  };

  return (
    <ContentLayout
      locale="sk"
      breadcrumbs={[
        { label: 'Sprievodca', href: '/co-je-e-faktura' },
        { label: 'Ako sa pripraviť na e-faktúru' },
      ]}
      jsonLd={[articleJsonLd, howToJsonLd]}
      hero={{
        title: 'Ako sa pripraviť na e-faktúru',
        description:
          'Prechod na e-fakturáciu nemusí byť komplikovaný. Tento sprievodca vás prevedie celým procesom — od auditu aktuálneho stavu cez výber softvéru a digitálneho poštára až po testovanie a školenie zamestnancov. Stačí 6 krokov a budete pripravení.',
        lastUpdated: 'Marec 2026',
        sources: ['Zákon 385/2025 Z.z.'],
        readingTime: 10,
      }}
    >

        {/* ── Prečo sa pripraviť včas ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Prečo sa pripraviť už teraz?
        </h2>

        <p>
          Od{' '}
          <Link href="/kedy-zacne-platit-e-faktura" className="text-[var(--accent)]">
            1. januára 2027
          </Link>{' '}
          bude e-faktúra povinná pre všetkých platiteľov DPH na Slovensku.
          Dobrovoľná fáza začína už v <strong>Q2 2026</strong> — a práve to je
          ideálny čas na prípravu. Firmy, ktoré sa pripravia včas, sa vyhnú
          stresu, chybám aj{' '}
          <Link href="/pokuty-za-e-fakturu" className="text-[var(--accent)]">
            pokutám až do 10 000 EUR
          </Link>
          .
        </p>

        <p>
          Celý proces prípravy zvládnete za <strong>2 až 4 týždne</strong>,
          ale odporúčame začať čo najskôr. Nižšie nájdete 6 konkrétnych krokov.
        </p>

        {/* ── Krok 1 ── */}
        <h2 id="krok-1" className="font-black text-[var(--text-primary)]">
          <Search className="mr-2 inline h-6 w-6 text-[var(--accent)]" />
          Krok 1 — Audit aktuálneho stavu
        </h2>

        <p>
          Prvý krok je zistiť, kde sa nachádzate. Odpovedzte si na tri kľúčové
          otázky:
        </p>

        <h3 className="font-black text-[var(--text-primary)]">
          Aký fakturačný softvér používate?
        </h3>

        <p>
          Zapíšte si názov a verziu vášho účtovného programu. Najrozšírenejšie
          na Slovensku sú Pohoda, SuperFaktúra, iDoklad, KROS Omega, Money S3
          či Billdu. Každý z nich má rôznu úroveň pripravenosti na e-fakturáciu.
        </p>

        <h3 className="font-black text-[var(--text-primary)]">
          Podporuje váš softvér Peppol?
        </h3>

        <p>
          Overte, či váš program už podporuje odosielanie a prijímanie cez{' '}
          <Link href="/peppol-slovensko" className="text-[var(--accent)]">
            Peppol sieť
          </Link>
          . Na našej stránke{' '}
          <Link href="/integracie" className="text-[var(--accent)]">
            prehľad integrácií
            <ArrowRight className="ml-1 inline h-4 w-4" />
          </Link>{' '}
          nájdete aktuálny zoznam softvérov s Peppol podporou.
        </p>

        <h3 className="font-black text-[var(--text-primary)]">
          Koľko B2B faktúr vystavujete mesačne?
        </h3>

        <p>
          Zistite objem — počet faktúr ovplyvní výber digitálneho poštára aj
          cenový plán. Firmy s 10 faktúrami mesačne majú iné potreby ako firmy
          so 500. Ak vystavujete aj B2G faktúry (pre štátne inštitúcie),
          zahrňte ich do prehľadu.
        </p>

        <div className="rounded-lg border border-[var(--accent)]/20 bg-[var(--bg-surface)] p-4">
          <p className="text-sm">
            <ClipboardCheck className="mr-1 inline h-4 w-4 text-[var(--accent)]" />
            <strong>Výstup kroku 1:</strong> Máte jasný prehľad o aktuálnom
            softvéri, jeho Peppol pripravenosti a mesačnom objeme faktúr.
          </p>
        </div>

        {/* ── Krok 2 ── */}
        <h2 id="krok-2" className="font-black text-[var(--text-primary)]">
          <Monitor className="mr-2 inline h-6 w-6 text-[var(--accent)]" />
          Krok 2 — Výber fakturačného softvéru (ak treba zmeniť)
        </h2>

        <p>
          Ak váš súčasný softvér <strong>nepodporuje Peppol</strong> a
          výrobca neoznámil aktualizáciu do konca roka 2026, je čas hľadať
          alternatívu. Ak už máte Peppol-ready softvér, tento krok preskočte.
        </p>

        <p>
          Pri výbere nového fakturačného softvéru sledujte tieto kľúčové
          kritériá:
        </p>

        <ul>
          <li>
            <strong>Peppol ready</strong> — softvér musí vedieť odosielať a
            prijímať e-faktúry cez Peppol sieť
          </li>
          <li>
            <strong>Podpora UBL 2.1</strong> — generovanie XML vo formáte{' '}
            <Link href="/slovnik/ubl-21" className="text-[var(--accent)]">
              UBL 2.1
            </Link>{' '}
            podľa{' '}
            <Link href="/slovnik/en-16931" className="text-[var(--accent)]">
              EN 16931
            </Link>
          </li>
          <li>
            <strong>API integrácia</strong> — možnosť napojenia na ďalšie
            systémy (ERP, CRM, e-shop)
          </li>
          <li>
            <strong>Automatický e-reporting</strong> — odosielanie údajov
            finančnej správe v reálnom čase
          </li>
          <li>
            <strong>Migrácia dát</strong> — jednoduchý import existujúcich
            kontaktov a faktúr
          </li>
        </ul>

        <p>
          Aktuálne porovnanie softvérov nájdete na{' '}
          <Link href="/integracie" className="text-[var(--accent)]">
            stránke integrácií
            <ArrowRight className="ml-1 inline h-4 w-4" />
          </Link>
        </p>

        {/* Partner CTA — 8888.sk */}
        <PartnerCTA
          partner="8888"
          pagePath="/ako-sa-pripravit-na-e-fakturu"
          locale="sk"
        />

        {/* ── Krok 3 ── */}
        <h2 id="krok-3" className="font-black text-[var(--text-primary)]">
          <Mail className="mr-2 inline h-6 w-6 text-[var(--accent)]" />
          Krok 3 — Výber digitálneho poštára
        </h2>

        <p>
          Digitálny poštár (certifikovaný Peppol Access Point) je
          sprostredkovateľ, ktorý zabezpečuje doručenie e-faktúr cez{' '}
          <Link href="/peppol-slovensko" className="text-[var(--accent)]">
            Peppol sieť
          </Link>
          . Bez neho nemôžete odosielať ani prijímať e-faktúry. Viac o tom, čo
          digitálny poštár robí, nájdete na stránke{' '}
          <Link href="/digitalni-postari" className="text-[var(--accent)]">
            Digitálni poštári
          </Link>
          .
        </p>

        <p>
          Pri výbere digitálneho poštára porovnávajte:
        </p>

        <ul>
          <li>
            <strong>Cena</strong> — mesačný poplatok + cena za faktúru.
            Niektorí ponúkajú paušál, iní platbu za kus.
          </li>
          <li>
            <strong>Podpora</strong> — dostupnosť technickej podpory, jazyk
            (slovenčina), reakčné časy.
          </li>
          <li>
            <strong>SLA (Service Level Agreement)</strong> — garantovaná
            dostupnosť služby, zvyčajne 99,5 % a viac.
          </li>
          <li>
            <strong>Integrácie</strong> — hotové napojenie na váš fakturačný
            softvér. Čím menej manuálnej práce, tým lepšie.
          </li>
          <li>
            <strong>Onboarding</strong> — pomoc s nastavením, testovaním a
            migráciou.
          </li>
        </ul>

        <p>
          Kompletné porovnanie digitálnych poštárov nájdete na{' '}
          <a
            href="https://digitalnipostari.sk"
            target="_blank"
            rel="noopener"
            className="text-[var(--accent)]"
          >
            digitalnipostari.sk
            <ArrowRight className="ml-1 inline h-4 w-4" />
          </a>
        </p>

        {/* ── Krok 4 ── */}
        <h2 id="krok-4" className="font-black text-[var(--text-primary)]">
          <Network className="mr-2 inline h-6 w-6 text-[var(--accent)]" />
          Krok 4 — Registrácia v Peppol sieti
        </h2>

        <p>
          Po výbere digitálneho poštára nasleduje registrácia v{' '}
          <Link href="/peppol-slovensko" className="text-[var(--accent)]">
            Peppol sieti
          </Link>
          . Registrácia prebieha cez vášho vybraného poštára — nie priamo.
        </p>

        <h3 className="font-black text-[var(--text-primary)]">
          Čo je Peppol ID?
        </h3>

        <p>
          Peppol ID je vaša jedinečná adresa v Peppol sieti. Na Slovensku má
          formát <strong>0245:XXXXXXXXXX</strong>, kde XXXXXXXXXX je vaše{' '}
          <strong>DIČ</strong> (daňové identifikačné číslo). Tento identifikátor
          umožňuje odosielateľovi nájsť vášho digitálneho poštára a doručiť
          vám faktúru.
        </p>

        <h3 className="font-black text-[var(--text-primary)]">
          Ako registrácia prebieha?
        </h3>

        <ol>
          <li>
            Kontaktujete vybraného digitálneho poštára a požiadate o registráciu.
          </li>
          <li>
            Poskytnete údaje: IČO, DIČ, IČ DPH, obchodné meno, kontaktné údaje.
          </li>
          <li>
            Poštár zaregistruje vašu firmu v Peppol adresári (SMP — Service
            Metadata Publisher).
          </li>
          <li>
            Získate Peppol ID a ste pripravení prijímať e-faktúry.
          </li>
        </ol>

        <div className="rounded-lg border border-[var(--accent)]/20 bg-[var(--bg-surface)] p-4">
          <p className="text-sm">
            <Calendar className="mr-1 inline h-4 w-4 text-[var(--accent)]" />
            <strong>Časový odhad:</strong> Registrácia trvá zvyčajne{' '}
            <strong>1 až 2 pracovné dni</strong>. Niektorí poskytovatelia
            ponúkajú expresnú registráciu do 24 hodín.
          </p>
        </div>

        {/* ── Krok 5 ── */}
        <h2 id="krok-5" className="font-black text-[var(--text-primary)]">
          <TestTube className="mr-2 inline h-6 w-6 text-[var(--accent)]" />
          Krok 5 — Testovanie v dobrovoľnej fáze
        </h2>

        <p>
          Od <strong>Q2 2026</strong> spúšťa slovenská Finančná správa
          dobrovoľnú fázu e-fakturácie. To je vaša príležitosť otestovať celý
          proces <strong>bez rizika pokút</strong> a odstrániť prípadné
          problémy ešte pred ostrým štartom 1.1.2027.
        </p>

        <h3 className="font-black text-[var(--text-primary)]">
          Čo testovať?
        </h3>

        <ul>
          <li>
            <strong>Odoslanie testovacej faktúry</strong> — vystavte e-faktúru a
            odošlite ju cez Peppol sieť spolupracujúcemu partnerovi. Overte, že
            XML obsahuje všetky povinné údaje.
          </li>
          <li>
            <strong>Prijatie e-faktúry</strong> — požiadajte partnera alebo
            poštára o odoslanie testovacej faktúry na vašu adresu. Skontrolujte,
            že ju váš softvér správne naimportoval.
          </li>
          <li>
            <strong>Automatické spracovanie</strong> — overte, že prijaté
            faktúry sa automaticky načítajú do účtovníctva bez manuálneho
            zásahu.
          </li>
          <li>
            <strong>E-reporting</strong> — skontrolujte, že údaje sa správne
            odoslali finančnej správe.
          </li>
        </ul>

        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-sm">
            <strong>Tip:</strong> Dohodnite sa s 2-3 obchodnými partnermi, že
            budete testovať spoločne. Vzájomné odosielanie testovacích faktúr
            je najlepší spôsob, ako overiť celý reťazec.
          </p>
        </div>

        {/* ── Krok 6 ── */}
        <h2 id="krok-6" className="font-black text-[var(--text-primary)]">
          <Users className="mr-2 inline h-6 w-6 text-[var(--accent)]" />
          Krok 6 — Úprava interných procesov
        </h2>

        <p>
          Technická pripravenosť je len polovica úspechu. Rovnako dôležité je
          pripraviť ľudí a procesy vo firme.
        </p>

        <h3 className="font-black text-[var(--text-primary)]">
          Školenie zamestnancov
        </h3>

        <p>
          Každý, kto vystavuje alebo spracováva faktúry, musí vedieť, ako nový
          systém funguje. Zamerajte sa na:
        </p>

        <ul>
          <li>Ako vystaviť e-faktúru vo vašom softvéri</li>
          <li>Ako skontrolovať stav odoslania</li>
          <li>Ako spracovať prijatú e-faktúru</li>
          <li>Čo robiť, ak odoslanie zlyhá (error handling)</li>
        </ul>

        <h3 className="font-black text-[var(--text-primary)]">
          Aktualizácia workflow
        </h3>

        <p>
          Prejdite si interné procesy a upravte ich. Napríklad:
        </p>

        <ul>
          <li>
            Nahraďte manuálne odosielanie PDF faktúr e-mailom za automatické
            odoslanie cez Peppol
          </li>
          <li>
            Nastavte automatické schvaľovanie prijatých faktúr (workflow
            approval)
          </li>
          <li>
            Aktualizujte smernice o archivácii — e-faktúry sa archivujú
            digitálne
          </li>
        </ul>

        <h3 className="font-black text-[var(--text-primary)]">
          Komunikácia s dodávateľmi a odberateľmi
        </h3>

        <p>
          Informujte svojich obchodných partnerov o prechode na e-fakturáciu.
          Pošlite im:
        </p>

        <ul>
          <li>
            Vaše <strong>Peppol ID</strong> (aby vám vedeli posielať e-faktúry)
          </li>
          <li>
            Dátum, od kedy budete e-faktúry <strong>vystavovať</strong>
          </li>
          <li>
            Dátum, od kedy budete e-faktúry <strong>vyžadovať</strong> od nich
          </li>
          <li>
            Odkaz na{' '}
            <Link href="/co-je-e-faktura" className="text-[var(--accent)]">
              Čo je e-faktúra
            </Link>{' '}
            — pre partnerov, ktorí ešte nepoznajú tému
          </li>
        </ul>

        {/* Partner CTA — digitalnipostari.sk */}
        <PartnerCTA
          partner="digitalnipostari"
          pagePath="/ako-sa-pripravit-na-e-fakturu"
          locale="sk"
        />

        {/* ── Časový plán ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          <Calendar className="mr-2 inline h-6 w-6 text-[var(--accent)]" />
          Časový plán prípravy
        </h2>

        <p>
          Rozložte prípravu do troch fáz podľa nasledujúceho harmonogramu:
        </p>

        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Obdobie</th>
                <th>Čo robiť</th>
                <th>Priorita</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Teraz (Q1-Q2 2026)</strong>
                </td>
                <td>
                  Audit softvéru, výber digitálneho poštára, Peppol registrácia
                </td>
                <td className="text-[var(--accent)]">
                  <CheckCircle2 className="mr-1 inline h-4 w-4" /> Kritická
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Q3 2026</strong>
                </td>
                <td>
                  Testovanie v dobrovoľnej fáze, školenie zamestnancov,
                  komunikácia s partnermi
                </td>
                <td className="text-[var(--accent)]">
                  <CheckCircle2 className="mr-1 inline h-4 w-4" /> Vysoká
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Q4 2026</strong>
                </td>
                <td>
                  Finálne ladenie, aktualizácia interných smerníc, kontrola
                  pripravenosti pred 1.1.2027
                </td>
                <td className="text-[var(--accent)]">
                  <CheckCircle2 className="mr-1 inline h-4 w-4" /> Stredná
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Podrobný prehľad všetkých dátumov nájdete na stránke{' '}
          <Link href="/kedy-zacne-platit-e-faktura" className="text-[var(--accent)]">
            Kedy začne platiť e-faktúra
            <ArrowRight className="ml-1 inline h-4 w-4" />
          </Link>
        </p>

        {/* ── FAQ ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Časté otázky o príprave na e-faktúru
        </h2>

        <h3 className="font-black text-[var(--text-primary)]">
          Koľko stojí prechod na e-fakturáciu?
        </h3>
        <p>
          Pre väčšinu malých firiem je prechod{' '}
          <strong>bezplatný alebo s minimálnymi nákladmi</strong>. Ak váš
          fakturačný softvér už podporuje Peppol, platíte len za služby
          digitálneho poštára — zvyčajne od{' '}
          <strong>5 do 30 EUR mesačne</strong> v závislosti od objemu faktúr. Ak
          musíte zmeniť softvér, náklady na migráciu sa líšia podľa rozsahu.
        </p>

        <h3 className="font-black text-[var(--text-primary)]">
          Čo ak nestihnem termín 1.1.2027?
        </h3>
        <p>
          Nesplnenie povinnosti vystavovať e-faktúry je sankcionované pokutou
          až <strong>10 000 EUR</strong>, pri opakovanom porušení až{' '}
          <strong>100 000 EUR</strong>. Preto odporúčame začať s prípravou čo
          najskôr. Viac na stránke{' '}
          <Link href="/pokuty-za-e-fakturu" className="text-[var(--accent)]">
            Pokuty a sankcie za e-faktúru
          </Link>
          .
        </p>

        <h3 className="font-black text-[var(--text-primary)]">
          Musím meniť fakturačný softvér?
        </h3>
        <p>
          Nie nutne. Väčšina moderných fakturačných programov na Slovensku
          (SuperFaktúra, iDoklad, Pohoda a ďalšie) pracuje na Peppol
          integrácii alebo ju už má hotovú. Skontrolujte aktuálny stav na{' '}
          <Link href="/integracie" className="text-[var(--accent)]">
            stránke integrácií
          </Link>
          . Ak váš softvér oznámil podporu do konca 2026, stačí počkať na
          aktualizáciu.
        </p>

        {/* ── Záver ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Zhrnutie: 6 krokov k pripravenosti
        </h2>

        <ol>
          <li>
            <CheckCircle2 className="mr-1 inline h-4 w-4 text-[var(--accent)]" />
            <strong>Audit</strong> — zistite, čo máte a čo chýba
          </li>
          <li>
            <CheckCircle2 className="mr-1 inline h-4 w-4 text-[var(--accent)]" />
            <strong>Softvér</strong> — overte alebo zmeňte fakturačný program
          </li>
          <li>
            <CheckCircle2 className="mr-1 inline h-4 w-4 text-[var(--accent)]" />
            <strong>Poštár</strong> — vyberte si certifikovaného Peppol
            providera
          </li>
          <li>
            <CheckCircle2 className="mr-1 inline h-4 w-4 text-[var(--accent)]" />
            <strong>Peppol</strong> — zaregistrujte sa a získajte Peppol ID
          </li>
          <li>
            <CheckCircle2 className="mr-1 inline h-4 w-4 text-[var(--accent)]" />
            <strong>Test</strong> — otestujte v dobrovoľnej fáze od Q2 2026
          </li>
          <li>
            <CheckCircle2 className="mr-1 inline h-4 w-4 text-[var(--accent)]" />
            <strong>Procesy</strong> — zaškoľte ľudí a informujte partnerov
          </li>
        </ol>

        <p>
          Príprava na e-faktúru je investícia do budúcnosti vašej firmy.
          Automatizácia fakturácie ušetrí čas, zníži chybovosť a zrýchli
          platby. <strong>Začnite ešte dnes</strong> — prejdite na{' '}
          <Link href="/integracie" className="text-[var(--accent)]">
            prehľad integrácií
          </Link>
          , porovnajte{' '}
          <a
            href="https://digitalnipostari.sk"
            target="_blank"
            rel="noopener"
            className="text-[var(--accent)]"
          >
            digitálnych poštárov
          </a>{' '}
          a{' '}
          <Link href="/kedy-zacne-platit-e-faktura" className="text-[var(--accent)]">
            sledujte termíny
          </Link>
          .
        </p>
    </ContentLayout>
  );
}
