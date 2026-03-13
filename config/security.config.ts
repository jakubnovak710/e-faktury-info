import type { SecurityConfig } from '@/types/site';

const isDev = process.env.NODE_ENV === 'development';

export const securityConfig: SecurityConfig = {
  csp: {
    defaultSrc: ["'self'"],
    scriptSrc: isDev
      ? ["'self'", "'unsafe-eval'", "'unsafe-inline'"]
      : ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", 'data:', 'blob:', 'https:'],
    connectSrc: ["'self'", 'https:'],
    fontSrc: ["'self'"],
    frameSrc: ["'none'"],
  },
  cors: {
    origins: [process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'],
  },
  rateLimit: {
    windowMs: 60 * 1000,
    max: 20,
  },
};
