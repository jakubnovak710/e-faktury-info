'use client';

import { useState } from 'react';
import { sanitizeInput } from '@jakubnovak710/universal-web-core/lib/security/sanitize';

interface ContactFormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export function ContactForm() {
  const [state, setState] = useState<ContactFormState>({ status: 'idle', message: '' });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ status: 'loading', message: '' });

    const formData = new FormData(e.currentTarget);
    const data = {
      name: sanitizeInput(formData.get('name') as string),
      email: sanitizeInput(formData.get('email') as string),
      message: sanitizeInput(formData.get('message') as string),
    };

    try {
      const csrfToken = document.cookie
        .split('; ')
        .find((c) => c.startsWith('__csrf='))
        ?.split('=')[1] ?? '';

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Odoslanie zlyhalo');

      setState({ status: 'success', message: 'Správa bola odoslaná. Ďakujeme!' });
      e.currentTarget.reset();
    } catch {
      setState({ status: 'error', message: 'Nepodarilo sa odoslať. Skúste znova.' });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-wider"
          style={{ color: 'var(--text-muted)' }}
        >
          Meno
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all focus:ring-2"
          style={{
            backgroundColor: 'var(--fill-subtle)',
            border: '1px solid var(--border-default)',
            color: 'var(--text-primary)',
            '--tw-ring-color': 'var(--accent)',
          } as React.CSSProperties}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-wider"
          style={{ color: 'var(--text-muted)' }}
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all focus:ring-2"
          style={{
            backgroundColor: 'var(--fill-subtle)',
            border: '1px solid var(--border-default)',
            color: 'var(--text-primary)',
            '--tw-ring-color': 'var(--accent)',
          } as React.CSSProperties}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-wider"
          style={{ color: 'var(--text-muted)' }}
        >
          Správa
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition-all focus:ring-2"
          style={{
            backgroundColor: 'var(--fill-subtle)',
            border: '1px solid var(--border-default)',
            color: 'var(--text-primary)',
            '--tw-ring-color': 'var(--accent)',
          } as React.CSSProperties}
        />
      </div>

      <button
        type="submit"
        disabled={state.status === 'loading'}
        className="w-full rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
        style={{
          background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))',
        }}
      >
        {state.status === 'loading' ? 'Odosiela sa...' : 'Odoslať správu'}
      </button>

      {state.message && (
        <p
          className="text-center text-sm"
          style={{ color: state.status === 'success' ? 'var(--success)' : 'var(--error)' }}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
