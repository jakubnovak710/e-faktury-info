import type { FeatureFlags } from '@/types/features';

export const features: FeatureFlags = {
  auth: false,
  database: false,
  i18n: false,
  analytics: false,
  email: true,
  monitoring: true,
  selfHealing: true,
  blog: false,
  dashboard: false,
  cms: false,
};
