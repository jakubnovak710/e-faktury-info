/**
 * ERP & Invoicing Software Data
 *
 * Structured data for programmatic /integracie/[slug] pages.
 * Each entry generates a unique page with >40% unique content.
 *
 * Used by: /integracie hub page, /integracie/[slug] detail pages,
 *          /porovnanie comparison pages, sitemap generation
 *
 * Sources: vendor websites, epostak.sk, financnasprava.sk (March 2026)
 */

export interface ErpSystem {
  slug: string;
  name: string;
  vendor: string;
  descriptionSk: string;
  descriptionEn: string;
  peppolStatus: 'ready' | 'in-progress' | 'planned' | 'unknown';
  peppolStatusNote: string;
  peppolDate?: string;
  apiSupport: boolean;
  xmlExport: boolean;
  ublSupport: boolean;
  isdocSupport: boolean;
  targetAudience: ('freelancer' | 'small-business' | 'medium-business' | 'enterprise' | 'accountant')[];
  website: string;
  pricingFrom?: string;
  features: string[];
  prosAndCons: { pros: string[]; cons: string[] };
}

export const erpSystems: ErpSystem[] = [
  {
    slug: 'pohoda',
    name: 'POHODA',
    vendor: 'STORMWARE',
    descriptionSk:
      'Jeden z najrozšírenejších ekonomických a účtovných systémov na Slovensku. Podporuje jednoduché aj podvojné účtovníctvo, skladové hospodárstvo, mzdy a fakturáciu.',
    descriptionEn:
      'One of the most widely used economic and accounting systems in Slovakia. Supports single and double-entry bookkeeping, inventory, payroll, and invoicing.',
    peppolStatus: 'in-progress',
    peppolStatusNote: 'XML export existuje, natívna Peppol integrácia vo vývoji. UBL 2.1 support plánovaný na Q3 2026.',
    peppolDate: '2026-Q3',
    apiSupport: false,
    xmlExport: true,
    ublSupport: false,
    isdocSupport: true,
    targetAudience: ['freelancer', 'small-business', 'medium-business', 'accountant'],
    website: 'https://www.stormware.sk/pohoda/',
    pricingFrom: 'od 299 EUR/rok',
    features: ['Podvojné účtovníctvo', 'Jednoduché účtovníctvo', 'Sklad', 'Mzdy', 'Fakturácia', 'DPH priznanie', 'mPOHODA (mobil)'],
    prosAndCons: {
      pros: ['Najrozšírenejší systém na SK', 'Široká podpora účtovníkov', 'Offline aj online verzia', 'ISDOC export'],
      cons: ['Bez API — vyžaduje manuálny XML upload', 'Peppol integrácia ešte nie je hotová', 'Desktopová aplikácia (nie cloud-native)'],
    },
  },
  {
    slug: 'omega',
    name: 'OMEGA',
    vendor: 'KROS',
    descriptionSk:
      'Profesionálny účtovný softvér od KROS, populárny medzi účtovnými kanceláriami. Podporuje podvojné účtovníctvo, DPH, majetok a mzdy.',
    descriptionEn:
      'Professional accounting software by KROS, popular among accounting firms. Supports double-entry bookkeeping, VAT, assets, and payroll.',
    peppolStatus: 'in-progress',
    peppolStatusNote: 'Generovanie štruktúrovaných XML faktúr. Pripravuje priame API napojenie na certifikovaných digitálnych poštárov.',
    apiSupport: false,
    xmlExport: true,
    ublSupport: false,
    isdocSupport: true,
    targetAudience: ['accountant', 'small-business', 'medium-business'],
    website: 'https://www.kros.sk/omega/',
    pricingFrom: 'od 399 EUR/rok',
    features: ['Podvojné účtovníctvo', 'DPH', 'Majetok', 'Mzdy', 'Fakturácia', 'Sklad', 'Daňové priznania'],
    prosAndCons: {
      pros: ['Obľúbený medzi účtovníkmi', 'Kvalitná SK podpora', 'Pravidelné legislatívne updaty', 'KROS ekosystém'],
      cons: ['Bez API zatiaľ', 'Desktopový softvér', 'Vyššia cena pre menšie firmy'],
    },
  },
  {
    slug: 'superfaktura',
    name: 'SuperFaktúra',
    vendor: 'SuperFaktúra s.r.o.',
    descriptionSk:
      'Populárny online fakturačný systém s rozsiahlou automatizáciou. Integrácia s e-shopmi, CRM, skladom a bankovým párovaním.',
    descriptionEn:
      'Popular online invoicing system with extensive automation. Integration with e-shops, CRM, inventory, and bank reconciliation.',
    peppolStatus: 'ready',
    peppolStatusNote: 'Plná Peppol integrácia pripravená. Stačí aktivovať Peppol modul v nastaveniach.',
    apiSupport: true,
    xmlExport: true,
    ublSupport: true,
    isdocSupport: true,
    targetAudience: ['freelancer', 'small-business'],
    website: 'https://www.superfaktura.sk/',
    pricingFrom: 'od 0 EUR (free tier)',
    features: ['Online fakturácia', 'Automatické párovanie platieb', 'API', 'E-shop integrácie', 'CRM', 'Sklad', 'Mobilná app'],
    prosAndCons: {
      pros: ['Peppol ready', 'Silné API', 'Free tier k dispozícii', 'Jednoduché rozhranie', 'E-shop integrácie'],
      cons: ['Len fakturácia (nie plné účtovníctvo)', 'Limitované funkcie vo free verzii', 'Menej vhodná pre väčšie firmy'],
    },
  },
  {
    slug: 'idoklad',
    name: 'iDoklad',
    vendor: 'Solitea',
    descriptionSk:
      'Najpoužívanejšia online fakturačná aplikácia v strednej Európe s viac ako 300 000 používateľmi. Viac ako 30 funkcií.',
    descriptionEn:
      'The most used online invoicing app in Central Europe with 300,000+ users. More than 30 features.',
    peppolStatus: 'in-progress',
    peppolStatusNote: 'API existuje, Peppol modul v príprave. ISDOC support dlhodobo.',
    apiSupport: true,
    xmlExport: true,
    ublSupport: false,
    isdocSupport: true,
    targetAudience: ['freelancer', 'small-business'],
    website: 'https://www.idoklad.sk/',
    pricingFrom: 'od 0 EUR (free tier)',
    features: ['Online fakturácia', 'Mobilná app', 'Automatické upomienky', 'Párovanie platieb', 'API', 'Pokladňa', 'QR platby'],
    prosAndCons: {
      pros: ['300 000+ používateľov', 'Kvalitná mobilná app', 'Free tier', 'API k dispozícii', 'Automatické upomienky'],
      cons: ['Peppol ešte nie je ready', 'Len fakturácia', 'Niektoré funkcie len v platených plánoch'],
    },
  },
  {
    slug: 'money-s3',
    name: 'Money S3',
    vendor: 'Solitea',
    descriptionSk:
      'Ekonomický systém pre malé a stredné firmy. Účtovníctvo, fakturácia, sklad, mzdy v jednom balíku.',
    descriptionEn:
      'Economic system for SMEs. Accounting, invoicing, inventory, payroll in one package.',
    peppolStatus: 'planned',
    peppolStatusNote: 'Bez API — vyžaduje manuálny upload XML súborov cez digitálneho poštára. Peppol podpora plánovaná.',
    apiSupport: false,
    xmlExport: true,
    ublSupport: false,
    isdocSupport: true,
    targetAudience: ['small-business', 'medium-business', 'accountant'],
    website: 'https://money.sk/',
    pricingFrom: 'od 199 EUR/rok',
    features: ['Podvojné účtovníctvo', 'Jednoduché účtovníctvo', 'Sklad', 'Mzdy', 'Fakturácia', 'DPH'],
    prosAndCons: {
      pros: ['Kompletný ekonomický systém', 'Cenovo dostupný', 'ISDOC support', 'Offline prevádzka'],
      cons: ['Bez API', 'Peppol ešte neplánovaný s dátumom', 'Staršie rozhranie'],
    },
  },
  {
    slug: 'flexibee-abra',
    name: 'FlexiBee (ABRA)',
    vendor: 'ABRA Software',
    descriptionSk:
      'Cloudový ERP systém s pokročilým API a exportom do UBL formátu. Aktuálne najlepšie pripravený na Peppol integráciu spomedzi testovaných softvérov.',
    descriptionEn:
      'Cloud ERP system with advanced API and UBL format export. Currently the best prepared for Peppol integration among tested software.',
    peppolStatus: 'ready',
    peppolStatusNote: 'REST API endpointy pre Peppol pripravené. UBL 2.1 export natívne. Najlepšie pripravený systém.',
    apiSupport: true,
    xmlExport: true,
    ublSupport: true,
    isdocSupport: true,
    targetAudience: ['small-business', 'medium-business'],
    website: 'https://www.flexibee.eu/sk/',
    pricingFrom: 'od 25 EUR/mesiac',
    features: ['Cloud ERP', 'REST API', 'UBL export', 'Fakturácia', 'Účtovníctvo', 'Sklad', 'CRM', 'E-shop integrácie'],
    prosAndCons: {
      pros: ['Peppol ready (najlepšie pripravený)', 'Silné REST API', 'Cloud-native', 'UBL 2.1 natívne'],
      cons: ['Menšia používateľská základňa na SK', 'Mesačné platby', 'Krivka učenia pre pokročilé funkcie'],
    },
  },
  {
    slug: 'billdu',
    name: 'Billdu',
    vendor: 'Billdu s.r.o.',
    descriptionSk:
      'Slovenský fakturačný systém s medzinárodným dosahom. Jednoduchá online fakturácia s mobilnou aplikáciou.',
    descriptionEn:
      'Slovak invoicing system with international reach. Simple online invoicing with mobile app.',
    peppolStatus: 'ready',
    peppolStatusNote: 'Integrácia s Peppol pripravená — stačí aktivovať Peppol modul.',
    apiSupport: true,
    xmlExport: true,
    ublSupport: true,
    isdocSupport: false,
    targetAudience: ['freelancer', 'small-business'],
    website: 'https://www.billdu.com/sk/',
    pricingFrom: 'od 3.99 EUR/mesiac',
    features: ['Online fakturácia', 'Mobilná app', 'Odhady a ponuky', 'Sledovanie výdavkov', 'Párovanie platieb', 'Multi-mena'],
    prosAndCons: {
      pros: ['Peppol ready', 'Slovenský produkt', 'Cenovo dostupný', 'Kvalitná mobilná app'],
      cons: ['Len fakturácia (nie účtovníctvo)', 'Bez ISDOC', 'Limitované pre väčšie firmy'],
    },
  },
  {
    slug: 'helios',
    name: 'HELIOS',
    vendor: 'Asseco Solutions',
    descriptionSk:
      'Enterprise ERP systém pre stredné a veľké firmy. Komplexné riešenie zahŕňajúce účtovníctvo, výrobu, logistiku a HR.',
    descriptionEn:
      'Enterprise ERP system for medium and large companies. Comprehensive solution including accounting, manufacturing, logistics, and HR.',
    peppolStatus: 'ready',
    peppolStatusNote: 'Asseco Solutions je certifikovaný Peppol Access Point. HELIOS má natívnu Peppol integráciu.',
    apiSupport: true,
    xmlExport: true,
    ublSupport: true,
    isdocSupport: true,
    targetAudience: ['medium-business', 'enterprise'],
    website: 'https://www.helios.eu/sk/',
    pricingFrom: 'individuálna cenová ponuka',
    features: ['ERP', 'Účtovníctvo', 'Výroba', 'Logistika', 'HR/Mzdy', 'CRM', 'BI', 'Peppol AP'],
    prosAndCons: {
      pros: ['Peppol ready (Asseco je certifikovaný AP)', 'Komplexný enterprise ERP', 'Silná SK podpora', 'Dlhoročné skúsenosti'],
      cons: ['Vysoká cena', 'Dlhá implementácia', 'Nie pre malé firmy'],
    },
  },
  {
    slug: 'sap',
    name: 'SAP',
    vendor: 'SAP SE',
    descriptionSk:
      'Globálny líder v enterprise ERP. Na Slovensku používaný veľkými podnikmi a korporáciami.',
    descriptionEn:
      'Global leader in enterprise ERP. Used by large enterprises and corporations in Slovakia.',
    peppolStatus: 'ready',
    peppolStatusNote: 'SAP má globálnu Peppol podporu. Pre SK trh je potrebná konfigurácia lokálnych parametrov.',
    apiSupport: true,
    xmlExport: true,
    ublSupport: true,
    isdocSupport: false,
    targetAudience: ['enterprise'],
    website: 'https://www.sap.com/sk/',
    pricingFrom: 'individuálna cenová ponuka',
    features: ['Enterprise ERP', 'Financie', 'Nákup', 'Predaj', 'Výroba', 'Logistika', 'HR', 'Analytika'],
    prosAndCons: {
      pros: ['Globálna Peppol podpora', 'Komplexný enterprise systém', 'Silná partner sieť na SK'],
      cons: ['Veľmi vysoká cena', 'Dlhá implementácia', 'Iba pre veľké firmy', 'Komplikovaná konfigurácia'],
    },
  },
  {
    slug: 'mrp',
    name: 'MRP',
    vendor: 'MRP Company',
    descriptionSk:
      'Slovenský ekonomický softvér pre malé a stredné firmy. Účtovníctvo, mzdy, fakturácia, sklad.',
    descriptionEn:
      'Slovak economic software for SMEs. Accounting, payroll, invoicing, inventory.',
    peppolStatus: 'in-progress',
    peppolStatusNote: 'MRP pracuje na Peppol Access Point integrácii. ISDOC support existuje.',
    apiSupport: false,
    xmlExport: true,
    ublSupport: false,
    isdocSupport: true,
    targetAudience: ['small-business', 'medium-business', 'accountant'],
    website: 'https://mrp.sk/',
    pricingFrom: 'od 149 EUR/rok',
    features: ['Účtovníctvo', 'Mzdy', 'Fakturácia', 'Sklad', 'DPH', 'Peppol AP (vo vývoji)'],
    prosAndCons: {
      pros: ['Cenovo dostupný', 'Slovenský produkt', 'Pracuje na vlastnom Peppol AP', 'ISDOC'],
      cons: ['Bez API', 'Starší dizajn', 'Peppol ešte nie je hotový'],
    },
  },
  {
    slug: 'fintoro',
    name: 'Fintoro',
    vendor: 'Fintoro s.r.o.',
    descriptionSk:
      'Moderný slovenský fakturačný a účtovný systém. Online platforma s napojením na Peppol sieť.',
    descriptionEn:
      'Modern Slovak invoicing and accounting system. Online platform connected to the Peppol network.',
    peppolStatus: 'ready',
    peppolStatusNote: 'Priame napojenie do Peppol siete. Ponúka riešenie e-faktúry vrátane doručovacej služby.',
    apiSupport: true,
    xmlExport: true,
    ublSupport: true,
    isdocSupport: false,
    targetAudience: ['freelancer', 'small-business'],
    website: 'https://fintoro.sk/',
    pricingFrom: 'od 9.90 EUR/mesiac',
    features: ['Online fakturácia', 'Účtovníctvo', 'Peppol integrácia', 'Bankové napojenie', 'Mobilná app'],
    prosAndCons: {
      pros: ['Peppol ready', 'Moderné rozhranie', 'Slovenský produkt', 'All-in-one riešenie'],
      cons: ['Novší na trhu', 'Menšia komunita', 'Menej integrácií s tretími stranami'],
    },
  },
];
