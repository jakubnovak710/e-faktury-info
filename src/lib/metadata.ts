import type { Metadata } from 'next';
import { siteConfig } from '@config/site.config';
import { seoConfig } from '@config/seo.config';
import { formatDate } from '@/lib/format-date';

interface PageMetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  canonical?: string;
  keywords?: string[];
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
}

export function createMetadata(options: PageMetadataOptions = {}): Metadata {
  const {
    title,
    description = seoConfig.defaultDescription,
    image = seoConfig.defaultOgImage,
    noIndex = false,
    canonical,
    keywords,
    type = 'website',
    publishedTime,
    modifiedTime,
    authors,
    section,
  } = options;

  const fullTitle = title
    ? seoConfig.titleTemplate.replace('%s', title)
    : seoConfig.defaultTitle;

  const imageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`;

  const ogBase = {
    title: fullTitle,
    description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: imageUrl, width: 1200, height: 630 }],
    locale: siteConfig.locale,
  };

  const openGraph =
    type === 'article'
      ? {
          ...ogBase,
          type: 'article' as const,
          ...(publishedTime && { publishedTime: formatDate(publishedTime) }),
          ...(modifiedTime && { modifiedTime: formatDate(modifiedTime) }),
          ...(authors && { authors }),
          ...(section && { section }),
        }
      : { ...ogBase, type: 'website' as const };

  return {
    title: fullTitle,
    description,
    ...(keywords && { keywords }),
    metadataBase: new URL(siteConfig.url),
    ...(canonical && { alternates: { canonical } }),
    openGraph,
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
