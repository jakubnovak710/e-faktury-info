import { Info } from 'lucide-react';
import Link from 'next/link';

interface ContentDisclaimerProps {
  variant: 'article' | 'inline';
}

export function ContentDisclaimer({ variant }: ContentDisclaimerProps) {
  if (variant === 'inline') {
    return (
      <p
        className="my-4 text-xs italic"
        style={{ color: 'var(--text-muted)' }}
      >
        Uvedené sumy vychádzajú z platnej legislatívy. Pre posúdenie Vašej
        konkrétnej situácie kontaktujte{' '}
        <a
          href="https://www.sak.sk/web/cms/Zoznamy/Advokati"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          style={{ color: 'var(--text-secondary)' }}
        >
          advokáta
        </a>
        .
      </p>
    );
  }

  return (
    <p
      className="flex flex-wrap items-start gap-1.5 text-xs leading-relaxed"
      style={{ color: 'var(--text-muted)' }}
    >
      <Info
        className="mt-0.5 h-3.5 w-3.5 shrink-0"
        style={{ color: 'var(--text-muted)' }}
      />
      <span>
        Tento obsah slúži výlučne na informačné a vzdelávacie účely.
        Prevádzkovateľ nie je advokátska kancelária ani poskytovateľ právnych
        služieb v zmysle{' '}
        <Link href="/obchodne-podmienky" className="underline" style={{ color: 'var(--text-secondary)' }}>
          zákona č.&nbsp;586/2003&nbsp;Z.z.
        </Link>{' '}
        Informácie vychádzajú z verejne dostupných zdrojov a ich úplnosť ani
        aktuálnosť nie je garantovaná. Pre záväzné právne posúdenie sa obráťte
        na{' '}
        <a
          href="https://www.sak.sk/web/cms/Zoznamy/Advokati"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          style={{ color: 'var(--text-secondary)' }}
        >
          advokáta zapísaného v&nbsp;zozname SAK
        </a>
        .
      </span>
    </p>
  );
}
