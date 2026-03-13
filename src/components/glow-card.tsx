'use client';

import { useRef, useCallback } from 'react';
import { cn } from '@jakubnovak710/universal-web-core/lib/utils';

interface GlowCardProps {
  children: React.ReactNode;
  /** Glow color — CSS variable or color value. Default: var(--accent-glow) */
  glowColor?: string;
  /** Glow blur radius in px. Default: 40 */
  glowBlur?: number;
  /** Glow opacity on hover (0-1). Default: 0.15 */
  glowOpacity?: number;
  className?: string;
}

export function GlowCard({
  children,
  glowColor = 'var(--accent-glow)',
  glowBlur = 40,
  glowOpacity = 0.15,
  className,
}: GlowCardProps) {
  const glowRef = useRef<HTMLDivElement>(null);

  const handleEnter = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = String(glowOpacity);
  }, [glowOpacity]);

  const handleLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '0';
  }, []);

  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Glow layer — behind card, visible on hover */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -inset-2 rounded-3xl transition-opacity duration-500 ease-out"
        style={{
          background: `radial-gradient(ellipse at center, ${glowColor}, transparent 70%)`,
          filter: `blur(${glowBlur}px)`,
          opacity: 0,
          zIndex: -1,
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
