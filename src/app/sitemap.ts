import type { MetadataRoute } from 'next';
import { siteConfig } from '@config/site.config';
import { navigationConfig } from '@config/navigation.config';

/** Pages with lower priority and yearly change frequency */
const LOW_PRIORITY = new Set(['/privacy', '/terms', '/ochrana-sukromia', '/podmienky']);

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date();

  // Collect all unique routes from navigation config (no filesystem scanning)
  const routes = new Set<string>();

  for (const item of navigationConfig.header) {
    routes.add(item.href);
  }
  for (const column of navigationConfig.footer.columns) {
    for (const link of column.links) {
      if (!link.href.startsWith('http')) {
        routes.add(link.href);
      }
    }
  }

  // Remove homepage — added separately with priority 1
  routes.delete('/');

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...Array.from(routes).map((route): MetadataRoute.Sitemap[number] => ({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency: LOW_PRIORITY.has(route) ? 'yearly' : 'monthly',
      priority: LOW_PRIORITY.has(route) ? 0.3 : 0.7,
    })),
  ];
}
