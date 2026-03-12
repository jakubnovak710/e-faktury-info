export function Scanlines({ opacity = 0.02 }: { opacity?: number }) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        opacity,
        background:
          'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 4px)',
      }}
    />
  );
}
