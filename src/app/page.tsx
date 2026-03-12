'use client';

import { useTheme } from '@/components/providers/theme-provider';
import { Moon, Sun, Palette, Shield, Zap, Globe, Code, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Palette,
    label: 'Design Tokens',
    title: 'Globálny design systém',
    description: 'Všetky farby, fonty a spacing z jedného config súboru. Zmena presetu mení celý vizuál.',
    color: 'var(--accent)',
  },
  {
    icon: Shield,
    label: 'Enterprise Security',
    title: 'CSP, CORS, Rate Limiting',
    description: 'Security headers, input sanitizácia, CSRF ochrana. A+ rating out of the box.',
    color: 'var(--success)',
  },
  {
    icon: Zap,
    label: 'Self-Healing',
    title: 'AI automatické opravy',
    description: 'Sentry zachytí chybu → Claude Code ju opraví → auto-deploy. Email notifikácie.',
    color: 'var(--accent-secondary)',
  },
  {
    icon: Globe,
    label: 'SEO + GEO',
    title: 'Optimalizácia pre vyhľadávače aj AI',
    description: 'JSON-LD, sitemap, OG images, llms.txt. Chatboti budú odkazovať na vaše stránky.',
    color: 'var(--accent)',
  },
];

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}
    >
      {/* Ambient corner glows */}
      <div
        className="pointer-events-none fixed -top-32 -right-32 h-64 w-64 rounded-full"
        style={{ backgroundColor: 'var(--accent-glow)', filter: 'blur(72px)' }}
      />
      <div
        className="pointer-events-none fixed -bottom-32 -left-32 h-64 w-64 rounded-full"
        style={{ backgroundColor: 'var(--accent-glow)', filter: 'blur(96px)', opacity: 0.5 }}
      />

      {/* Scanlines overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.02]"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 4px)',
        }}
      />

      {/* Glass nav bar */}
      <nav
        className="sticky top-0 z-40 flex items-center justify-between px-6 py-3"
        style={{
          backgroundColor: 'var(--glass-bg)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ backgroundColor: 'var(--accent)', boxShadow: '0 0 12px var(--accent-glow)' }}
          >
            <Code className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>
            Universal Web
          </span>
        </div>

        <button
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-xl transition-all hover:scale-110 active:scale-95"
          style={{ backgroundColor: 'var(--fill-subtle)', color: 'var(--text-muted)' }}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pb-16 pt-20 text-center">
        <p
          className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ color: 'var(--accent)' }}
        >
          Universal Web Framework
        </p>

        <h1 className="mb-6 text-4xl font-black tracking-tight sm:text-5xl">
          <span style={{ color: 'var(--text-primary)' }}>Produkčný boilerplate</span>
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            pre moderné weby
          </span>
        </h1>

        <p
          className="mx-auto mb-10 max-w-lg text-sm leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          Copy-paste framework s enterprise bezpečnosťou, AI self-healing, automatickými
          updatemi a 3 design presetmi. Od nuly k produkcii za minúty.
        </p>

        <div className="flex items-center justify-center gap-4">
          <button
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
              boxShadow: '0 0 24px var(--accent-glow)',
            }}
          >
            Začať projekt
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all hover:scale-[1.02] active:scale-95"
            style={{
              backgroundColor: 'var(--glass-bg)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--border-default)',
              color: 'var(--text-primary)',
            }}
          >
            Dokumentácia
          </button>
        </div>
      </section>

      {/* Feature cards */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="mb-8 flex items-center gap-2 px-1">
          <Zap className="h-4 w-4" style={{ color: 'var(--text-faint)' }} />
          <span
            className="font-mono text-[10px] font-bold uppercase tracking-[0.15em]"
            style={{ color: 'var(--text-faint)' }}
          >
            Funkcie
          </span>
          <div className="h-px flex-1" style={{ backgroundColor: 'var(--border-subtle)' }} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl p-6 transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
                boxShadow: 'var(--card-shadow, none)',
              }}
            >
              {/* Gradient accent bar */}
              <div
                className="absolute left-0 right-0 top-0 h-px"
                style={{
                  background: `linear-gradient(to right, ${feature.color}, transparent)`,
                }}
              />

              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: `color-mix(in srgb, ${feature.color} 15%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${feature.color} 25%, transparent)`,
                }}
              >
                <feature.icon className="h-6 w-6" style={{ color: feature.color }} />
              </div>

              <p
                className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.15em]"
                style={{ color: feature.color }}
              >
                {feature.label}
              </p>

              <h3 className="mb-2 text-lg font-black" style={{ color: 'var(--text-primary)' }}>
                {feature.title}
              </h3>

              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Glass info panel */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div
          className="overflow-hidden rounded-2xl p-8"
          style={{
            backgroundColor: 'var(--glass-bg)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid var(--glass-border)',
            boxShadow: '0 8px 32px 0 var(--glass-shadow)',
          }}
        >
          <div className="mb-6 flex items-center gap-2">
            <Palette className="h-4 w-4" style={{ color: 'var(--text-faint)' }} />
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-[0.15em]"
              style={{ color: 'var(--text-faint)' }}
            >
              Design Tokeny
            </span>
            <div className="h-px flex-1" style={{ backgroundColor: 'var(--border-subtle)' }} />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: '--bg-base', desc: 'Pozadie' },
              { label: '--bg-elevated', desc: 'Karty' },
              { label: '--accent', desc: 'Akcentová' },
              { label: '--glass-bg', desc: 'Glass efekt' },
            ].map((token) => (
              <div
                key={token.label}
                className="flex items-center gap-3 rounded-xl p-3"
                style={{ backgroundColor: 'var(--fill-subtle)' }}
              >
                <div
                  className="h-8 w-8 shrink-0 rounded-lg"
                  style={{
                    backgroundColor: `var(${token.label})`,
                    border: '1px solid var(--border-default)',
                  }}
                />
                <div>
                  <p
                    className="font-mono text-[9px] font-bold uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {token.label}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {token.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-6 text-center" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <p
          className="font-mono text-[10px] uppercase tracking-[0.15em]"
          style={{ color: 'var(--text-faint)' }}
        >
          Universal Web Framework · Glass UI Preset · Built with Next.js 15
        </p>
      </footer>
    </div>
  );
}
