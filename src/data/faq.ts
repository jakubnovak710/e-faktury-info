/**
 * FAQ Data
 *
 * Structured FAQ questions grouped by category.
 * Used by: /otazky hub, /otazky/[category], FAQ sections on pillar pages,
 *          FAQPage JSON-LD schema (rich snippets in Google)
 *
 * Sources: financnasprava.sk FAQ PDF (26 pages), podnikajte.sk, web research
 * Last verified: March 2026
 */

export interface FaqItem {
  id: string;
  questionSk: string;
  questionEn: string;
  answerSk: string;
  answerEn: string;
}

export interface FaqCategory {
  slug: string;
  nameSk: string;
  nameEn: string;
  descriptionSk: string;
  descriptionEn: string;
  items: FaqItem[];
}

export const faqCategories: FaqCategory[] = [
  {
    slug: 'zakladne',
    nameSk: 'Základné otázky',
    nameEn: 'Basic questions',
    descriptionSk: 'Základné informácie o e-faktúre pre tých, čo začínajú.',
    descriptionEn: 'Basic information about e-invoicing for beginners.',
    items: [
      {
        id: 'co-je-efaktura',
        questionSk: 'Čo je e-faktúra?',
        questionEn: 'What is an e-invoice?',
        answerSk:
          'E-faktúra je faktúra vyhotovená, zaslaná a prijatá v štruktúrovanom elektronickom formáte XML podľa európskeho štandardu EN 16931 (Peppol BIS). Na rozdiel od PDF faktúry obsahuje údaje v strojovo čitateľnom formáte, ktorý účtovný program vie automaticky spracovať.',
        answerEn:
          'An e-invoice is an invoice created, sent, and received in a structured electronic XML format according to the European standard EN 16931 (Peppol BIS). Unlike PDF invoices, it contains machine-readable data that accounting software can process automatically.',
      },
      {
        id: 'kedy-povinna',
        questionSk: 'Kedy začne platiť povinná e-faktúra?',
        questionEn: 'When does mandatory e-invoicing start?',
        answerSk:
          'Od 1. januára 2027 pre tuzemské transakcie medzi platiteľmi DPH (B2B a B2G). Dobrovoľná fáza prebieha od Q2 2026. Cezhraničné transakcie budú povinné od 1. júla 2030.',
        answerEn:
          'From 1 January 2027 for domestic transactions between VAT payers (B2B and B2G). The voluntary phase runs from Q2 2026. Cross-border transactions will be mandatory from 1 July 2030.',
      },
      {
        id: 'koho-sa-tyka',
        questionSk: 'Koho sa týka povinná e-faktúra?',
        questionEn: 'Who is affected by mandatory e-invoicing?',
        answerSk:
          'Všetkých platiteľov DPH usadených v tuzemsku — s.r.o., a.s., SZČO (platiteľov DPH), neziskové organizácie aj štátne inštitúcie. Neplatitelia DPH nemusia e-faktúry vystavovať, ale musia byť schopní ich prijímať.',
        answerEn:
          'All domestic VAT payers — Ltd companies, joint-stock companies, self-employed (VAT payers), non-profits, and state institutions. Non-VAT payers do not need to issue e-invoices but must be able to receive them.',
      },
      {
        id: 'pdf-vs-efaktura',
        questionSk: 'Je PDF faktúra to isté ako e-faktúra?',
        questionEn: 'Is a PDF invoice the same as an e-invoice?',
        answerSk:
          'Nie. PDF faktúra je len obrázok faktúry — nie je strojovo čitateľná. E-faktúra je štruktúrovaný XML súbor podľa štandardu EN 16931, ktorý systémy vedia automaticky spracovať. Od 1.1.2027 PDF faktúra nebude spĺňať zákonné požiadavky pre tuzemské B2B transakcie.',
        answerEn:
          'No. A PDF invoice is just an image of an invoice — it is not machine-readable. An e-invoice is a structured XML file according to EN 16931 standard that systems can process automatically. From 1 January 2027, PDF invoices will not meet legal requirements for domestic B2B transactions.',
      },
      {
        id: 'b2c-efaktura',
        questionSk: 'Musím vystavovať e-faktúry pre zákazníkov (B2C)?',
        questionEn: 'Do I need to issue e-invoices for consumers (B2C)?',
        answerSk:
          'Nie. E-faktúra sa vzťahuje len na transakcie medzi podnikmi (B2B) a medzi podnikmi a verejnou správou (B2G). Pre spotrebiteľské transakcie (B2C) stačí bloček alebo klasická faktúra.',
        answerEn:
          'No. E-invoicing applies only to business-to-business (B2B) and business-to-government (B2G) transactions. For consumer transactions (B2C), a receipt or classic invoice is sufficient.',
      },
    ],
  },
  {
    slug: 'technicke',
    nameSk: 'Technické otázky',
    nameEn: 'Technical questions',
    descriptionSk: 'Technické detaily o formátoch, Peppol sieti a digitálnych poštároch.',
    descriptionEn: 'Technical details about formats, Peppol network, and digital postmen.',
    items: [
      {
        id: 'co-je-peppol',
        questionSk: 'Čo je Peppol?',
        questionEn: 'What is Peppol?',
        answerSk:
          'Peppol (Pan-European Public Procurement On-Line) je medzinárodná sieť na bezpečnú výmenu elektronických dokumentov, predovšetkým e-faktúr. Používa ju takmer 20 krajín EÚ. Na Slovensku bude povinná od 1.1.2027.',
        answerEn:
          'Peppol (Pan-European Public Procurement On-Line) is an international network for secure exchange of electronic documents, primarily e-invoices. It is used by almost 20 EU countries. In Slovakia, it will be mandatory from 1 January 2027.',
      },
      {
        id: 'digitalny-postar',
        questionSk: 'Čo je digitálny poštár?',
        questionEn: 'What is a digital postman?',
        answerSk:
          'Digitálny poštár je certifikovaný poskytovateľ doručovacej služby (Access Point), ktorý zabezpečuje bezpečné odosielanie a prijímanie e-faktúr cez Peppol sieť. Každá firma si musí vybrať jedného certifikovaného digitálneho poštára.',
        answerEn:
          'A digital postman is a certified delivery service provider (Access Point) that ensures secure sending and receiving of e-invoices via the Peppol network. Every company must choose one certified digital postman.',
      },
      {
        id: 'peppol-id',
        questionSk: 'Čo je Peppol ID a ako ho získam?',
        questionEn: 'What is a Peppol ID and how do I get one?',
        answerSk:
          'Peppol ID je unikátny identifikátor vašej firmy v Peppol sieti. Pre slovenské firmy má formát 0245:XXXXXXXXXX (kde X je vaše DIČ). Získate ho registráciou u digitálneho poštára — proces trvá zvyčajne 1-2 pracovné dni.',
        answerEn:
          'Peppol ID is a unique identifier for your company in the Peppol network. For Slovak companies, the format is 0245:XXXXXXXXXX (where X is your tax ID). You get it by registering with a digital postman — the process usually takes 1-2 business days.',
      },
      {
        id: 'xml-format',
        questionSk: 'V akom formáte musí byť e-faktúra?',
        questionEn: 'What format must the e-invoice be in?',
        answerSk:
          'E-faktúra musí byť vo formáte XML podľa európskeho štandardu EN 16931 (Peppol BIS Billing 3.0, založený na UBL 2.1). Obsahuje všetky povinné údaje faktúry v štruktúrovanej forme.',
        answerEn:
          'The e-invoice must be in XML format according to the European standard EN 16931 (Peppol BIS Billing 3.0, based on UBL 2.1). It contains all mandatory invoice data in a structured form.',
      },
    ],
  },
  {
    slug: 'pravne',
    nameSk: 'Právne otázky',
    nameEn: 'Legal questions',
    descriptionSk: 'Otázky o legislatíve, povinnostiach a sankciách.',
    descriptionEn: 'Questions about legislation, obligations, and penalties.',
    items: [
      {
        id: 'zakon',
        questionSk: 'Aký zákon upravuje e-faktúru na Slovensku?',
        questionEn: 'What law governs e-invoicing in Slovakia?',
        answerSk:
          'Novela zákona o DPH č. 385/2025 Z.z., schválená Národnou radou SR dňa 9.12.2025. Transponuje články 1 a 5 smernice Rady (EÚ) 2025/516 (ViDA — VAT in the Digital Age).',
        answerEn:
          'VAT Act amendment No. 385/2025 Coll., approved by the Slovak National Council on 9 December 2025. It transposes Articles 1 and 5 of Council Directive (EU) 2025/516 (ViDA — VAT in the Digital Age).',
      },
      {
        id: 'pokuty',
        questionSk: 'Aké pokuty hrozia za nesplnenie povinností?',
        questionEn: 'What penalties apply for non-compliance?',
        answerSk:
          'Pokuta za nevystavenie alebo nesprávne údaje v e-faktúre je až do 10 000 EUR. Pri opakovanom porušení až 100 000 EUR. Ak preukážete, že chyba vznikla neúmyselne alebo na strane digitálneho poštára, pokute sa môžete vyhnúť.',
        answerEn:
          'Penalty for not issuing or incorrect data in e-invoice is up to EUR 10,000. For repeated violations, up to EUR 100,000. If you prove the error was unintentional or caused by the digital postman, you may avoid the penalty.',
      },
      {
        id: 'lehota-vystavenie',
        questionSk: 'Aká je lehota na vystavenie e-faktúry?',
        questionEn: 'What is the deadline for issuing an e-invoice?',
        answerSk:
          'E-faktúru je potrebné vyhotoviť a zaslať najneskôr do 10 dní od dodania tovaru/služby. Pri súhrnnej faktúre do 10 dní od skončenia kalendárneho mesiaca (skrátenie z pôvodných 15 dní).',
        answerEn:
          'The e-invoice must be issued and sent within 10 days of delivery of goods/services. For summary invoices, within 10 days of the end of the calendar month (shortened from the original 15 days).',
      },
      {
        id: 'neplatitel-dph',
        questionSk: 'Musí neplatiteľ DPH vystavovať e-faktúry?',
        questionEn: 'Must a non-VAT payer issue e-invoices?',
        answerSk:
          'Nie, neplatitelia DPH nemajú povinnosť vystavovať e-faktúry (minimálne do 30.6.2030). Ale musia byť schopní e-faktúry prijímať — teda potrebujú registráciu v Peppol sieti a digitálneho poštára.',
        answerEn:
          'No, non-VAT payers are not required to issue e-invoices (at least until 30 June 2030). However, they must be able to receive e-invoices — meaning they need Peppol registration and a digital postman.',
      },
    ],
  },
  {
    slug: 'priprava',
    nameSk: 'Príprava a implementácia',
    nameEn: 'Preparation and implementation',
    descriptionSk: 'Praktické otázky o príprave na e-faktúru.',
    descriptionEn: 'Practical questions about preparing for e-invoicing.',
    items: [
      {
        id: 'ako-zacat',
        questionSk: 'Ako sa pripraviť na e-faktúru?',
        questionEn: 'How to prepare for e-invoicing?',
        answerSk:
          '1) Overte, či váš účtovný softvér podporuje e-faktúru (Peppol). 2) Vyberte si certifikovaného digitálneho poštára. 3) Zaregistrujte sa v Peppol sieti. 4) Otestujte odosielanie a prijímanie e-faktúr v dobrovoľnej fáze (2026). 5) Upravte interné procesy.',
        answerEn:
          '1) Check if your accounting software supports e-invoicing (Peppol). 2) Choose a certified digital postman. 3) Register in the Peppol network. 4) Test sending and receiving e-invoices in the voluntary phase (2026). 5) Adjust internal processes.',
      },
      {
        id: 'naklady',
        questionSk: 'Koľko bude stáť prechod na e-faktúru?',
        questionEn: 'How much will the transition to e-invoicing cost?',
        answerSk:
          'Závisí od veľkosti firmy a softvéru. Pre malé firmy s moderným online fakturačným systémom (SuperFaktúra, Billdu) môže byť prechod takmer bezplatný. Pre väčšie firmy s ERP systémom rátajte s nákladmi na aktualizáciu a integráciu + poplatok digitálnemu poštárovi.',
        answerEn:
          'It depends on company size and software. For small businesses with modern online invoicing (SuperFaktúra, Billdu), the transition may be nearly free. For larger companies with ERP systems, expect update and integration costs plus digital postman fees.',
      },
    ],
  },
];
