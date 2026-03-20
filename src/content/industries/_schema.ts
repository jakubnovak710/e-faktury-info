import { z } from 'zod';

export const industrySchema = z.object({
  nameSk: z.string(),
  nameEn: z.string(),
  descriptionSk: z.string(),
  descriptionEn: z.string(),
  commonErpSlugs: z.array(z.string()),
  typicalChallengesSk: z.array(z.string()),
  typicalChallengesEn: z.array(z.string()),
  recommendationsSk: z.string(),
  recommendationsEn: z.string(),
});

export type IndustryEntry = z.infer<typeof industrySchema>;
