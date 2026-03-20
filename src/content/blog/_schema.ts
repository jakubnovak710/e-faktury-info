import { z } from 'zod';

export const blogSchema = z.object({
  title: z.string(),
  titleEn: z.string(),
  description: z.string(),
  descriptionEn: z.string(),
  date: z.string(),
  author: z.string(),
  tags: z.array(z.string()),
  image: z.string().optional(),
  readingTime: z.number(),
  published: z.boolean().default(true),
});

export type BlogEntry = z.infer<typeof blogSchema>;
