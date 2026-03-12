// ============================================================================
// Design System Type Definitions
// Single source of truth for all visual design tokens
// ============================================================================

export interface ThemeColors {
  bgBase: string;
  bgDeeper: string;
  bgSurface: string;
  bgElevated: string;
  bgOverlay: string;

  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textFaint: string;

  borderSubtle: string;
  borderDefault: string;
  borderStrong: string;

  accent: string;
  accentGlow: string;
  accentSecondary: string;
  success: string;
  warning: string;
  error: string;

  glassBg: string;
  glassBorder: string;
  glassShadow: string;

  fillSubtle: string;
  fillLight: string;
  fillMedium: string;

  cardShadow: string;
}

export interface FontFile {
  name: string;
  path: string;
  weight?: string;
  style?: string;
}

export interface TypographyScale {
  pageTitle: { size: string; weight: number; tracking: string };
  sectionHeading: { size: string; weight: number; tracking: string };
  cardTitle: { size: string; weight: number; tracking: string };
  body: { size: string; weight: number; lineHeight: string };
  monoLabel: { size: string; weight: number; tracking: string; transform: string };
  meta: { size: string; weight: number; tracking: string };
}

export interface GlassEffect {
  bgOpacity: number;
  blur: string;
  borderOpacity: number;
  shadowColor: string;
}

export interface GlowEffect {
  standard: string;
  strong: string;
  text: string;
}

export interface RadiusScale {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  full: string;
}

export interface ShadowScale {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface DecorativeEffects {
  hasScanlines: boolean;
  hasGlow: boolean;
  hasGlass: boolean;
  hasGradientBars: boolean;
  hasCornerGlow: boolean;
}

export interface MotionDurations {
  micro: number;
  fast: number;
  normal: number;
  slow: number;
  ambient: number;
}

export interface MotionEasings {
  default: string;
  spring: { stiffness: number; damping: number };
  entrance: string;
  exit: string;
}

export interface HoverPreset {
  scale: number;
  y: number;
  transition: string;
}

export interface EntrancePreset {
  opacity: number;
  y: number;
  duration: number;
}

export interface PaddingScale {
  compact: string;
  standard: string;
  spacious: string;
}

export interface DesignPreset {
  name: string;
  description: string;

  colors: {
    dark: ThemeColors;
    light: ThemeColors;
  };

  typography: {
    displayFont: string;
    bodyFont: string;
    monoFont: string;
    fontFiles: FontFile[];
    scale: TypographyScale;
  };

  effects: {
    glass: GlassEffect;
    glow: GlowEffect;
    borderRadius: RadiusScale;
    shadows: ShadowScale;
    decorative: DecorativeEffects;
  };

  motion: {
    stagger: number;
    durations: MotionDurations;
    easings: MotionEasings;
    hover: HoverPreset;
    entrance: EntrancePreset;
  };

  spacing: {
    padding: PaddingScale;
    radius: RadiusScale;
    contentMaxWidth: string;
    sidebarWidth: string;
  };
}
