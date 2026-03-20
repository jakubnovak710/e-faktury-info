'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackScrollDepth } from '@/lib/analytics';

const MILESTONES = [25, 50, 75, 100] as const;

/**
 * Tracks scroll depth milestones (25%, 50%, 75%, 100%) via Umami.
 * Fires each milestone only once per page view.
 */
export function useScrollDepth(): void {
  const pathname = usePathname();
  const fired = useRef(new Set<number>());

  useEffect(() => {
    fired.current.clear();

    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const percent = Math.round((scrollTop / docHeight) * 100);

      for (const milestone of MILESTONES) {
        if (percent >= milestone && !fired.current.has(milestone)) {
          fired.current.add(milestone);
          trackScrollDepth(milestone, pathname);
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);
}
