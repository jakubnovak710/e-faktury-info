'use client';

import { useRef, useCallback } from 'react';
import { cn } from '@jakubnovak710/universal-web-core/lib/utils';

interface GlowCardProps {
  children: React.ReactNode;
  /** Glow color — CSS variable or color value. Default: var(--accent-glow) */
  glowColor?: string;
  /** Glow blob size in px. Default: 300 */
  glowSize?: number;
  /** Glow blur radius in px. Default: 60 */
  glowBlur?: number;
  /** Glow opacity on hover (0-1). Default: 0.2 */
  glowOpacity?: number;
  className?: string;
}

export function GlowCard({
  children,
  glowColor = 'var(--accent-glow)',
  glowSize = 300,
  glowBlur = 60,
  glowOpacity = 0.2,
  className,
}: GlowCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.PointerEvent) => {
    if (!glowRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.left = `${x}px`;
    glowRef.current.style.top = `${y}px`;
  }, []);

  const handleEnter = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = String(glowOpacity);
  }, [glowOpacity]);

  const handleLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '0';
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-visible', className)}
      onPointerMove={handleMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
    >
      {/* Glow blob — follows cursor, sits behind card */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-400 ease-out"
        style={{
          width: glowSize,
          height: glowSize,
          background: `radial-gradient(circle, ${glowColor}, transparent 70%)`,
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
