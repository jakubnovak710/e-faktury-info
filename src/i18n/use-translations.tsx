/**
 * Client-side translation hook + context provider
 *
 * Usage in client components:
 *
 *   // In a layout (server component passes translations down):
 *   <TranslationsProvider locale="sk" translations={t}>
 *     {children}
 *   </TranslationsProvider>
 *
 *   // In a client component:
 *   const { t, locale } = useTranslations();
 *   <p>{t.nav.home}</p>
 */

'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { Locale } from './config';
import type { Translations } from './sk';

interface TranslationsContextValue {
  locale: Locale;
  t: Translations;
}

const TranslationsContext = createContext<TranslationsContextValue | null>(null);

interface TranslationsProviderProps {
  locale: Locale;
  translations: Translations;
  children: ReactNode;
}

export function TranslationsProvider({
  locale,
  translations,
  children,
}: TranslationsProviderProps) {
  return (
    <TranslationsContext.Provider value={{ locale, t: translations }}>
      {children}
    </TranslationsContext.Provider>
  );
}

/**
 * Hook to access translations and current locale in client components.
 * Must be used inside <TranslationsProvider>.
 */
export function useTranslations(): TranslationsContextValue {
  const ctx = useContext(TranslationsContext);
  if (!ctx) {
    throw new Error('useTranslations must be used inside <TranslationsProvider>');
  }
  return ctx;
}
