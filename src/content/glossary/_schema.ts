import { z } from 'zod';

export const glossarySchema = z.object({
  term: z.string(),
  termEn: z.string(),
  shortDefinitionSk: z.string(),
  shortDefinitionEn: z.string(),
  category: z.enum(['technical', 'legal', 'business']),
  relatedSlugs: z.array(z.string()).default([]),
});

export type GlossaryEntry = z.infer<typeof glossarySchema>;
