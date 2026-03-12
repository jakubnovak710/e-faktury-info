'use client';

import { motion } from 'motion/react';
import {
  Palette,
  Shield,
  Zap,
  Globe,
  Code,
  ArrowRight,
  Layers,
  Mail,
  Activity,
  Database,
  Languages,
  BarChart3,
} from 'lucide-react';

import {
  InteractiveCard,
  GlassCard,
  FeaturedCard,
  CompactCard,
  MonoLabel,
  SectionDivider,
  GradientHeading,
  IconContainer,
  ProgressBar,
  Scanlines,
  DecorativeGlow,
  GradientBar,
} from '@/components/design-system';
import { GlassNav } from '@/components/layout/glass-nav';
import { Footer } from '@/components/layout/footer';
import { ScrollToTop } from '@/components/layout/scroll-to-top';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

const features = [
  {
    icon: <Palette className="h-6 w-6" />,
    label: 'Design Tokens',
    title: 'Globálny design systém',
    description:
      'Všetky farby, fonty a spacing z jedného config súboru. Zmena presetu mení celý vizuál.',
    color: 'var(--accent)',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    label: 'Enterprise Security',
    title: 'CSP, CORS, Rate Limiting',
    description:
      'Security headers, input sanitizácia, CSRF ochrana. A+ rating out of the box.',
    color: 'var(--success)',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    label: 'Self-Healing',
    title: 'AI automatické opravy',
    description:
      'Sentry zachytí chybu → Claude Code ju opraví → auto-deploy. Email notifikácie.',
    color: 'var(--accent-secondary)',
  },
  {
    icon: <Globe className="h-6 w-6" />,
    label: 'SEO + GEO',
    title: 'Optimalizácia pre AI aj vyhľadávače',
    description:
      'JSON-LD, sitemap, OG images, llms.txt. Chatboti budú odkazovať na vaše stránky.',
    color: 'var(--accent)',
  },
];

const modules = [
  { icon: <Database className="h-4 w-4" />, title: 'Database', subtitle: 'Drizzle ORM + Neon Postgres', color: 'var(--accent)' },
  { icon: <Shield className="h-4 w-4" />, title: 'Auth', subtitle: 'Auth.js v5 + session management', color: 'var(--success)' },
  { icon: <Languages className="h-4 w-4" />, title: 'i18n', subtitle: 'Multi-language support', color: 'var(--accent-secondary)' },
  { icon: <BarChart3 className="h-4 w-4" />, title: 'Analytics', subtitle: 'Umami self-hosted tracking', color: 'var(--warning)' },
  { icon: <Mail className="h-4 w-4" />, title: 'Email', subtitle: 'React Email + SMTP', color: 'var(--accent)' },
];

export default function Home() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}
    >
      <Scanlines />
      <DecorativeGlow position="top-right" color="var(--accent-glow)" size={280} />
      <DecorativeGlow position="bottom-left" color="var(--accent-glow)" size={320} style={{ opacity: 0.4 }} />

      {/* Nav */}
      <GlassNav
        logo={
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{
                backgroundColor: 'var(--accent)',
                boxShadow: '0 0 12px var(--accent-glow)',
              }}
            >
              <Code className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-black">Universal Web</span>
          </div>
        }
      />

      {/* Hero */}
      <motion.section
        className="mx-auto max-w-3xl px-6 pb-16 pt-20 text-center"
        {...fadeInUp}
      >
        <MonoLabel className="mb-4 block text-center">Universal Web Framework</MonoLabel>

        <GradientHeading as="h1" className="mb-6 text-4xl sm:text-5xl">
          Produkčný boilerplate pre moderné weby
        </GradientHeading>

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
      </motion.section>

      {/* Feature cards — InteractiveCard */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <SectionDivider icon={Zap} label="Funkcie" className="mb-8" />

        <motion.div className="grid gap-4 sm:grid-cols-2" {...staggerContainer}>
          {features.map((feature) => (
            <motion.div key={feature.title} {...staggerItem}>
              <InteractiveCard className="h-full p-6">
                <GradientBar from={feature.color} className="absolute left-0 right-0 top-0" />
                <IconContainer
                  icon={feature.icon}
                  color={feature.color}
                  className="mb-4"
                />
                <MonoLabel color={feature.color} className="mb-1">
                  {feature.label}
                </MonoLabel>
                <h3
                  className="mb-2 text-lg font-black"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {feature.description}
                </p>
              </InteractiveCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Self-healing showcase — FeaturedCard */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <SectionDivider icon={Activity} label="Self-Healing Pipeline" className="mb-8" />

        <motion.div {...fadeInUp}>
          <FeaturedCard accentColor="var(--accent-secondary)" className="p-8">
            <div className="grid items-center gap-8 sm:grid-cols-2">
              <div>
                <MonoLabel color="var(--accent-secondary)" className="mb-2">
                  AI-Powered Recovery
                </MonoLabel>
                <h3 className="mb-3 text-2xl font-black" style={{ color: 'var(--text-primary)' }}>
                  Automatická detekcia a oprava chýb
                </h3>
                <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Sentry zachytí runtime error → webhook spustí GitHub Action → Claude Code
                  analyzuje a vytvorí fix PR → CI overí → auto-deploy. Admin aj klient dostanú
                  email notifikácie.
                </p>
                <div className="space-y-3">
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        Detekcia chyby
                      </span>
                      <span className="font-mono text-[10px]" style={{ color: 'var(--accent-secondary)' }}>
                        100%
                      </span>
                    </div>
                    <ProgressBar value={100} from="var(--accent)" to="var(--accent-secondary)" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        AI analýza
                      </span>
                      <span className="font-mono text-[10px]" style={{ color: 'var(--accent-secondary)' }}>
                        85%
                      </span>
                    </div>
                    <ProgressBar value={85} from="var(--accent)" to="var(--accent-secondary)" />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        Auto-fix deploy
                      </span>
                      <span className="font-mono text-[10px]" style={{ color: 'var(--accent-secondary)' }}>
                        62%
                      </span>
                    </div>
                    <ProgressBar value={62} from="var(--accent)" to="var(--accent-secondary)" />
                  </div>
                </div>
              </div>

              <div
                className="rounded-xl p-4 font-mono text-[11px] leading-relaxed"
                style={{
                  backgroundColor: 'var(--fill-subtle)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-muted)',
                }}
              >
                <div style={{ color: 'var(--error)' }}>{'>'} Sentry: TypeError caught</div>
                <div style={{ color: 'var(--warning)' }}>{'>'} Webhook → GitHub Action</div>
                <div style={{ color: 'var(--accent)' }}>{'>'} Claude analyzing context...</div>
                <div style={{ color: 'var(--accent-secondary)' }}>{'>'} Fix PR #42 created</div>
                <div style={{ color: 'var(--success)' }}>{'>'} CI passed → auto-merged</div>
                <div style={{ color: 'var(--success)' }}>{'>'} Deploy successful ✓</div>
                <div className="mt-2" style={{ color: 'var(--text-faint)' }}>
                  {'>'} Email → admin: fix deployed
                  <br />
                  {'>'} Email → client: issue resolved
                </div>
              </div>
            </div>
          </FeaturedCard>
        </motion.div>
      </section>

      {/* Optional modules — CompactCard */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <SectionDivider icon={Layers} label="Voliteľné moduly" className="mb-8" />

        <motion.div className="space-y-2" {...staggerContainer}>
          {modules.map((mod) => (
            <motion.div key={mod.title} {...staggerItem}>
              <CompactCard
                icon={mod.icon}
                title={mod.title}
                subtitle={mod.subtitle}
                accentColor={mod.color}
              />
            </motion.div>
          ))}
        </motion.div>

        <p
          className="mt-4 text-center text-xs"
          style={{ color: 'var(--text-faint)' }}
        >
          Všetky moduly sú za feature flags — zapni/vypni v{' '}
          <span className="font-mono">config/features.config.ts</span>
        </p>
      </section>

      {/* Design tokens — GlassCard */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <SectionDivider icon={Palette} label="Design Tokeny" className="mb-8" />

        <motion.div {...fadeInUp}>
          <GlassCard className="p-8">
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

            <p
              className="mt-6 text-center text-xs"
              style={{ color: 'var(--text-faint)' }}
            >
              Zmena presetu v <span className="font-mono">config/design.config.ts</span> →{' '}
              <span className="font-mono">pnpm generate:tokens</span> → celý vizuál sa zmení
            </p>
          </GlassCard>
        </motion.div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
