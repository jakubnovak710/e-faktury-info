import { siteConfig } from '@config/site.config';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={`px-6 py-6 text-center ${className ?? ''}`}
      style={{ borderTop: '1px solid var(--border-subtle)' }}
    >
      <p
        className="font-mono text-[10px] uppercase tracking-[0.15em]"
        style={{ color: 'var(--text-faint)' }}
      >
        {siteConfig.name} · {new Date().getFullYear()} · {siteConfig.creator}
      </p>
    </footer>
  );
}
