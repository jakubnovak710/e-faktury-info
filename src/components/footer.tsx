'use client';

import Link from 'next/link';
import {
  FileText,
  ExternalLink,
  Building2,
  Mail,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { NewsletterForm } from '@/components/forms/newsletter-form';

/* ── Types ────────────────────────────────────────────── */

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

/* ── Data ─────────────────────────────────────────────── */

const footerColumns: FooterColumn[] = [
  {
    title: 'Sprievodca',
    links: [
      { label: 'Čo je e-faktúra', href: '/co-je-e-faktura' },
      { label: 'Kedy začne platiť', href: '/kedy-zacne-platit-e-faktura' },
      { label: 'Ako sa pripraviť', href: '/ako-sa-pripravit-na-e-fakturu' },
      { label: 'Pokuty a sankcie', href: '/pokuty-za-e-fakturu' },
    ],
  },
  {
    title: 'Pre koho',
    links: [
      { label: 'Pre živnostníkov', href: '/e-faktura-pre-zivnostnikov' },
      { label: 'Pre malé firmy', href: '/e-faktura-pre-male-firmy' },
      { label: 'Pre účtovníkov', href: '/e-faktura-pre-uctovnikov' },
      { label: 'Odvetvia', href: '/odvetvia' },
    ],
  },
  {
    title: 'Nástroje',
    links: [
      { label: 'Integrácie', href: '/integracie' },
      { label: 'Slovník pojmov', href: '/slovnik' },
      { label: 'Otázky a odpovede', href: '/otazky' },
    ],
  },
  {
    title: 'Partnerské weby',
    links: [
      { label: '8888.sk', href: 'https://8888.sk', external: true },
      { label: 'sroihned.sk', href: 'https://sroihned.sk', external: true },
      { label: 'digitalnipostari.sk', href: 'https://digitalnipostari.sk', external: true },
    ],
  },
];

const legalLinks: FooterLink[] = [
  { label: 'Ochrana súkromia', href: '/ochrana-sukromia' },
  { label: 'Obchodné podmienky', href: '/obchodne-podmienky' },
];

/* ── Helpers ──────────────────────────────────────────── */

function FooterNavLink({ link }: { link: FooterLink }) {
  const className =
    'inline-flex items-center gap-1.5 text-sm transition-colors duration-200';

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={{ color: 'var(--text-secondary)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--accent)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--text-secondary)';
        }}
      >
        {link.label}
        <ExternalLink className="h-3 w-3 shrink-0 opacity-60" />
      </a>
    );
  }

  return (
    <Link
      href={link.href}
      className={className}
      style={{ color: 'var(--text-secondary)' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--accent)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--text-secondary)';
      }}
    >
      {link.label}
    </Link>
  );
}

/* ── Main Footer Component ────────────────────────────── */

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-base)',
        borderTop: '1px solid var(--border-default)',
      }}
    >
      {/* ── Section 1: Main Footer ─────────────────────── */}
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          {/* Left column — Brand + Newsletter */}
          <div className="space-y-6">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: 'var(--accent)',
                  boxShadow: '0 0 12px var(--accent-glow)',
                }}
              >
                <FileText className="h-3.5 w-3.5" style={{ color: 'var(--bg-base)' }} />
              </div>
              <span
                className="text-lg font-black tracking-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                e-Faktúry.info
              </span>
            </Link>

            {/* Description */}
            <p className="max-w-sm text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Kompletný sprievodca elektronickou fakturáciou na Slovensku.
              Všetko o povinnej e-faktúre od 1.1.2027 — legislatíva, príprava,
              Peppol, digitálni poštári.
            </p>

            {/* Newsletter */}
            <div className="max-w-sm space-y-2">
              <NewsletterForm />
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Žiadny spam. Kedykoľvek sa odhlásite.
              </p>
            </div>
          </div>

          {/* Right side — 4 nav columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p
                  className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {column.title}
                </p>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <FooterNavLink link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section 2: Operator Card ───────────────────── */}
      <div style={{ borderTop: '1px solid var(--border-default)' }}>
        <div className="mx-auto max-w-6xl px-6 py-8">
          <p
            className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ color: 'var(--text-muted)' }}
          >
            Prevádzkuje
          </p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-start gap-4 rounded-xl px-6 py-4"
            style={{
              backgroundColor: 'var(--fill-subtle)',
              border: '1px solid var(--border-default)',
            }}
          >
            <Building2
              className="mt-0.5 h-5 w-5 shrink-0"
              style={{ color: 'var(--text-muted)' }}
            />
            <div className="space-y-1">
              <p className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>
                8888 Servis s.r.o.
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                IČO: 55609830 · Košice
              </p>
              <a
                href="mailto:hello@jakubnovak.dev"
                className="inline-flex items-center gap-1.5 text-xs transition-colors duration-200"
                style={{ color: 'var(--accent)' }}
              >
                <Mail className="h-3 w-3" />
                hello@jakubnovak.dev
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Section 3: Bottom Bar ──────────────────────── */}
      <div style={{ borderTop: '1px solid var(--border-default)' }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 sm:flex-row">
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            &copy; {new Date().getFullYear()} e-Faktúry.info (8888 Servis s.r.o.)
          </p>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs transition-colors duration-200"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)';
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section 4: Credit Bar ──────────────────────── */}
      <div style={{ borderTop: '1px solid var(--border-default)' }}>
        <div className="mx-auto max-w-6xl px-6 py-4">
          <p
            className="flex items-center justify-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ color: 'var(--text-muted)' }}
          >
            <ChevronRight className="h-3 w-3" />
            <span>Design &amp; Dev by</span>
            <a
              href="https://boostello.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              Boostello.com
            </a>
            <span style={{ color: 'var(--border-default)' }}>&times;</span>
            <a
              href="https://jakubnovak.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              JakubNovak.dev
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
