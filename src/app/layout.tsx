import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo';
import { createMetadata } from '@/lib/metadata';
import { siteConfig } from '@config/site.config';
import '@/styles/globals.css';

export const metadata: Metadata = createMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.locale} data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var t = localStorage.getItem('theme');
                if (t === 'light' || t === 'dark') {
                  document.documentElement.setAttribute('data-theme', t);
                }
              })();
            `,
          }}
        />
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
