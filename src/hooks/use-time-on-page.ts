'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackTimeOnPage } from '@/lib/analytics';

const MILESTONES = [30, 60, 120, 300] as const;

/**
 * Tracks time-on-page engagement milestones (30s, 60s, 2min, 5min) via Umami.
 * Fires each milestone only once per page view. Pauses when tab is hidden.
 */
export function useTimeOnPage(): void {
  const pathname = usePathname();
  const elapsed = useRef(0);
  const fired = useRef(new Set<number>());

  useEffect(() => {
    elapsed.current = 0;
    fired.current.clear();

    let visible = !document.hidden;

    const interval = setInterval(() => {
      if (!visible) return;
      elapsed.current += 1;

      for (const milestone of MILESTONES) {
        if (elapsed.current >= milestone && !fired.current.has(milestone)) {
          fired.current.add(milestone);
          trackTimeOnPage(milestone, pathname);
        }
      }
    }, 1000);

    function onVisibility() {
      visible = !document.hidden;
    }

    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [pathname]);
}
