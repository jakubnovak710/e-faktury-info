'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { cn } from '@jakubnovak710/universal-web-core/lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  /** How strongly the element follows the cursor (0-1). Default 0.3 */
  strength?: number;
  /** Max displacement in px. Default 10 */
  maxDistance?: number;
  onClick?: () => void;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  maxDistance = 10,
  onClick,
  style,
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      setPosition({
        x: Math.max(-maxDistance, Math.min(maxDistance, deltaX)),
        y: Math.max(-maxDistance, Math.min(maxDistance, deltaY)),
      });
    },
    [strength, maxDistance],
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={ref}
      className={cn('cursor-pointer', className)}
      style={style}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      aria-label={ariaLabel}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </motion.div>
  );
}
