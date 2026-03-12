/**
 * Analytics module — Umami self-hosted tracking.
 * Enable with: features.analytics = true in config/features.config.ts
 *
 * Env variables:
 * - NEXT_PUBLIC_UMAMI_URL — Umami instance URL
 * - NEXT_PUBLIC_UMAMI_ID — Website ID from Umami dashboard
 */

export const ANALYTICS_READY = !!(
  process.env.NEXT_PUBLIC_UMAMI_URL && process.env.NEXT_PUBLIC_UMAMI_ID
);

/**
 * Umami script component props for Next.js Script tag.
 */
export function getUmamiProps() {
  if (!ANALYTICS_READY) return null;
  return {
    src: `${process.env.NEXT_PUBLIC_UMAMI_URL}/script.js`,
    'data-website-id': process.env.NEXT_PUBLIC_UMAMI_ID,
  };
}

/**
 * Track a custom event in Umami.
 * Call from client components: trackEvent('button-click', { variant: 'cta' })
 */
export function trackEvent(name: string, data?: Record<string, string | number>) {
  if (typeof window !== 'undefined' && 'umami' in window) {
    (window as unknown as { umami: { track: (name: string, data?: Record<string, string | number>) => void } }).umami.track(name, data);
  }
}
