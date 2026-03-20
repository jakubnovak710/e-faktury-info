import glassUi from '@jakubnovak710/universal-web-core/presets/glass-ui';
import type { DesignPreset } from '@jakubnovak710/universal-web-core/types';

// ============================================================================
// DESIGN CONFIG — Single Source of Truth
// ============================================================================
// To switch presets: change the import above to @presets/clean-modern or @presets/corporate
// To customize: override specific values below (brand colors, fonts, etc.)
// After changes run: pnpm generate:tokens
// ============================================================================

const design: DesignPreset = {
  ...glassUi,
  colors: {
    dark: {
      ...glassUi.colors.dark,
      accent: '#2563EB',
      accentGlow: 'rgba(37, 99, 235, 0.30)',
      accentSecondary: '#0D9488',
    },
    light: {
      ...glassUi.colors.light,
      accent: '#1D4ED8',
      accentGlow: 'rgba(29, 78, 216, 0.15)',
      accentSecondary: '#0F766E',
    },
  },
};

export default design;
