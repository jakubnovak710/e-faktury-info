import type { GlassEffect, GlowEffect, RadiusScale, ShadowScale, DecorativeEffects } from '@/types/design';

export const glass: GlassEffect = {
  bgOpacity: 0.6,
  blur: '12px',
  borderOpacity: 0.08,
  shadowColor: 'rgba(0, 0, 0, 0.40)',
};

export const glow: GlowEffect = {
  standard: '0 0 20px var(--accent-glow)',
  strong: '0 0 15px var(--accent-glow)',
  text: '0 0 15px var(--accent-glow)',
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
  sm: '0 1px 2px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px rgba(0, 0, 0, 0.15)',
  lg: '0 8px 32px rgba(0, 0, 0, 0.20)',
  xl: '0 16px 48px rgba(0, 0, 0, 0.25)',
};

export const decorative: DecorativeEffects = {
  hasScanlines: true,
  hasGlow: true,
  hasGlass: true,
  hasGradientBars: true,
  hasCornerGlow: true,
};
