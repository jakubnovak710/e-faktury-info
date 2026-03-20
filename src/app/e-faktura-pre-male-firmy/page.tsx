/**
 * Audience Page: E-faktúra pre malé firmy (s.r.o.)
 *
 * Cluster 3 — audience-specific. Target keywords: "e-faktúra malá firma",
 * "e-faktúra s.r.o.", "e-faktúra pre firmy"
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { createMetadata } from '@jakubnovak710/universal-web-core/lib/metadata';
import { ContentLayout } from '@/components/layouts/content-layout';
import { buildArticleJsonLd } from '@/components/seo';
import { PartnerCTA } from '@/components/partner-cta';

export function generateMetadata(): Metadata {
  return createMetadata({
    title: 'E-faktúra pre malé firmy a s.r.o. — Kompletný sprievodca',
    description:
      'Čo musia malé firmy a s.r.o. vedieť o povinnej e-faktúre od 1.1.2027. Príprava, softvér, digitálny poštár, pokuty.',
    keywords: ['e-faktúra malá firma', 'e-faktúra s.r.o.', 'e-faktúra pre firmy', 'povinná e-faktúra firma'],
  });
}

export default function EFakturaPreMaleFirmyPage() {
  const articleJsonLd = buildArticleJsonLd({
    headline: 'E-faktúra pre malé firmy a s.r.o.',
    description: 'Čo musia malé firmy a s.r.o. vedieť o povinnej e-faktúre od 1.1.2027. Príprava, softvér, digitálny poštár, pokuty.',
    path: '/e-faktura-pre-male-firmy',
  });

  return (
    <ContentLayout
      locale="sk"
      breadcrumbs={[
        { label: 'Pre koho', href: '/e-faktura-pre-male-firmy' },
        { label: 'Pre malé firmy' },
      ]}
      jsonLd={[articleJsonLd]}
      hero={{
        title: 'E-faktúra pre malé firmy a s.r.o.',
        description:
          'Máte s.r.o. alebo malú firmu a ste platiteľ DPH? Od 1. januára 2027 musíte prejsť na elektronickú fakturáciu. Tento sprievodca vám ukáže, čo presne treba urobiť a ako sa vyhnúť pokutám až do 100 000 EUR.',
        lastUpdated: 'Marec 2026',
        sources: ['Zákon 385/2025 Z.z.'],
        readingTime: 7,
      }}
    >

        <h2 className="font-black text-[var(--text-primary)]">Čo sa zmení pre vašu firmu</h2>

        <p>Od 1.1.2027 budete musieť:</p>
        <ul>
          <li><strong>Vystavovať</strong> všetky tuzemské B2B faktúry ako e-faktúry (<a href="https://sk.wikipedia.org/wiki/Kateg%C3%B3ria:XML" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)]">XML</a> formát cez Peppol)</li>
          <li><strong>Prijímať</strong> e-faktúry od dodávateľov automaticky cez Peppol sieť</li>
          <li><strong>Reportovať</strong> údaje z faktúr <a href="https://www.financnasprava.sk/sk/titulna-stranka" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)]">finančnej správe</a> v reálnom čase</li>
          <li><strong>Dodržať lehotu</strong> 10 dní na vystavenie (skrátenie z 15 dní)</li>
        </ul>

        <div className="rounded-lg border border-[var(--color-warning-border)] bg-[var(--color-warning-muted)] p-4">
          <p className="text-sm">
            <AlertTriangle className="mr-1 inline h-4 w-4 text-[var(--color-warning)]" />
            <strong>Pozor:</strong> Toto sa týka VŠETKÝCH s.r.o. a obchodných spoločností, ktoré sú platiteľmi DPH — bez ohľadu na veľkosť alebo obrat.
          </p>
        </div>

        <h2 className="font-black text-[var(--text-primary)]">6 krokov k pripravenosti</h2>

        <ol>
          <li>
            <strong>Skontrolujte váš účtovný softvér</strong> — podporuje Peppol? Pozrite <Link href="/integracie" className="text-[var(--accent)]">prehľad integrácií</Link>
          </li>
          <li>
            <strong>Vyberte digitálneho poštára</strong> — porovnanie na <a href="https://digitalnipostari.sk" target="_blank" rel="noopener" className="text-[var(--accent)]">digitalnipostari.sk</a>
          </li>
          <li><strong>Zaregistrujte firmu v <a href="https://en.wikipedia.org/wiki/PEPPOL" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)]">Peppol</a></strong> — získajte Peppol ID (1-2 pracovné dni)</li>
          <li><strong>Otestujte v dobrovoľnej fáze</strong> — od Q2 2026</li>
          <li><strong>Školte zamestnancov</strong> — kto vystavuje faktúry, musí vedieť pracovať s novým systémom</li>
          <li><strong>Informujte dodávateľov a odberateľov</strong> — komunikujte váš Peppol ID</li>
        </ol>

        <p>
          Podrobný postup: <Link href="/ako-sa-pripravit-na-e-fakturu" className="text-[var(--accent)]">Ako sa pripraviť na e-faktúru krok za krokom <ArrowRight className="ml-1 inline h-4 w-4" /></Link>
        </p>

        <PartnerCTA partner="8888" pagePath="/e-faktura-pre-male-firmy" locale="sk" />

        <h2 className="font-black text-[var(--text-primary)]">Odporúčané softvérové riešenia pre malé firmy</h2>

        <p>Pre malé firmy s 10-100 faktúrami mesačne odporúčame:</p>
        <ul>
          <li><Link href="/integracie/pohoda" className="text-[var(--accent)]"><strong>Pohoda</strong></Link> — najrozšírenejší na SK, Peppol vo vývoji</li>
          <li><Link href="/integracie/omega" className="text-[var(--accent)]"><strong>Omega</strong></Link> — obľúbená medzi účtovníkmi, pripravuje Peppol</li>
          <li><Link href="/integracie/superfaktura" className="text-[var(--accent)]"><strong>SuperFaktúra</strong></Link> — Peppol ready, free tier</li>
          <li><Link href="/integracie/flexibee-abra" className="text-[var(--accent)]"><strong>FlexiBee</strong></Link> — najlepšie pripravený na Peppol, cloud ERP</li>
        </ul>

        <h2 className="font-black text-[var(--text-primary)]">Pokuty pre firmy</h2>

        <p>
          Pokuta za nevystavenie e-faktúry: až <strong>10 000 EUR</strong>. Pri opakovanom porušení: až <strong>100 000 EUR</strong>. Podrobnosti v <Link href="/pokuty-za-e-fakturu" className="text-[var(--accent)]">sprievodcovi pokutami</Link>.
        </p>

        <h2 className="font-black text-[var(--text-primary)]">B2C transakcie — výnimka</h2>

        <p>
          Ak fakturujete spotrebiteľom (B2C), e-faktúra <strong>nie je povinná</strong>. Stačí klasická faktúra. E-faktúra sa vzťahuje len na B2B a B2G transakcie. Ak máte mix B2B a B2C, potrebujete e-faktúru len pre B2B časť.
        </p>

        <PartnerCTA partner="digitalnipostari" pagePath="/e-faktura-pre-male-firmy" locale="sk" />

        <h2 className="font-black text-[var(--text-primary)]">Zakladáte novú s.r.o.?</h2>

        <p>
          Ak ešte nemáte firmu a plánujete ju založiť, myslite na e-faktúru od začiatku — vyberte si softvér s Peppol podporou. <a href="https://sroihned.sk" target="_blank" rel="noopener" className="text-[var(--accent)]">Založte si s.r.o. jednoducho a rýchlo online</a>.
        </p>

        <h2 className="font-black text-[var(--text-primary)]">Záver</h2>

        <p>
          Čas sa kráti — začnite sa pripravovať. Prečítajte si <Link href="/co-je-e-faktura" className="text-[var(--accent)]">čo je e-faktúra</Link>, overte softvér na <Link href="/integracie" className="text-[var(--accent)]">stránke integrácií</Link> a sledujte <Link href="/kedy-zacne-platit-e-faktura" className="text-[var(--accent)]">termíny</Link>.
        </p>
    </ContentLayout>
  );
}
