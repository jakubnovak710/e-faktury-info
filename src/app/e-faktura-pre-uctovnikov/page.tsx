/**
 * Audience Page: E-faktúra pre účtovníkov
 *
 * Cluster 3 — target keywords: "e-faktúra účtovníctvo", "e-faktúra pre účtovníkov"
 * Unique angle: opportunity for accountants (new service, client advisory)
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { createMetadata } from '@jakubnovak710/universal-web-core/lib/metadata';
import { ContentLayout } from '@/components/layouts/content-layout';
import { buildArticleJsonLd } from '@/components/seo';
import { PartnerCTA } from '@/components/partner-cta';

export function generateMetadata(): Metadata {
  return createMetadata({
    title: 'E-faktúra pre účtovníkov a účtovné kancelárie — Príležitosť aj povinnosť',
    description:
      'Ako e-faktúra ovplyvní prácu účtovníkov. Nové povinnosti, zmeny v procesoch, príležitosť pre novú službu. Prehľad softvérov a praktické rady.',
    keywords: ['e-faktúra účtovníctvo', 'e-faktúra pre účtovníkov', 'e-faktúra účtovná kancelária'],
  });
}

export default function EFakturaPreUctovnikovPage() {
  const articleJsonLd = buildArticleJsonLd({
    headline: 'E-faktúra pre účtovníkov a účtovné kancelárie',
    description: 'Ako e-faktúra ovplyvní prácu účtovníkov. Nové povinnosti, zmeny v procesoch, príležitosť pre novú službu.',
    path: '/e-faktura-pre-uctovnikov',
  });

  return (
    <ContentLayout
      locale="sk"
      breadcrumbs={[
        { label: 'Pre koho', href: '/e-faktura-pre-uctovnikov' },
        { label: 'Pre účtovníkov' },
      ]}
      jsonLd={[articleJsonLd]}
      hero={{
        title: 'E-faktúra pre účtovníkov a účtovné kancelárie',
        description:
          'E-faktúra nie je len povinnosť — pre účtovníkov je to príležitosť. Vaši klienti sa budú pýtať, ako sa pripraviť. Budete ten, koho zavolajú prvého. Buďte pripravení.',
        lastUpdated: 'Marec 2026',
        sources: ['Zákon 385/2025 Z.z.', 'FAQ Finančnej správy SR'],
        readingTime: 8,
      }}
    >

        <h2 className="font-black text-[var(--text-primary)]">Čo sa zmení v práci účtovníka</h2>

        <h3 className="font-black text-[var(--text-primary)]">Automatizácia príjmu faktúr</h3>
        <p>
          Koniec ručného prepisovania údajov z PDF faktúr. E-faktúry vo formáte XML sa automaticky importujú do účtovného systému. To znamená menej chýb, rýchlejšie spracovanie a viac času na poradenstvo.
        </p>

        <h3 className="font-black text-[var(--text-primary)]">Real-time reporting</h3>
        <p>
          Údaje z faktúr sa budú odosielať finančnej správe v reálnom čase. To mení dynamiku — chyby sa odhalia skôr, ale opravy musia byť rýchlejšie. DPH kontrolný výkaz bude čiastočne automatický.
        </p>

        <h3 className="font-black text-[var(--text-primary)]">Nová lehota</h3>
        <p>
          Lehota na vystavenie faktúry sa skracuje z 15 na <strong>10 dní</strong>. Klienti budú potrebovať disciplinovanejšie procesy.
        </p>

        <h2 className="font-black text-[var(--text-primary)]">Príležitosti pre účtovné kancelárie</h2>

        <ol>
          <li>
            <strong>Konzultácie k prechodu</strong> — pomoc klientom s výberom softvéru, digitálneho poštára, registráciou v Peppol. Nová platená služba.
          </li>
          <li>
            <strong>Implementačná podpora</strong> — nastavenie e-fakturácie v účtovných systémoch klientov.
          </li>
          <li>
            <strong>Školenia</strong> — firemné školenia o novom procese fakturácie.
          </li>
          <li>
            <strong>Ongoing správa</strong> — monitoring e-faktúr, kontrola správnosti, riešenie chýb.
          </li>
          <li>
            <strong>Diferenciácia</strong> — účtovníci, ktorí budú pripravení prví, získajú klientov od tých, čo meškajú.
          </li>
        </ol>

        <PartnerCTA partner="8888" pagePath="/e-faktura-pre-uctovnikov" locale="sk" title="Hľadáte spoluprácu?" description="Účtovná kancelária 8888.sk je pripravená na e-faktúru. Pridajte sa k nám." />

        <h2 className="font-black text-[var(--text-primary)]">Softvér pre účtovné kancelárie</h2>

        <p>Pri výbere softvéru pre viacerých klientov zvážte:</p>
        <ul>
          <li><Link href="/integracie/omega" className="text-[var(--accent)]"><strong>Omega (KROS)</strong></Link> — najobľúbenejšia medzi SK účtovníkmi, Peppol v príprave</li>
          <li><Link href="/integracie/pohoda" className="text-[var(--accent)]"><strong>Pohoda</strong></Link> — najrozšírenejšia, veľká komunita, Peppol vo vývoji</li>
          <li><Link href="/integracie/helios" className="text-[var(--accent)]"><strong>Helios</strong></Link> — Peppol ready, enterprise riešenie, Asseco je certifikovaný AP</li>
          <li><Link href="/integracie/flexibee-abra" className="text-[var(--accent)]"><strong>FlexiBee</strong></Link> — najlepšie pripravený na Peppol, cloud s API</li>
        </ul>

        <p>
          Porovnanie všetkých systémov: <Link href="/integracie" className="text-[var(--accent)]">Prehľad integrácií <ArrowRight className="ml-1 inline h-4 w-4" /></Link>
        </p>

        <h2 className="font-black text-[var(--text-primary)]">Checklist pre účtovnú kanceláriu</h2>

        <ol>
          <li>Zmapujte softvéry všetkých klientov a ich Peppol pripravenosť</li>
          <li>Otestujte e-fakturáciu na vlastnej kancelárii ako prvej</li>
          <li>Pripravte informačný materiál / FAQ pre klientov</li>
          <li>Nastavte si cenník konzultačných a implementačných služieb</li>
          <li>Zaregistrujte sa v Peppol a vyberte digitálneho poštára na <a href="https://digitalnipostari.sk" target="_blank" rel="noopener" className="text-[var(--accent)]">digitalnipostari.sk</a></li>
          <li>Začnite školiť zamestnancov kancelárie</li>
          <li>Proaktívne komunikujte s klientmi — nebuďte pasívni</li>
        </ol>

        <h2 className="font-black text-[var(--text-primary)]">Čo hovoriť klientom</h2>

        <p>Klienti sa budú pýtať. Tu sú hlavné body na komunikáciu:</p>
        <ul>
          <li><strong>&ldquo;Musím niečo robiť?&rdquo;</strong> — Áno, ak ste platiteľ DPH. Ak nie, musíte vedieť prijímať.</li>
          <li><strong>&ldquo;Koľko to bude stáť?&rdquo;</strong> — Závisí od softvéru. Pre malé firmy môže byť takmer zadarmo.</li>
          <li><strong>&ldquo;Čo ak to nestihnem?&rdquo;</strong> — Pokuta až 10 000 EUR, opakované porušenie až 100 000 EUR.</li>
          <li><strong>&ldquo;Kedy začať?&rdquo;</strong> — Teraz. Dobrovoľná fáza od Q2 2026.</li>
        </ul>

        <p>
          Podrobnosti pre rôzne typy klientov: <Link href="/e-faktura-pre-zivnostnikov" className="text-[var(--accent)]">živnostníci</Link> | <Link href="/e-faktura-pre-male-firmy" className="text-[var(--accent)]">malé firmy</Link>
        </p>

        <PartnerCTA partner="digitalnipostari" pagePath="/e-faktura-pre-uctovnikov" locale="sk" />

        <h2 className="font-black text-[var(--text-primary)]">Záver</h2>

        <p>
          E-faktúra zmení prácu účtovníka k lepšiemu — menej manuálnej práce, viac automatizácie. Ale len pre tých, čo sa pripravia. Začnite teraz: <Link href="/ako-sa-pripravit-na-e-fakturu" className="text-[var(--accent)]">sprievodca prípravou</Link>, <Link href="/co-je-e-faktura" className="text-[var(--accent)]">čo je e-faktúra</Link>, <Link href="/kedy-zacne-platit-e-faktura" className="text-[var(--accent)]">kľúčové termíny</Link>.
        </p>
    </ContentLayout>
  );
}
