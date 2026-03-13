import type { SiteConfig, SeoConfig, SecurityConfig, EmailConfig } from '@/types/site';
import type { FeatureFlags } from '@/types/features';

export interface CoreConfig {
  site: SiteConfig;
  seo: SeoConfig;
  security: SecurityConfig;
  email: EmailConfig;
  features: FeatureFlags;
}

let _config: CoreConfig | null = null;

export function initConfig(config: CoreConfig): void {
  _config = config;
}

function getConfig(): CoreConfig {
  if (!_config) {
    throw new Error(
      'initConfig() must be called before using any core module. ' +
        'Ensure src/instrumentation.ts calls initConfig() at startup.'
    );
  }
  return _config;
}

export function getSiteConfig(): SiteConfig {
  return getConfig().site;
}

export function getSeoConfig(): SeoConfig {
  return getConfig().seo;
}

export function getSecurityConfig(): SecurityConfig {
  return getConfig().security;
}

export function getEmailConfig(): EmailConfig {
  return getConfig().email;
}

export function getFeatures(): FeatureFlags {
  return getConfig().features;
}
