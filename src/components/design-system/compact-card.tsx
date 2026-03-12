'use client';

import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface CompactCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  accentColor?: string;
  showChevron?: boolean;
}

export function CompactCard({
  icon,
  title,
  subtitle,
  accentColor = 'var(--accent)',
  showChevron = true,
  className,
  ...props
}: CompactCardProps) {
  return (
    <button
      className={cn(
        'flex w-full items-center gap-3 rounded-xl p-4 text-left transition-all hover:scale-[1.02] active:scale-[0.98]',
        className
      )}
      style={{
        backgroundColor: 'var(--bg-elevated)',
        border: '1px solid var(--border-default)',
      }}
      {...props}
    >
      {icon && (
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{
            backgroundColor: `color-mix(in srgb, ${accentColor} 15%, transparent)`,
            border: `1px solid color-mix(in srgb, ${accentColor} 25%, transparent)`,
          }}
        >
          {icon}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
          {title}
        </div>
        {subtitle && (
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {subtitle}
          </div>
        )}
      </div>
      {showChevron && (
        <ChevronRight className="h-4 w-4 shrink-0" style={{ color: 'var(--text-faint)' }} />
      )}
    </button>
  );
}
