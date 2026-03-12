import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface SectionDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon;
  label: string;
}

export function SectionDivider({
  icon: Icon,
  label,
  className,
  ...props
}: SectionDividerProps) {
  return (
    <div className={cn('flex items-center gap-2 px-1', className)} {...props}>
      {Icon && <Icon className="h-4 w-4" style={{ color: 'var(--text-faint)' }} />}
      <span
        className="font-mono text-[10px] font-bold uppercase tracking-[0.15em]"
        style={{ color: 'var(--text-faint)' }}
      >
        {label}
      </span>
      <div className="h-px flex-1" style={{ backgroundColor: 'var(--border-subtle)' }} />
    </div>
  );
}
