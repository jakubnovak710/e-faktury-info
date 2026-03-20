/**
 * Blog Content Utilities
 *
 * Thin wrapper around the generic collection loader for blog-specific operations.
 * All blog posts live in src/content/blog/*.mdx
 *
 * Usage:
 *   const posts = await getAllPosts();
 *   const post = await getPostBySlug('co-je-e-faktura');
 */

import { getCollection, getCollectionEntry, getCollectionSlugs, type CollectionEntry } from '@/lib/collections';
import { blogSchema, type BlogEntry } from '@/content/blog/_schema';

export type PostMeta = CollectionEntry<BlogEntry>;

/**
 * Get all published blog posts, sorted by date (newest first)
 */
export async function getAllPosts(): Promise<PostMeta[]> {
  const entries = await getCollection('blog', blogSchema, (a, b) =>
    new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );
  return entries.filter((e) => e.data.published);
}

/**
 * Get a single blog post by slug (including content)
 */
export async function getPostBySlug(slug: string): Promise<PostMeta | null> {
  const entry = await getCollectionEntry('blog', slug, blogSchema);
  if (!entry || !entry.data.published) return null;
  return entry;
}

/**
 * Get all unique tags from published posts
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tagSet = new Set<string>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

/**
 * Get all post slugs (for generateStaticParams)
 */
export async function getAllPostSlugs(): Promise<string[]> {
  return getCollectionSlugs('blog');
}
