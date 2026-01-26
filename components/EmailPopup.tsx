'use client';

import { useState, useEffect } from 'react';

interface EmailPopupProps {
  // Quiz context to pass as tags
  recipient?: string;
  budget?: string;
  personality?: string;
  // Trigger settings
  delaySeconds?: number;
  scrollPercentage?: number;
}

const STORAGE_KEY = 'vgf-email-popup-dismissed';

export function EmailPopup({
  recipient,
  budget,
  personality,
  delaySeconds = 12,
  scrollPercentage = 40,
}: EmailPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Don't show if already dismissed or submitted
    if (typeof window !== 'undefined') {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (dismissed) return;
    }

    let hasTriggered = false;

    const triggerPopup = () => {
      if (hasTriggered) return;
      hasTriggered = true;
      setIsVisible(true);
    };

    // Time delay trigger
    const timer = setTimeout(triggerPopup, delaySeconds * 1000);

    // Scroll depth trigger
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrolled / docHeight) * 100;

      if (scrollPercent >= scrollPercentage) {
        triggerPopup();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [delaySeconds, scrollPercentage]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

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
        localStorage.setItem(STORAGE_KEY, 'true');
        // Auto-close after success
        setTimeout(() => setIsVisible(false), 2500);
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

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleDismiss}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-xl bg-[var(--background)] border border-[var(--gold)]/30 p-6 shadow-2xl">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-[var(--cream)]/50 hover:text-[var(--cream)] transition-colors"
          aria-label="Close"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
            <path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {status === 'success' ? (
          <div className="text-center py-4">
            <div className="mb-4 flex justify-center">
              <div className="h-16 w-16 rounded-full bg-[var(--gold)]/20 flex items-center justify-center">
                <svg className="h-8 w-8 text-[var(--gold)]" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13 L10 18 L19 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h3 className="font-serif text-xl font-semibold text-[var(--cream)]">
              You're all set!
            </h3>
            <p className="mt-2 text-[var(--cream)]/70">
              Check your inbox soon.
            </p>
          </div>
        ) : (
          <>
            {/* Heart icon */}
            <div className="flex justify-center mb-4">
              <div className="h-14 w-14 rounded-full bg-[var(--gold)]/20 flex items-center justify-center">
                <svg className="h-7 w-7 text-[var(--gold)]" viewBox="0 0 24 24" fill="none">
                  <path d="M12 20 C7 15, 2 12, 2 7 C2 3, 6 2, 12 8 C18 2, 22 3, 22 7 C22 12, 17 15, 12 20" fill="currentColor"/>
                </svg>
              </div>
            </div>

            <h3 className="font-serif text-xl font-semibold text-[var(--cream)] text-center mb-2">
              Want to make it unforgettable?
            </h3>
            <p className="text-sm text-[var(--cream)]/70 text-center mb-5">
              Get your gift matches + our free "Beyond the Gift" guide with tips to make Valentine's Day special.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-lg border-2 border-[var(--cream)]/20 bg-[var(--cream)]/5 px-4 py-3 text-[var(--cream)] placeholder-[var(--cream)]/40 focus:border-[var(--gold)] focus:outline-none"
                disabled={status === 'loading'}
                autoFocus
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-lg bg-[var(--gold)] py-3 font-medium text-[var(--burgundy-dark)] transition-colors hover:bg-[var(--gold-light)] disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : 'Send My Gift Ideas'}
              </button>
            </form>

            {status === 'error' && errorMessage && (
              <p className="mt-2 text-sm text-red-400 text-center">{errorMessage}</p>
            )}

            <p className="mt-3 text-xs text-[var(--cream)]/40 text-center">
              Unsubscribe anytime.{' '}
              <a href="/privacy" className="underline hover:text-[var(--cream)]/60">Privacy Policy</a>
            </p>

            <button
              onClick={handleDismiss}
              className="w-full mt-2 text-sm text-[var(--cream)]/50 hover:text-[var(--cream)]/70 transition-colors"
            >
              No thanks, I'll remember them
            </button>
          </>
        )}
      </div>
    </div>
  );
}
