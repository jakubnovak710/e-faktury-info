import { z } from 'zod';

const faqItemSchema = z.object({
  id: z.string(),
  questionSk: z.string(),
  questionEn: z.string(),
  answerSk: z.string(),
  answerEn: z.string(),
});

export const faqCategorySchema = z.object({
  nameSk: z.string(),
  nameEn: z.string(),
  descriptionSk: z.string(),
  descriptionEn: z.string(),
  items: z.array(faqItemSchema),
});

export type FaqItem = z.infer<typeof faqItemSchema>;
export type FaqCategoryEntry = z.infer<typeof faqCategorySchema>;
