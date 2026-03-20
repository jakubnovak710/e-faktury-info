import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata } from '@jakubnovak710/universal-web-core/lib/metadata';

export function generateMetadata(): Metadata {
  return createMetadata({
    title: 'Obchodné podmienky',
    description:
      'Obchodné podmienky a podmienky používania portálu e-Faktúry.info. Pravidlá využívania informačného obsahu a služieb.',
    noIndex: true,
  });
}

export default function ObchodnePodmienkyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <article className="prose max-w-none">
        <h1 className="font-black text-[var(--text-primary)]">
          Obchodné podmienky a podmienky používania
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          Posledná aktualizácia: 20. marca 2026
        </p>

        <p>
          Tieto obchodné podmienky (&ldquo;Podmienky&rdquo;) upravujú
          používanie webovej stránky e-faktury.info (&ldquo;portál&rdquo;),
          ktorú prevádzkuje 8888 Servis s. r. o., IČO:&nbsp;55&nbsp;609&nbsp;830, DIČ:&nbsp;2122034970, IČ&nbsp;DPH:&nbsp;SK2122034970, so
          sídlom Jenisejská 45A, 040&nbsp;12 Košice&nbsp;— mestská časť Nad jazerom (&ldquo;prevádzkovateľ&rdquo;). Prístupom na
          portál a jeho používaním vyjadrujete súhlas s týmito Podmienkami.
        </p>

        <h2 className="font-black text-[var(--text-primary)]">
          1. Predmet a účel portálu
        </h2>
        <p>
          Portál e-Faktúry.info je nezávislý informačný portál zameraný na
          elektronickú fakturáciu na Slovensku. Poskytuje:
        </p>
        <ul>
          <li>
            informačný obsah o povinnej e-faktúre, legislatíve, technických
            štandardoch (Peppol, EN 16931, UBL);
          </li>
          <li>
            sprievodcov, návody a porovnania softvérových riešení;
          </li>
          <li>
            interaktívne nástroje (kontrola pripravenosti, slovník pojmov);
          </li>
          <li>
            konzultačné a vzdelávacie služby (ak sú objednané osobitne).
          </li>
        </ul>

        <h2 className="font-black text-[var(--text-primary)]">
          2. Informačný charakter obsahu
        </h2>
        <p>
          <strong>
            Obsah portálu má výlučne informačný a edukačný charakter a
            nepredstavuje právne, daňové, účtovné ani finančné poradenstvo.
          </strong>
        </p>
        <ul>
          <li>
            Informácie na portáli nemôžu nahradiť individuálne poradenstvo
            kvalifikovaného odborníka (daňového poradcu, účtovníka, advokáta).
          </li>
          <li>
            Legislatíva a technické štandardy sa môžu meniť. Hoci sa snažíme
            udržiavať obsah aktuálny, nemôžeme zaručiť, že všetky informácie
            sú v každom okamihu úplné, presné a aktuálne.
          </li>
          <li>
            Rozhodnutia na základe informácií z portálu robíte na vlastnú
            zodpovednosť.
          </li>
        </ul>

        <h2 className="font-black text-[var(--text-primary)]">
          3. Duševné vlastníctvo
        </h2>
        <ul>
          <li>
            Obsah portálu (texty, grafika, logá, softvér, dizajn, databázy) je
            chránený autorským zákonom (zákon č. 185/2015 Z.z.) a ďalšími
            právnymi predpismi.
          </li>
          <li>
            Bez predchádzajúceho písomného súhlasu prevádzkovateľa nie je
            povolené obsah kopírovať, reprodukovať, distribuovať, publikovať,
            upravovať ani inak komerčne využívať.
          </li>
          <li>
            Citácia krátkych úryvkov na nekomerčné účely je povolená s
            uvedením zdroja a aktívneho odkazu na pôvodnú stránku.
          </li>
          <li>
            Názvy produktov a služieb tretích strán uvedené na portáli sú
            ochrannými známkami ich príslušných vlastníkov.
          </li>
        </ul>

        <h2 className="font-black text-[var(--text-primary)]">
          4. Obmedzenie zodpovednosti
        </h2>
        <ul>
          <li>
            Prevádzkovateľ nenesie zodpovednosť za škody vzniknuté v
            súvislosti s používaním portálu alebo spoliehania sa na informácie
            na ňom zverejnené, a to v najširšom rozsahu povolenom právnym
            poriadkom SR.
          </li>
          <li>
            Portál môže obsahovať odkazy na webové stránky tretích strán
            (vrátane partnerských webov 8888.sk, sroihned.sk,
            digitalnipostari.sk). Za obsah, funkčnosť a zásady ochrany
            súkromia týchto stránok nenesieme zodpovednosť.
          </li>
          <li>
            Porovnania softvérových riešení a recenzie na portáli vychádzajú
            z verejne dostupných informácií a subjektívneho hodnotenia.
            Nemôžeme zaručiť ich úplnosť ani aktuálnosť.
          </li>
          <li>
            Nenesieme zodpovednosť za dočasnú nedostupnosť portálu z dôvodov
            technickej údržby, výpadkov servera alebo vyššej moci.
          </li>
        </ul>

        <h2 className="font-black text-[var(--text-primary)]">
          5. Konzultačné služby
        </h2>
        <p>
          Ak prevádzkovateľ ponúka platené konzultačné, implementačné alebo
          vzdelávacie služby, ich podmienky sú upravené osobitnou zmluvou alebo
          objednávkou. Tieto Podmienky sa na platené služby vzťahujú
          subsidiárne.
        </p>

        <h2 className="font-black text-[var(--text-primary)]">
          6. Pravidlá správania používateľov
        </h2>
        <p>Pri používaní portálu sa zaväzujete:</p>
        <ul>
          <li>neporušovať právne predpisy SR a EÚ;</li>
          <li>
            nepoužívať automatizované nástroje na masové sťahovanie obsahu
            (scraping) bez povolenia;
          </li>
          <li>
            nezasielať prostredníctvom formulárov spam, škodlivý kód alebo
            nelegálny obsah;
          </li>
          <li>
            nepokúšať sa o neoprávnený prístup k systémom portálu.
          </li>
        </ul>

        <h2 className="font-black text-[var(--text-primary)]">
          7. Newsletter
        </h2>
        <ul>
          <li>
            Prihlásením na newsletter súhlasíte so zasielaním informácií o
            e-faktúre, novinkách a aktualizáciách legislatívy na zadanú
            e-mailovú adresu.
          </li>
          <li>
            Z odberu sa môžete kedykoľvek odhlásiť kliknutím na odkaz
            &ldquo;Odhlásiť&rdquo; v každom e-maile alebo kontaktovaním nás.
          </li>
          <li>
            Podrobnosti o spracúvaní e-mailovej adresy nájdete v{' '}
            <Link href="/ochrana-sukromia">Zásadách ochrany osobných údajov</Link>.
          </li>
        </ul>

        <h2 className="font-black text-[var(--text-primary)]">
          8. Affiliate a partnerské odkazy
        </h2>
        <p>
          Portál môže obsahovať odkazy na produkty a služby partnerov. Niektoré
          z týchto odkazov môžu byť partnerské (affiliate), čo znamená, že
          prevádzkovateľ môže získať províziu, ak prostredníctvom odkazu
          uskutočníte nákup alebo registráciu. Toto{' '}
          <strong>neovplyvňuje cenu pre vás</strong> a nemá vplyv na naše
          hodnotenia a odporúčania, ktoré sú vždy založené na objektívnom
          posúdení.
        </p>

        <h2 className="font-black text-[var(--text-primary)]">
          9. Rozhodné právo a riešenie sporov
        </h2>
        <ul>
          <li>
            Tieto Podmienky sa riadia právnym poriadkom Slovenskej republiky.
          </li>
          <li>
            Akékoľvek spory budú riešené prednostne vzájomnou dohodou. Ak
            nedôjde k dohode, spory budú riešené príslušným súdom SR.
          </li>
          <li>
            Spotrebitelia majú právo obrátiť sa na platformu RSO (Riešenie
            sporov online):{' '}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
            >
              ec.europa.eu/consumers/odr
            </a>
            .
          </li>
        </ul>

        <h2 className="font-black text-[var(--text-primary)]">
          10. Oddeliteľnosť
        </h2>
        <p>
          Ak sa akékoľvek ustanovenie týchto Podmienok stane neplatným alebo
          nevymáhateľným, ostatné ustanovenia zostávajú v plnej platnosti.
          Neplatné ustanovenie sa nahradí platným ustanovením, ktoré sa čo
          najviac blíži pôvodnému účelu.
        </p>

        <h2 className="font-black text-[var(--text-primary)]">
          11. Zmeny podmienok
        </h2>
        <p>
          Prevádzkovateľ si vyhradzuje právo tieto Podmienky kedykoľvek
          zmeniť. Aktuálna verzia je vždy dostupná na tejto stránke.
          Pokračovanie v používaní portálu po zmene Podmienok predstavuje
          súhlas s ich novou verziou.
        </p>

        <h2 className="font-black text-[var(--text-primary)]">
          12. Kontakt
        </h2>
        <p>
          Ak máte otázky k týmto Podmienkam, kontaktujte nás na{' '}
          <strong>hello@jakubnovak.dev</strong> alebo prostredníctvom{' '}
          <Link href="/kontakt">kontaktného formulára</Link>.
        </p>
      </article>
    </main>
  );
}
