import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Script from 'next/script';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo';
import { createMetadata } from '@/lib/metadata';
import { siteConfig } from '@config/site.config';
import '@/styles/globals.css';

export const metadata: Metadata = createMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return (
    <html lang={siteConfig.locale} data-theme="dark" suppressHydrationWarning>
      <head>
        <Script src="/theme-init.js" strategy="beforeInteractive" nonce={nonce} />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-friendly content" />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
