import type { Metadata } from 'next';
import { siteConfig } from '@config/site.config';
import { seoConfig } from '@config/seo.config';

interface PageMetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  canonical?: string;
}

export function createMetadata(options: PageMetadataOptions = {}): Metadata {
  const {
    title,
    description = seoConfig.defaultDescription,
    image = seoConfig.defaultOgImage,
    noIndex = false,
    canonical,
  } = options;

  const fullTitle = title
    ? seoConfig.titleTemplate.replace('%s', title)
    : seoConfig.defaultTitle;

  const imageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    ...(canonical && { alternates: { canonical } }),
    openGraph: {
      title: fullTitle,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [{ url: imageUrl, width: 1200, height: 630 }],
      locale: siteConfig.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      ...(siteConfig.socials.twitter && { creator: siteConfig.socials.twitter }),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: seoConfig.robots.index, follow: seoConfig.robots.follow },
  };
}
