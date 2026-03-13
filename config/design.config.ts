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
      // Override brand colors here:
      // accent: '#6366f1',
      // accentGlow: 'rgba(99, 102, 241, 0.30)',
    },
    light: {
      ...glassUi.colors.light,
      // accent: '#4f46e5',
      // accentGlow: 'rgba(79, 70, 229, 0.15)',
    },
  },
};

export default design;
