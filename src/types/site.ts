// ============================================================================
// Site Configuration Types
// ============================================================================

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  locale: string;
  ogImage: string;
  creator: string;
  socials: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
  children?: NavItem[];
}

export interface NavigationConfig {
  header: NavItem[];
  footer: {
    columns: {
      title: string;
      links: NavItem[];
    }[];
  };
  bottomBar?: NavItem[];
}

export interface EmailConfig {
  smtp: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
  from: {
    name: string;
    email: string;
  };
  adminEmail: string;
  clientEmails: string[];
}

export interface SeoConfig {
  titleTemplate: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultOgImage: string;
  robots: {
    index: boolean;
    follow: boolean;
  };
  jsonLd: {
    organization: {
      name: string;
      url: string;
      logo: string;
      sameAs: string[];
    };
  };
}

export interface SecurityConfig {
  csp: {
    defaultSrc: string[];
    scriptSrc: string[];
    styleSrc: string[];
    imgSrc: string[];
    connectSrc: string[];
    fontSrc: string[];
    frameSrc: string[];
  };
  cors: {
    origins: string[];
  };
  rateLimit: {
    windowMs: number;
    max: number;
  };
}
