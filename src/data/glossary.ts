/**
 * @deprecated Use collection loader instead:
 *   import { getCollection } from '@/lib/collections';
 *   import { glossarySchema } from '@/content/glossary/_schema';
 *   const entries = await getCollection('glossary', glossarySchema);
 *
 * This file exists only as backward compat for client components.
 * All glossary content lives in src/content/glossary/*.mdx
 */

export type { GlossaryEntry } from '@/content/glossary/_schema';
export { glossarySchema } from '@/content/glossary/_schema';
