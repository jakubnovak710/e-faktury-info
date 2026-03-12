import { cn } from '@/lib/utils';

interface GradientHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3';
  from?: string;
  to?: string;
}

export function GradientHeading({
  children,
  className,
  as: Tag = 'h1',
  from = 'var(--accent)',
  to = 'var(--accent-secondary)',
  style,
  ...props
}: GradientHeadingProps) {
  return (
    <Tag
      className={cn('font-black', className)}
      style={{
        background: `linear-gradient(135deg, ${from}, ${to})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}
