/**
 * FAQ JSON-LD Schema Builder
 *
 * Generates FAQPage structured data for Google rich snippets.
 * Reusable across homepage, FAQ pages, and pillar pages with embedded FAQ.
 *
 * Usage:
 *   const schema = buildFaqJsonLd([
 *     { question: 'Čo je e-faktúra?', answer: '...' },
 *   ]);
 */

interface FaqPair {
  question: string;
  answer: string;
}

export function buildFaqJsonLd(items: FaqPair[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
