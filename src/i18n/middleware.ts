/**
 * i18n Middleware Logic
 *
 * Handles locale detection and URL rewriting:
 *
 * 1. / → redirect to /sk/ (default locale)
 * 2. /en/... → serve English version
 * 3. /sk/... → serve Slovak version
 * 4. /co-je-e-faktura → redirect to /sk/co-je-e-faktura (add default locale)
 *
 * Does NOT apply to:
 * - /api/* routes
 * - /_next/* (static assets)
 * - Static files (images, favicon, robots.txt, sitemap.xml, llms.txt)
 */

import { NextResponse, type NextRequest } from 'next/server';
import { i18nConfig, isValidLocale } from './config';

const PUBLIC_FILE_REGEX = /\.(.*)$/;
const IGNORED_PATHS = ['/api/', '/_next/', '/opengraph-image'];
const ROOT_STATIC_FILES = [
  '/robots.txt',
  '/sitemap.xml',
  '/llms.txt',
  '/llms-full.txt',
  '/favicon.ico',
  '/theme-init.js',
];

/**
 * Check if the request should skip i18n processing
 */
function shouldSkip(pathname: string): boolean {
  // Static files with extensions
  if (PUBLIC_FILE_REGEX.test(pathname) && !pathname.startsWith('/api')) {
    return true;
  }

  // Root-level static files
  if (ROOT_STATIC_FILES.includes(pathname)) {
    return true;
  }

  // Ignored path prefixes
  return IGNORED_PATHS.some((p) => pathname.startsWith(p));
}

/**
 * Detect preferred locale from Accept-Language header
 */
function detectLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') ?? '';

  for (const locale of i18nConfig.locales) {
    if (acceptLanguage.toLowerCase().includes(locale)) {
      return locale;
    }
  }

  return i18nConfig.defaultLocale;
}

/**
 * Handle i18n routing in middleware
 *
 * Returns NextResponse if handled, or null if should continue to next middleware
 */
export function handleI18nRouting(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl;

  // Skip static files and API routes
  if (shouldSkip(pathname)) {
    return null;
  }

  // Check if pathname already has a locale prefix
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isValidLocale(firstSegment)) {
    // Already has valid locale — continue
    return null;
  }

  // No locale prefix — redirect to locale-prefixed URL
  const locale = detectLocale(request);
  const newUrl = request.nextUrl.clone();

  if (pathname === '/') {
    // Root → redirect to default locale
    newUrl.pathname = `/${locale}`;
  } else {
    // /some-page → /sk/some-page
    newUrl.pathname = `/${locale}${pathname}`;
  }

  return NextResponse.redirect(newUrl);
}
