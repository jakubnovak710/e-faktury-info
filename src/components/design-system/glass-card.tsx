import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function GlassCard({ children, className, style, ...props }: GlassCardProps) {
  return (
    <div
      className={cn('overflow-hidden rounded-2xl p-5', className)}
      style={{
        backgroundColor: 'var(--glass-bg)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid var(--glass-border)',
        boxShadow: '0 8px 32px 0 var(--glass-shadow)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
