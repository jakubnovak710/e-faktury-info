import { features } from '@config/features.config';
import type { FeatureFlags } from '@/types/features';

/**
 * Check if a feature is enabled.
 * Usage: if (isEnabled('auth')) { ... }
 */
export function isEnabled(feature: keyof FeatureFlags): boolean {
  return features[feature];
}

/**
 * Conditional wrapper — returns the value only if feature is enabled.
 * Usage: const AuthProvider = withFeature('auth', () => import('./auth-provider'));
 */
export function withFeature<T>(feature: keyof FeatureFlags, value: T): T | null {
  return features[feature] ? value : null;
}

/**
 * Re-export for convenience.
 */
export { features };
