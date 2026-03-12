import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest',
  {
    variants: {
      variant: {
        default: 'px-2.5 py-0.5',
        success: 'px-2.5 py-0.5',
        warning: 'px-2.5 py-0.5',
        error: 'px-2.5 py-0.5',
        outline: 'px-2.5 py-0.5',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function getVariantStyle(variant: string | null | undefined): React.CSSProperties {
  switch (variant) {
    case 'success':
      return { backgroundColor: 'rgba(34, 197, 94, 0.15)', color: 'var(--success)' };
    case 'warning':
      return { backgroundColor: 'rgba(245, 158, 11, 0.15)', color: 'var(--warning)' };
    case 'error':
      return { backgroundColor: 'rgba(239, 68, 68, 0.15)', color: 'var(--error)' };
    case 'outline':
      return { border: '1px solid var(--border-default)', color: 'var(--text-secondary)' };
    default:
      return { backgroundColor: 'var(--fill-subtle)', color: 'var(--text-secondary)' };
  }
}

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, style, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      style={{ ...getVariantStyle(variant), ...style }}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
