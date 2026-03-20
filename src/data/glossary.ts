/**
 * Glossary Terms Data
 *
 * Structured glossary for programmatic /slovnik/[slug] pages.
 * Each term generates a unique page with 300+ word explanation.
 *
 * Used by: /slovnik hub (alphabetical list), /slovnik/[slug] detail,
 *          DefinedTermSet + DefinedTerm JSON-LD schema, inline tooltips
 *
 * Categories: technical, legal, business
 */

export interface GlossaryTerm {
  slug: string;
  term: string;
  termEn: string;
  shortDefinitionSk: string;
  shortDefinitionEn: string;
  category: 'technical' | 'legal' | 'business';
  relatedSlugs: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: 'e-faktura',
    term: 'E-faktúra',
    termEn: 'E-invoice',
    shortDefinitionSk: 'Faktúra vyhotovená, zaslaná a prijatá v štruktúrovanom elektronickom formáte XML podľa európskeho štandardu EN 16931.',
    shortDefinitionEn: 'An invoice created, sent, and received in a structured electronic XML format according to the European standard EN 16931.',
    category: 'business',
    relatedSlugs: ['xml', 'en-16931', 'peppol', 'ubl-21'],
  },
  {
    slug: 'peppol',
    term: 'Peppol',
    termEn: 'Peppol',
    shortDefinitionSk: 'Pan-European Public Procurement On-Line — medzinárodná sieť na bezpečnú výmenu elektronických dokumentov, predovšetkým e-faktúr.',
    shortDefinitionEn: 'Pan-European Public Procurement On-Line — international network for secure exchange of electronic documents, primarily e-invoices.',
    category: 'technical',
    relatedSlugs: ['peppol-bis-billing', 'access-point', 'smp', 'peppol-id'],
  },
  {
    slug: 'digitalny-postar',
    term: 'Digitálny poštár',
    termEn: 'Digital postman',
    shortDefinitionSk: 'Certifikovaný poskytovateľ doručovacej služby (Access Point), ktorý zabezpečuje odosielanie a prijímanie e-faktúr cez Peppol sieť.',
    shortDefinitionEn: 'Certified delivery service provider (Access Point) that ensures sending and receiving of e-invoices via the Peppol network.',
    category: 'business',
    relatedSlugs: ['access-point', 'peppol', 'certifikovana-dorucovacia-sluzba'],
  },
  {
    slug: 'en-16931',
    term: 'EN 16931',
    termEn: 'EN 16931',
    shortDefinitionSk: 'Európska norma definujúca sémantický model dát pre elektronické faktúry. Základ pre formát e-faktúry na Slovensku.',
    shortDefinitionEn: 'European standard defining the semantic data model for electronic invoices. The basis for Slovakia\'s e-invoice format.',
    category: 'technical',
    relatedSlugs: ['ubl-21', 'xml', 'e-faktura', 'peppol-bis-billing'],
  },
  {
    slug: 'ubl-21',
    term: 'UBL 2.1',
    termEn: 'UBL 2.1',
    shortDefinitionSk: 'Universal Business Language verzia 2.1 — štandard OASIS pre formát XML dokumentov vrátane faktúr, objednávok a dodacích listov.',
    shortDefinitionEn: 'Universal Business Language version 2.1 — OASIS standard for XML document format including invoices, orders, and delivery notes.',
    category: 'technical',
    relatedSlugs: ['xml', 'en-16931', 'peppol-bis-billing'],
  },
  {
    slug: 'xml',
    term: 'XML',
    termEn: 'XML',
    shortDefinitionSk: 'eXtensible Markup Language — značkovací jazyk pre štruktúrované dáta. E-faktúra je XML súbor podľa štandardu EN 16931.',
    shortDefinitionEn: 'eXtensible Markup Language — markup language for structured data. The e-invoice is an XML file following EN 16931 standard.',
    category: 'technical',
    relatedSlugs: ['en-16931', 'ubl-21', 'e-faktura'],
  },
  {
    slug: 'access-point',
    term: 'Access Point',
    termEn: 'Access Point',
    shortDefinitionSk: 'Prístupový bod do Peppol siete — technický koncový bod digitálneho poštára, cez ktorý sa odosielajú a prijímajú e-faktúry.',
    shortDefinitionEn: 'Entry point to the Peppol network — the technical endpoint of a digital postman through which e-invoices are sent and received.',
    category: 'technical',
    relatedSlugs: ['digitalny-postar', 'peppol', 'smp'],
  },
  {
    slug: 'peppol-bis-billing',
    term: 'Peppol BIS Billing 3.0',
    termEn: 'Peppol BIS Billing 3.0',
    shortDefinitionSk: 'Štandardizovaný profil e-faktúry v sieti Peppol. Definuje povinnú XML štruktúru, polia a obchodné pravidlá založené na UBL 2.1 a EN 16931.',
    shortDefinitionEn: 'Standardized e-invoice profile in the Peppol network. Defines the mandatory XML structure, fields, and business rules based on UBL 2.1 and EN 16931.',
    category: 'technical',
    relatedSlugs: ['peppol', 'ubl-21', 'en-16931'],
  },
  {
    slug: 'peppol-id',
    term: 'Peppol ID',
    termEn: 'Peppol ID',
    shortDefinitionSk: 'Unikátny identifikátor firmy v Peppol sieti. Pre SK firmy formát 0245:XXXXXXXXXX (kde X = DIČ). Registrácia cez digitálneho poštára.',
    shortDefinitionEn: 'Unique company identifier in the Peppol network. For SK companies: 0245:XXXXXXXXXX (X = tax ID). Registration via digital postman.',
    category: 'technical',
    relatedSlugs: ['peppol', 'digitalny-postar', 'dic'],
  },
  {
    slug: 'smp',
    term: 'SMP (Service Metadata Publisher)',
    termEn: 'SMP (Service Metadata Publisher)',
    shortDefinitionSk: 'Register v Peppol sieti, kde sú uložené informácie o účastníkoch — ich Peppol ID, podporované dokumenty a prístupové body.',
    shortDefinitionEn: 'Registry in the Peppol network storing participant information — their Peppol ID, supported documents, and access points.',
    category: 'technical',
    relatedSlugs: ['peppol', 'peppol-id', 'access-point'],
  },
  {
    slug: 'is-efa',
    term: 'IS EFA',
    termEn: 'IS EFA',
    shortDefinitionSk: 'Informačný systém elektronickej fakturácie — štátny systém prevádzkovaný Finančnou správou SR na spracovanie a uchovávanie údajov z e-faktúr.',
    shortDefinitionEn: 'Electronic Invoicing Information System — state system operated by Slovak Financial Administration for processing and storing e-invoice data.',
    category: 'legal',
    relatedSlugs: ['financna-sprava', 'e-faktura', 'e-reporting'],
  },
  {
    slug: 'vida-smernica',
    term: 'ViDA smernica',
    termEn: 'ViDA Directive',
    shortDefinitionSk: 'VAT in the Digital Age — smernica EÚ 2025/516 modernizujúca pravidlá DPH, zavádzajúca povinné e-faktúry a digitálne reportovanie v celej EÚ.',
    shortDefinitionEn: 'VAT in the Digital Age — EU Directive 2025/516 modernizing VAT rules, introducing mandatory e-invoicing and digital reporting across the EU.',
    category: 'legal',
    relatedSlugs: ['e-faktura', 'e-reporting', 'dph'],
  },
  {
    slug: 'dph',
    term: 'DPH (Daň z pridanej hodnoty)',
    termEn: 'VAT (Value Added Tax)',
    shortDefinitionSk: 'Nepriama daň uvalená na väčšinu tovarov a služieb. Povinná e-faktúra sa vzťahuje na platiteľov DPH.',
    shortDefinitionEn: 'Indirect tax levied on most goods and services. Mandatory e-invoicing applies to VAT payers.',
    category: 'legal',
    relatedSlugs: ['e-faktura', 'platitel-dph', 'ic-dph'],
  },
  {
    slug: 'e-reporting',
    term: 'E-reporting',
    termEn: 'E-reporting',
    shortDefinitionSk: 'Digitálne oznamovanie údajov z faktúr finančnej správe v reálnom čase. Súčasť novely zákona o DPH spolu s e-faktúrou.',
    shortDefinitionEn: 'Digital reporting of invoice data to financial administration in real-time. Part of the VAT Act amendment alongside e-invoicing.',
    category: 'legal',
    relatedSlugs: ['e-faktura', 'is-efa', 'financna-sprava'],
  },
  {
    slug: 'certifikovana-dorucovacia-sluzba',
    term: 'Certifikovaná doručovacia služba',
    termEn: 'Certified delivery service',
    shortDefinitionSk: 'Služba zabezpečujúca doručenie e-faktúr cez Peppol sieť. Povinná od 1.7.2027. Poskytovateľ musí byť certifikovaný Peppol a akreditovaný Finančnou správou.',
    shortDefinitionEn: 'Service ensuring delivery of e-invoices via Peppol network. Mandatory from 1 July 2027. Provider must be Peppol-certified and accredited by Financial Administration.',
    category: 'business',
    relatedSlugs: ['digitalny-postar', 'access-point', 'peppol'],
  },
  {
    slug: 'b2b',
    term: 'B2B (Business-to-Business)',
    termEn: 'B2B (Business-to-Business)',
    shortDefinitionSk: 'Obchodné transakcie medzi podnikateľskými subjektmi. E-faktúra je povinná pre B2B od 1.1.2027.',
    shortDefinitionEn: 'Business transactions between companies. E-invoicing is mandatory for B2B from 1 January 2027.',
    category: 'business',
    relatedSlugs: ['b2g', 'b2c', 'e-faktura'],
  },
  {
    slug: 'b2g',
    term: 'B2G (Business-to-Government)',
    termEn: 'B2G (Business-to-Government)',
    shortDefinitionSk: 'Obchodné transakcie medzi podnikmi a verejnou správou. E-faktúra povinná od 1.1.2027.',
    shortDefinitionEn: 'Business transactions between companies and public administration. E-invoicing mandatory from 1 January 2027.',
    category: 'business',
    relatedSlugs: ['b2b', 'b2c', 'e-faktura'],
  },
  {
    slug: 'b2c',
    term: 'B2C (Business-to-Consumer)',
    termEn: 'B2C (Business-to-Consumer)',
    shortDefinitionSk: 'Obchodné transakcie so spotrebiteľmi. E-faktúra sa na B2C transakcie NEVZŤAHUJE — stačí bloček alebo klasická faktúra.',
    shortDefinitionEn: 'Business transactions with consumers. E-invoicing does NOT apply to B2C transactions — a receipt or classic invoice is sufficient.',
    category: 'business',
    relatedSlugs: ['b2b', 'b2g', 'e-faktura'],
  },
  {
    slug: 'isdoc',
    term: 'ISDOC',
    termEn: 'ISDOC',
    shortDefinitionSk: 'Information System Document — český/slovenský formát elektronických faktúr. Podporovaný mnohými SK softvérmi, ale NIE je to formát požadovaný zákonom od 2027.',
    shortDefinitionEn: 'Information System Document — Czech/Slovak electronic invoice format. Supported by many SK software, but NOT the format required by law from 2027.',
    category: 'technical',
    relatedSlugs: ['xml', 'ubl-21', 'en-16931'],
  },
  {
    slug: 'edi',
    term: 'EDI (Electronic Data Interchange)',
    termEn: 'EDI (Electronic Data Interchange)',
    shortDefinitionSk: 'Elektronická výmena štruktúrovaných obchodných dokumentov medzi počítačovými systémami. Predchodca modernej e-fakturácie cez Peppol.',
    shortDefinitionEn: 'Electronic exchange of structured business documents between computer systems. Predecessor to modern e-invoicing via Peppol.',
    category: 'technical',
    relatedSlugs: ['peppol', 'xml', 'e-faktura'],
  },
];
