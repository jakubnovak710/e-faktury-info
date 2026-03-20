'use client';

import { useScrollDepth } from '@/hooks/use-scroll-depth';
import { useTimeOnPage } from '@/hooks/use-time-on-page';

/**
 * Client component that activates scroll depth + time-on-page tracking.
 * Place once in the root layout — renders nothing visible.
 */
export function EngagementTracker() {
  useScrollDepth();
  useTimeOnPage();
  return null;
}
