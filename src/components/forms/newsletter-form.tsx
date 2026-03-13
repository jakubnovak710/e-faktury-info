'use client';

import { useState } from 'react';
import { sanitizeInput } from '@jakubnovak710/universal-web-core/lib/security/sanitize';

interface NewsletterState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export function NewsletterForm() {
  const [state, setState] = useState<NewsletterState>({ status: 'idle', message: '' });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ status: 'loading', message: '' });

    const formData = new FormData(e.currentTarget);
    const email = sanitizeInput(formData.get('email') as string);

    try {
      const csrfToken = document.cookie
        .split('; ')
        .find((c) => c.startsWith('__csrf='))
        ?.split('=')[1] ?? '';

      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Prihlásenie zlyhalo');

      setState({ status: 'success', message: 'Ďakujeme za prihlásenie!' });
      e.currentTarget.reset();
    } catch {
      setState({ status: 'error', message: 'Nepodarilo sa prihlásiť. Skúste znova.' });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        name="email"
        type="email"
        required
        placeholder="vas@email.sk"
        className="flex-1 rounded-xl px-4 py-3 text-sm outline-none transition-all focus:ring-2"
        style={{
          backgroundColor: 'var(--fill-subtle)',
          border: '1px solid var(--border-default)',
          color: 'var(--text-primary)',
          '--tw-ring-color': 'var(--accent)',
        } as React.CSSProperties}
      />
      <button
        type="submit"
        disabled={state.status === 'loading'}
        className="shrink-0 rounded-xl px-5 py-3 text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
        style={{
          background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
        }}
      >
        {state.status === 'loading' ? '...' : 'Prihlásiť'}
      </button>
      {state.status !== 'idle' && (
        <p
          className="self-center text-xs"
          style={{ color: state.status === 'success' ? 'var(--success)' : 'var(--error)' }}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
