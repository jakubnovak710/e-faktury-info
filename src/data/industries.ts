/**
 * @deprecated Use collection loader instead:
 *   import { getCollection } from '@/lib/collections';
 *   import { industrySchema } from '@/content/industries/_schema';
 *   const entries = await getCollection('industries', industrySchema);
 *
 * All industry content lives in src/content/industries/*.mdx
 */

export type { IndustryEntry } from '@/content/industries/_schema';
export { industrySchema } from '@/content/industries/_schema';
