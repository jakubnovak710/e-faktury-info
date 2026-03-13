import { cookies } from 'next/headers';
import type { NextResponse } from 'next/server';

export const CSRF_COOKIE = '__csrf';
export const CSRF_HEADER = 'x-csrf-token';

/**
 * Generate a random CSRF token.
 */
function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Set CSRF cookie on response if not already present.
 * Uses double-submit cookie pattern: cookie is readable by JS so client
 * can send it back in the x-csrf-token header.
 */
export function ensureCsrfCookie(
  response: NextResponse,
  existingToken: string | undefined,
): void {
  if (existingToken) return;

  const token = generateToken();
  response.cookies.set(CSRF_COOKIE, token, {
    httpOnly: false, // Must be readable by client JS for double-submit pattern
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });
}

/**
 * Validate a CSRF token from the request header against the cookie.
 * Use in API routes that handle mutations (POST, PUT, DELETE).
 */
export async function validateCsrf(request: Request): Promise<boolean> {
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get(CSRF_COOKIE)?.value;
  const headerToken = request.headers.get(CSRF_HEADER);

  if (!cookieToken || !headerToken) return false;

  // Constant-time comparison
  if (cookieToken.length !== headerToken.length) return false;

  let mismatch = 0;
  for (let i = 0; i < cookieToken.length; i++) {
    mismatch |= cookieToken.charCodeAt(i) ^ headerToken.charCodeAt(i);
  }
  return mismatch === 0;
}
