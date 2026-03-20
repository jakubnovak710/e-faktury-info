import { type NextRequest, NextResponse } from 'next/server';
import { createMiddleware } from '@jakubnovak710/universal-web-core/middleware';
import { securityConfig } from '@config/security.config';
import { handleI18nRouting } from '@/i18n/middleware';

/**
 * Combined middleware: i18n routing + security headers
 *
 * Order:
 * 1. i18n — redirect bare URLs to locale-prefixed URLs (/page → /sk/page)
 * 2. Security — CSP nonce, CORS, rate limiting (from core library)
 */
const securityMiddleware = createMiddleware({ security: securityConfig });

export async function middleware(request: NextRequest) {
  // 1. i18n redirect (if needed)
  const i18nResponse = handleI18nRouting(request);
  if (i18nResponse) {
    return i18nResponse;
  }

  // 2. Security middleware (CSP, CORS, rate limiting)
  if (typeof securityMiddleware === 'function') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (securityMiddleware as any)(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files, _next, and favicon
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)',
  ],
};
