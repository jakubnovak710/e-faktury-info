'use client';

import { useMemo } from 'react';

// ---------------------------------------------------------------------------
// Floating tech items — random positions, sizes, delays
// ---------------------------------------------------------------------------

const FLOATING_ITEMS = [
  '{ }', '</>', 'AI', '01', 'fn()', '&&', '||', '[ ]', '::',
  'tsx', 'css', '*.ts', 'npm', 'git', '<T>', '===', '→', '>>',
  'use', 'ref',
];

function generateFloatingItems(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    text: FLOATING_ITEMS[i % FLOATING_ITEMS.length]!,
    left: `${(i * 37 + 13) % 100}%`,
    delay: `${(i * 2.7) % 20}s`,
    duration: `${15 + (i * 3.1) % 15}s`,
    fontSize: `${10 + (i * 1.3) % 6}px`,
    isHighlight: i % 5 === 0,
  }));
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface AmbientBackgroundProps {
  showFloating?: boolean;
  showScanBeam?: boolean;
  showGradient?: boolean;
}

export function AmbientBackground({
  showFloating = true,
  showScanBeam = true,
  showGradient = true,
}: AmbientBackgroundProps) {
  const items = useMemo(() => generateFloatingItems(18), []);

  return (
    <>
      {/* Layer 1: Tech radial gradient */}
      {showGradient && (
        <div
          className="pointer-events-none fixed inset-0"
          style={{
            zIndex: -3,
            background: 'radial-gradient(ellipse at bottom, color-mix(in srgb, var(--accent) 6%, var(--bg-base)), var(--bg-base))',
          }}
          aria-hidden="true"
        />
      )}

      {/* Layer 2: Floating items */}
      {showFloating && (
        <div
          className="pointer-events-none fixed inset-0 overflow-hidden"
          style={{ zIndex: -2 }}
          aria-hidden="true"
        >
          {items.map((item) => (
            <span
              key={item.id}
              className="absolute font-mono"
              style={{
                left: item.left,
                bottom: '-20px',
                fontSize: item.fontSize,
                color: item.isHighlight ? 'var(--accent)' : 'var(--text-faint)',
                opacity: item.isHighlight ? 0.12 : 0.06,
                animation: `floatUp ${item.duration} linear ${item.delay} infinite`,
                textShadow: item.isHighlight ? '0 0 10px var(--accent-glow)' : 'none',
              }}
            >
              {item.text}
            </span>
          ))}
        </div>
      )}

      {/* Layer 3: Scan beam */}
      {showScanBeam && (
        <div
          className="pointer-events-none fixed left-0 right-0"
          style={{
            zIndex: -1,
            height: '2px',
            background: 'linear-gradient(to right, transparent, var(--accent-glow), transparent)',
            opacity: 0.3,
            animation: 'scanBeam 8s linear infinite',
          }}
          aria-hidden="true"
        />
      )}
    </>
  );
}
