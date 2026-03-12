import type { ThemeColors } from '@/types/design';

export const darkColors: ThemeColors = {
  bgBase: '#020202',
  bgDeeper: '#050505',
  bgSurface: '#0a0a0a',
  bgElevated: '#0f0f0f',
  bgOverlay: '#1a1a1a',

  textPrimary: '#ffffff',
  textSecondary: '#a1a1a1',
  textMuted: '#6f6f6f',
  textFaint: '#4a4a4a',

  borderSubtle: 'rgba(255, 255, 255, 0.06)',
  borderDefault: 'rgba(255, 255, 255, 0.10)',
  borderStrong: 'rgba(255, 255, 255, 0.20)',

  accent: '#6366f1',
  accentGlow: 'rgba(99, 102, 241, 0.30)',
  accentSecondary: '#f59e0b',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',

  glassBg: 'rgba(5, 5, 5, 0.60)',
  glassBorder: 'rgba(255, 255, 255, 0.08)',
  glassShadow: 'rgba(0, 0, 0, 0.40)',

  fillSubtle: 'rgba(255, 255, 255, 0.05)',
  fillLight: 'rgba(255, 255, 255, 0.10)',
  fillMedium: 'rgba(255, 255, 255, 0.20)',

  cardShadow: 'none',
};

export const lightColors: ThemeColors = {
  bgBase: '#fefefc',
  bgDeeper: '#f5f3f0',
  bgSurface: '#ffffff',
  bgElevated: '#ffffff',
  bgOverlay: '#e2e2e2',

  textPrimary: '#1a1a1a',
  textSecondary: '#4a4a4a',
  textMuted: '#6f6f6f',
  textFaint: '#a1a1a1',

  borderSubtle: 'rgba(0, 0, 0, 0.10)',
  borderDefault: 'rgba(0, 0, 0, 0.14)',
  borderStrong: 'rgba(0, 0, 0, 0.25)',

  accent: '#4f46e5',
  accentGlow: 'rgba(79, 70, 229, 0.15)',
  accentSecondary: '#d97706',
  success: '#16a34a',
  warning: '#d97706',
  error: '#dc2626',

  glassBg: 'rgba(255, 255, 255, 0.85)',
  glassBorder: 'rgba(0, 0, 0, 0.12)',
  glassShadow: 'rgba(0, 0, 0, 0.08)',

  fillSubtle: 'rgba(0, 0, 0, 0.05)',
  fillLight: 'rgba(0, 0, 0, 0.08)',
  fillMedium: 'rgba(0, 0, 0, 0.12)',

  cardShadow: '0 1px 3px rgba(0,0,0,0.06), 0 6px 16px rgba(0,0,0,0.04)',
};
