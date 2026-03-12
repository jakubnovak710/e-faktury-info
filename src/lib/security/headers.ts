import { securityConfig } from '@config/security.config';

/**
 * Build Content-Security-Policy header value.
 * Supports optional nonce for inline scripts.
 */
export function buildCsp(nonce?: string): string {
  const { csp } = securityConfig;

  const scriptSrc = nonce
    ? csp.scriptSrc.filter((s) => s !== "'unsafe-inline'").concat(`'nonce-${nonce}'`)
    : csp.scriptSrc;

  const directives: Record<string, string[]> = {
    'default-src': csp.defaultSrc,
    'script-src': scriptSrc,
    'style-src': csp.styleSrc,
    'img-src': csp.imgSrc,
    'connect-src': csp.connectSrc,
    'font-src': csp.fontSrc,
    'frame-src': csp.frameSrc,
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
    'upgrade-insecure-requests': [],
  };

  return Object.entries(directives)
    .map(([key, values]) => (values.length > 0 ? `${key} ${values.join(' ')}` : key))
    .join('; ');
}

/**
 * Standard security headers applied to all responses.
 */
export function getSecurityHeaders(nonce?: string): Record<string, string> {
  return {
    'Content-Security-Policy': buildCsp(nonce),
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '0',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    'X-DNS-Prefetch-Control': 'on',
  };
}
