import { cn } from '@/lib/utils';

type IconSize = 'compact' | 'standard' | 'featured' | 'hero';

const sizeMap: Record<IconSize, { container: string; icon: string }> = {
  compact: { container: 'h-9 w-9 rounded-lg', icon: 'h-4 w-4' },
  standard: { container: 'h-12 w-12 rounded-xl', icon: 'h-6 w-6' },
  featured: { container: 'h-14 w-14 rounded-2xl', icon: 'h-7 w-7' },
  hero: { container: 'h-16 w-16 rounded-2xl', icon: 'h-8 w-8' },
};

interface IconContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  size?: IconSize;
  color?: string;
  glow?: boolean;
}

export function IconContainer({
  icon,
  size = 'standard',
  color = 'var(--accent)',
  glow = false,
  className,
  ...props
}: IconContainerProps) {
  const sizes = sizeMap[size];
  return (
    <div
      className={cn('flex shrink-0 items-center justify-center', sizes.container, className)}
      style={{
        backgroundColor: `color-mix(in srgb, ${color} 18%, transparent)`,
        border: `1px solid color-mix(in srgb, ${color} 35%, transparent)`,
        ...(glow && { boxShadow: `0 0 20px color-mix(in srgb, ${color} 30%, transparent)` }),
        color,
      }}
      {...props}
    >
      {icon}
    </div>
  );
}
