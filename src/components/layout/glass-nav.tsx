'use client';

import { cn } from '@/lib/utils';
import { useTheme } from '@/components/providers/theme-provider';
import { Moon, Sun } from 'lucide-react';

interface GlassNavProps {
  logo?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function GlassNav({ logo, children, className }: GlassNavProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className={cn('sticky top-0 z-40 flex items-center justify-between px-6 py-3', className)}
      style={{
        backgroundColor: 'var(--glass-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center gap-3">{logo}</div>

      <div className="flex items-center gap-4">
        {children}
        <button
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-xl transition-all hover:scale-110 active:scale-95"
          style={{ backgroundColor: 'var(--fill-subtle)', color: 'var(--text-muted)' }}
          aria-label={theme === 'dark' ? 'Prepnúť na svetlý režim' : 'Prepnúť na tmavý režim'}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </nav>
  );
}
