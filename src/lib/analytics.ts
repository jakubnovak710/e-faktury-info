/**
 * Umami Analytics — event tracking utilities
 *
 * Usage:
 *   import { trackEvent, trackPartnerClick, trackCTA } from '@/lib/analytics';
 *   trackEvent('newsletter_signup', { source: 'homepage' });
 *   trackPartnerClick('8888.sk', '/e-faktura-pre-zivnostnikov');
 *
 * All events are no-op when Umami is not loaded (dev, no script, ad blocker).
 */

type UmamiTracker = {
  track: (eventName: string, eventData?: Record<string, string | number | boolean>) => void;
};

function getUmami(): UmamiTracker | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { umami?: UmamiTracker };
  return w.umami ?? null;
}

// ──────────────────────────────────────────────
// Generic event
// ──────────────────────────────────────────────

export function trackEvent(
  name: string,
  data?: Record<string, string | number | boolean>,
): void {
  getUmami()?.track(name, data);
}

// ──────────────────────────────────────────────
// Partner link clicks (8888.sk, sroihned.sk, digitalnipostari.sk)
// ──────────────────────────────────────────────

export function trackPartnerClick(partner: string, sourcePage: string): void {
  trackEvent('partner_link_click', { partner, source_page: sourcePage });
}

// ──────────────────────────────────────────────
// CTA clicks
// ──────────────────────────────────────────────

export function trackCTA(ctaName: string, sourcePage: string): void {
  trackEvent('cta_click', { cta: ctaName, source_page: sourcePage });
}

// ──────────────────────────────────────────────
// Newsletter signup
// ──────────────────────────────────────────────

export function trackNewsletterSignup(source: string): void {
  trackEvent('newsletter_signup', { source });
}

// ──────────────────────────────────────────────
// Contact form submission
// ──────────────────────────────────────────────

export function trackContactForm(source: string): void {
  trackEvent('contact_form', { source });
}

// ──────────────────────────────────────────────
// Content engagement
// ──────────────────────────────────────────────

export function trackERPPageView(erpName: string): void {
  trackEvent('erp_page_view', { erp: erpName });
}

export function trackGlossaryView(term: string): void {
  trackEvent('glossary_term_view', { term });
}

export function trackComparisonView(comparison: string): void {
  trackEvent('comparison_view', { comparison });
}

export function trackLanguageSwitch(from: string, to: string): void {
  trackEvent('language_switch', { from, to });
}

// ──────────────────────────────────────────────
// Readiness check tool
// ──────────────────────────────────────────────

export function trackReadinessStart(): void {
  trackEvent('readiness_check_start');
}

export function trackReadinessComplete(score: number): void {
  trackEvent('readiness_check_complete', { score });
}

// ──────────────────────────────────────────────
// Scroll depth tracking (use in useScrollDepth hook)
// ──────────────────────────────────────────────

export function trackScrollDepth(depth: 25 | 50 | 75 | 100, page: string): void {
  trackEvent('scroll_depth', { depth, page });
}

// ──────────────────────────────────────────────
// Time on page engagement (use in useTimeOnPage hook)
// ──────────────────────────────────────────────

export function trackTimeOnPage(seconds: 30 | 60 | 120 | 300, page: string): void {
  trackEvent('time_on_page', { seconds, page });
}
