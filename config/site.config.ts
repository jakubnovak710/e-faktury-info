import type { SiteConfig } from '@jakubnovak710/universal-web-core/types';

export const siteConfig: SiteConfig = {
  name: 'e-Faktúry.info',
  description:
    'Kompletný sprievodca elektronickou fakturáciou na Slovensku. Všetko o povinnej e-faktúre od 1.1.2027 — legislatíva, príprava, Peppol, digitálni poštári, softvérové riešenia.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  locale: 'sk',
  ogImage: '/og-default.png',
  creator: 'Jakub Novak',
  socials: {
    twitter: '',
    github: '',
    linkedin: '',
    instagram: '',
  },
};
