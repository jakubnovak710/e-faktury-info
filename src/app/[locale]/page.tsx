/**
 * Locale-aware homepage
 *
 * Route: /sk/ and /en/
 *
 * This is a placeholder that will be replaced with the full homepage
 * in Sprint 2. For now it demonstrates the i18n setup works.
 *
 * Target keywords (SK): e-faktúra, elektronická faktúra slovensko, e-fakturácia 2027
 * Target keywords (EN): Slovakia e-invoicing 2027, e-invoice Slovakia
 */

import type { Metadata } from 'next';
import { createMetadata } from '@jakubnovak710/universal-web-core/lib/metadata';
import { isValidLocale, type Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n/get-translations';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = (isValidLocale(localeParam) ? localeParam : 'sk') as Locale;
  const t = await getTranslations(locale);

  return createMetadata({
    title: t.home.heroTitle,
    description: t.meta.defaultDescription,
  });
}

export default async function LocaleHomePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = (isValidLocale(localeParam) ? localeParam : 'sk') as Locale;
  const t = await getTranslations(locale);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
          e-Faktúry.info
        </p>
        <h1 className="mt-4 text-4xl font-black text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
          {t.home.heroTitle}
        </h1>
        <p className="mt-6 text-lg text-[var(--text-secondary)]">
          {t.home.heroSubtitle}
        </p>
        <p className="mt-4 text-[var(--text-muted)]">
          {t.home.heroDescription}
        </p>

        {/* Placeholder — full homepage in Sprint 2 */}
        <div className="mt-12 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
            {locale === 'sk' ? 'Stránka sa pripravuje' : 'Coming soon'}
          </p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            {locale === 'sk'
              ? 'Kompletný obsah bude dostupný čoskoro. Prihláste sa na newsletter.'
              : 'Full content coming soon. Subscribe to our newsletter.'}
          </p>
        </div>
      </div>
    </main>
  );
}
