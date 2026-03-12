import { cn } from '@/lib/utils';

interface DecorativeGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  size?: number;
  blur?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const positionMap = {
  'top-left': '-top-10 -left-10',
  'top-right': '-top-10 -right-10',
  'bottom-left': '-bottom-10 -left-10',
  'bottom-right': '-bottom-10 -right-10',
};

export function DecorativeGlow({
  color = 'var(--accent-glow)',
  size = 128,
  blur = 48,
  position = 'top-right',
  className,
  ...props
}: DecorativeGlowProps) {
  return (
    <div
      className={cn('pointer-events-none absolute rounded-full', positionMap[position], className)}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        filter: `blur(${blur}px)`,
      }}
      {...props}
    />
  );
}
