import type { SiteConfig } from '@/types/site';

export const siteConfig: SiteConfig = {
  name: 'Universal Web',
  description: 'Modern web framework for production websites',
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
