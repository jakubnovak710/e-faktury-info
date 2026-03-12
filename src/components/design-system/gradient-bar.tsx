interface GradientBarProps {
  from?: string;
  to?: string;
  className?: string;
}

export function GradientBar({
  from = 'var(--accent)',
  to = 'var(--accent-secondary)',
  className,
}: GradientBarProps) {
  return (
    <div
      className={`h-px w-full ${className ?? ''}`}
      style={{ background: `linear-gradient(to right, ${from}, ${to})` }}
    />
  );
}
