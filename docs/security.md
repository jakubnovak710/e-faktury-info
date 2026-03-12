# Security Documentation

## Security Headers

Applied via `src/middleware.ts` on every response:

| Header | Value | Purpose |
|--------|-------|---------|
| Strict-Transport-Security | max-age=63072000; includeSubDomains; preload | Force HTTPS |
| X-Frame-Options | DENY | Prevent clickjacking |
| X-Content-Type-Options | nosniff | Prevent MIME sniffing |
| Referrer-Policy | strict-origin-when-cross-origin | Control referrer leakage |
| Permissions-Policy | camera=(), microphone=(), geolocation=() | Restrict browser APIs |
| Content-Security-Policy | script-src 'nonce-...' | Block XSS via inline scripts |

Target: **A+ rating** on securityheaders.com

## CSP (Content Security Policy)

Built in `src/lib/security/headers.ts`:
- Nonce-based script allowlisting
- Configurable via `config/security.config.ts`
- Default: blocks inline scripts, allows self + configured CDNs

## Rate Limiting

In-memory sliding window rate limiter (`src/lib/security/rate-limit.ts`):
- Applied to all `/api/` routes via middleware
- Default: 60 requests per minute per IP
- Returns `429 Too Many Requests` when exceeded
- Auto-cleanup of expired entries every 60 seconds

## Input Sanitization

`src/lib/security/sanitize.ts` provides:
- `escapeHtml()` — HTML entity encoding
- `stripTags()` — remove all HTML tags
- `sanitizeInput()` — combined sanitization
- `sanitizeObject()` — recursively sanitize all string values

Applied to: all form submissions, API request bodies

## CSRF Protection

`src/lib/security/csrf.ts`:
- Token stored in httpOnly cookie
- Validated on state-changing requests (POST, PUT, DELETE)
- Constant-time comparison to prevent timing attacks

## Environment Variables

- Never commit `.env.local` (blocked by `.gitignore`)
- `.env.example` contains placeholders only
- Secrets for CI/CD go in GitHub Secrets
- Client-side vars must be prefixed with `NEXT_PUBLIC_`

## API Route Security

All API routes must:
1. Validate input with Zod schemas
2. Sanitize user input
3. Rate limiting (applied via middleware)
4. Return appropriate error codes (never leak stack traces)
