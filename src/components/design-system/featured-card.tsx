import { cn } from '@/lib/utils';

interface FeaturedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  accentColor?: string;
}

export function FeaturedCard({
  children,
  className,
  accentColor = 'var(--accent)',
  style,
  ...props
}: FeaturedCardProps) {
  return (
    <div
      className={cn('relative overflow-hidden rounded-2xl p-6', className)}
      style={{
        background: `linear-gradient(135deg, color-mix(in srgb, ${accentColor} 20%, transparent), color-mix(in srgb, ${accentColor} 8%, transparent))`,
        border: `2px solid color-mix(in srgb, ${accentColor} 50%, transparent)`,
        ...style,
      }}
      {...props}
    >
      {/* Decorative corner glow */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full"
        style={{
          backgroundColor: `color-mix(in srgb, ${accentColor} 30%, transparent)`,
          filter: 'blur(48px)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
