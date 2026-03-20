/**
 * @deprecated Use collection loader instead:
 *   import { getCollection } from '@/lib/collections';
 *   import { erpSchema } from '@/content/erp-systems/_schema';
 *   const entries = await getCollection('erp-systems', erpSchema);
 *
 * This file is kept only for client components (homepage) that cannot use async.
 * Will be removed once homepage is refactored to server component pattern.
 */

export type { ErpEntry } from '@/content/erp-systems/_schema';
export { erpSchema } from '@/content/erp-systems/_schema';

// Static snapshot for client components — DO NOT add new systems here.
// Add new systems as MDX files in src/content/erp-systems/ instead.
export const erpSystems = [
  { slug: 'pohoda', name: 'POHODA', vendor: 'STORMWARE', peppolStatus: 'in-progress' as const },
  { slug: 'omega', name: 'OMEGA', vendor: 'KROS', peppolStatus: 'in-progress' as const },
  { slug: 'superfaktura', name: 'SuperFaktúra', vendor: 'SuperFaktúra s.r.o.', peppolStatus: 'ready' as const },
  { slug: 'idoklad', name: 'iDoklad', vendor: 'Solitea', peppolStatus: 'in-progress' as const },
  { slug: 'money-s3', name: 'Money S3', vendor: 'Solitea', peppolStatus: 'planned' as const },
  { slug: 'flexibee-abra', name: 'FlexiBee (ABRA)', vendor: 'ABRA Software', peppolStatus: 'ready' as const },
  { slug: 'billdu', name: 'Billdu', vendor: 'Billdu s.r.o.', peppolStatus: 'ready' as const },
  { slug: 'helios', name: 'HELIOS', vendor: 'Asseco Solutions', peppolStatus: 'ready' as const },
  { slug: 'sap', name: 'SAP', vendor: 'SAP SE', peppolStatus: 'ready' as const },
  { slug: 'mrp', name: 'MRP', vendor: 'MRP Company', peppolStatus: 'in-progress' as const },
  { slug: 'fintoro', name: 'Fintoro', vendor: 'Fintoro s.r.o.', peppolStatus: 'ready' as const },
];
