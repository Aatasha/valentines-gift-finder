'use client';

import { useEffect, useState } from 'react';

// Valentine's Day 2026
const VALENTINES_DAY = new Date('2026-02-14T00:00:00');

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function calculateTime(): CountdownState {
  const now = new Date();
  const diff = VALENTINES_DAY.getTime() - now.getTime();

  if (diff < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isPast: false };
}

export function ValentineCountdown() {
  const [countdown, setCountdown] = useState<CountdownState>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCountdown(calculateTime());

    // Update every second for live countdown
    const interval = setInterval(() => {
      setCountdown(calculateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Don't render until mounted (avoid hydration mismatch)
  if (!mounted) {
    return null;
  }

  // Don't show if Valentine's Day has passed
  if (countdown.isPast) {
    return null;
  }

  // Urgency tiers with different styling
  const getUrgencyConfig = () => {
    if (countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0) {
      return {
        urgent: true,
        bgClass: 'bg-[var(--burgundy)]',
        textClass: 'text-white',
        iconClass: 'text-white',
      };
    }
    if (countdown.days <= 1) {
      return {
        urgent: true,
        bgClass: 'bg-[var(--burgundy)]',
        textClass: 'text-white',
        iconClass: 'text-white',
      };
    }
    if (countdown.days <= 3) {
      return {
        urgent: true,
        bgClass: 'bg-[var(--burgundy)]/90',
        textClass: 'text-white',
        iconClass: 'text-white',
      };
    }
    if (countdown.days <= 7) {
      return {
        urgent: false,
        bgClass: 'bg-[var(--gold)]/20',
        textClass: 'text-[var(--cream)]',
        iconClass: 'text-[var(--gold)]',
      };
    }
    return {
      urgent: false,
      bgClass: 'bg-[var(--cream)]/10',
      textClass: 'text-[var(--cream)]',
      iconClass: 'text-[var(--gold)]',
    };
  };

  const config = getUrgencyConfig();
  const { days, hours, minutes, seconds } = countdown;

  // Format numbers with leading zeros
  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className={`${config.bgClass} rounded-2xl px-5 py-3 inline-flex items-center gap-4 backdrop-blur-sm`}>
      <svg
        className={`w-7 h-7 ${config.iconClass}`}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-label="Valentine's countdown"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      <div className="flex items-center gap-3">
        <div className="text-center">
          <div className={`text-2xl font-bold tabular-nums ${config.textClass}`}>{days}</div>
          <div className={`text-xs ${config.textClass} opacity-70`}>days</div>
        </div>
        <span className={`text-xl font-bold ${config.textClass} opacity-50`}>:</span>
        <div className="text-center">
          <div className={`text-2xl font-bold tabular-nums ${config.textClass}`}>{pad(hours)}</div>
          <div className={`text-xs ${config.textClass} opacity-70`}>hrs</div>
        </div>
        <span className={`text-xl font-bold ${config.textClass} opacity-50`}>:</span>
        <div className="text-center">
          <div className={`text-2xl font-bold tabular-nums ${config.textClass}`}>{pad(minutes)}</div>
          <div className={`text-xs ${config.textClass} opacity-70`}>min</div>
        </div>
        <span className={`text-xl font-bold ${config.textClass} opacity-50`}>:</span>
        <div className="text-center">
          <div className={`text-2xl font-bold tabular-nums ${config.textClass}`}>{pad(seconds)}</div>
          <div className={`text-xs ${config.textClass} opacity-70`}>sec</div>
        </div>
      </div>
    </div>
  );
}
