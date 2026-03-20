/**
 * Industry Data
 *
 * Industry-specific e-invoicing information for programmatic /odvetvia/[slug] pages.
 * Each industry gets a unique page with specific challenges, recommendations, and ERP suggestions.
 *
 * Used by: /odvetvia hub, /odvetvia/[slug] detail pages, sitemap
 */

export interface Industry {
  slug: string;
  nameSk: string;
  nameEn: string;
  descriptionSk: string;
  descriptionEn: string;
  commonErpSlugs: string[];
  typicalChallengesSk: string[];
  typicalChallengesEn: string[];
  recommendationsSk: string;
  recommendationsEn: string;
}

export const industries: Industry[] = [
  {
    slug: 'stavebnictvo',
    nameSk: 'Stavebníctvo',
    nameEn: 'Construction',
    descriptionSk: 'Stavebné firmy, subdodávatelia, projektanti. Veľké množstvo faktúr, zálohové faktúry, prenos daňovej povinnosti.',
    descriptionEn: 'Construction companies, subcontractors, designers. High invoice volume, advance invoices, reverse charge.',
    commonErpSlugs: ['pohoda', 'omega', 'helios', 'money-s3'],
    typicalChallengesSk: [
      'Vysoký počet subdodávateľov a faktúr',
      'Zálohové faktúry a čiastkové fakturácie',
      'Prenos daňovej povinnosti (reverse charge) v e-faktúre',
      'Množstvo malých subdodávateľov bez ERP systému',
    ],
    typicalChallengesEn: [
      'High number of subcontractors and invoices',
      'Advance invoices and partial billing',
      'Reverse charge mechanism in e-invoices',
      'Many small subcontractors without ERP systems',
    ],
    recommendationsSk: 'Začnite s komunikáciou so subdodávateľmi o ich pripravenosti na e-faktúru. Overte, či váš softvér podporuje reverse charge v Peppol formáte.',
    recommendationsEn: 'Start communicating with subcontractors about their e-invoice readiness. Verify your software supports reverse charge in Peppol format.',
  },
  {
    slug: 'it-sluzby',
    nameSk: 'IT a digitálne služby',
    nameEn: 'IT and digital services',
    descriptionSk: 'Softvérové firmy, agentúry, freelance developeri. Predplatné, SaaS fakturácia, medzinárodní klienti.',
    descriptionEn: 'Software companies, agencies, freelance developers. Subscriptions, SaaS billing, international clients.',
    commonErpSlugs: ['superfaktura', 'flexibee-abra', 'billdu', 'fintoro'],
    typicalChallengesSk: [
      'Opakovaná fakturácia (subscriptions, mesačné platby)',
      'Medzinárodní klienti (cezhraničné až od 2030)',
      'Viacero mien (EUR, USD, CZK)',
      'Automatizácia fakturácie cez API',
    ],
    typicalChallengesEn: [
      'Recurring billing (subscriptions, monthly payments)',
      'International clients (cross-border from 2030)',
      'Multiple currencies (EUR, USD, CZK)',
      'Invoice automation via API',
    ],
    recommendationsSk: 'Vyberte si fakturačný systém s API a Peppol podporou (SuperFaktúra, FlexiBee, Billdu). Pre medzinárodných klientov zatiaľ nie je e-faktúra povinná.',
    recommendationsEn: 'Choose an invoicing system with API and Peppol support (SuperFaktúra, FlexiBee, Billdu). For international clients, e-invoicing is not yet mandatory.',
  },
  {
    slug: 'maloobchod',
    nameSk: 'Maloobchod',
    nameEn: 'Retail',
    descriptionSk: 'Predajne, e-shopy, veľkoobchody. Veľký objem transakcií, B2C výnimka, dodávateľské faktúry.',
    descriptionEn: 'Stores, e-shops, wholesalers. High transaction volume, B2C exemption, supplier invoices.',
    commonErpSlugs: ['pohoda', 'idoklad', 'money-s3', 'helios'],
    typicalChallengesSk: [
      'B2C transakcie sú oslobodené — ale B2B nákupy od dodávateľov nie',
      'Veľký objem prijímaných faktúr od dodávateľov',
      'Napojenie na pokladničný systém',
      'Rôzni dodávatelia s rôznym stupňom pripravenosti',
    ],
    typicalChallengesEn: [
      'B2C transactions are exempt — but B2B purchases from suppliers are not',
      'High volume of received invoices from suppliers',
      'Connection to POS system',
      'Various suppliers with different readiness levels',
    ],
    recommendationsSk: 'Aj keď B2C faktúry nemusíte vystavovať elektronicky, musíte byť pripravení prijímať e-faktúry od dodávateľov. Zaregistrujte sa v Peppol čo najskôr.',
    recommendationsEn: 'Even though you don\'t need to issue B2C invoices electronically, you must be ready to receive e-invoices from suppliers. Register in Peppol as soon as possible.',
  },
  {
    slug: 'gastro-hotelierstvo',
    nameSk: 'Gastro a hotelierstvo',
    nameEn: 'Hospitality and restaurants',
    descriptionSk: 'Reštaurácie, hotely, catering. Prevažne B2C, ale B2B dodávky potravín a služieb.',
    descriptionEn: 'Restaurants, hotels, catering. Primarily B2C, but B2B food and service supplies.',
    commonErpSlugs: ['pohoda', 'idoklad', 'superfaktura'],
    typicalChallengesSk: [
      'Väčšina tržieb je B2C (oslobodená)',
      'B2B dodávky od veľkoobchodov vyžadujú e-faktúru',
      'Sezónne výkyvy v počte faktúr',
      'Catering pre firmy = B2B = povinná e-faktúra',
    ],
    typicalChallengesEn: [
      'Most revenue is B2C (exempt)',
      'B2B supplies from wholesalers require e-invoicing',
      'Seasonal fluctuations in invoice volume',
      'Corporate catering = B2B = mandatory e-invoicing',
    ],
    recommendationsSk: 'Ak máte aj B2B klientov (firemné obedy, catering, konferencie), potrebujete e-faktúru. Pre čisto B2C prevádzky stačí registrácia na príjem e-faktúr od dodávateľov.',
    recommendationsEn: 'If you have B2B clients (corporate lunches, catering, conferences), you need e-invoicing. For purely B2C operations, just register to receive e-invoices from suppliers.',
  },
  {
    slug: 'slobodne-povolania',
    nameSk: 'Slobodné povolania',
    nameEn: 'Liberal professions',
    descriptionSk: 'Advokáti, notári, lekári, architekti, daňoví poradcovia. Špecifické pravidlá pre profesijné komory.',
    descriptionEn: 'Lawyers, notaries, doctors, architects, tax advisors. Specific rules for professional chambers.',
    commonErpSlugs: ['superfaktura', 'idoklad', 'billdu', 'fintoro'],
    typicalChallengesSk: [
      'Fakturácia za odborné služby (hodinové sadzby)',
      'Mix B2B a B2C klientov',
      'Dôvernosť — niektoré údaje nemôžu byť v e-faktúre',
      'Profesijné komory môžu mať ďalšie požiadavky',
    ],
    typicalChallengesEn: [
      'Billing for professional services (hourly rates)',
      'Mix of B2B and B2C clients',
      'Confidentiality — some data cannot be in e-invoices',
      'Professional chambers may have additional requirements',
    ],
    recommendationsSk: 'Pre B2B klientov (firmy, štátne inštitúcie) je e-faktúra povinná. Pre fyzické osoby nie. Vyberte jednoduchý online systém s Peppol podporou.',
    recommendationsEn: 'For B2B clients (companies, state institutions), e-invoicing is mandatory. For individuals, it is not. Choose a simple online system with Peppol support.',
  },
  {
    slug: 'doprava-logistika',
    nameSk: 'Doprava a logistika',
    nameEn: 'Transport and logistics',
    descriptionSk: 'Prepravné spoločnosti, kuriéri, špedície. Veľký objem faktúr, medzinárodné transakcie.',
    descriptionEn: 'Transport companies, couriers, freight forwarders. High invoice volume, international transactions.',
    commonErpSlugs: ['helios', 'sap', 'pohoda', 'money-s3'],
    typicalChallengesSk: [
      'Vysoký objem faktúr',
      'Medzinárodné transakcie (cezhraničné od 2030)',
      'Rôzne druhy služieb a DPH sadzieb',
      'Palivové príplatky a variabilné náklady',
    ],
    typicalChallengesEn: [
      'High invoice volume',
      'International transactions (cross-border from 2030)',
      'Various service types and VAT rates',
      'Fuel surcharges and variable costs',
    ],
    recommendationsSk: 'Investujte do ERP s automatizovanou Peppol integráciou. Pri vysokom objeme faktúr je manuálne spracovanie nereálne.',
    recommendationsEn: 'Invest in ERP with automated Peppol integration. With high invoice volumes, manual processing is unrealistic.',
  },
  {
    slug: 'neziskove-organizacie',
    nameSk: 'Neziskové organizácie',
    nameEn: 'Non-profit organizations',
    descriptionSk: 'Občianske združenia, nadácie, neziskovky. Povinnosti ak sú platiteľmi DPH.',
    descriptionEn: 'Civic associations, foundations, non-profits. Obligations if they are VAT payers.',
    commonErpSlugs: ['pohoda', 'omega', 'superfaktura'],
    typicalChallengesSk: [
      'Mnohé neziskovky nie sú platiteľmi DPH (neplatia sa)',
      'Ak sú platiteľmi DPH — rovnaké povinnosti ako firmy',
      'Granty a dotácie — špecifické fakturačné pravidlá',
      'Obmedzený rozpočet na IT',
    ],
    typicalChallengesEn: [
      'Many non-profits are not VAT payers (exempt)',
      'If VAT payers — same obligations as businesses',
      'Grants and subsidies — specific invoicing rules',
      'Limited IT budget',
    ],
    recommendationsSk: 'Ak nie ste platiteľ DPH, nemusíte vystavovať e-faktúry, ale musíte vedieť prijímať. Stačí bezplatný účet u digitálneho poštára.',
    recommendationsEn: 'If you are not a VAT payer, you don\'t need to issue e-invoices, but you must be able to receive them. A free account with a digital postman is sufficient.',
  },
];
