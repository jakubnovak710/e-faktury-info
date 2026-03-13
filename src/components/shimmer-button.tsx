'use client';

import { cn } from '@jakubnovak710/universal-web-core/lib/utils';

interface ShimmerButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  shimmerColor?: string;
}

export function ShimmerButton({
  children,
  className,
  shimmerColor = 'var(--accent)',
  ...props
}: ShimmerButtonProps) {
  return (
    <a
      className={cn(
        'group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-xl px-6 py-3 text-sm font-bold transition-all active:scale-95',
        className,
      )}
      style={{
        background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
        boxShadow: '0 0 24px var(--accent-glow)',
        color: 'var(--bg-base)',
      }}
      {...props}
    >
      {/* Shimmer sweep */}
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${shimmerColor}40 50%, transparent 100%)`,
          transition: 'transform 600ms ease-in-out',
        }}
        aria-hidden="true"
      />
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </a>
  );
}
