/**
 * Pillar Page: Kedy začne platiť e-faktúra
 *
 * Cluster 2 — target keywords: "kedy začne platiť e-faktúra", "povinná e-faktúra 2027", "e-fakturácia od kedy"
 * Content: 1500+ words, comprehensive pillar page
 * Schema: Article + FAQPage + BreadcrumbList JSON-LD
 *
 * Internal links to:
 * - /co-je-e-faktura (Cluster 1)
 * - /ako-sa-pripravit-na-e-fakturu (Cluster 4)
 * - /pokuty-za-e-fakturu (Cluster 5)
 * - /digitalni-postari (Cluster 6 → digitalnipostari.sk bridge)
 * - /peppol-slovensko (Cluster 7)
 * - /integracie (Cluster 8)
 * - /e-faktura-pre-zivnostnikov
 *
 * Partner auto-links:
 * - 8888.sk (accounting mention)
 * - digitalnipostari.sk (digital postman mention)
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar, CheckCircle2, Clock, AlertTriangle, Info } from 'lucide-react';
import { createMetadata } from '@jakubnovak710/universal-web-core/lib/metadata';
import { ContentLayout } from '@/components/layouts/content-layout';
import { buildArticleJsonLd } from '@/components/seo';
import { PartnerCTA } from '@/components/partner-cta';

export function generateMetadata(): Metadata {
  return createMetadata({
    title: 'Kedy začne platiť e-faktúra — Termíny a harmonogram 2026–2030',
    description:
      'Kedy začne platiť povinná e-faktúra na Slovensku? Kompletný harmonogram: dobrovoľná fáza 2026, povinnosť od 1.1.2027, cezhraničné transakcie od 2030. Zákon 385/2025 Z.z.',
    keywords: [
      'kedy začne platiť e-faktúra',
      'povinná e-faktúra 2027',
      'e-fakturácia od kedy',
      'e-faktúra slovensko termíny',
      'zákon 385/2025',
      'e-faktúra harmonogram',
      'ViDA smernica',
    ],
  });
}

export default function KedyZacnePlatitEFakturaPage() {
  const articleJsonLd = buildArticleJsonLd({
    headline: 'Kedy začne platiť e-faktúra na Slovensku — Kompletný harmonogram',
    description:
      'Kompletný harmonogram zavedenia povinnej e-faktúry na Slovensku: dobrovoľná fáza 2026, povinnosť od 1.1.2027, cezhraničné transakcie od 2030.',
    path: '/kedy-zacne-platit-e-faktura',
  });

  // FAQ JSON-LD
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Od kedy je e-faktúra povinná na Slovensku?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Povinná e-faktúra na Slovensku platí od 1. januára 2027 pre všetkých platiteľov DPH pri tuzemských B2B a B2G transakciách. Zákon 385/2025 Z.z. bol schválený 9. decembra 2025.',
        },
      },
      {
        '@type': 'Question',
        name: 'Môžem začať s e-faktúrou skôr ako v roku 2027?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Áno. Od Q2 2026 beží dobrovoľná fáza, v ktorej sa môžete zaregistrovať v Peppol sieti, otestovať odosielanie a prijímanie e-faktúr a vyladiť svoje systémy pred povinným termínom.',
        },
      },
      {
        '@type': 'Question',
        name: 'Čo je ViDA smernica a ako ovplyvní e-fakturáciu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ViDA (VAT in the Digital Age) je smernica EÚ 2025/516, ktorá od 1.7.2030 zavádza povinný e-reporting a e-fakturáciu pre cezhraničné (cross-border) B2B transakcie v celej EÚ. Slovensko ju implementuje paralelne s tuzemskou e-fakturáciou.',
        },
      },
    ],
  };

  return (
    <ContentLayout
      locale="sk"
      breadcrumbs={[
        { label: 'Sprievodca', href: '/co-je-e-faktura' },
        { label: 'Kedy začne platiť e-faktúra' },
      ]}
      jsonLd={[articleJsonLd, faqJsonLd]}
      hero={{
        title: 'Kedy začne platiť e-faktúra na Slovensku',
        description:
          'Povinná elektronická faktúra na Slovensku začne platiť 1. januára 2027. Zákon 385/2025 Z.z., schválený 9. decembra 2025, zavádza postupný harmonogram s dobrovoľnou fázou od roku 2026 až po plné pokrytie cezhraničných transakcií v roku 2030. V tomto článku nájdete kompletný prehľad všetkých termínov a povinností.',
        lastUpdated: 'Marec 2026',
        sources: ['Zákon 385/2025 Z.z.', 'Smernica EÚ 2025/516 (ViDA)', 'Finančná správa SR'],
        readingTime: 6,
      }}
    >

        {/* ── Legislatívny základ ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Legislatívny základ
        </h2>

        <p>
          Právnym základom povinnej e-fakturácie na Slovensku je{' '}
          <strong>zákon 385/2025 Z.z.</strong> — novela zákona č. 222/2004
          Z.z. o <a href="https://sk.wikipedia.org/wiki/Da%C5%88_z_pridanej_hodnoty" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)]">dani z pridanej hodnoty</a>. Národná rada SR tento zákon
          schválila <strong>9. decembra 2025</strong>. Zákon transponuje
          požiadavky európskej smernice{' '}
          <strong>ViDA (VAT in the Digital Age) — smernica EÚ 2025/516</strong>,
          ktorá zavádza jednotné pravidlá e-fakturácie naprieč celou
          Európskou úniou.
        </p>

        <p>
          Slovensko patrí medzi prvé krajiny EÚ, ktoré implementujú ViDA
          smernicu do národnej legislatívy. Zákon definuje:
        </p>

        <ul>
          <li>
            <strong>Povinný formát</strong> — <a href="https://sk.wikipedia.org/wiki/Kateg%C3%B3ria:XML" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)]">XML</a> podľa európskeho štandardu
            EN 16931 (Peppol BIS Billing 3.0)
          </li>
          <li>
            <strong>Doručovací kanál</strong> — výhradne cez{' '}
            <Link href="/peppol-slovensko" className="text-[var(--accent)]">
              Peppol sieť
            </Link>{' '}
            prostredníctvom certifikovaných{' '}
            <Link href="/digitalni-postari" className="text-[var(--accent)]">
              digitálnych poštárov
            </Link>
          </li>
          <li>
            <strong>Automatický e-reporting</strong> — údaje z faktúr sa v
            reálnom čase odosielajú <a href="https://www.financnasprava.sk/sk/titulna-stranka" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)]">finančnej správe</a>
          </li>
          <li>
            <strong>Sankcie</strong> — pokuty za nesplnenie povinností až{' '}
            <Link href="/pokuty-za-e-fakturu" className="text-[var(--accent)]">
              100 000 EUR
            </Link>
          </li>
        </ul>

        <p>
          Ak si nie ste istí, čo presne e-faktúra je a ako sa líši od PDF
          faktúry, prečítajte si najskôr náš{' '}
          <Link href="/co-je-e-faktura" className="text-[var(--accent)]">
            kompletný sprievodca: Čo je e-faktúra
          </Link>
          .
        </p>

        {/* ── Kľúčové termíny (timeline) ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Kľúčové termíny — harmonogram zavedenia
        </h2>

        <p>
          Zavedenie povinnej e-fakturácie prebieha v niekoľkých fázach. Tu
          je kompletný harmonogram:
        </p>

        {/* Timeline: Q2 2026 */}
        <div className="my-6 rounded-lg border border-[var(--accent)]/20 bg-[var(--bg-surface)] p-5">
          <div className="flex items-start gap-3">
            <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                Q2 2026
              </p>
              <p className="mt-1 text-lg font-black text-[var(--text-primary)]">
                Dobrovoľná fáza
              </p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Finančná správa zverejní <strong>zoznam certifikovaných
                digitálnych poštárov</strong> (Peppol Access Pointov).
                Podnikatelia sa môžu dobrovoľne zaregistrovať v Peppol
                sieti, začať odosielať a prijímať e-faktúry a otestovať
                svoje systémy. Toto je ideálny čas na prípravu — bez
                právnych dôsledkov za prípadné chyby.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline: 1.1.2027 */}
        <div className="my-6 rounded-lg border border-[var(--accent)]/20 bg-[var(--bg-surface)] p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                1. Január 2027
              </p>
              <p className="mt-1 text-lg font-black text-[var(--text-primary)]">
                Povinná e-faktúra pre tuzemské B2B/B2G
              </p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Všetci <strong>platitelia DPH</strong> usadení na Slovensku
                musia vystavovať a prijímať e-faktúry pri tuzemských B2B
                (firma-firma) a B2G (firma-štát) transakciách. PDF faktúry
                už nebudú spĺňať zákonné požiadavky. Lehota na vystavenie
                e-faktúry je <strong>10 dní</strong> od dodania
                tovaru/služby alebo prijatia platby.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline: 1.7.2027 */}
        <div className="my-6 rounded-lg border border-[var(--accent)]/20 bg-[var(--bg-surface)] p-5">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                1. Júl 2027
              </p>
              <p className="mt-1 text-lg font-black text-[var(--text-primary)]">
                Povinná certifikovaná doručovacia služba
              </p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Od tohto dátumu je povinné doručovať e-faktúry výhradne cez{' '}
                <strong>certifikovaného digitálneho poštára</strong>{' '}
                (Peppol Access Point). V prechodnom období od 1.1.2027 do
                30.6.2027 bude možné doručovať aj alternatívnymi
                elektronickými kanálmi, ale po 1.7.2027 už len cez Peppol.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline: 1.7.2030 */}
        <div className="my-6 rounded-lg border border-[var(--accent)]/20 bg-[var(--bg-surface)] p-5">
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                1. Júl 2030
              </p>
              <p className="mt-1 text-lg font-black text-[var(--text-primary)]">
                Cezhraničné transakcie (ViDA smernica)
              </p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Na základe smernice EÚ 2025/516 (ViDA) sa povinná
                e-fakturácia rozšíri na <strong>cezhraničné (cross-border)
                B2B transakcie</strong> v rámci celej EÚ. Zároveň sa
                zavedú pravidlá pre neplatiteľov DPH, ktorí budú musieť
                e-faktúry nielen prijímať, ale aj vystavovať.
              </p>
            </div>
          </div>
        </div>

        {/* ── Čo sa zmení pre platiteľov DPH ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Čo sa zmení pre platiteľov DPH
        </h2>

        <p>
          Pre platiteľov DPH usadených na Slovensku prináša zákon 385/2025
          Z.z. zásadné zmeny v spôsobe fakturácie. Od 1. januára 2027
          platia tieto povinnosti:
        </p>

        <ul>
          <li>
            <strong>Povinný XML formát</strong> — Všetky tuzemské B2B a B2G
            faktúry musia byť vo formáte XML podľa EN 16931. PDF, e-mail
            alebo papierová faktúra už nebudú akceptované ako platná faktúra.
          </li>
          <li>
            <strong>Doručenie cez Peppol</strong> — Faktúry sa doručujú
            výhradne cez{' '}
            <Link href="/peppol-slovensko" className="text-[var(--accent)]">
              Peppol sieť
            </Link>
            , nie e-mailom. Na to potrebujete certifikovaného{' '}
            <Link href="/digitalni-postari" className="text-[var(--accent)]">
              digitálneho poštára
            </Link>
            .
          </li>
          <li>
            <strong>Real-time reporting</strong> — Dáta z každej faktúry sa
            automaticky odosielajú finančnej správe v reálnom čase. Koniec
            štvrťročných DPH priznaní v ich súčasnej podobe — finančná
            správa bude mať prehľad o transakciách priebežne.
          </li>
          <li>
            <strong>Lehota 10 dní</strong> — E-faktúru musíte vystaviť do
            10 dní od dodania tovaru/služby alebo od prijatia platby
            (podľa toho, čo nastane skôr). Pri nesplnení hrozia{' '}
            <Link href="/pokuty-za-e-fakturu" className="text-[var(--accent)]">
              pokuty až do 10 000 EUR
            </Link>
            .
          </li>
          <li>
            <strong>Peppol ID</strong> — Každý subjekt potrebuje
            identifikátor v Peppol sieti (formát 0245:XXXXXXXXXX, kde X je
            vaše DIČ). Registráciu zabezpečí váš digitálny poštár.
          </li>
        </ul>

        <p>
          Ak používate účtovný softvér ako Pohoda, SuperFaktúra alebo
          iDoklad, skontrolujte na{' '}
          <Link href="/integracie" className="text-[var(--accent)]">
            prehľade integrácií
          </Link>{' '}
          či váš program už podporuje Peppol. Väčšina veľkých poskytovateľov
          pripravuje aktualizácie na rok 2026.
        </p>

        {/* Partner CTA — 8888.sk */}
        <PartnerCTA partner="8888" pagePath="/kedy-zacne-platit-e-faktura" locale="sk" />

        {/* ── Čo sa zmení pre neplatiteľov DPH ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Čo sa zmení pre neplatiteľov DPH
        </h2>

        <p>
          Ak nie ste platiteľom DPH (typicky menší{' '}
          <Link href="/e-faktura-pre-zivnostnikov" className="text-[var(--accent)]">
            živnostníci
          </Link>{' '}
          alebo malé firmy s obratom pod hranicou registrácie), zákon vás
          tiež ovplyvní, aj keď v menšej miere:
        </p>

        <ul>
          <li>
            <strong>Povinnosť prijímať e-faktúry</strong> — Od 1.1.2027
            musíte byť schopní prijať e-faktúru od svojich dodávateľov.
            Ak vám platiteľ DPH vystaví faktúru, príde v XML formáte cez
            Peppol — nie ako PDF v e-maile.
          </li>
          <li>
            <strong>Registrácia v Peppol sieti</strong> — Aby ste mohli
            e-faktúry prijímať, potrebujete{' '}
            <Link href="/peppol-slovensko" className="text-[var(--accent)]">
              Peppol ID
            </Link>{' '}
            a digitálneho poštára. Registrácia je zvyčajne jednoduchá a
            často bezplatná pre prijímanie.
          </li>
          <li>
            <strong>Vystavovanie zatiaľ dobrovoľné</strong> — Neplatitelia
            DPH nemajú povinnosť e-faktúry vystavovať minimálne do
            30.6.2030. Ale odporúčame zvážiť dobrovoľné vystavovanie — zníži
            to administratívnu záťaž a pripraví vás na budúce povinnosti.
          </li>
        </ul>

        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="flex items-start gap-2 text-sm">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
            <span>
              <strong>Pozor:</strong> Aj keď nemusíte vystavovať e-faktúry,
              bez registrácie v Peppol nebudete vedieť prijímať faktúry od
              dodávateľov. Odporúčame sa zaregistrovať čo najskôr — ideálne
              počas dobrovoľnej fázy v roku 2026.
            </span>
          </p>
        </div>

        {/* ── Dobrovoľná fáza 2026 ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Dobrovoľná fáza 2026 — čo môžete robiť už teraz
        </h2>

        <p>
          Nemusíte čakať do januára 2027. Dobrovoľná fáza, ktorá
          začína v Q2 2026, je ideálna príležitosť na bezrizikové
          testovanie. Tu je, čo môžete urobiť:
        </p>

        <ol>
          <li>
            <strong>Overte svoj účtovný softvér</strong> — Skontrolujte na{' '}
            <Link href="/integracie" className="text-[var(--accent)]">
              stránke integrácií
            </Link>
            , či váš program podporuje alebo plánuje podporovať Peppol
            a XML formát EN 16931.
          </li>
          <li>
            <strong>Vyberte si digitálneho poštára</strong> — Porovnajte
            certifikovaných poskytovateľov na{' '}
            <a
              href="https://digitalnipostari.sk"
              target="_blank"
              rel="noopener"
              className="text-[var(--accent)]"
            >
              digitalnipostari.sk
            </a>{' '}
            a vyberte si podľa ceny, integrácií a služieb.
          </li>
          <li>
            <strong>Zaregistrujte sa v Peppol</strong> — Cez vybraného
            poštára získate Peppol ID. Proces trvá zvyčajne 1-3 pracovné
            dni.
          </li>
          <li>
            <strong>Otestujte odosielanie a prijímanie</strong> — Pošlite
            testovacie e-faktúry medzi svojimi firmami alebo s obchodnými
            partnermi, ktorí sú tiež v dobrovoľnej fáze.
          </li>
          <li>
            <strong>Zaškoľte tím</strong> — Účtovníci a fakturantky
            potrebujú pochopiť nový proces. Využite dobrovoľnú fázu na
            školenia bez časového tlaku.
          </li>
          <li>
            <strong>Nastavte interné procesy</strong> — Upravte workflow
            fakturácie, definujte kto zodpovedá za Peppol registráciu a
            kontakt s digitálnym poštárom.
          </li>
        </ol>

        <p>
          Kompletný postup prípravy nájdete v{' '}
          <Link href="/ako-sa-pripravit-na-e-fakturu" className="text-[var(--accent)]">
            sprievodcovi prípravou na e-faktúru
            <ArrowRight className="ml-1 inline h-4 w-4" />
          </Link>
        </p>

        {/* ── FAQ sekcia ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Časté otázky o termínoch e-fakturácie
        </h2>

        <h3 className="font-black text-[var(--text-primary)]">
          Od kedy je e-faktúra povinná na Slovensku?
        </h3>
        <p>
          Povinná e-faktúra na Slovensku platí od{' '}
          <strong>1. januára 2027</strong> pre všetkých platiteľov DPH pri
          tuzemských B2B a B2G transakciách. Zákon 385/2025 Z.z. bol
          schválený 9. decembra 2025. Pred povinným termínom beží od Q2 2026
          dobrovoľná fáza, počas ktorej sa môžete zaregistrovať a testovať
          systémy bez rizika sankcií.
        </p>

        <h3 className="font-black text-[var(--text-primary)]">
          Môžem začať s e-faktúrou skôr ako v roku 2027?
        </h3>
        <p>
          Áno, a dokonca to odporúčame. Od Q2 2026 beží dobrovoľná fáza, v
          ktorej sa môžete zaregistrovať v{' '}
          <Link href="/peppol-slovensko" className="text-[var(--accent)]">
            Peppol sieti
          </Link>
          , otestovať odosielanie a prijímanie e-faktúr a vyladiť svoje
          systémy. Firmy, ktoré sa pripravia v predstihu, sa vyhnú
          stresu a prípadným{' '}
          <Link href="/pokuty-za-e-fakturu" className="text-[var(--accent)]">
            pokutám
          </Link>{' '}
          po 1.1.2027.
        </p>

        <h3 className="font-black text-[var(--text-primary)]">
          Čo je ViDA smernica a ako ovplyvní e-fakturáciu?
        </h3>
        <p>
          ViDA (VAT in the Digital Age) je smernica EÚ 2025/516, ktorá od{' '}
          <strong>1.7.2030</strong> zavádza povinný e-reporting a
          e-fakturáciu pre cezhraničné (cross-border) B2B transakcie v celej
          EÚ. Pre slovenských podnikateľov to znamená, že od polovice 2030
          budú musieť e-faktúry vystavovať aj pri obchodovaní s firmami v
          iných členských štátoch — nie len pri tuzemských transakciách.
          Slovensko implementuje ViDA paralelne s národnou e-fakturáciou.
        </p>

        {/* Partner CTA — digitalnipostari.sk */}
        <PartnerCTA
          partner="digitalnipostari"
          pagePath="/kedy-zacne-platit-e-faktura"
          locale="sk"
        />

        {/* ── Záver ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Záver — nepodceňte prípravu
        </h2>

        <p>
          Termín 1. januára 2027 sa môže zdať vzdialený, ale príprava na
          e-fakturáciu vyžaduje čas — výber digitálneho poštára, integráciu
          so softvérom, registráciu v Peppol a zaškolenie tímu. Firmy,
          ktoré začnú v dobrovoľnej fáze 2026, budú mať obrovský náskok.
        </p>

        <p>
          <strong>Ďalšie kroky:</strong>
        </p>

        <ul>
          <li>
            Ak ešte neviete, čo je e-faktúra:{' '}
            <Link href="/co-je-e-faktura" className="text-[var(--accent)]">
              Čo je e-faktúra — kompletný sprievodca
            </Link>
          </li>
          <li>
            Praktický postup prípravy:{' '}
            <Link href="/ako-sa-pripravit-na-e-fakturu" className="text-[var(--accent)]">
              Ako sa pripraviť na e-faktúru
            </Link>
          </li>
          <li>
            Čo hrozí za nesplnenie:{' '}
            <Link href="/pokuty-za-e-fakturu" className="text-[var(--accent)]">
              Pokuty a sankcie
            </Link>
          </li>
          <li>
            Overenie vášho softvéru:{' '}
            <Link href="/integracie" className="text-[var(--accent)]">
              Prehľad integrácií
            </Link>
          </li>
          <li>
            Výber digitálneho poštára:{' '}
            <Link href="/digitalni-postari" className="text-[var(--accent)]">
              Digitálni poštári
            </Link>
          </li>
          <li>
            Ako funguje Peppol:{' '}
            <Link href="/peppol-slovensko" className="text-[var(--accent)]">
              Peppol na Slovensku
            </Link>
          </li>
          <li>
            Pre SZČO:{' '}
            <Link href="/e-faktura-pre-zivnostnikov" className="text-[var(--accent)]">
              E-faktúra pre živnostníkov
            </Link>
          </li>
        </ul>
    </ContentLayout>
  );
}
