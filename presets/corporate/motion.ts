import type { MotionDurations, MotionEasings, HoverPreset, EntrancePreset } from '@/types/design';

export const stagger = 0.03;

export const durations: MotionDurations = {
  micro: 0.1,
  fast: 0.15,
  normal: 0.2,
  slow: 0.3,
  ambient: 20,
};

export const easings: MotionEasings = {
  default: 'ease-in-out',
  spring: { stiffness: 200, damping: 30 },
  entrance: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  exit: 'cubic-bezier(0.55, 0, 1, 0.45)',
};

export const hover: HoverPreset = {
  scale: 1.01,
  y: 0,
  transition: 'all 0.2s ease-in-out',
};

export const entrance: EntrancePreset = {
  opacity: 0,
  y: 8,
  duration: 0.25,
};
