import type { FontFile, TypographyScale } from '@/types/design';

export const displayFont = 'Space Grotesk';
export const bodyFont = 'Space Grotesk';
export const monoFont = 'JetBrains Mono';

export const fontFiles: FontFile[] = [
  {
    name: 'Space Grotesk',
    path: '/fonts/SpaceGrotesk-Variable.woff2',
    weight: '300 700',
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
  pageTitle: { size: '1.5rem', weight: 900, tracking: '-0.02em' },
  sectionHeading: { size: '1.25rem', weight: 900, tracking: '0' },
  cardTitle: { size: '1.125rem', weight: 900, tracking: '0' },
  body: { size: '0.875rem', weight: 400, lineHeight: '1.625' },
  monoLabel: { size: '0.625rem', weight: 700, tracking: '0.15em', transform: 'uppercase' },
  meta: { size: '0.625rem', weight: 400, tracking: '0.1em' },
};
