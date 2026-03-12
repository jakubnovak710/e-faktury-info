import type { ThemeColors } from '@/types/design';

export const lightColors: ThemeColors = {
  bgBase: '#ffffff',
  bgDeeper: '#f8fafc',
  bgSurface: '#f1f5f9',
  bgElevated: '#ffffff',
  bgOverlay: '#f8fafc',

  textPrimary: '#0f172a',
  textSecondary: '#475569',
  textMuted: '#94a3b8',
  textFaint: '#cbd5e1',

  borderSubtle: 'rgba(0, 0, 0, 0.04)',
  borderDefault: 'rgba(0, 0, 0, 0.08)',
  borderStrong: 'rgba(0, 0, 0, 0.15)',

  accent: '#2563eb',
  accentGlow: 'rgba(37, 99, 235, 0.15)',
  accentSecondary: '#7c3aed',
  success: '#16a34a',
  warning: '#d97706',
  error: '#dc2626',

  glassBg: 'rgba(255, 255, 255, 0.85)',
  glassBorder: 'rgba(0, 0, 0, 0.06)',
  glassShadow: 'rgba(0, 0, 0, 0.08)',

  fillSubtle: 'rgba(0, 0, 0, 0.03)',
  fillLight: 'rgba(0, 0, 0, 0.05)',
  fillMedium: 'rgba(0, 0, 0, 0.08)',

  cardShadow: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
};

export const darkColors: ThemeColors = {
  bgBase: '#0f172a',
  bgDeeper: '#0c1322',
  bgSurface: '#1e293b',
  bgElevated: '#1e293b',
  bgOverlay: '#334155',

  textPrimary: '#f8fafc',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  textFaint: '#475569',

  borderSubtle: 'rgba(255, 255, 255, 0.06)',
  borderDefault: 'rgba(255, 255, 255, 0.10)',
  borderStrong: 'rgba(255, 255, 255, 0.18)',

  accent: '#3b82f6',
  accentGlow: 'rgba(59, 130, 246, 0.20)',
  accentSecondary: '#8b5cf6',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',

  glassBg: 'rgba(15, 23, 42, 0.80)',
  glassBorder: 'rgba(255, 255, 255, 0.08)',
  glassShadow: 'rgba(0, 0, 0, 0.30)',

  fillSubtle: 'rgba(255, 255, 255, 0.04)',
  fillLight: 'rgba(255, 255, 255, 0.08)',
  fillMedium: 'rgba(255, 255, 255, 0.14)',

  cardShadow: '0 1px 3px rgba(0, 0, 0, 0.20)',
};
