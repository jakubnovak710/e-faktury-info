import { cn } from '@/lib/utils';

type ElevatedCardProps = React.HTMLAttributes<HTMLDivElement>;

export function ElevatedCard({ children, className, style, ...props }: ElevatedCardProps) {
  return (
    <div
      className={cn('rounded-xl p-5 transition-all hover:scale-[1.01]', className)}
      style={{
        backgroundColor: 'var(--bg-elevated)',
        border: '1px solid var(--border-default)',
        boxShadow: 'var(--card-shadow, none)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
