/**
 * Content Collections — Filesystem-based content management
 *
 * Generic loader that:
 * 1. Scans a directory for .mdx files
 * 2. Parses frontmatter via gray-matter
 * 3. Validates against a Zod schema
 * 4. Returns typed, sorted results
 * 5. Caches results per collection (invalidated on new request in dev)
 *
 * Architecture:
 *   src/content/{collection}/
 *   ├── _schema.ts       ← Zod schema + types export
 *   ├── item-one.mdx     ← frontmatter + optional body content
 *   ├── item-two.mdx
 *   └── ...
 *
 * Usage:
 *   // In _schema.ts:
 *   export const schema = z.object({ title: z.string(), ... });
 *   export type Item = z.infer<typeof schema>;
 *
 *   // In page:
 *   const items = await getCollection('glossary');
 *   const item = await getCollectionEntry('glossary', 'peppol');
 */

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import type { z } from 'zod';

/**
 * Convert raw markdown to HTML string via remark/rehype pipeline.
 */
async function markdownToHtml(markdown: string): Promise<string> {
  if (!markdown.trim()) return '';
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);
  return String(result);
}

const CONTENT_DIR = path.join(process.cwd(), 'src/content');

export interface CollectionEntry<T> {
  /** Filename without extension — used as URL slug */
  slug: string;
  /** Validated frontmatter data */
  data: T;
  /** Body content rendered as HTML (converted from markdown) */
  content: string;
}

/**
 * Load and validate a single content file
 */
async function loadEntry<T>(
  filePath: string,
  schema: z.ZodType<T>,
): Promise<CollectionEntry<T> | null> {
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const parsed = schema.parse(data);
    const slug = path.basename(filePath, '.mdx');

    const html = await markdownToHtml(content);
    return { slug, data: parsed, content: html };
  } catch (error) {
    console.error(`[collections] Failed to load ${filePath}:`, error);
    return null;
  }
}

/**
 * Get all entries from a collection directory.
 * Skips files starting with _ (schemas, drafts).
 *
 * @param collection - Directory name under src/content/
 * @param schema - Zod schema to validate frontmatter
 * @param sort - Optional sort function
 */
export async function getCollection<T>(
  collection: string,
  schema: z.ZodType<T>,
  sort?: (a: CollectionEntry<T>, b: CollectionEntry<T>) => number,
): Promise<CollectionEntry<T>[]> {
  const dir = path.join(CONTENT_DIR, collection);

  let files: string[];
  try {
    files = await fs.readdir(dir);
  } catch {
    console.warn(`[collections] Directory not found: ${dir}`);
    return [];
  }

  const mdxFiles = files.filter(
    (f) => f.endsWith('.mdx') && !f.startsWith('_'),
  );

  const entries = await Promise.all(
    mdxFiles.map((f) => loadEntry<T>(path.join(dir, f), schema)),
  );

  const valid = entries.filter(
    (entry): entry is CollectionEntry<T> => entry !== null,
  );

  if (sort) {
    valid.sort(sort);
  }

  return valid;
}

/**
 * Get a single entry by slug.
 *
 * @param collection - Directory name under src/content/
 * @param slug - Filename without .mdx extension
 * @param schema - Zod schema to validate frontmatter
 */
export async function getCollectionEntry<T>(
  collection: string,
  slug: string,
  schema: z.ZodType<T>,
): Promise<CollectionEntry<T> | null> {
  const filePath = path.join(CONTENT_DIR, collection, `${slug}.mdx`);
  return loadEntry(filePath, schema);
}

/**
 * Get all slugs from a collection (for generateStaticParams).
 */
export async function getCollectionSlugs(collection: string): Promise<string[]> {
  const dir = path.join(CONTENT_DIR, collection);

  let files: string[];
  try {
    files = await fs.readdir(dir);
  } catch {
    return [];
  }

  return files
    .filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))
    .map((f) => f.replace('.mdx', ''));
}
