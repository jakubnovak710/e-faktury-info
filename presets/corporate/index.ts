import type { DesignPreset } from '@/types/design';
import { darkColors, lightColors } from './tokens';
import { displayFont, bodyFont, monoFont, fontFiles, scale } from './typography';
import { glass, glow, borderRadius, shadows, decorative } from './effects';
import { stagger, durations, easings, hover, entrance } from './motion';

const corporatePreset: DesignPreset = {
  name: 'Corporate',
  description: 'Professional, conservative design with navy palette, serif headings, and minimal motion',

  colors: {
    dark: darkColors,
    light: lightColors,
  },

  typography: {
    displayFont,
    bodyFont,
    monoFont,
    fontFiles,
    scale,
  },

  effects: {
    glass,
    glow,
    borderRadius,
    shadows,
    decorative,
  },

  motion: {
    stagger,
    durations,
    easings,
    hover,
    entrance,
  },

  spacing: {
    padding: {
      compact: '16px',
      standard: '28px',
      spacious: '48px',
    },
    radius: borderRadius,
    contentMaxWidth: '1080px',
    sidebarWidth: '280px',
  },
};

export default corporatePreset;
