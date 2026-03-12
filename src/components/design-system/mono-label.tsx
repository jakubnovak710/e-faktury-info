import { cn } from '@/lib/utils';

interface MonoLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string;
  size?: 'xs' | 'sm';
}

export function MonoLabel({
  children,
  className,
  color = 'var(--text-muted)',
  size = 'xs',
  style,
  ...props
}: MonoLabelProps) {
  return (
    <span
      className={cn(
        'font-mono font-bold uppercase',
        size === 'xs' ? 'text-[9px] tracking-[0.2em]' : 'text-[10px] tracking-[0.15em]',
        className
      )}
      style={{ color, ...style }}
      {...props}
    >
      {children}
    </span>
  );
}
