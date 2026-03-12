import type { DesignPreset } from '@/types/design';
import { darkColors, lightColors } from './tokens';
import { displayFont, bodyFont, monoFont, fontFiles, scale } from './typography';
import { glass, glow, borderRadius, shadows, decorative } from './effects';
import { stagger, durations, easings, hover, entrance } from './motion';

const glassUiPreset: DesignPreset = {
  name: 'Glass UI',
  description: 'Dark-first glassmorphism design with premium feel, glows, and ambient motion',

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
      compact: '12px',
      standard: '20px',
      spacious: '32px',
    },
    radius: borderRadius,
    contentMaxWidth: '900px',
    sidebarWidth: '280px',
  },
};

export default glassUiPreset;
