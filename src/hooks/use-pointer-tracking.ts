'use client';

import { useCallback, useRef, useState } from 'react';

interface PointerPosition {
  x: number;
  y: number;
  isHovering: boolean;
}

export function usePointerTracking() {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<PointerPosition>({ x: 0, y: 0, isHovering: false });

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovering: true,
    });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setPosition((prev) => ({ ...prev, isHovering: false }));
  }, []);

  return { ref, position, handlePointerMove, handlePointerLeave };
}
