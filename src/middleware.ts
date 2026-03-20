import { createMiddleware } from '@jakubnovak710/universal-web-core/middleware';
import { securityConfig } from '@config/security.config';

/**
 * Middleware: Security headers only
 *
 * i18n routing is DISABLED until pages are migrated under [locale]/.
 * The i18n infrastructure (src/i18n/) is ready but not active in routing.
 * Pages currently live at root paths: /co-je-e-faktura, /integracie, etc.
 *
 * To enable i18n routing in future:
 * 1. Move all pages under src/app/[locale]/
 * 2. Re-import and call handleI18nRouting() here
 */
export const middleware = createMiddleware({ security: securityConfig });

export const config = {
  matcher: [
    // Match all paths except static files, _next, and favicon
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)',
  ],
};
