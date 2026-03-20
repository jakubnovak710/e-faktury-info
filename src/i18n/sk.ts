/**
 * Slovak translations — primary language
 *
 * Structure:
 * - nav: navigation labels
 * - common: shared UI strings (buttons, labels)
 * - home: homepage content
 * - meta: default meta tags
 * - footer: footer content
 * - legal: legal page references
 * - cta: call-to-action strings
 * - errors: error page content
 */

const sk = {
  nav: {
    home: 'Domov',
    guide: 'Sprievodca',
    whatIsEfaktura: 'Čo je e-faktúra',
    whenStarts: 'Kedy začne platiť',
    howToPrepare: 'Ako sa pripraviť',
    legislation: 'Legislatíva',
    penalties: 'Pokuty a sankcie',
    forWhom: 'Pre koho',
    forFreelancers: 'Pre živnostníkov',
    forSmallBusiness: 'Pre malé firmy',
    forAccountants: 'Pre účtovníkov',
    integrations: 'Integrácie',
    glossary: 'Slovník',
    blog: 'Blog',
    contact: 'Kontakt',
    about: 'O nás',
    services: 'Služby',
    readinessCheck: 'Kontrola pripravenosti',
  },

  common: {
    readMore: 'Čítať viac',
    learnMore: 'Zistiť viac',
    backToHome: 'Späť na domov',
    share: 'Zdieľať',
    lastUpdated: 'Posledná aktualizácia',
    tableOfContents: 'Obsah',
    relatedArticles: 'Súvisiace články',
    youMightAlsoLike: 'Mohlo by vás zaujímať',
    search: 'Hľadať',
    filter: 'Filtrovať',
    all: 'Všetky',
    categories: 'Kategórie',
    tags: 'Štítky',
    author: 'Autor',
    publishedOn: 'Publikované',
    minuteRead: 'min čítania',
    previous: 'Predchádzajúci',
    next: 'Nasledujúci',
    yes: 'Áno',
    no: 'Nie',
    close: 'Zavrieť',
    language: 'Jazyk',
  },

  home: {
    heroTitle: 'Elektronická faktúra na Slovensku',
    heroSubtitle: 'Všetko čo potrebujete vedieť o povinnej e-faktúre od 1.1.2027',
    heroDescription:
      'Kompletný sprievodca elektronickou fakturáciou — legislatíva, príprava, Peppol, digitálni poštári, softvérové riešenia.',
    countdownLabel: 'Do povinnej e-faktúry ostáva',
    days: 'dní',
    hours: 'hodín',
    minutes: 'minút',
    seconds: 'sekúnd',
    ctaPrimary: 'Začnite sa pripravovať',
    ctaSecondary: 'Otestujte svoju pripravenosť',
  },

  meta: {
    defaultTitle: 'e-Faktúry.info',
    defaultDescription:
      'Kompletný sprievodca elektronickou fakturáciou na Slovensku. Všetko o povinnej e-faktúre od 1.1.2027 — legislatíva, príprava, Peppol, digitálni poštári, softvérové riešenia.',
    titleTemplate: '%s | e-Faktúry.info',
  },

  footer: {
    description:
      'Nezávislý informačný portál o elektronickej fakturácii na Slovensku. Prevádzkuje 8888 Servis s. r. o.',
    allRightsReserved: 'Všetky práva vyhradené.',
    madeWith: 'Vytvorené s',
    inSlovakia: 'na Slovensku',
    columns: {
      guide: 'Sprievodca',
      solutions: 'Riešenia',
      about: 'O nás',
      legal: 'Právne',
    },
  },

  legal: {
    privacy: 'Ochrana súkromia',
    terms: 'Obchodné podmienky',
  },

  cta: {
    needHelp: 'Potrebujete pomoc?',
    bookConsultation: 'Objednajte si konzultáciu',
    accountingHelp: 'Potrebujete pomoc s účtovníctvom?',
    visitAccountant: 'Navštíviť 8888.sk',
    startBusiness: 'Zakladáte novú firmu?',
    visitSro: 'Založte si s.r.o. jednoducho',
    findPostman: 'Hľadáte digitálneho poštára?',
    visitPostmen: 'Porovnanie digitálnych poštárov',
    subscribeNewsletter: 'Prihláste sa na odber noviniek',
    emailPlaceholder: 'Váš e-mail',
    subscribe: 'Odoberať',
  },

  errors: {
    notFound: 'Stránka sa nenašla',
    notFoundDescription: 'Stránka, ktorú hľadáte, neexistuje alebo bola presunutá.',
    serverError: 'Nastala chyba',
    serverErrorDescription: 'Niečo sa pokazilo. Skúste to prosím znova.',
    tryAgain: 'Skúsiť znova',
  },

  breadcrumbs: {
    home: 'Domov',
  },
};

export default sk;

/** Deep readonly with string values instead of string literals */
type DeepStringify<T> = {
  readonly [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

export type Translations = DeepStringify<typeof sk>;
