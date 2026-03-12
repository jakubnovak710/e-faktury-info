'use client';

import { cn } from '@/lib/utils';
import { usePointerTracking } from '@/hooks/use-pointer-tracking';

interface InteractiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientFrom?: string;
  gradientTo?: string;
  gradientSize?: number;
}

export function InteractiveCard({
  children,
  className,
  gradientFrom = 'var(--accent)',
  gradientTo = 'var(--accent-secondary)',
  gradientSize = 250,
  ...props
}: InteractiveCardProps) {
  const { ref, position, handlePointerMove, handlePointerLeave } = usePointerTracking();

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        'relative overflow-hidden rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]',
        className
      )}
      style={{
        backgroundColor: 'var(--bg-elevated)',
        border: '1px solid var(--border-default)',
      }}
      {...props}
    >
      {/* Pointer-tracking gradient */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: position.isHovering ? 0.8 : 0,
          background: `radial-gradient(${gradientSize}px circle at ${position.x}px ${position.y}px, ${gradientFrom}15, ${gradientTo}08, transparent)`,
        }}
      />
      {children}
    </div>
  );
}
