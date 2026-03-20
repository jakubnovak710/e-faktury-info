import type { Metadata } from 'next';
import { createMetadata } from '@jakubnovak710/universal-web-core/lib/metadata';

export function generateMetadata(): Metadata {
  return createMetadata({
    title: 'Ochrana súkromia',
    description:
      'Zásady ochrany osobných údajov portálu e-Faktúry.info. Informácie o spracúvaní osobných údajov podľa GDPR a zákona č. 18/2018 Z.z.',
    noIndex: true,
  });
}

export default function OchranaSukromiaPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <article className="prose max-w-none">
        <h1 className="font-black text-[var(--text-primary)]">
          Zásady ochrany osobných údajov
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          Posledná aktualizácia: 20. marca 2026
        </p>

        <p>
          Tieto zásady ochrany osobných údajov (&ldquo;Zásady&rdquo;) popisujú,
          ako prevádzkovateľ portálu e-Faktúry.info (&ldquo;my&rdquo;,
          &ldquo;nás&rdquo;, &ldquo;prevádzkovateľ&rdquo;) spracúva osobné
          údaje návštevníkov a používateľov webovej stránky e-faktury.info
          (&ldquo;portál&rdquo;) v súlade s Nariadením Európskeho parlamentu a
          Rady (EÚ) 2016/679 o ochrane fyzických osôb pri spracúvaní osobných
          údajov (&ldquo;GDPR&rdquo;) a zákonom č. 18/2018 Z.z. o ochrane
          osobných údajov.
        </p>

        <h2 className="font-black text-[var(--text-primary)]">
          1. Prevádzkovateľ
        </h2>
        <p>
          Prevádzkovateľom osobných údajov je 8888 Servis s. r. o.,
          IČO:&nbsp;55&nbsp;609&nbsp;830, DIČ:&nbsp;2122034970, IČ&nbsp;DPH:&nbsp;SK2122034970, so sídlom Jenisejská 45A, 040&nbsp;12 Košice&nbsp;— mestská časť Nad jazerom, zapísaný v Obchodnom registri Mestského súdu Košice.
          Kontaktný e-mail: <strong>hello@jakubnovak.dev</strong>.
        </p>

        <h2 className="font-black text-[var(--text-primary)]">
          2. Aké osobné údaje spracúvame
        </h2>

        <h3 className="font-black text-[var(--text-primary)]">
          2.1 Údaje poskytnuté dobrovoľne
        </h3>
        <ul>
          <li>
            <strong>Kontaktný formulár:</strong> meno, e-mailová adresa, obsah
            správy. Účel: odpovedanie na vaše otázky. Právny základ: oprávnený
            záujem (čl. 6 ods. 1 písm. f) GDPR).
          </li>
          <li>
            <strong>Newsletter:</strong> e-mailová adresa. Účel: zasielanie
            informácií o e-faktúre a novinkách. Právny základ: súhlas (čl. 6
            ods. 1 písm. a) GDPR). Súhlas môžete kedykoľvek odvolať kliknutím
            na odkaz v každom e-maile alebo kontaktovaním nás.
          </li>
          <li>
            <strong>Kontrola pripravenosti:</strong> odpovede v dotazníku
            (anonymné, nespájame ich s identitou). Účel: poskytnutie
            personalizovaného výsledku.
          </li>
        </ul>

        <h3 className="font-black text-[var(--text-primary)]">
          2.2 Údaje zbierané automaticky
        </h3>
        <ul>
          <li>
            <strong>Analytické údaje (Umami Analytics):</strong> používame
            self-hosted/cloudovú inštanciu Umami Analytics, ktorá je{' '}
            <strong>
              plne v súlade s GDPR, nepoužíva cookies a nesleduje používateľov
              naprieč stránkami
            </strong>
            . Zbierame: typ zariadenia, krajinu (na základe IP bez ukladania
            IP), navštívené stránky, čas strávený na stránke, referrer URL.
            Tieto údaje sú <strong>anonymné</strong> a nemožno ich priradiť ku
            konkrétnej osobe.
          </li>
          <li>
            <strong>Technické logy servera:</strong> IP adresa, user agent,
            časová pečiatka. Účel: zabezpečenie prevádzky a ochrana pred
            útokmi. Uchovávanie: max. 30 dní. Právny základ: oprávnený záujem.
          </li>
        </ul>

        <h2 className="font-black text-[var(--text-primary)]">
          3. Cookies
        </h2>
        <p>
          Portál e-Faktúry.info <strong>nepoužíva sledovacie cookies</strong>.
          Umami Analytics funguje bez cookies. Používame len nevyhnutné
          technické cookies:
        </p>
        <ul>
          <li>
            <strong>CSRF token:</strong> zabezpečenie formulárov proti
            cross-site request forgery. Relácia. Nevyhnutný.
          </li>
          <li>
            <strong>Theme preference:</strong> uloženie preferencie tmavého/svetlého
            režimu. Lokálne úložisko (localStorage), nie cookie.
          </li>
        </ul>
        <p>
          Keďže nepoužívame sledovacie cookies, <strong>cookie lišta nie je
          potrebná</strong> podľa smernice ePrivacy a usmernení Úradu na
          ochranu osobných údajov SR.
        </p>

        <h2 className="font-black text-[var(--text-primary)]">
          4. Účely spracúvania a právne základy
        </h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Účel</th>
                <th>Osobné údaje</th>
                <th>Právny základ</th>
                <th>Uchovávanie</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Odpovedanie na otázky</td>
                <td>Meno, e-mail, správa</td>
                <td>Oprávnený záujem (čl. 6/1/f)</td>
                <td>1 rok</td>
              </tr>
              <tr>
                <td>Zasielanie newslettera</td>
                <td>E-mail</td>
                <td>Súhlas (čl. 6/1/a)</td>
                <td>Do odvolania súhlasu</td>
              </tr>
              <tr>
                <td>Analytika webu</td>
                <td>Anonymné agregované dáta</td>
                <td>Oprávnený záujem (čl. 6/1/f)</td>
                <td>24 mesiacov</td>
              </tr>
              <tr>
                <td>Bezpečnosť servera</td>
                <td>IP adresa, user agent</td>
                <td>Oprávnený záujem (čl. 6/1/f)</td>
                <td>30 dní</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-black text-[var(--text-primary)]">
          5. Príjemcovia osobných údajov
        </h2>
        <p>Osobné údaje môžu byť sprístupnené:</p>
        <ul>
          <li>
            <strong>Poskytovateľ hostingu:</strong> Vercel Inc. (USA) — prenos
            do USA je zabezpečený prostredníctvom EU-U.S. Data Privacy
            Framework.
          </li>
          <li>
            <strong>E-mailová služba:</strong> podľa aktuálnej konfigurácie —
            na zasielanie newslettera a odpovedí na kontaktný formulár.
          </li>
          <li>
            <strong>Umami Analytics:</strong> Umami Software Inc. (ak
            cloud) alebo self-hosted — anonymné dáta bez osobných údajov.
          </li>
        </ul>
        <p>
          Osobné údaje <strong>nepredávame, neprenajímame a nezdieľame</strong>{' '}
          s tretími stranami na marketingové účely.
        </p>

        <h2 className="font-black text-[var(--text-primary)]">
          6. Prenos do tretích krajín
        </h2>
        <p>
          Ak sú údaje spracúvané v USA (Vercel), prenos je zabezpečený na
          základe rozhodnutia Európskej komisie o primeranosti (EU-U.S. Data
          Privacy Framework, rozhodnutie z 10.7.2023). Pre ostatných
          poskytovateľov v EÚ/EHP nie je prenos do tretej krajiny realizovaný.
        </p>

        <h2 className="font-black text-[var(--text-primary)]">
          7. Vaše práva
        </h2>
        <p>V súvislosti so spracúvaním osobných údajov máte tieto práva:</p>
        <ul>
          <li>
            <strong>Právo na prístup</strong> (čl. 15 GDPR) — získať potvrdenie
            o spracúvaní a kópiu údajov.
          </li>
          <li>
            <strong>Právo na opravu</strong> (čl. 16 GDPR) — opraviť nesprávne
            údaje.
          </li>
          <li>
            <strong>Právo na vymazanie</strong> (čl. 17 GDPR) — požiadať o
            vymazanie údajov (&ldquo;právo byť zabudnutý&rdquo;).
          </li>
          <li>
            <strong>Právo na obmedzenie spracúvania</strong> (čl. 18 GDPR).
          </li>
          <li>
            <strong>Právo na prenosnosť údajov</strong> (čl. 20 GDPR) — získať
            údaje v štruktúrovanom formáte.
          </li>
          <li>
            <strong>Právo namietať</strong> (čl. 21 GDPR) — namietať proti
            spracúvaniu na základe oprávneného záujmu.
          </li>
          <li>
            <strong>Právo odvolať súhlas</strong> (čl. 7 ods. 3 GDPR) —
            kedykoľvek, bez vplyvu na zákonnosť predchádzajúceho spracúvania.
          </li>
          <li>
            <strong>Právo podať sťažnosť</strong> na Úrad na ochranu osobných
            údajov SR, Hraničná 12, 820 07 Bratislava,{' '}
            <a
              href="https://dataprotection.gov.sk"
              target="_blank"
              rel="noopener noreferrer"
            >
              dataprotection.gov.sk
            </a>
            .
          </li>
        </ul>
        <p>
          Práva si môžete uplatniť e-mailom na <strong>hello@jakubnovak.dev</strong>.
          Odpovieme do 30 dní.
        </p>

        <h2 className="font-black text-[var(--text-primary)]">
          8. Zabezpečenie údajov
        </h2>
        <p>
          Prijali sme primerané technické a organizačné opatrenia na ochranu
          osobných údajov, vrátane: šifrovania prenosu (HTTPS/TLS), CSRF
          ochrany formulárov, rate limitingu API endpointov, sanitizácie
          vstupov, bezpečnostných hlavičiek (CSP, HSTS, X-Frame-Options).
        </p>

        <h2 className="font-black text-[var(--text-primary)]">
          9. Odkazy na tretie strany
        </h2>
        <p>
          Portál obsahuje odkazy na partnerské weby (8888.sk, sroihned.sk,
          digitalnipostari.sk) a ďalšie externé zdroje. Za ochranu osobných
          údajov na týchto weboch nenesieme zodpovednosť. Odporúčame
          oboznámiť sa s ich zásadami ochrany súkromia.
        </p>

        <h2 className="font-black text-[var(--text-primary)]">
          10. Zmeny zásad
        </h2>
        <p>
          Tieto Zásady môžeme príležitostne aktualizovať. Aktuálna verzia je
          vždy dostupná na tejto stránke s dátumom poslednej aktualizácie. Pri
          podstatných zmenách vás informujeme prostredníctvom oznámenia na
          portáli alebo e-mailom (ak ste prihlásení na newsletter).
        </p>
      </article>
    </main>
  );
}
