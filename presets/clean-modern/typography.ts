import type { FontFile, TypographyScale } from '@/types/design';

export const displayFont = 'Inter';
export const bodyFont = 'Inter';
export const monoFont = 'JetBrains Mono';

export const fontFiles: FontFile[] = [
  {
    name: 'Inter',
    path: '/fonts/Inter-Variable.woff2',
    weight: '100 900',
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
  pageTitle: { size: '2rem', weight: 700, tracking: '-0.025em' },
  sectionHeading: { size: '1.5rem', weight: 600, tracking: '-0.01em' },
  cardTitle: { size: '1.125rem', weight: 600, tracking: '0' },
  body: { size: '1rem', weight: 400, lineHeight: '1.7' },
  monoLabel: { size: '0.75rem', weight: 500, tracking: '0.05em', transform: 'uppercase' },
  meta: { size: '0.75rem', weight: 400, tracking: '0.02em' },
};
