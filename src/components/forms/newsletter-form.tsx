'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import { sanitizeInput } from '@jakubnovak710/universal-web-core/lib/security/sanitize';
import { legalConfig } from '@config/legal.config';

interface NewsletterState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export function NewsletterForm() {
  const [state, setState] = useState<NewsletterState>({ status: 'idle', message: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [consent, setConsent] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  /* ── Close on Escape ─────────────────────────────────── */
  useEffect(() => {
    if (!modalOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setModalOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [modalOpen]);

  /* ── Focus trap ──────────────────────────────────────── */
  useEffect(() => {
    if (!modalOpen) return;
    modalRef.current?.querySelector<HTMLInputElement>('input[type="checkbox"]')?.focus();
  }, [modalOpen]);

  /* ── Open modal with email ───────────────────────────── */
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = sanitizeInput(formData.get('email') as string);
    setPendingEmail(email);
    setConsent(false);
    setModalOpen(true);
  }

  /* ── Submit with consent ─────────────────────────────── */
  const handleConfirm = useCallback(async () => {
    if (!consent) return;
    setModalOpen(false);
    setState({ status: 'loading', message: '' });

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
        body: JSON.stringify({
          email: pendingEmail,
          consentNewsletter: true,
          consentVersion: legalConfig.consentVersion,
        }),
      });

      if (!res.ok) throw new Error('Prihlásenie zlyhalo');

      setState({ status: 'success', message: 'Ďakujeme za prihlásenie!' });
      formRef.current?.reset();
    } catch {
      setState({ status: 'error', message: 'Nepodarilo sa prihlásiť. Skúste znova.' });
    }
  }, [consent, pendingEmail]);

  return (
    <>
      <form ref={formRef} onSubmit={handleFormSubmit} className="flex gap-2">
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
          {state.status === 'loading' ? '...' : 'Odoberať'}
        </button>
      </form>

      {state.status !== 'idle' && (
        <p
          className="mt-1 text-xs"
          style={{ color: state.status === 'success' ? 'var(--success)' : 'var(--error)' }}
        >
          {state.message}
        </p>
      )}

      {/* ── Consent Modal ────────────────────────────────── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="newsletter-consent-title"
        >
          <div
            ref={modalRef}
            className="relative w-full max-w-md rounded-2xl p-6 shadow-2xl"
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 rounded-lg p-1 transition-colors"
              style={{ color: 'var(--text-muted)' }}
              aria-label="Zavrieť"
            >
              <X className="h-4 w-4" />
            </button>

            <h3
              id="newsletter-consent-title"
              className="mb-4 text-lg font-black"
              style={{ color: 'var(--text-primary)' }}
            >
              Prihlásenie na newsletter
            </h3>

            <p className="mb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Budeme vám zasielať novinky o e-fakturácii na Slovensku. Newsletter
              môže obsahovať aj sponzorovaný obsah od partnerských spoločností.
            </p>

            {/* Consent checkbox */}
            <label className="mb-5 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded"
                style={{ accentColor: 'var(--accent)' }}
              />
              <span className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Súhlasím so spracúvaním mojej e-mailovej adresy za účelom
                zasielania newslettera o e-fakturácii, ktorý môže obsahovať aj
                obchodné oznámenia tretích strán. Súhlas môžem kedykoľvek
                odvolať kliknutím na odkaz &bdquo;odhlásiť sa&ldquo; v každom
                newsletteri.
              </span>
            </label>

            <p className="mb-5 text-xs" style={{ color: 'var(--text-muted)' }}>
              Podrobnosti v{' '}
              <Link
                href="/ochrana-sukromia"
                className="underline transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onClick={() => setModalOpen(false)}
              >
                Zásadách ochrany súkromia
              </Link>
              .
            </p>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors"
                style={{
                  backgroundColor: 'var(--fill-subtle)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-default)',
                }}
              >
                Zrušiť
              </button>
              <button
                onClick={handleConfirm}
                disabled={!consent}
                className="flex-1 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition-all disabled:opacity-40"
                style={{
                  background: consent
                    ? 'linear-gradient(135deg, var(--accent), var(--accent-secondary))'
                    : 'var(--fill-subtle)',
                  color: consent ? 'white' : 'var(--text-muted)',
                }}
              >
                Prihlásiť sa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
