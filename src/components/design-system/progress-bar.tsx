'use client';

import { motion } from 'motion/react';

interface ProgressBarProps {
  value: number;
  from?: string;
  to?: string;
  className?: string;
}

export function ProgressBar({
  value,
  from = 'var(--accent)',
  to = 'var(--accent-secondary)',
  className,
}: ProgressBarProps) {
  return (
    <div
      className={`h-1.5 overflow-hidden rounded-full ${className ?? ''}`}
      style={{ backgroundColor: 'var(--fill-subtle)' }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{
          background: `linear-gradient(to right, ${from}, ${to})`,
          boxShadow: '0 0 10px var(--accent-glow)',
        }}
        initial={{ width: '0%' }}
        animate={{ width: `${value}%` }}
        transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
      />
    </div>
  );
}
