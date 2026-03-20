import type { Metadata } from 'next';
import Script from 'next/script';
import '@/lib/init-config';
import { CoreConfigProvider } from '@jakubnovak710/universal-web-core/components/providers/config-provider';
import { ThemeProvider } from '@jakubnovak710/universal-web-core/components/providers/theme-provider';
import { OrganizationJsonLd, WebSiteJsonLd } from '@jakubnovak710/universal-web-core/components/seo';
import { createMetadata } from '@jakubnovak710/universal-web-core/lib/metadata';
import { getSiteConfig } from '@jakubnovak710/universal-web-core/config';
import { siteConfig } from '@config/site.config';
import { seoConfig } from '@config/seo.config';
import { securityConfig } from '@config/security.config';
import { emailConfig } from '@config/email.config';
import { features } from '@config/features.config';
import { Navigation } from '@/components/navigation';
import { Footer } from '@jakubnovak710/universal-web-core/components/layout/footer';
import { UmamiProvider } from '@/components/analytics/umami-provider';
import { EngagementTracker } from '@/components/analytics/engagement-tracker';
import '@/styles/globals.css';

export function generateMetadata(): Metadata {
  return createMetadata();
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={getSiteConfig().locale} data-theme="dark" suppressHydrationWarning>
      <head>
        <Script src="/theme-init.js" strategy="beforeInteractive" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-friendly content" />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="antialiased">
        <CoreConfigProvider config={{ site: siteConfig, seo: seoConfig, security: securityConfig, email: emailConfig, features }}>
          <ThemeProvider>
            <Navigation />
            {children}
            <Footer />
            <UmamiProvider />
            <EngagementTracker />
          </ThemeProvider>
        </CoreConfigProvider>
      </body>
    </html>
  );
}
