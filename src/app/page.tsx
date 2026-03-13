'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import {
  Palette,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Layers,
  Mail,
  Activity,
  Database,
  Languages,
  BarChart3,
  Timer,
  Lock,
  Sparkles,
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
} from '@jakubnovak710/universal-web-core/components/design-system';
import { Footer } from '@jakubnovak710/universal-web-core/components/layout/footer';
import { ScrollToTop } from '@jakubnovak710/universal-web-core/components/layout/scroll-to-top';
import { fadeInUp, staggerContainer, staggerItem } from '@jakubnovak710/universal-web-core/lib/motion';

import { Navigation } from '@/components/navigation';
import { MagneticButton } from '@/components/magnetic-button';
import { ShimmerButton } from '@/components/shimmer-button';
import { CountUp } from '@/components/count-up';

// ---------------------------------------------------------------------------
// Typewriter terminal
// ---------------------------------------------------------------------------

const terminalLines = [
  { text: '> Sentry: TypeError caught', color: 'var(--error)', delay: 0 },
  { text: '> Webhook → GitHub Action', color: 'var(--warning)', delay: 400 },
  { text: '> Triage (haiku): classifying...', color: 'var(--accent)', delay: 800 },
  { text: '> FIXABLE: type error in component', color: 'var(--accent)', delay: 1200 },
  { text: '> Fix (sonnet): applying patch...', color: 'var(--accent-secondary)', delay: 1600 },
  { text: '> Verify: pnpm build — PASSED', color: 'var(--success)', delay: 2200 },
  { text: '> Fix PR #42 created', color: 'var(--success)', delay: 2600 },
  { text: '> CI passed → auto-merged', color: 'var(--success)', delay: 3000 },
  { text: '> Deploy successful', color: 'var(--success)', delay: 3400 },
];

function TypewriterTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timers = terminalLines.map((line, i) =>
      setTimeout(() => setVisibleCount(i + 1), line.delay),
    );
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <div
      ref={ref}
      className="rounded-xl p-4 font-mono text-[11px] leading-relaxed"
      style={{
        backgroundColor: 'var(--fill-subtle)',
        border: '1px solid var(--border-subtle)',
        color: 'var(--text-muted)',
        minHeight: 200,
      }}
    >
      {terminalLines.slice(0, visibleCount).map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: line.color }}
        >
          {line.text}
        </motion.div>
      ))}
      {visibleCount > 0 && visibleCount < terminalLines.length && (
        <span
          className="inline-block h-3 w-1.5 animate-pulse"
          style={{ backgroundColor: 'var(--accent)' }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const features = [
  {
    icon: <Palette className="h-6 w-6" />,
    label: 'Design Tokens',
    title: 'Globálny design systém',
    description: 'Všetky farby, fonty a spacing z jedného config súboru. Zmena presetu mení celý vizuál.',
    color: 'var(--accent)',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    label: 'Enterprise Security',
    title: 'CSP, CORS, Rate Limiting',
    description: 'Security headers, input sanitizácia, CSRF ochrana. A+ rating out of the box.',
    color: 'var(--success)',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    label: 'Self-Healing',
    title: 'AI automatické opravy',
    description: 'CI zlyhá → 3-agent pipeline (triage/fix/verify) → auto-deploy. Email notifikácie.',
    color: 'var(--accent-secondary)',
  },
  {
    icon: <Globe className="h-6 w-6" />,
    label: 'SEO + GEO',
    title: 'Optimalizácia pre AI aj vyhľadávače',
    description: 'JSON-LD, sitemap, OG images, llms.txt. Chatboti budú odkazovať na vaše stránky.',
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

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Home() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}
    >
      <Scanlines />
      <DecorativeGlow position="top-right" color="var(--accent-glow)" size={280} />
      <DecorativeGlow position="bottom-left" color="var(--accent-glow)" size={320} style={{ opacity: 0.4 }} />

      {/* Floating island nav */}
      <Navigation />

      {/* Hero */}
      <motion.section
        className="mx-auto max-w-3xl px-6 pb-16 pt-28 text-center"
        {...fadeInUp}
      >
        {/* Animated badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ backgroundColor: 'var(--fill-subtle)', border: '1px solid var(--border-subtle)' }}>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: 'var(--accent)' }} />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
          </span>
          <MonoLabel className="text-[10px]">Production-ready boilerplate</MonoLabel>
        </div>

        <GradientHeading as="h1" className="mb-6 text-4xl sm:text-5xl lg:text-6xl">
          Produkčný boilerplate pre moderné weby
        </GradientHeading>

        <p
          className="mx-auto mb-10 max-w-lg text-sm leading-relaxed sm:text-base"
          style={{ color: 'var(--text-secondary)' }}
        >
          Copy-paste framework s enterprise bezpečnosťou, AI self-healing, automatickými
          updatemi a 3 design presetmi. Od nuly k produkcii za minúty.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <MagneticButton strength={0.2} maxDistance={8}>
            <ShimmerButton href="#features" className="rounded-full px-8 py-3.5 text-sm">
              Začať projekt
              <ArrowRight className="h-4 w-4" />
            </ShimmerButton>
          </MagneticButton>

          <MagneticButton strength={0.15} maxDistance={6}>
            <a
              href="#modules"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold transition-all hover:scale-[1.02] active:scale-95"
              style={{
                backgroundColor: 'var(--glass-bg)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-primary)',
              }}
            >
              Dokumentácia
            </a>
          </MagneticButton>
        </div>
      </motion.section>

      {/* Metrics bar */}
      <motion.section
        className="mx-auto mb-20 max-w-4xl px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: <Sparkles className="h-4 w-4" />, value: 3, suffix: '', label: 'Design Presets' },
            { icon: <Timer className="h-4 w-4" />, value: 89, suffix: 'ms', label: 'TTFB' },
            { icon: <Lock className="h-4 w-4" />, value: 0, suffix: '', label: 'Config potrebný', static: '0' },
            { icon: <Shield className="h-4 w-4" />, value: 0, suffix: '', label: 'Security Rating', static: 'A+' },
          ].map((metric) => (
            <motion.div key={metric.label} variants={staggerItem}>
              <GlassCard className="flex flex-col items-center p-4 text-center">
                <div className="mb-2" style={{ color: 'var(--accent)' }}>{metric.icon}</div>
                <span className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>
                  {metric.static ?? <CountUp end={metric.value} suffix={metric.suffix} />}
                </span>
                <span className="mt-1 text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                  {metric.label}
                </span>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Feature cards */}
      <section id="features" className="mx-auto max-w-4xl px-6 pb-20">
        <SectionDivider icon={Zap} label="Funkcie" className="mb-8" />

        <motion.div
          className="grid gap-4 sm:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={staggerItem}>
              <MagneticButton strength={0.12} maxDistance={4}>
                <InteractiveCard className="h-full p-6">
                  <GradientBar from={feature.color} className="absolute left-0 right-0 top-0" />
                  <IconContainer icon={feature.icon} color={feature.color} className="mb-4" />
                  <MonoLabel color={feature.color} className="mb-1">{feature.label}</MonoLabel>
                  <h3 className="mb-2 text-lg font-black" style={{ color: 'var(--text-primary)' }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {feature.description}
                  </p>
                </InteractiveCard>
              </MagneticButton>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Self-healing showcase */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <SectionDivider icon={Activity} label="Self-Healing Pipeline" className="mb-8" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <FeaturedCard accentColor="var(--accent-secondary)" className="p-8">
            <div className="grid items-center gap-8 sm:grid-cols-2">
              <div>
                <MonoLabel color="var(--accent-secondary)" className="mb-2">Multi-Agent Pipeline</MonoLabel>
                <h3 className="mb-3 text-2xl font-black" style={{ color: 'var(--text-primary)' }}>
                  3 agenti, 1 fix
                </h3>
                <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Triage (haiku) klasifikuje chybu → Fix (sonnet) opraví kód → Verify (haiku) skontroluje diff.
                  Ak verify zlyhá, druhý pokus s iným prístupom. Výsledok: PR s fixom.
                </p>
                <div className="space-y-3">
                  {[
                    { label: 'Detekcia chyby', value: 100 },
                    { label: 'AI analýza', value: 85 },
                    { label: 'Auto-fix deploy', value: 62 },
                  ].map((bar) => (
                    <div key={bar.label}>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{bar.label}</span>
                        <span className="font-mono text-[10px]" style={{ color: 'var(--accent-secondary)' }}>
                          {bar.value}%
                        </span>
                      </div>
                      <ProgressBar value={bar.value} from="var(--accent)" to="var(--accent-secondary)" />
                    </div>
                  ))}
                </div>
              </div>

              <TypewriterTerminal />
            </div>
          </FeaturedCard>
        </motion.div>
      </section>

      {/* Optional modules */}
      <section id="modules" className="mx-auto max-w-4xl px-6 pb-20">
        <SectionDivider icon={Layers} label="Voliteľné moduly" className="mb-8" />

        <motion.div
          className="space-y-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {modules.map((mod) => (
            <motion.div key={mod.title} variants={staggerItem}>
              <MagneticButton strength={0.08} maxDistance={3}>
                <CompactCard
                  icon={mod.icon}
                  title={mod.title}
                  subtitle={mod.subtitle}
                  accentColor={mod.color}
                />
              </MagneticButton>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-4 text-center text-xs" style={{ color: 'var(--text-faint)' }}>
          Všetky moduly sú za feature flags — zapni/vypni v{' '}
          <span className="font-mono">config/features.config.ts</span>
        </p>
      </section>

      {/* Design tokens */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <SectionDivider icon={Palette} label="Design Tokeny" className="mb-8" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="p-8">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: '--bg-base', desc: 'Pozadie' },
                { label: '--bg-elevated', desc: 'Karty' },
                { label: '--accent', desc: 'Akcentová' },
                { label: '--glass-bg', desc: 'Glass efekt' },
              ].map((token) => (
                <MagneticButton key={token.label} strength={0.1} maxDistance={3}>
                  <div
                    className="flex items-center gap-3 rounded-xl p-3 transition-all"
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
                      <p className="font-mono text-[9px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                        {token.label}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        {token.desc}
                      </p>
                    </div>
                  </div>
                </MagneticButton>
              ))}
            </div>

            <p className="mt-6 text-center text-xs" style={{ color: 'var(--text-faint)' }}>
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
