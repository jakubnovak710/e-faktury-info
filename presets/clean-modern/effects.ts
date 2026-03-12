import type { GlassEffect, GlowEffect, RadiusScale, ShadowScale, DecorativeEffects } from '@/types/design';

export const glass: GlassEffect = {
  bgOpacity: 0.85,
  blur: '12px',
  borderOpacity: 0.06,
  shadowColor: 'rgba(0, 0, 0, 0.08)',
};

export const glow: GlowEffect = {
  standard: 'none',
  strong: 'none',
  text: 'none',
};

export const borderRadius: RadiusScale = {
  sm: '6px',
  md: '10px',
  lg: '14px',
  xl: '20px',
  '2xl': '24px',
  full: '9999px',
};

export const shadows: ShadowScale = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.10), 0 8px 10px -6px rgba(0, 0, 0, 0.06)',
};

export const decorative: DecorativeEffects = {
  hasScanlines: false,
  hasGlow: false,
  hasGlass: true,
  hasGradientBars: false,
  hasCornerGlow: false,
};
