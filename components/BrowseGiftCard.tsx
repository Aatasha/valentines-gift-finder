import { type ReactNode } from 'react';
import Link from 'next/link';
import type { Gift } from '@/lib/types';
import { getPriceLabel } from '@/lib/gifts';
import { getRetailerSearchUrl } from '@/lib/retailers';

interface BrowseGiftCardProps {
  gift: Gift;
}

// Map vibes to accent colors for visual distinction
const vibeAccents: Record<string, string> = {
  romantic: 'border-l-[var(--burgundy)]',
  practical: 'border-l-[var(--gold)]',
  experiential: 'border-l-[var(--burgundy-light)]',
  funny: 'border-l-[var(--gold-light)]',
};

// Map vibes to background colors for image placeholder
const vibeBackgrounds: Record<string, string> = {
  romantic: 'bg-[var(--burgundy)]/10',
  practical: 'bg-[var(--gold)]/10',
  experiential: 'bg-[var(--burgundy-light)]/10',
  funny: 'bg-[var(--gold-light)]/10',
};

// Category icons for each vibe - displayed in card header
const vibeIcons: Record<string, ReactNode> = {
  romantic: (
    <svg className="h-14 w-14" viewBox="0 0 56 56" fill="none">
      <path d="M28 46 C20 38, 8 34, 8 20 C8 10, 16 8, 28 20 C40 8, 48 10, 48 20 C48 34, 36 38, 28 46" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M18 16 C21 11, 26 10, 28 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  practical: (
    <svg className="h-14 w-14" viewBox="0 0 56 56" fill="none">
      <path d="M28 10 L28 20 M18 28 L8 28 M38 28 L48 28 M28 36 L28 46" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="28" cy="28" r="10" stroke="currentColor" strokeWidth="2"/>
      <circle cx="28" cy="28" r="4" fill="currentColor"/>
    </svg>
  ),
  experiential: (
    <svg className="h-14 w-14" viewBox="0 0 56 56" fill="none">
      <rect x="8" y="14" width="40" height="28" rx="3" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 24 L48 24" stroke="currentColor" strokeWidth="2"/>
      <path d="M18 14 L18 42 M38 14 L38 42" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3"/>
      <circle cx="28" cy="33" r="5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  funny: (
    <svg className="h-14 w-14" viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="18" stroke="currentColor" strokeWidth="2"/>
      <circle cx="20" cy="24" r="3" fill="currentColor"/>
      <circle cx="36" cy="24" r="3" fill="currentColor"/>
      <path d="M18 34 C22 40, 34 40, 38 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
};

// Small inline icons for title area (16px)
const vibeTitleIcons: Record<string, ReactNode> = {
  romantic: (
    <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
      <path d="M8 14 C5 11, 2 9, 2 5 C2 2, 4 1, 8 5 C12 1, 14 2, 14 5 C14 9, 11 11, 8 14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  practical: (
    <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="8" cy="8" r="2" fill="currentColor"/>
    </svg>
  ),
  experiential: (
    <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="4" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 7 L14 7" stroke="currentColor" strokeWidth="1"/>
    </svg>
  ),
  funny: (
    <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="6" cy="7" r="1" fill="currentColor"/>
      <circle cx="10" cy="7" r="1" fill="currentColor"/>
      <path d="M5 10 C6 12, 10 12, 11 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  ),
};

export function BrowseGiftCard({ gift }: BrowseGiftCardProps) {
  const primaryVibe = gift.vibe[0];
  const accentClass = vibeAccents[primaryVibe] || 'border-l-[var(--burgundy)]';
  const bgClass = vibeBackgrounds[primaryVibe] || 'bg-[var(--burgundy)]/10';

  const searchUrl = getRetailerSearchUrl('amazon', gift.name);

  // Get the vibe icon (fallback to romantic)
  const getVibeIcon = () => vibeIcons[primaryVibe] || vibeIcons['romantic'];
  const getTitleIcon = () => vibeTitleIcons[primaryVibe] || vibeTitleIcons['romantic'];

  return (
    <div className={`group bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[var(--gold)] border-l-4 ${accentClass}`}>
      {/* Image placeholder area with vibe icon */}
      <Link href={`/gifts/${gift.id}`} className="block">
        <div className={`h-40 ${bgClass} flex items-center justify-center relative overflow-hidden`}>
          {/* Vibe-specific icon */}
          <div className="text-[var(--burgundy)]/25 group-hover:text-[var(--burgundy)]/35 transition-colors">
            {getVibeIcon()}
          </div>
          {/* Corner flourish */}
          <svg className="absolute top-2 right-2 h-6 w-6 text-[var(--gold)]/30" viewBox="0 0 24 24" fill="none">
            <path d="M20 4 C16 4, 14 6, 14 10 M4 20 C4 16, 6 14, 10 14" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>
      </Link>

      {/* Clickable area for gift details */}
      <Link href={`/gifts/${gift.id}`} className="block p-5">
        {/* Gift name with vibe icon */}
        <div className="flex items-start gap-2">
          <span className="text-[var(--burgundy)] mt-1">
            {getTitleIcon()}
          </span>
          <h3 className="font-serif text-lg font-semibold text-[var(--charcoal)] group-hover:text-[var(--burgundy)] transition-colors line-clamp-2">
            {gift.name}
          </h3>
        </div>

        {/* Description */}
        <p className="mt-2 text-sm text-[var(--charcoal-light)] line-clamp-2">
          {gift.description}
        </p>

        {/* Price and vibe */}
        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-[var(--cream-dark)] px-3 py-1 text-sm font-medium text-[var(--burgundy)]">
            {getPriceLabel(gift.priceRange)}
          </span>

          <span className="text-xs text-[var(--charcoal-light)] capitalize tracking-wide">
            {gift.vibe[0]}
          </span>
        </div>
      </Link>

      {/* Buy on Amazon button */}
      <div className="px-5 pb-5">
        <a
          href={searchUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded bg-[var(--burgundy)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--burgundy-dark)]"
        >
          Shop on Amazon
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
            <path d="M3 8 H11 M11 8 L8 5 M11 8 L8 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
