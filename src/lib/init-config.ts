/**
 * Side-effect import that registers config factory for Edge runtime.
 * Import this in root layout.tsx: `import '@/lib/init-config';`
 *
 * On Node.js runtime, instrumentation.ts register() calls initConfig() eagerly.
 * On Edge runtime (Vercel server components), this factory provides fallback.
 */
import { registerConfigFactory } from '@jakubnovak710/universal-web-core/config';
import { siteConfig } from '@config/site.config';
import { seoConfig } from '@config/seo.config';
import { securityConfig } from '@config/security.config';
import { emailConfig } from '@config/email.config';
import { features } from '@config/features.config';

registerConfigFactory(() => ({
  site: siteConfig,
  seo: seoConfig,
  security: securityConfig,
  email: emailConfig,
  features,
}));
