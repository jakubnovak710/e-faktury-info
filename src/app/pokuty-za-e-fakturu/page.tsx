/**
 * Pillar Page: Pokuty a sankcie za e-faktúru
 *
 * Cluster 5 — Fear-driven, VERY HIGH CTR
 * Target keywords: "pokuty e-faktúra", "sankcie e-fakturácia", "pokuta za nevystavenie e-faktúry"
 * Content: 1500+ words, fear-driven pillar page
 * Schema: Article + FAQPage + BreadcrumbList JSON-LD
 *
 * Internal links to:
 * - /co-je-e-faktura (Cluster 1)
 * - /kedy-zacne-platit-e-faktura (Cluster 2)
 * - /ako-sa-pripravit-na-e-fakturu (Cluster 4)
 * - /integracie (Cluster 8)
 * - /e-faktura-pre-zivnostnikov (Cluster 3)
 * - /e-faktura-pre-male-firmy (Cluster 3)
 *
 * Partner auto-links:
 * - 8888.sk (accounting help to avoid penalties)
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  AlertTriangle,
  ShieldCheck,
  Scale,
  FileWarning,
  CheckCircle2,
} from 'lucide-react';
import { createMetadata } from '@jakubnovak710/universal-web-core/lib/metadata';
import { siteConfig } from '@config/site.config';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PartnerCTA } from '@/components/partner-cta';

export function generateMetadata(): Metadata {
  return createMetadata({
    title: 'Pokuty a sankcie za e-faktúru — Čo hrozí za nesplnenie povinností',
    description:
      'Prehľad pokút za e-faktúru na Slovensku: až 10 000 EUR za nevystavenie, 100 000 EUR pri opakovanom porušení. Kto kontroluje, ako sa chrániť a kedy sa pokute vyhnete.',
    keywords: [
      'pokuty e-faktúra',
      'sankcie e-fakturácia',
      'pokuta za nevystavenie e-faktúry',
      'pokuty e-fakturácia slovensko',
      'sankcie elektronická faktúra',
      'finančná správa pokuty',
      'pokuta 100 000 eur e-faktúra',
    ],
  });
}

export default function PokutyZaEFakturuPage() {
  const pageUrl = `${siteConfig.url}/pokuty-za-e-fakturu`;

  // Article JSON-LD
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Pokuty a sankcie za e-faktúru — Čo hrozí za nesplnenie povinností',
    description:
      'Prehľad pokút za e-faktúru na Slovensku: až 10 000 EUR za nevystavenie, 100 000 EUR pri opakovanom porušení.',
    datePublished: '2026-03-20',
    dateModified: '2026-03-20',
    author: { '@type': 'Organization', name: '8888 Servis s. r. o.' },
    publisher: { '@type': 'Organization', name: 'e-Faktúry.info', url: siteConfig.url },
    mainEntityOfPage: pageUrl,
  };

  // FAQ JSON-LD (embedded FAQ section)
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Aká je maximálna pokuta za nevystavenie e-faktúry?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Za nevystavenie e-faktúry hrozí pokuta do 10 000 EUR. Pri opakovanom porušení sa sankcia zvyšuje až na 100 000 EUR. Výšku pokuty určuje Finančná správa SR na základe závažnosti a okolností porušenia.',
        },
      },
      {
        '@type': 'Question',
        name: 'Môžem dostať pokutu, ak som e-faktúru poslal neskoro?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Áno. Oneskorené odoslanie e-faktúry cez Peppol sieť je porušenie zákona a Finančná správa SR môže uložiť pokutu do 10 000 EUR. E-faktúra musí byť odoslaná v lehote stanovenej zákonom o DPH.',
        },
      },
      {
        '@type': 'Question',
        name: 'Ako sa môžem vyhnúť pokutám za e-faktúru?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Najlepšia ochrana je prevencia: overte si, že váš účtovný softvér podporuje Peppol a EN 16931, zaregistrujte sa u certifikovaného digitálneho poštára, nastavte automatické odosielanie e-faktúr a pravidelne kontrolujte stav doručenia. Spolupráca s účtovníkom znalým e-fakturácie výrazne znižuje riziko chýb.',
        },
      },
    ],
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        locale="sk"
        items={[
          { label: 'Sprievodca', href: '/co-je-e-faktura' },
          { label: 'Pokuty a sankcie' },
        ]}
      />

      <article className="prose prose-invert max-w-none">
        {/* H1 — primary keyword */}
        <h1 className="font-black text-[var(--text-primary)]">
          Pokuty a sankcie za e-faktúru — Čo hrozí za nesplnenie povinností
        </h1>

        <p className="text-lg text-[var(--text-secondary)]">
          Od <strong>1. januára 2027</strong> je{' '}
          <Link href="/co-je-e-faktura" className="text-[var(--accent)]">
            elektronická faktúra (e-faktúra)
          </Link>{' '}
          povinná pre všetkých platiteľov DPH na Slovensku. Zákon 385/2025 Z.z.
          stanovuje <strong>prísne sankcie</strong> za porušenie tejto povinnosti.
          Pokuta môže dosiahnuť až{' '}
          <strong>100 000 EUR pri opakovanom porušení</strong>. Pripravili sme
          kompletný prehľad, aby ste vedeli, čo presne hrozí a ako sa chrániť.
        </p>

        <p className="rounded-lg border border-[var(--accent)]/20 bg-[var(--bg-surface)] p-4 text-sm">
          <strong>Posledná aktualizácia:</strong> Marec 2026 |{' '}
          <strong>Zdroj:</strong> Zákon 385/2025 Z.z. (novela zákona o DPH),{' '}
          Finančná správa SR
        </p>

        {/* ── Prehľad pokút ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          <Scale className="mr-2 inline h-6 w-6 text-[var(--accent)]" />
          Prehľad pokút za e-faktúru
        </h2>

        <p>
          Finančná správa SR má právomoc ukladať pokuty za rôzne druhy porušení
          súvisiacich s e-fakturáciou. Výška pokuty závisí od závažnosti
          porušenia, okolností a od toho, či ide o prvé alebo opakované
          previnenie. Tu je prehľad konkrétnych sankcií:
        </p>

        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Typ porušenia</th>
                <th>Maximálna pokuta</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <FileWarning className="mr-1 inline h-4 w-4 text-[var(--accent)]" />{' '}
                  Nevystavenie e-faktúry
                </td>
                <td>
                  <strong>do 10 000 EUR</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <FileWarning className="mr-1 inline h-4 w-4 text-[var(--accent)]" />{' '}
                  Nesprávne údaje v e-faktúre
                </td>
                <td>
                  <strong>do 10 000 EUR</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <FileWarning className="mr-1 inline h-4 w-4 text-[var(--accent)]" />{' '}
                  Oneskorené odoslanie e-faktúry
                </td>
                <td>
                  <strong>do 10 000 EUR</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <AlertTriangle className="mr-1 inline h-4 w-4 text-amber-400" />{' '}
                  Opakované porušenie povinností
                </td>
                <td>
                  <strong className="text-amber-400">do 100 000 EUR</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <FileWarning className="mr-1 inline h-4 w-4 text-[var(--accent)]" />{' '}
                  Nesplnenie oznamovacej povinnosti
                </td>
                <td>
                  <strong>do 10 000 EUR</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Tieto sankcie sa vzťahujú na tuzemské B2B a B2G transakcie. Čím
          závažnejšie porušenie a čím dlhšie trvá, tým vyššiu pokutu môže
          Finančná správa uložiť. Preto je kľúčové začať sa pripravovať{' '}
          <strong>už teraz</strong> — podrobnosti nájdete v{' '}
          <Link href="/kedy-zacne-platit-e-faktura" className="text-[var(--accent)]">
            prehľade termínov e-fakturácie
          </Link>
          .
        </p>

        {/* ── Kedy sa pokute vyhnete ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          <ShieldCheck className="mr-2 inline h-6 w-6 text-[var(--accent)]" />
          Kedy sa pokute vyhnete
        </h2>

        <p>
          Nie každé porušenie automaticky znamená pokutu. Zákon a prax Finančnej
          správy zohľadňujú okolnosti. V nasledujúcich situáciách sa pokute
          pravdepodobne vyhnete:
        </p>

        <ul>
          <li>
            <strong>Neúmyselná chyba pri prvom porušení</strong> — ak ide o
            drobnú formálnu chybu (napríklad preklep v adrese) a preukážete, že
            ste konali v dobrej viere, Finančná správa môže pristúpiť k
            napomenutiu namiesto pokuty. To však platí len pri prvom porušení.
          </li>
          <li>
            <strong>Chyba na strane digitálneho poštára</strong> — ak vaša
            e-faktúra nebola doručená kvôli technickej poruche certifikovaného
            prístupového bodu (Access Point), zodpovednosť nesie poskytovateľ
            služby, nie vy. Dôležité je mať dôkaz o odoslaní.
          </li>
          <li>
            <strong>Bezodkladná oprava</strong> — ak chybu zistíte sami a
            bezodkladne ju opravíte (napríklad vystavíte opravnú e-faktúru),
            Finančná správa to zohľadní ako poľahčujúcu okolnosť.
          </li>
          <li>
            <strong>Výpadok systému Finančnej správy</strong> — ak samotný
            systém e-fakturácie na strane štátu má výpadok, podnikatelia nemôžu
            byť sankcionovaní za oneskorenie spôsobené touto okolnosťou.
          </li>
        </ul>

        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="mb-0 text-sm">
            <AlertTriangle className="mr-1 inline h-4 w-4 text-amber-400" />
            <strong>Pozor:</strong> Aj keď sa pokute vyhnete, neúmyselná chyba
            neznamená, že nemáte povinnosť ju napraviť. Vždy je potrebné chybu
            opraviť čo najskôr. Opakované &ldquo;neúmyselné&rdquo; chyby môže
            Finančná správa vyhodnotiť ako úmyselné porušovanie zákona.
          </p>
        </div>

        {/* Partner CTA — 8888.sk */}
        <PartnerCTA partner="8888" pagePath="/pokuty-za-e-fakturu" locale="sk" />

        {/* ── Kto kontroluje ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Kto kontroluje a ukladá pokuty
        </h2>

        <p>
          Za dohľad nad dodržiavaním povinností e-fakturácie zodpovedá{' '}
          <strong>Finančná správa Slovenskej republiky</strong> prostredníctvom
          daňových úradov. Kontrola prebieha niekoľkými spôsobmi:
        </p>

        <ul>
          <li>
            <strong>Automatizovaný monitoring</strong> — keďže e-faktúry
            prechádzajú cez Peppol sieť a údaje sa automaticky odosielajú
            Finančnej správe v reálnom čase (e-reporting), systém dokáže
            automaticky identifikovať nesúlady. Napríklad ak vystavíte faktúru v
            účtovnom programe, ale neodošlete ju cez Peppol.
          </li>
          <li>
            <strong>Daňová kontrola</strong> — pri bežnej daňovej kontrole
            kontrolóri overujú aj správnosť e-fakturácie. Porovnávajú údaje v
            Peppol sieti s daňovými priznaniami a účtovníctvom.
          </li>
          <li>
            <strong>Krížová kontrola</strong> — Finančná správa môže porovnávať
            prijaté a vystavené e-faktúry medzi obchodnými partnermi. Ak váš
            odberateľ vykáže prijatú e-faktúru, ale vy ste ju nevystavili, je to
            červená vlajka.
          </li>
        </ul>

        <p>
          Dôležité je si uvedomiť, že vďaka automatizácii e-fakturácie má
          Finančná správa <strong>oveľa lepší prehľad</strong> o transakciách
          ako kedykoľvek predtým. Nesúlady sa odhalia rýchlo a automaticky.
        </p>

        {/* ── Ako sa chrániť ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Ako sa chrániť pred pokutami — 5 praktických krokov
        </h2>

        <p>
          Najlepšia ochrana pred pokutami je prevencia. Tu je 5 konkrétnych
          krokov, ktoré vám pomôžu vyhnúť sa sankciám:
        </p>

        <ol>
          <li>
            <strong>Overte si softvér včas</strong> — skontrolujte, či váš
            účtovný program podporuje formát EN 16931 a odosielanie cez Peppol.
            Prehľad kompatibilných riešení nájdete na{' '}
            <Link href="/integracie" className="text-[var(--accent)]">
              stránke integrácií
            </Link>
            . Ak váš softvér nepodporuje e-fakturáciu, začnite hľadať
            alternatívu už teraz.
          </li>
          <li>
            <strong>Zaregistrujte sa u digitálneho poštára</strong> — bez
            certifikovaného prístupového bodu (Access Point) nemôžete odosielať
            ani prijímať e-faktúry. Výber poštára je kľúčové rozhodnutie —
            porovnajte ceny, funkcie a spoľahlivosť.
          </li>
          <li>
            <strong>Nastavte automatické odosielanie</strong> — manuálne
            odosielanie zvyšuje riziko oneskorenia a chýb. Väčšina moderných
            účtovných programov umožňuje automatické odoslanie e-faktúry ihneď
            po vystavení.
          </li>
          <li>
            <strong>Školte zamestnancov</strong> — každý, kto pracuje s
            faktúrami, musí rozumieť novým povinnostiam. Investícia do školenia
            je zlomok potenciálnej pokuty. Živnostníci nájdu špecifické rady v{' '}
            <Link href="/e-faktura-pre-zivnostnikov" className="text-[var(--accent)]">
              sprievodcovi pre živnostníkov
            </Link>
            , malé firmy v{' '}
            <Link href="/e-faktura-pre-male-firmy" className="text-[var(--accent)]">
              sprievodcovi pre malé firmy
            </Link>
            .
          </li>
          <li>
            <strong>Spolupracujte s účtovníkom znalým e-fakturácie</strong> —
            profesionálny účtovník, ktorý sa orientuje v e-fakturácii, je vaša
            najlepšia poistka. Pomôže vám nastaviť procesy správne od začiatku
            a predísť chybám, ktoré vedú k pokutám.
          </li>
        </ol>

        {/* ── Varovanie ── */}
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-6">
          <h3 className="mt-0 font-black text-amber-400">
            <AlertTriangle className="mr-2 inline h-5 w-5" />
            Nepodceňujte prípravu
          </h3>
          <p className="mb-0 text-sm">
            Do nadobudnutia povinnej e-fakturácie zostáva obmedzený čas.
            Finančná správa nebude tolerovať nepripravenosť — zákon platí pre
            všetkých rovnako. Firmy, ktoré sa nepripravia včas, riskujú nielen
            pokuty, ale aj{' '}
            <strong>
              problémy s odberateľmi a dodávateľmi
            </strong>
            , ktorí nebudú schopní akceptovať iné ako elektronické faktúry.
            Pripravte sa ešte dnes — začnite{' '}
            <Link href="/ako-sa-pripravit-na-e-fakturu" className="text-[var(--accent)]">
              sprievodcom prípravou na e-faktúru
            </Link>
            .
          </p>
        </div>

        {/* ── FAQ sekcia ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Časté otázky o pokutách za e-faktúru
        </h2>

        <h3 className="font-black text-[var(--text-primary)]">
          Aká je maximálna pokuta za nevystavenie e-faktúry?
        </h3>
        <p>
          Za nevystavenie e-faktúry hrozí pokuta do{' '}
          <strong>10 000 EUR</strong>. Ak Finančná správa zistí opakované
          porušenie, pokuta sa zvyšuje až na{' '}
          <strong>100 000 EUR</strong>. Výšku pokuty určuje daňový úrad na
          základe závažnosti porušenia, jeho trvania a okolností — napríklad či
          šlo o úmyselné konanie alebo nedbalosť.
        </p>

        <h3 className="font-black text-[var(--text-primary)]">
          Môžem dostať pokutu, ak som e-faktúru poslal neskoro?
        </h3>
        <p>
          Áno. Oneskorené odoslanie e-faktúry cez Peppol sieť je porušenie
          zákona. E-faktúra musí byť odoslaná v lehote stanovenej zákonom o DPH.
          Finančná správa SR môže za oneskorenie uložiť pokutu do{' '}
          <strong>10 000 EUR</strong>. Čím dlhšie oneskorenie, tým vyššia
          pravdepodobnosť a výška sankcie. Najlepšia prevencia je automatické
          odosielanie priamo z účtovného softvéru.
        </p>

        <h3 className="font-black text-[var(--text-primary)]">
          Ako sa môžem vyhnúť pokutám za e-faktúru?
        </h3>
        <p>
          Najlepšia ochrana je prevencia: overte si, že váš účtovný softvér
          podporuje Peppol a EN 16931, zaregistrujte sa u certifikovaného
          digitálneho poštára, nastavte automatické odosielanie e-faktúr a
          pravidelne kontrolujte stav doručenia. Spolupráca s{' '}
          <strong>účtovníkom znalým e-fakturácie</strong> výrazne znižuje riziko
          chýb. Ak chybu zistíte, opravte ju bezodkladne — rýchla náprava je
          poľahčujúca okolnosť.
        </p>

        {/* ── Záver + CTA ── */}
        <h2 className="font-black text-[var(--text-primary)]">
          Záver: Lepšie predchádzať ako platiť
        </h2>

        <p>
          Pokuty za e-faktúru nie sú teoretické — Finančná správa bude mať
          vďaka automatizovanému e-reportingu bezprecedentný prehľad o každej
          transakcii. Nesúlady sa odhalia rýchlo a automaticky. Jedinou
          spoľahlivou ochranou je <strong>včasná príprava</strong> a správne
          nastavenie procesov.
        </p>

        <p>
          Ak si nie ste istí, či ste pripravení, začnite tu:
        </p>

        <ul>
          <li>
            <CheckCircle2 className="mr-1 inline h-4 w-4 text-[var(--accent)]" />
            <Link href="/co-je-e-faktura" className="text-[var(--accent)]">
              Čo je e-faktúra
            </Link>{' '}
            — základný prehľad pre tých, ktorí začínajú
          </li>
          <li>
            <CheckCircle2 className="mr-1 inline h-4 w-4 text-[var(--accent)]" />
            <Link href="/kedy-zacne-platit-e-faktura" className="text-[var(--accent)]">
              Kedy začne platiť e-faktúra
            </Link>{' '}
            — všetky dôležité termíny
          </li>
          <li>
            <CheckCircle2 className="mr-1 inline h-4 w-4 text-[var(--accent)]" />
            <Link href="/integracie" className="text-[var(--accent)]">
              Integrácie a softvér
            </Link>{' '}
            — overte, či váš program je pripravený
          </li>
          <li>
            <CheckCircle2 className="mr-1 inline h-4 w-4 text-[var(--accent)]" />
            <Link href="/e-faktura-pre-zivnostnikov" className="text-[var(--accent)]">
              Sprievodca pre živnostníkov
            </Link>{' '}
            — špecifické rady pre SZČO
          </li>
          <li>
            <CheckCircle2 className="mr-1 inline h-4 w-4 text-[var(--accent)]" />
            <Link href="/e-faktura-pre-male-firmy" className="text-[var(--accent)]">
              Sprievodca pre malé firmy
            </Link>{' '}
            — krok za krokom pre s.r.o.
          </li>
        </ul>

        <p>
          <Link
            href="/ako-sa-pripravit-na-e-fakturu"
            className="text-[var(--accent)]"
          >
            Začnite s prípravou na e-faktúru ešte dnes
            <ArrowRight className="ml-1 inline h-4 w-4" />
          </Link>
        </p>
      </article>
    </main>
  );
}
