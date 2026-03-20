import type { NavigationConfig } from '@jakubnovak710/universal-web-core/types';

export const navigationConfig: NavigationConfig & {
  phone?: string;
  ctaLabel?: string;
  ctaTarget?: string;
} = {
  header: [
    {
      label: 'Sprievodca',
      href: '/co-je-e-faktura',
      children: [
        { label: 'Čo je e-faktúra', href: '/co-je-e-faktura' },
        { label: 'Kedy začne platiť', href: '/kedy-zacne-platit-e-faktura' },
        { label: 'Ako sa pripraviť', href: '/ako-sa-pripravit-na-e-fakturu' },
        { label: 'Legislatíva', href: '/legislativa-e-faktura' },
        { label: 'Pokuty a sankcie', href: '/pokuty-za-e-fakturu' },
      ],
    },
    {
      label: 'Pre koho',
      href: '/e-faktura-pre-zivnostnikov',
      children: [
        { label: 'Pre živnostníkov', href: '/e-faktura-pre-zivnostnikov' },
        { label: 'Pre malé firmy', href: '/e-faktura-pre-male-firmy' },
        { label: 'Pre účtovníkov', href: '/e-faktura-pre-uctovnikov' },
      ],
    },
    { label: 'Integrácie', href: '/integracie' },
    { label: 'Slovník', href: '/slovnik' },
    { label: 'Blog', href: '/blog' },
  ],
  phone: '+421 XXX XXX XXX',
  ctaLabel: 'Kontrola pripravenosti',
  ctaTarget: '/nastroje/kontrola-pripravenosti',
  footer: {
    columns: [
      {
        title: 'Sprievodca',
        links: [
          { label: 'Čo je e-faktúra', href: '/co-je-e-faktura' },
          { label: 'Kedy začne platiť', href: '/kedy-zacne-platit-e-faktura' },
          { label: 'Ako sa pripraviť', href: '/ako-sa-pripravit-na-e-fakturu' },
          { label: 'Peppol na Slovensku', href: '/peppol-slovensko' },
          { label: 'Digitálni poštári', href: '/digitalni-postari' },
        ],
      },
      {
        title: 'Riešenia',
        links: [
          { label: 'Integrácie', href: '/integracie' },
          { label: 'Porovnanie softvérov', href: '/porovnanie' },
          { label: 'Slovník pojmov', href: '/slovnik' },
          { label: 'FAQ', href: '/otazky' },
        ],
      },
      {
        title: 'O nás',
        links: [
          { label: 'O projekte', href: '/o-nas' },
          { label: 'Služby', href: '/sluzby' },
          { label: 'Kontakt', href: '/kontakt' },
          { label: 'Blog', href: '/blog' },
        ],
      },
      {
        title: 'Právne',
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
    { label: 'Blog', href: '/blog', icon: 'FileText' },
  ],
};
