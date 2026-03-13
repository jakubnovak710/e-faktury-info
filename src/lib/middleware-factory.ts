import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSecurityHeaders } from '@/lib/security/headers';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/security/rate-limit';
import { CSRF_COOKIE, ensureCsrfCookie } from '@/lib/security/csrf';

export interface MiddlewareOptions {
  /** Additional middleware to run after core security logic */
  afterMiddleware?: (
    request: NextRequest,
    response: NextResponse
  ) => NextResponse | void;
  /** Paths to skip rate limiting (e.g. ['/api/health']) */
  skipRateLimitPaths?: string[];
  /** Disable CSRF cookie generation */
  disableCsrf?: boolean;
}

/**
 * Creates a Next.js middleware with security headers, rate limiting, and CSRF.
 * Consumer projects call this in their `src/middleware.ts`:
 *
 * ```ts
 * import { createMiddleware } from '@jakub/universal-web-core/middleware';
 * export const middleware = createMiddleware();
 * ```
 */
export function createMiddleware(options: MiddlewareOptions = {}) {
  const { afterMiddleware, skipRateLimitPaths = [], disableCsrf = false } = options;

  return function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // --- Rate limiting for API routes ---
    if (pathname.startsWith('/api/')) {
      const shouldSkip = skipRateLimitPaths.some((p) => pathname.startsWith(p));

      if (!shouldSkip) {
        const ip =
          request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous';
        const result = checkRateLimit(ip);

        if (!result.allowed) {
          return new NextResponse(JSON.stringify({ error: 'Too many requests' }), {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': String(Math.ceil((result.resetAt - Date.now()) / 1000)),
              ...getRateLimitHeaders(result),
            },
          });
        }
      }
    }

    // --- Nonce-based CSP ---
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);

    const response = NextResponse.next({ request: { headers: requestHeaders } });

    // Security headers
    const securityHeaders = getSecurityHeaders(nonce);
    for (const [key, value] of Object.entries(securityHeaders)) {
      response.headers.set(key, value);
    }

    // Rate limit headers for API
    if (pathname.startsWith('/api/')) {
      const shouldSkip = skipRateLimitPaths.some((p) => pathname.startsWith(p));

      if (!shouldSkip) {
        const ip =
          request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous';
        const result = checkRateLimit(ip);
        const rlHeaders = getRateLimitHeaders(result);
        for (const [key, value] of Object.entries(rlHeaders)) {
          response.headers.set(key, value);
        }
      }
    }

    // --- CSRF: ensure token cookie exists for page requests ---
    if (!disableCsrf && !pathname.startsWith('/api/')) {
      ensureCsrfCookie(response, request.cookies.get(CSRF_COOKIE)?.value);
    }

    // --- Custom middleware hook ---
    if (afterMiddleware) {
      const result = afterMiddleware(request, response);
      if (result) return result;
    }

    return response;
  };
}
