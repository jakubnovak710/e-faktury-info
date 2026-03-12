'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-xl transition-all hover:scale-110 active:scale-95"
      style={{
        backgroundColor: 'var(--glass-bg)',
        backdropFilter: 'blur(8px)',
        border: '1px solid var(--border-default)',
        color: 'var(--text-muted)',
      }}
      aria-label="Scrollovať nahor"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
