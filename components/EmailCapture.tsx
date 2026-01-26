'use client';

import { useState } from 'react';

interface EmailCaptureProps {
  // Quiz context to pass as tags
  recipient?: string;
  budget?: string;
  personality?: string;
}

export function EmailCapture({ recipient, budget, personality }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          recipient,
          budget,
          personality,
        }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Something went wrong');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Something went wrong');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-lg bg-[var(--cream)]/10 border border-[var(--gold)]/30 p-6 text-center">
        <div className="mb-3 flex justify-center">
          <svg className="h-12 w-12 text-[var(--gold)]" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2"/>
            <path d="M16 24 L22 30 L32 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="font-serif text-xl font-semibold text-[var(--cream)]">
          You're all set!
        </h3>
        <p className="mt-2 text-[var(--cream)]/70">
          Check your inbox for gift ideas and Valentine's inspiration.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-[var(--cream)]/10 border border-[var(--gold)]/30 p-6">
      <div className="text-center mb-4">
        <h3 className="font-serif text-xl font-semibold text-[var(--cream)]">
          Get our free Valentine's Guide
        </h3>
        <p className="mt-1 text-sm text-[var(--cream)]/70">
          Your gift matches + our "Beyond the Gift" tips to make Valentine's Day unforgettable.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 rounded-lg border-2 border-[var(--cream)]/20 bg-[var(--cream)]/5 px-4 py-3 text-[var(--cream)] placeholder-[var(--cream)]/40 focus:border-[var(--gold)] focus:outline-none"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-lg bg-[var(--gold)] px-6 py-3 font-medium text-[var(--burgundy-dark)] transition-colors hover:bg-[var(--gold-light)] disabled:opacity-50"
        >
          {status === 'loading' ? 'Sending...' : 'Send to me'}
        </button>
      </form>

      {status === 'error' && errorMessage && (
        <p className="mt-2 text-sm text-red-400 text-center">{errorMessage}</p>
      )}

      <p className="mt-3 text-xs text-[var(--cream)]/50 text-center">
        No spam, just gift inspiration. Unsubscribe anytime.{' '}
        <a href="/privacy" className="underline hover:text-[var(--cream)]/70">Privacy Policy</a>
      </p>
    </div>
  );
}
