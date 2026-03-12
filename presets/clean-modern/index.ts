import type { DesignPreset } from '@/types/design';
import { darkColors, lightColors } from './tokens';
import { displayFont, bodyFont, monoFont, fontFiles, scale } from './typography';
import { glass, glow, borderRadius, shadows, decorative } from './effects';
import { stagger, durations, easings, hover, entrance } from './motion';

const cleanModernPreset: DesignPreset = {
  name: 'Clean Modern',
  description: 'Light-first, clean design with subtle shadows and minimal decoration',

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
      compact: '14px',
      standard: '24px',
      spacious: '40px',
    },
    radius: borderRadius,
    contentMaxWidth: '960px',
    sidebarWidth: '260px',
  },
};

export default cleanModernPreset;
