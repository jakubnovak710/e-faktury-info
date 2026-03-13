import type { Metadata } from 'next';
import { headers } from 'next/headers';
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
import '@/styles/globals.css';

export function generateMetadata(): Metadata {
  return createMetadata();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return (
    <html lang={getSiteConfig().locale} data-theme="dark" suppressHydrationWarning>
      <head>
        <Script src="/theme-init.js" strategy="beforeInteractive" nonce={nonce} />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-friendly content" />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="antialiased">
        <CoreConfigProvider config={{ site: siteConfig, seo: seoConfig, security: securityConfig, email: emailConfig, features }}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </CoreConfigProvider>
      </body>
    </html>
  );
}
