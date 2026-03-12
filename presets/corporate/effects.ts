import type { GlassEffect, GlowEffect, RadiusScale, ShadowScale, DecorativeEffects } from '@/types/design';

export const glass: GlassEffect = {
  bgOpacity: 0.92,
  blur: '8px',
  borderOpacity: 0.08,
  shadowColor: 'rgba(0, 0, 0, 0.06)',
};

export const glow: GlowEffect = {
  standard: 'none',
  strong: 'none',
  text: 'none',
};

export const borderRadius: RadiusScale = {
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  full: '9999px',
};

export const shadows: ShadowScale = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.06)',
  md: '0 2px 4px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
  lg: '0 4px 12px rgba(0, 0, 0, 0.10), 0 2px 4px rgba(0, 0, 0, 0.06)',
  xl: '0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06)',
};

export const decorative: DecorativeEffects = {
  hasScanlines: false,
  hasGlow: false,
  hasGlass: false,
  hasGradientBars: false,
  hasCornerGlow: false,
};
