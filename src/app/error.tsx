'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to console in development, Sentry captures in production
    console.error('[Error Boundary]', error);
  }, [error]);

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-6 px-6"
      style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}
    >
      <div
        className="flex h-16 w-16 items-center justify-center rounded-2xl"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--error) 15%, transparent)',
          border: '1px solid color-mix(in srgb, var(--error) 30%, transparent)',
        }}
      >
        <span className="text-2xl">!</span>
      </div>
      <h2 className="text-xl font-black">Niečo sa pokazilo</h2>
      <p className="max-w-md text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
        Nastala neočakávaná chyba. Náš tím bol automaticky notifikovaný a pracuje na oprave.
      </p>
      <button
        onClick={reset}
        className="rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:scale-105 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
        }}
      >
        Skúsiť znova
      </button>
    </div>
  );
}
