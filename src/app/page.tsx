'use client';

import { useTheme } from '@/components/providers/theme-provider';

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-8">
      {/* Decorative corner glow */}
      <div
        className="pointer-events-none fixed -top-20 -right-20 h-48 w-48 rounded-full"
        style={{ backgroundColor: 'var(--accent-glow)', filter: 'blur(72px)' }}
      />

      <div className="text-center space-y-4 max-w-lg">
        <p
          className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ color: 'var(--accent)' }}
        >
          Universal Web Framework
        </p>

        <h1
          className="text-3xl font-black tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          Design Token System{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Works
          </span>
        </h1>

        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          Všetky farby, fonty a spacing pochádzajú z globálnych design tokenov.
          Žiadne hardcoded hodnoty.
        </p>
      </div>

      {/* Glass card */}
      <div
        className="rounded-2xl p-6 max-w-md w-full space-y-4"
        style={{
          backgroundColor: 'var(--glass-bg)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid var(--glass-border)',
          boxShadow: '0 8px 32px 0 var(--glass-shadow)',
        }}
      >
        <div className="flex items-center justify-between">
          <span
            className="font-mono text-[10px] font-bold uppercase tracking-[0.15em]"
            style={{ color: 'var(--text-muted)' }}
          >
            Theme
          </span>
          <button
            onClick={toggleTheme}
            className="rounded-xl px-4 py-2 text-sm font-bold transition-all hover:scale-105 active:scale-95"
            style={{
              backgroundColor: 'var(--fill-subtle)',
              color: 'var(--accent)',
              border: '1px solid var(--border-default)',
            }}
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>

        <div className="space-y-2">
          {[
            { label: 'bg-base', var: '--bg-base' },
            { label: 'accent', var: '--accent' },
            { label: 'glass-bg', var: '--glass-bg' },
            { label: 'text-primary', var: '--text-primary' },
          ].map((token) => (
            <div
              key={token.label}
              className="flex items-center gap-3 rounded-lg p-2"
              style={{ backgroundColor: 'var(--fill-subtle)' }}
            >
              <div
                className="h-6 w-6 rounded-md shrink-0"
                style={{
                  backgroundColor: `var(${token.var})`,
                  border: '1px solid var(--border-default)',
                }}
              />
              <span
                className="font-mono text-xs"
                style={{ color: 'var(--text-secondary)' }}
              >
                {token.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient CTA */}
      <button
        className="rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:scale-105 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
          boxShadow: '0 0 20px var(--accent-glow)',
        }}
      >
        Gradient CTA Button
      </button>
    </div>
  );
}
