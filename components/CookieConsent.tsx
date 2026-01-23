"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay to prevent flash on page load
      const timer = setTimeout(() => setShowBanner(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[var(--burgundy-dark)] border-t border-[var(--gold)]/30 shadow-lg">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-[var(--cream)]/90 text-center sm:text-left">
          <p>
            We use cookies to improve your experience and for affiliate tracking.
            By continuing to use this site, you consent to our use of cookies.{" "}
            <Link
              href="/privacy"
              className="underline text-[var(--gold)] hover:text-[var(--gold)]/80"
            >
              Learn more
            </Link>
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={declineCookies}
            className="px-4 py-2 text-sm text-[var(--cream)]/70 hover:text-[var(--cream)] transition-colors"
          >
            Decline
          </button>
          <button
            onClick={acceptCookies}
            className="px-6 py-2 text-sm bg-[var(--gold)] text-[var(--burgundy-dark)] rounded-full font-medium hover:bg-[var(--gold)]/90 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
