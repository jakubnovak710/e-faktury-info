import { initConfig } from '@/lib/config-registry';
import { siteConfig } from '@config/site.config';
import { seoConfig } from '@config/seo.config';
import { securityConfig } from '@config/security.config';
import { emailConfig } from '@config/email.config';
import { features } from '@config/features.config';

export function register() {
  initConfig({ site: siteConfig, seo: seoConfig, security: securityConfig, email: emailConfig, features });
}
