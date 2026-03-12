import type { MotionDurations, MotionEasings, HoverPreset, EntrancePreset } from '@/types/design';

export const stagger = 0.04;

export const durations: MotionDurations = {
  micro: 0.1,
  fast: 0.15,
  normal: 0.25,
  slow: 0.4,
  ambient: 12,
};

export const easings: MotionEasings = {
  default: 'ease-out',
  spring: { stiffness: 300, damping: 25 },
  entrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
  exit: 'cubic-bezier(0.7, 0, 0.84, 0)',
};

export const hover: HoverPreset = {
  scale: 1.02,
  y: -1,
  transition: 'all 0.15s ease-out',
};

export const entrance: EntrancePreset = {
  opacity: 0,
  y: 12,
  duration: 0.3,
};
