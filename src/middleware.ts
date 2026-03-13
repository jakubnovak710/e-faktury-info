import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSecurityHeaders } from '@/lib/security/headers';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/security/rate-limit';
import { CSRF_COOKIE, ensureCsrfCookie } from '@/lib/security/csrf';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- Rate limiting for API routes ---
  if (pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous';
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

  // --- Security headers on all responses ---
  const response = NextResponse.next();

  const securityHeaders = getSecurityHeaders();
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value);
  }

  // Rate limit headers for API
  if (pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous';
    const result = checkRateLimit(ip);
    const rlHeaders = getRateLimitHeaders(result);
    for (const [key, value] of Object.entries(rlHeaders)) {
      response.headers.set(key, value);
    }
  }

  // --- CSRF: ensure token cookie exists for page requests ---
  if (!pathname.startsWith('/api/')) {
    ensureCsrfCookie(response, request.cookies.get(CSRF_COOKIE)?.value);
  }

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files, _next, and favicon
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)',
  ],
};
