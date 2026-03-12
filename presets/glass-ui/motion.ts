import type { MotionDurations, MotionEasings, HoverPreset, EntrancePreset } from '@/types/design';

export const stagger = 0.06;

export const durations: MotionDurations = {
  micro: 0.15,
  fast: 0.2,
  normal: 0.35,
  slow: 0.5,
  ambient: 8,
};

export const easings: MotionEasings = {
  default: 'ease-out',
  spring: { stiffness: 400, damping: 25 },
  entrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
  exit: 'cubic-bezier(0.7, 0, 0.84, 0)',
};

export const hover: HoverPreset = {
  scale: 1.04,
  y: -2,
  transition: 'all 0.15s ease-out',
};

export const entrance: EntrancePreset = {
  opacity: 0,
  y: 20,
  duration: 0.4,
};
