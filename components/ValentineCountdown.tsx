'use client';

import { useEffect, useState } from 'react';

// Valentine's Day 2025
const VALENTINES_DAY = new Date('2025-02-14T00:00:00');

interface CountdownState {
  days: number;
  isPast: boolean;
}

function calculateDays(): CountdownState {
  const now = new Date();
  const diff = VALENTINES_DAY.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return {
    days: Math.max(0, days),
    isPast: days < 0,
  };
}

export function ValentineCountdown() {
  const [countdown, setCountdown] = useState<CountdownState>({ days: 0, isPast: false });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCountdown(calculateDays());

    // Update at midnight
    const interval = setInterval(() => {
      setCountdown(calculateDays());
    }, 60000); // Check every minute

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
    if (countdown.days === 0) {
      return {
        icon: '💝',
        message: "It's Valentine's Day!",
        subtext: 'Make it special',
        bgClass: 'bg-[var(--burgundy)]',
        textClass: 'text-white',
        subtextClass: 'text-white/80',
      };
    }
    if (countdown.days === 1) {
      return {
        icon: '⚡',
        message: 'Tomorrow is Valentine\'s Day!',
        subtext: 'Order now for same-day delivery',
        bgClass: 'bg-[var(--burgundy)]',
        textClass: 'text-white',
        subtextClass: 'text-white/80',
      };
    }
    if (countdown.days <= 3) {
      return {
        icon: '🔥',
        message: `Only ${countdown.days} days left!`,
        subtext: 'Order soon to guarantee delivery',
        bgClass: 'bg-[var(--burgundy)]/90',
        textClass: 'text-white',
        subtextClass: 'text-white/70',
      };
    }
    if (countdown.days <= 7) {
      return {
        icon: '💕',
        message: `${countdown.days} days until Valentine's Day`,
        subtext: 'Still time for the perfect gift',
        bgClass: 'bg-[var(--gold)]/20',
        textClass: 'text-[var(--cream)]',
        subtextClass: 'text-[var(--cream)]/70',
      };
    }
    return {
      icon: '❤️',
      message: `${countdown.days} days until Valentine's Day`,
      subtext: 'Find their perfect gift',
      bgClass: 'bg-[var(--cream)]/10',
      textClass: 'text-[var(--cream)]',
      subtextClass: 'text-[var(--cream)]/60',
    };
  };

  const config = getUrgencyConfig();

  return (
    <div className={`${config.bgClass} rounded-full px-6 py-2 inline-flex items-center gap-3 backdrop-blur-sm`}>
      <span className="text-xl" role="img" aria-label="heart">
        {config.icon}
      </span>
      <div className="text-left">
        <p className={`font-semibold ${config.textClass}`}>
          {config.message}
        </p>
        <p className={`text-xs ${config.subtextClass}`}>
          {config.subtext}
        </p>
      </div>
    </div>
  );
}
