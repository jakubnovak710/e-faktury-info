'use client';

import Script from 'next/script';

const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
const UMAMI_URL = process.env.NEXT_PUBLIC_UMAMI_URL ?? 'https://cloud.umami.is';

/**
 * Umami Analytics Provider
 *
 * Env vars required:
 * - NEXT_PUBLIC_UMAMI_WEBSITE_ID — Umami website ID
 * - NEXT_PUBLIC_UMAMI_URL — Umami instance URL (default: cloud.umami.is)
 *
 * Custom events tracked:
 * - newsletter_signup — newsletter form submission
 * - contact_form — contact form submission
 * - cta_click — CTA button clicks (partner links, service CTAs)
 * - partner_link_click — clicks on partner sites (8888.sk, sroihned.sk, digitalnipostari.sk)
 * - readiness_check_start — readiness tool started
 * - readiness_check_complete — readiness tool completed with score
 * - erp_page_view — ERP integration page viewed (with ERP name)
 * - glossary_term_view — glossary term page viewed
 * - comparison_view — comparison page viewed
 * - language_switch — language switcher used (sk/en)
 * - scroll_depth — 25%, 50%, 75%, 100% scroll milestones
 * - time_on_page — 30s, 60s, 120s, 300s engagement milestones
 */
export function UmamiProvider() {
  if (!UMAMI_WEBSITE_ID) return null;

  return (
    <Script
      src={`${UMAMI_URL}/script.js`}
      data-website-id={UMAMI_WEBSITE_ID}
      strategy="afterInteractive"
      data-domains="e-faktury.info"
    />
  );
}
