import { createMiddleware } from '@jakubnovak710/universal-web-core/middleware';
import { securityConfig } from '@config/security.config';

export const middleware = createMiddleware({ security: securityConfig });

export const config = {
  matcher: [
    // Match all paths except static files, _next, and favicon
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)',
  ],
};
