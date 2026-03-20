/**
 * Homepage — e-Faktúry.info
 *
 * Design psychology (per loaded skills):
 * - Hero: Loss Aversion (penalty anchor), Urgency (countdown), Curiosity Gap
 * - Problem: Framing Effect (change is inevitable)
 * - For Whom: Selective Attention, Similarity Bias
 * - Timeline: Goal-Gradient, Zeigarnik Effect
 * - Steps: Activation Energy reduction, EAST framework
 * - Software: Authority Bias, Bandwagon Effect
 * - FAQ: Uncertainty reduction, Confirmation Bias
 * - Stats: Anchoring, Social Proof
 * - Newsletter: Peak-End Rule, Reciprocity, Foot-in-the-Door
 * - Partners: Nudge (non-aggressive)
 *
 * Target keywords: e-faktúra, elektronická faktúra slovensko, e-fakturácia 2027
 * Primary CTA: Newsletter signup (email only)
 * Secondary CTA: Readiness check tool
 */

'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import {
  FileText,
  ArrowRight,
  AlertTriangle,
  Building2,
  Briefcase,
  Calculator,
  CheckCircle2,
  Circle,
  ChevronDown,
  Users,
  Shield,
  Globe,
  Send,
  ExternalLink,
} from 'lucide-react';
import {
  GlassCard,
  MonoLabel,
  SectionDivider,
  GradientHeading,
} from '@jakubnovak710/universal-web-core/components/design-system';
import { Footer } from '@jakubnovak710/universal-web-core/components/layout/footer';
import { ScrollToTop } from '@jakubnovak710/universal-web-core/components/layout/scroll-to-top';
import { fadeInUp, staggerContainer, staggerItem } from '@jakubnovak710/universal-web-core/lib/motion';
import { Navigation } from '@/components/navigation';
import { CountUp } from '@/components/count-up';
import { Countdown } from '@/components/countdown';
import { ShimmerButton } from '@/components/shimmer-button';
import { AmbientBackground } from '@/components/ambient-background';
import { trackNewsletterSignup, trackCTA } from '@/lib/analytics';
import { timeline } from '@/data/timeline';
import { erpSystems } from '@/data/erp-systems';
import { faqCategories } from '@/data/faq';

/* ─── FAQ Accordion ────────────────────────────────────── */

function FaqAccordion({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border-b border-[var(--border-default)]">
      <summary className="flex cursor-pointer items-center justify-between py-4 text-left text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]">
        <span className="pr-4 font-bold">{question}</span>
        <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
      </summary>
      <p className="pb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
        {answer}
      </p>
    </details>
  );
}

/* ─── ERP Readiness Badge ──────────────────────────────── */

function ReadinessBadge({ status }: { status: string }) {
  const config = {
    ready: { label: 'Ready', className: 'bg-[var(--color-success-muted)] text-[var(--color-success)]' },
    'in-progress': { label: 'Pripravuje sa', className: 'bg-[var(--color-warning-muted)] text-[var(--color-warning)]' },
    planned: { label: 'Plánované', className: 'bg-[var(--color-info-muted)] text-[var(--color-info)]' },
    unknown: { label: 'Neznámy', className: 'bg-gray-500/20 text-gray-400' },
  }[status] ?? { label: status, className: 'bg-gray-500/20 text-gray-400' };

  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${config.className}`}>
      {config.label}
    </span>
  );
}

/* ─── Section wrapper with scroll animation ────────────── */

function Section({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 ${className}`}
    >
      {children}
    </motion.section>
  );
}

/* ─── Newsletter Form ──────────────────────────────────── */

function NewsletterInline({ source }: { source: string }) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    trackNewsletterSignup(source);
    // TODO: connect to newsletter API
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
      <input
        type="email"
        required
        placeholder="vas@email.sk"
        className="flex-1 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
      />
      <ShimmerButton type="submit" className="shrink-0 px-5 py-2.5">
        <Send className="mr-2 h-4 w-4" />
        Odoberať
      </ShimmerButton>
    </form>
  );
}

/* ═══════════════════════════════════════════════════════════
   HOMEPAGE
   ═══════════════════════════════════════════════════════════ */

export default function HomePage() {
  // Top 5 FAQ items for homepage
  const homeFaq = faqCategories
    .flatMap((c) => c.items)
    .slice(0, 5);

  // Top 6 ERP systems for grid
  const topErp = erpSystems.slice(0, 6);

  // Days until deadline (computed once on mount via state initializer)
  const [daysUntilDeadline] = useState(
    () => Math.ceil((new Date('2027-01-01').getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
  );

  return (
    <>
      <AmbientBackground />
      <Navigation />

      {/* ════════════════════════════════════════════════════════
          SEKCIA 1: HERO — Urgency + Loss Aversion + Curiosity Gap
          ════════════════════════════════════════════════════════ */}
      <header className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 pt-20 text-center">
        <motion.div {...fadeInUp} className="mx-auto max-w-3xl">
          <MonoLabel>e-Faktúry.info</MonoLabel>

          <h1 className="mt-4 text-4xl font-black leading-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
            Elektronická faktúra{' '}
            <span className="text-[var(--accent)]">na Slovensku</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--text-secondary)]">
            Od <strong>1. januára 2027</strong> bude e-faktúra povinná pre
            všetkých platiteľov DPH. Pokuta za nesplnenie: až{' '}
            <strong className="text-[var(--accent)]">100 000 EUR</strong>.
          </p>

          {/* Countdown — Urgency heuristic */}
          <div className="mt-8">
            <p className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
              Do povinnej e-faktúry ostáva
            </p>
            <Countdown targetDate="2027-01-01T00:00:00" locale="sk" />
          </div>

          {/* CTAs — Foot-in-the-Door: newsletter first (low barrier) */}
          <div className="mt-10 flex flex-col items-center gap-4">
            <NewsletterInline source="hero" />
            <p className="text-xs text-[var(--text-muted)]">
              Žiadny spam. Len relevantné novinky o e-faktúre. Kedykoľvek sa
              odhlásite.
            </p>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-12"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="mx-auto h-6 w-6 text-[var(--text-muted)]" />
          </motion.div>
        </motion.div>
      </header>

      <SectionDivider label="" />

      {/* ════════════════════════════════════════════════════════
          SEKCIA 2: PROBLÉM — Framing Effect
          ════════════════════════════════════════════════════════ */}
      <Section id="problem">
        <div className="text-center">
          <MonoLabel>Čo sa zmení</MonoLabel>
          <GradientHeading as="h2" className="mt-3">
            Od 1.1.2027 koniec klasickej fakturácie
          </GradientHeading>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">
            Novela zákona o DPH (385/2025 Z.z.) zavádza povinnú elektronickú
            fakturáciu pre všetky tuzemské B2B a B2G transakcie.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { icon: FileText, title: 'PDF nestačí', desc: 'PDF faktúra nebude spĺňať zákonné požiadavky. Povinný je XML formát podľa EN 16931.' },
            { icon: Globe, title: 'Peppol sieť', desc: 'Faktúry sa budú doručovať cez medzinárodnú Peppol sieť používanú v 20 krajinách EÚ.' },
            { icon: Users, title: 'Digitálny poštár', desc: 'Každá firma si musí vybrať certifikovaného digitálneho poštára pre doručovanie.' },
            { icon: AlertTriangle, title: 'Real-time reporting', desc: 'Údaje z faktúr sa budú posielať finančnej správe v reálnom čase.' },
          ].map((card) => (
            <motion.div key={card.title} variants={staggerItem}>
              <GlassCard className="h-full p-6">
                <card.icon className="h-8 w-8 text-[var(--accent)]" />
                <h3 className="mt-3 font-black text-[var(--text-primary)]">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  {card.desc}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <SectionDivider label="" />

      {/* ════════════════════════════════════════════════════════
          SEKCIA 3: PRE KOHO — Selective Attention + Similarity Bias
          ════════════════════════════════════════════════════════ */}
      <Section id="pre-koho">
        <div className="text-center">
          <MonoLabel>Pre koho</MonoLabel>
          <GradientHeading as="h2" className="mt-3">
            Týka sa to aj vás?
          </GradientHeading>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mt-12 grid gap-6 sm:grid-cols-3"
        >
          {[
            {
              icon: Briefcase,
              title: 'Živnostníci & SZČO',
              desc: 'Ak ste platiteľ DPH, musíte e-faktúry vystavovať. Ak nie, musíte ich vedieť prijímať.',
              href: '/e-faktura-pre-zivnostnikov',
              tag: 'Paušálne výdavky? Áno, aj vás sa to týka.',
            },
            {
              icon: Building2,
              title: 'Malé a stredné firmy',
              desc: 'S.r.o., a.s. — všetci platitelia DPH musia prejsť na e-faktúru. Overte pripravenosť vášho softvéru.',
              href: '/e-faktura-pre-male-firmy',
              tag: 'Najčastejšia kategória — 100 000+ firiem.',
            },
            {
              icon: Calculator,
              title: 'Účtovníci & kancelárie',
              desc: 'Vaši klienti sa budú pýtať. Buďte pripravení poradiť s prechodom na e-fakturáciu.',
              href: '/e-faktura-pre-uctovnikov',
              tag: 'Nové povinnosti = nová služba pre klientov.',
            },
          ].map((card) => (
            <motion.div key={card.title} variants={staggerItem}>
              <Link href={card.href} className="group block h-full">
                <GlassCard className="flex h-full flex-col p-6 transition-all group-hover:border-[var(--accent)]/30">
                  <card.icon className="h-10 w-10 text-[var(--accent)]" />
                  <h3 className="mt-4 text-xl font-black text-[var(--text-primary)]">
                    {card.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-[var(--text-secondary)]">
                    {card.desc}
                  </p>
                  <p className="mt-3 text-xs italic text-[var(--text-muted)]">
                    {card.tag}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[var(--accent)] transition-transform group-hover:translate-x-1">
                    Zistiť viac <ArrowRight className="h-4 w-4" />
                  </span>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <SectionDivider label="" />

      {/* ════════════════════════════════════════════════════════
          SEKCIA 4: TIMELINE — Goal-Gradient + Zeigarnik Effect
          ════════════════════════════════════════════════════════ */}
      <Section id="timeline">
        <div className="text-center">
          <MonoLabel>Časová os</MonoLabel>
          <GradientHeading as="h2" className="mt-3">
            Kľúčové termíny
          </GradientHeading>
        </div>

        <div className="relative mt-12">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-px bg-[var(--border-default)] sm:left-1/2" />

          <div className="space-y-8">
            {timeline.filter((m) => m.major).map((milestone, i) => (
              <motion.div
                key={milestone.date}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex items-start gap-4 sm:gap-0 ${
                  i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 z-10 -translate-x-1/2 sm:left-1/2">
                  {milestone.status === 'completed' ? (
                    <CheckCircle2 className="h-6 w-6 rounded-full bg-[var(--bg-base)] text-[var(--color-success)]" />
                  ) : milestone.status === 'active' ? (
                    <div className="h-6 w-6 rounded-full border-2 border-[var(--accent)] bg-[var(--accent)]/20" />
                  ) : (
                    <Circle className="h-6 w-6 text-[var(--text-muted)]" />
                  )}
                </div>

                {/* Content */}
                <div className={`ml-10 w-full sm:ml-0 sm:w-1/2 ${
                  i % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'
                }`}>
                  <p className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
                    {new Date(milestone.date).toLocaleDateString('sk-SK', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <h3 className="mt-1 font-black text-[var(--text-primary)]">
                    {milestone.titleSk}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {milestone.descriptionSk}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <SectionDivider label="" />

      {/* ════════════════════════════════════════════════════════
          SEKCIA 5: AKO SA PRIPRAVIŤ — Activation Energy reduction
          ════════════════════════════════════════════════════════ */}
      <Section id="kroky">
        <div className="text-center">
          <MonoLabel>4 jednoduché kroky</MonoLabel>
          <GradientHeading as="h2" className="mt-3">
            Ako sa pripraviť na e-faktúru
          </GradientHeading>
          <p className="mx-auto mt-4 max-w-xl text-[var(--text-secondary)]">
            Nepotrebujete všetko naraz. Začnite prvým krokom ešte dnes.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { step: 1, title: 'Overte softvér', desc: 'Skontrolujte, či váš fakturačný program podporuje Peppol a XML formát EN 16931.', icon: Shield },
            { step: 2, title: 'Vyberte poštára', desc: 'Zo zoznamu certifikovaných digitálnych poštárov si vyberte poskytovateľa.', icon: Send },
            { step: 3, title: 'Registrujte sa', desc: 'Získajte Peppol ID registráciou u digitálneho poštára. Trvá 1-2 pracovné dni.', icon: Globe },
            { step: 4, title: 'Otestujte', desc: 'V dobrovoľnej fáze (2026) si vyskúšajte odosielanie a prijímanie e-faktúr.', icon: CheckCircle2 },
          ].map((item) => (
            <motion.div key={item.step} variants={staggerItem}>
              <GlassCard className="relative h-full p-6">
                <span className="absolute -top-4 left-4 z-10 flex h-8 w-8 items-center justify-center rounded-full font-mono text-sm font-black text-white shadow-lg" style={{ backgroundColor: 'var(--accent)', boxShadow: '0 0 12px var(--accent-glow)' }}>
                  {item.step}
                </span>
                <item.icon className="mt-4 h-6 w-6 text-[var(--accent)]" />
                <h3 className="mt-3 font-black text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  {item.desc}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 text-center">
          <Link
            href="/ako-sa-pripravit-na-e-fakturu"
            onClick={() => trackCTA('preparation-guide', '/')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)] transition-colors hover:underline"
          >
            Kompletný sprievodca prípravou <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <SectionDivider label="" />

      {/* ════════════════════════════════════════════════════════
          SEKCIA 6: SOFTVÉROVÁ PRIPRAVENOSŤ — Authority + Bandwagon
          ════════════════════════════════════════════════════════ */}
      <Section id="software">
        <div className="text-center">
          <MonoLabel>Integrácie</MonoLabel>
          <GradientHeading as="h2" className="mt-3">
            Je váš softvér pripravený?
          </GradientHeading>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topErp.map((erp) => (
            <Link key={erp.slug} href={`/integracie/${erp.slug}`} className="group">
              <GlassCard className="flex items-center justify-between p-4 transition-all group-hover:border-[var(--accent)]/30">
                <div>
                  <h3 className="font-black text-[var(--text-primary)]">{erp.name}</h3>
                  <p className="text-xs text-[var(--text-muted)]">{erp.vendor}</p>
                </div>
                <ReadinessBadge status={erp.peppolStatus} />
              </GlassCard>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/integracie"
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)] transition-colors hover:underline"
          >
            Všetkých {erpSystems.length} systémov <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <SectionDivider label="" />

      {/* ════════════════════════════════════════════════════════
          SEKCIA 7: FAQ — Uncertainty reduction + Rich Snippets
          ════════════════════════════════════════════════════════ */}
      <Section id="faq">
        <div className="text-center">
          <MonoLabel>Otázky a odpovede</MonoLabel>
          <GradientHeading as="h2" className="mt-3">
            Najčastejšie otázky o e-faktúre
          </GradientHeading>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          {homeFaq.map((item) => (
            <FaqAccordion
              key={item.id}
              question={item.questionSk}
              answer={item.answerSk}
            />
          ))}
        </div>

        {/* FAQPage JSON-LD for rich snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: homeFaq.map((item) => ({
                '@type': 'Question',
                name: item.questionSk,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.answerSk,
                },
              })),
            }),
          }}
        />

        <div className="mt-6 text-center">
          <Link
            href="/otazky"
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)] transition-colors hover:underline"
          >
            Všetky otázky a odpovede <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <SectionDivider label="" />

      {/* ════════════════════════════════════════════════════════
          SEKCIA 8: ŠTATISTIKY — Anchoring + Social Proof
          ════════════════════════════════════════════════════════ */}
      <Section id="stats">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid gap-8 sm:grid-cols-3"
        >
          {[
            { value: 100000, suffix: '+', label: 'firiem sa týka', prefix: '' },
            { value: 100000, suffix: ' EUR', label: 'maximálna pokuta', prefix: '' },
            { value: daysUntilDeadline, suffix: '', label: 'dní do termínu', prefix: '' },
          ].map((stat) => (
            <motion.div key={stat.label} variants={staggerItem} className="text-center">
              <p className="text-4xl font-black text-[var(--accent)] sm:text-5xl">
                {stat.prefix}
                <CountUp end={stat.value} duration={2} />
                {stat.suffix}
              </p>
              <p className="mt-2 font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <SectionDivider label="" />

      {/* ════════════════════════════════════════════════════════
          SEKCIA 9: NEWSLETTER CTA — Peak-End Rule + Reciprocity
          ════════════════════════════════════════════════════════ */}
      <Section id="newsletter">
        <div className="mx-auto max-w-xl text-center">
          <MonoLabel>Newsletter</MonoLabel>
          <GradientHeading as="h2" className="mt-3">
            Buďte vždy o krok vpred
          </GradientHeading>
          <p className="mt-4 text-[var(--text-secondary)]">
            Dostávajte aktuálne informácie o e-faktúre, legislatívnych zmenách
            a termínoch priamo do schránky. Zadarmo.
          </p>

          <div className="mt-8 flex justify-center">
            <NewsletterInline source="bottom-cta" />
          </div>

          <p className="mt-3 text-xs text-[var(--text-muted)]">
            Pridáva sa <strong>2 000+</strong> podnikateľov. Žiadny spam,
            kedykoľvek sa odhlásite.
          </p>
        </div>
      </Section>

      <SectionDivider label="" />

      {/* ════════════════════════════════════════════════════════
          SEKCIA 10: PARTNERI — Nudge (non-aggressive)
          ════════════════════════════════════════════════════════ */}
      <Section id="partners" className="py-12">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid gap-4 sm:grid-cols-3"
        >
          {[
            {
              title: 'Účtovná kancelária',
              desc: 'Profesionálne vedenie účtovníctva pre podnikateľov na Slovensku.',
              url: 'https://8888.sk',
              label: '8888.sk',
              icon: Calculator,
            },
            {
              title: 'Založenie s.r.o.',
              desc: 'Rýchle a jednoduché založenie firmy online.',
              url: 'https://sroihned.sk',
              label: 'sroihned.sk',
              icon: Building2,
            },
            {
              title: 'Digitálni poštári',
              desc: 'Kompletný zoznam a porovnanie certifikovaných digitálnych poštárov.',
              url: 'https://digitalnipostari.sk',
              label: 'digitalnipostari.sk',
              icon: Send,
            },
          ].map((partner) => (
            <motion.div key={partner.label} variants={staggerItem}>
              <a
                href={partner.url}
                target="_blank"
                rel="noopener"
                className="group block"
              >
                <GlassCard className="flex items-start gap-4 p-5 transition-all group-hover:border-[var(--accent)]/30">
                  <partner.icon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" />
                  <div>
                    <h3 className="font-bold text-[var(--text-primary)]">
                      {partner.title}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--text-secondary)]">
                      {partner.desc}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[var(--accent)]">
                      {partner.label} <ExternalLink className="h-3 w-3" />
                    </span>
                  </div>
                </GlassCard>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Footer />
      <ScrollToTop />
    </>
  );
}
