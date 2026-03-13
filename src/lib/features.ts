import { getFeatures } from '@/lib/config-registry';
import type { FeatureFlags } from '@/types/features';

/**
 * Check if a feature is enabled.
 * Usage: if (isEnabled('auth')) { ... }
 */
export function isEnabled(feature: keyof FeatureFlags): boolean {
  return getFeatures()[feature];
}

/**
 * Conditional wrapper — returns the value only if feature is enabled.
 * Usage: const AuthProvider = withFeature('auth', () => import('./auth-provider'));
 */
export function withFeature<T>(feature: keyof FeatureFlags, value: T): T | null {
  return getFeatures()[feature] ? value : null;
}
