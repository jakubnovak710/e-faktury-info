'use client';

import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1 text-xs', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.href} className="flex items-center gap-1">
            {index > 0 && (
              <ChevronRight className="h-3 w-3" style={{ color: 'var(--text-faint)' }} />
            )}
            {isLast ? (
              <span style={{ color: 'var(--text-muted)' }}>{item.name}</span>
            ) : (
              <a
                href={item.href}
                className="transition-colors hover:underline"
                style={{ color: 'var(--text-faint)' }}
              >
                {item.name}
              </a>
            )}
          </span>
        );
      })}
    </nav>
  );
}
