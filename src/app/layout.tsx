import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { createMetadata } from '@/lib/metadata';
import '@/styles/globals.css';

export const metadata: Metadata = createMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
