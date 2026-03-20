/**
 * Content Utilities — Blog & Guide Management
 *
 * Handles loading, parsing, and sorting of MDX content files.
 * Uses filesystem-based content from src/content/blog/*.mdx
 *
 * Frontmatter format:
 * ---
 * title: "Čo je e-faktúra"
 * titleEn: "What is an e-invoice"
 * description: "Kompletný vysvetlenie elektronickej faktúry..."
 * descriptionEn: "Complete explanation of electronic invoicing..."
 * date: "2026-03-20"
 * author: "Jakub Novák"
 * tags: ["e-faktúra", "základy"]
 * image: "/blog/co-je-e-faktura.png"
 * readingTime: 8
 * published: true
 * ---
 *
 * Usage:
 *   const posts = await getAllPosts();
 *   const post = await getPostBySlug('co-je-e-faktura');
 */

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

export interface PostFrontmatter {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  readingTime: number;
  published: boolean;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
}

export interface Post extends PostMeta {
  content: string;
}

/**
 * Get all published blog posts, sorted by date (newest first)
 */
export async function getAllPosts(): Promise<PostMeta[]> {
  try {
    const files = await fs.readdir(BLOG_DIR);
    const mdxFiles = files.filter((f) => f.endsWith('.mdx'));

    const posts: PostMeta[] = [];

    for (const file of mdxFiles) {
      const slug = file.replace('.mdx', '');
      const filePath = path.join(BLOG_DIR, file);
      const raw = await fs.readFile(filePath, 'utf-8');
      const { data } = matter(raw);

      const frontmatter = data as PostFrontmatter;
      if (!frontmatter.published) continue;

      posts.push({ ...frontmatter, slug });
    }

    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  } catch {
    // No blog directory or no files yet
    return [];
  }
}

/**
 * Get a single blog post by slug (including content)
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    const raw = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(raw);

    const frontmatter = data as PostFrontmatter;
    if (!frontmatter.published) return null;

    return { ...frontmatter, slug, content };
  } catch {
    return null;
  }
}

/**
 * Get all unique tags from published posts
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tagSet = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(tag: string): Promise<PostMeta[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

/**
 * Get all post slugs (for static generation)
 */
export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((p) => p.slug);
}
