import { z } from 'zod';

export const erpSchema = z.object({
  name: z.string(),
  vendor: z.string(),
  descriptionSk: z.string(),
  descriptionEn: z.string(),
  peppolStatus: z.enum(['ready', 'in-progress', 'planned', 'unknown']),
  peppolStatusNote: z.string(),
  peppolDate: z.string().optional(),
  apiSupport: z.boolean(),
  xmlExport: z.boolean(),
  ublSupport: z.boolean(),
  isdocSupport: z.boolean(),
  targetAudience: z.array(
    z.enum(['freelancer', 'small-business', 'medium-business', 'enterprise', 'accountant']),
  ),
  website: z.string().url(),
  pricingFrom: z.string().optional(),
  features: z.array(z.string()),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
});

export type ErpEntry = z.infer<typeof erpSchema>;
