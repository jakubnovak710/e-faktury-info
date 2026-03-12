import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-6 px-6"
      style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}
    >
      <div
        className="flex h-16 w-16 items-center justify-center rounded-2xl"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)',
          border: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)',
        }}
      >
        <span className="text-2xl font-black" style={{ color: 'var(--accent)' }}>
          404
        </span>
      </div>
      <h2 className="text-xl font-black">Stránka nenájdená</h2>
      <p className="max-w-md text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
        Stránka ktorú hľadáte neexistuje alebo bola presunutá.
      </p>
      <Link
        href="/"
        className="rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:scale-105 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
        }}
      >
        Späť na hlavnú
      </Link>
    </div>
  );
}
