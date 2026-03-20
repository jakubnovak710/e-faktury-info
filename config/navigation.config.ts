import type { NavigationConfig } from '@jakubnovak710/universal-web-core/types';

/* ── Local mega menu types ─────────────────────────────── */

export interface MegaMenuItem {
  label: string;
  href: string;
  description: string;
  icon: string;
}

export interface MegaMenuGroup {
  id: string;
  label: string;
  children: MegaMenuItem[];
}

export interface PromoPartner {
  title: string;
  tagline: string;
  description: string;
  url: string;
  cta: string;
}

export interface ExtendedNavigationConfig extends NavigationConfig {
  megaMenu: MegaMenuGroup[];
  ctaLabel: string;
  ctaAction: 'newsletter';
  promoPartners: PromoPartner[];
}

/* ── Config ────────────────────────────────────────────── */

export const navigationConfig: ExtendedNavigationConfig = {
  header: [
    { label: 'Čo je e-faktúra', href: '/co-je-e-faktura' },
    { label: 'Kedy začne platiť', href: '/kedy-zacne-platit-e-faktura' },
    { label: 'Ako sa pripraviť', href: '/ako-sa-pripravit-na-e-fakturu' },
    { label: 'Pokuty a sankcie', href: '/pokuty-za-e-fakturu' },
    { label: 'Pre živnostníkov', href: '/e-faktura-pre-zivnostnikov' },
    { label: 'Pre malé firmy', href: '/e-faktura-pre-male-firmy' },
    { label: 'Pre účtovníkov', href: '/e-faktura-pre-uctovnikov' },
    { label: 'Odvetvia', href: '/odvetvia' },
    { label: 'Integrácie', href: '/integracie' },
    { label: 'Slovník pojmov', href: '/slovnik' },
    { label: 'Otázky a odpovede', href: '/otazky' },
  ],

  megaMenu: [
    {
      id: 'sprievodca',
      label: 'Sprievodca',
      children: [
        { label: 'Čo je e-faktúra', href: '/co-je-e-faktura', description: 'Kompletný sprievodca elektronickou fakturáciou', icon: 'FileText' },
        { label: 'Kedy začne platiť', href: '/kedy-zacne-platit-e-faktura', description: 'Termíny, fázy a kľúčové dátumy', icon: 'Calendar' },
        { label: 'Ako sa pripraviť', href: '/ako-sa-pripravit-na-e-fakturu', description: '4 kroky k pripravenosti na e-faktúru', icon: 'ClipboardCheck' },
        { label: 'Pokuty a sankcie', href: '/pokuty-za-e-fakturu', description: 'Čo hrozí za nesplnenie povinností', icon: 'AlertTriangle' },
      ],
    },
    {
      id: 'pre-koho',
      label: 'Pre koho',
      children: [
        { label: 'Pre živnostníkov', href: '/e-faktura-pre-zivnostnikov', description: 'SZČO a paušálne výdavky', icon: 'Briefcase' },
        { label: 'Pre malé firmy', href: '/e-faktura-pre-male-firmy', description: 'S.r.o., a.s. a platitelia DPH', icon: 'Building2' },
        { label: 'Pre účtovníkov', href: '/e-faktura-pre-uctovnikov', description: 'Nové povinnosti a služby pre klientov', icon: 'Calculator' },
        { label: 'Odvetvia', href: '/odvetvia', description: 'Špecifiká podľa odvetvia', icon: 'Factory' },
      ],
    },
    {
      id: 'nastroje',
      label: 'Nástroje',
      children: [
        { label: 'Integrácie', href: '/integracie', description: 'Pripravenosť ERP a fakturačných systémov', icon: 'Puzzle' },
        { label: 'Slovník pojmov', href: '/slovnik', description: 'e-faktúra, Peppol, EN 16931 a ďalšie', icon: 'BookOpen' },
        { label: 'Otázky a odpovede', href: '/otazky', description: 'Najčastejšie otázky o e-faktúre', icon: 'HelpCircle' },
      ],
    },
  ],

  ctaLabel: 'Odoberať novinky',
  ctaAction: 'newsletter',

  promoPartners: [
    {
      title: '8888.sk',
      tagline: 'Účtovná kancelária',
      description: 'Profesionálne vedenie účtovníctva pre živnostníkov a firmy. Poradíme aj s prechodom na e-faktúru.',
      url: 'https://8888.sk',
      cta: 'Zobraziť ponuku',
    },
    {
      title: 'Digitálni poštári',
      tagline: 'Porovnanie poskytovateľov',
      description: 'Kompletný zoznam a porovnanie certifikovaných digitálnych poštárov na Slovensku. Vyberte si toho správneho.',
      url: 'https://digitalnipostari.sk',
      cta: 'Porovnať poštárov',
    },
    {
      title: 'sroihned.sk',
      tagline: 'Založenie firmy online',
      description: 'Založte s.r.o. kompletne online za 24 hodín. Bez čakania na úradoch, vrátane sídla a IČO.',
      url: 'https://sroihned.sk',
      cta: 'Založiť firmu',
    },
  ],

  footer: {
    columns: [
      {
        title: 'Sprievodca',
        links: [
          { label: 'Čo je e-faktúra', href: '/co-je-e-faktura' },
          { label: 'Kedy začne platiť', href: '/kedy-zacne-platit-e-faktura' },
          { label: 'Ako sa pripraviť', href: '/ako-sa-pripravit-na-e-fakturu' },
          { label: 'Pokuty a sankcie', href: '/pokuty-za-e-fakturu' },
        ],
      },
      {
        title: 'Riešenia',
        links: [
          { label: 'Integrácie', href: '/integracie' },
          { label: 'Slovník pojmov', href: '/slovnik' },
          { label: 'Otázky a odpovede', href: '/otazky' },
        ],
      },
      {
        title: 'O nás',
        links: [
          { label: 'Ochrana súkromia', href: '/ochrana-sukromia' },
          { label: 'Obchodné podmienky', href: '/obchodne-podmienky' },
        ],
      },
    ],
  },

  bottomBar: [
    { label: 'Domov', href: '/', icon: 'Home' },
    { label: 'Sprievodca', href: '/co-je-e-faktura', icon: 'BookOpen' },
    { label: 'Integrácie', href: '/integracie', icon: 'Puzzle' },
    { label: 'Otázky', href: '/otazky', icon: 'HelpCircle' },
  ],
};
