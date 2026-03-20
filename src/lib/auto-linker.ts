/**
 * Auto-Linker — Automatic Partner Link Insertion
 *
 * Scans text content and inserts contextual links to partner websites.
 * Used during content rendering to ensure every relevant page links to
 * 8888.sk, sroihned.sk, and digitalnipostari.sk.
 *
 * Rules (per SEO plan):
 * 1. Max 1 link per partner per page
 * 2. Rotate anchor text (never same anchor on two pages)
 * 3. Contextual — only where topic is relevant
 * 4. Dofollow — partners are trusted
 * 5. Pillar pages get CTA box instead of inline link
 *
 * Usage:
 *   import { getPartnerLink, PARTNER_LINKS } from '@/lib/auto-linker';
 *
 *   const link = getPartnerLink('8888', '/e-faktura-pre-zivnostnikov');
 *   // { url: 'https://8888.sk', anchor: 'profesionálna účtovná kancelária', partner: '8888' }
 */

export interface LinkRule {
  /** Partner identifier */
  partner: string;
  /** Trigger keywords — if page content mentions these, show the link */
  keywords: string[];
  /** Target URL */
  url: string;
  /** Anchor text variants (rotated based on page path hash) */
  anchorVariantsSk: string[];
  anchorVariantsEn: string[];
  /** Max occurrences per page */
  maxPerPage: number;
}

export interface PartnerLink {
  partner: string;
  url: string;
  anchor: string;
}

export const PARTNER_LINKS: LinkRule[] = [
  {
    partner: '8888',
    keywords: [
      'účtovníctvo', 'účtovník', 'účtovná kancelária',
      'vedenie účtovníctva', 'daňové priznanie', 'účtovné povinnosti',
      'accounting', 'accountant', 'bookkeeping', 'tax return',
    ],
    url: 'https://8888.sk',
    anchorVariantsSk: [
      'profesionálna účtovná kancelária',
      'účtovná kancelária 8888.sk',
      'externé vedenie účtovníctva',
      'účtovné služby pre podnikateľov',
    ],
    anchorVariantsEn: [
      'professional accounting firm',
      'accounting office 8888.sk',
      'external bookkeeping services',
      'accounting services for businesses',
    ],
    maxPerPage: 1,
  },
  {
    partner: 'sroihned',
    keywords: [
      'založenie s.r.o.', 'zakladanie firmy', 'založiť s.r.o.',
      'registrácia s.r.o.', 'nová s.r.o.', 'nová firma',
      'register company', 'company formation', 'start a business',
    ],
    url: 'https://sroihned.sk',
    anchorVariantsSk: [
      'založenie s.r.o. online',
      'rýchle založenie firmy',
      'sroihned.sk',
      'založte si s.r.o. jednoducho',
    ],
    anchorVariantsEn: [
      'register a company online',
      'quick company formation',
      'sroihned.sk',
      'set up your company easily',
    ],
    maxPerPage: 1,
  },
  {
    partner: 'digitalnipostari',
    keywords: [
      'digitálny poštár', 'certifikovaný poštár', 'doručovacia služba',
      'Peppol access point', 'access point',
      'digital postman', 'certified provider', 'delivery service',
    ],
    url: 'https://digitalnipostari.sk',
    anchorVariantsSk: [
      'kompletný zoznam digitálnych poštárov',
      'vyberte si digitálneho poštára',
      'porovnanie digitálnych poštárov',
      'digitalnipostari.sk',
    ],
    anchorVariantsEn: [
      'complete list of digital postmen',
      'choose your digital postman',
      'compare digital postmen',
      'digitalnipostari.sk',
    ],
    maxPerPage: 1,
  },
];

/**
 * Simple string hash for deterministic anchor rotation
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Get the partner link for a specific partner and page.
 * Returns null if the partner has no relevant link for this context.
 *
 * @param partnerId - '8888' | 'sroihned' | 'digitalnipostari'
 * @param pagePath - e.g. '/e-faktura-pre-zivnostnikov'
 * @param locale - 'sk' | 'en'
 */
export function getPartnerLink(
  partnerId: string,
  pagePath: string,
  locale: 'sk' | 'en' = 'sk',
): PartnerLink | null {
  const rule = PARTNER_LINKS.find((r) => r.partner === partnerId);
  if (!rule) return null;

  const variants = locale === 'sk' ? rule.anchorVariantsSk : rule.anchorVariantsEn;
  const index = hashString(pagePath) % variants.length;
  const anchor = variants[index] ?? variants[0] ?? rule.url;

  return {
    partner: rule.partner,
    url: rule.url,
    anchor,
  };
}

/**
 * Check if text content matches any keywords for a partner
 */
export function shouldShowPartnerLink(
  partnerId: string,
  textContent: string,
): boolean {
  const rule = PARTNER_LINKS.find((r) => r.partner === partnerId);
  if (!rule) return false;

  const lowerContent = textContent.toLowerCase();
  return rule.keywords.some((kw) => lowerContent.includes(kw.toLowerCase()));
}

/**
 * Get all relevant partner links for a page based on its content
 */
export function getRelevantPartnerLinks(
  textContent: string,
  pagePath: string,
  locale: 'sk' | 'en' = 'sk',
): PartnerLink[] {
  return PARTNER_LINKS
    .filter((rule) => shouldShowPartnerLink(rule.partner, textContent))
    .map((rule) => getPartnerLink(rule.partner, pagePath, locale))
    .filter((link): link is PartnerLink => link !== null);
}
