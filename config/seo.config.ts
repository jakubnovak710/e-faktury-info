import type { SeoConfig } from '@jakubnovak710/universal-web-core/types';
import { siteConfig } from './site.config';

export const seoConfig: SeoConfig = {
  titleTemplate: `%s | ${siteConfig.name}`,
  defaultTitle: siteConfig.name,
  defaultDescription: siteConfig.description,
  defaultOgImage: siteConfig.ogImage,
  robots: {
    index: true,
    follow: true,
  },
  jsonLd: {
    organization: {
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/logo.png`,
      sameAs: Object.values(siteConfig.socials).filter(Boolean) as string[],
    },
  },
};
