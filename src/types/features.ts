// ============================================================================
// Feature Flags — toggle modules with zero overhead when disabled
// ============================================================================

export interface FeatureFlags {
  /** Auth.js v5 authentication */
  auth: boolean;
  /** Drizzle ORM + Neon Postgres */
  database: boolean;
  /** Multi-language support */
  i18n: boolean;
  /** Umami analytics */
  analytics: boolean;
  /** Nodemailer email system */
  email: boolean;
  /** Sentry error monitoring */
  monitoring: boolean;
  /** AI self-healing pipeline */
  selfHealing: boolean;
  /** Blog/content pages */
  blog: boolean;
  /** Authenticated dashboard */
  dashboard: boolean;
  /** CMS integration */
  cms: boolean;
}
