import type { FontFile, TypographyScale } from '@/types/design';

export const displayFont = 'Playfair Display';
export const bodyFont = 'Source Sans 3';
export const monoFont = 'JetBrains Mono';

export const fontFiles: FontFile[] = [
  {
    name: 'Playfair Display',
    path: '/fonts/PlayfairDisplay-Variable.woff2',
    weight: '400 900',
    style: 'normal',
  },
  {
    name: 'Source Sans 3',
    path: '/fonts/SourceSans3-Variable.woff2',
    weight: '200 900',
    style: 'normal',
  },
  {
    name: 'JetBrains Mono',
    path: '/fonts/JetBrainsMono-Variable.woff2',
    weight: '100 800',
    style: 'normal',
  },
];

export const scale: TypographyScale = {
  pageTitle: { size: '2.25rem', weight: 700, tracking: '-0.01em' },
  sectionHeading: { size: '1.625rem', weight: 600, tracking: '0' },
  cardTitle: { size: '1.125rem', weight: 600, tracking: '0' },
  body: { size: '1rem', weight: 400, lineHeight: '1.75' },
  monoLabel: { size: '0.6875rem', weight: 600, tracking: '0.08em', transform: 'uppercase' },
  meta: { size: '0.75rem', weight: 400, tracking: '0.02em' },
};
