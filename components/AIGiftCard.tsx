'use client';

import { type ReactNode } from 'react';
import { getRetailerSearchUrl, getBestRetailerForGift, RETAILER_NAMES, type RetailerKey } from '@/lib/retailers';

interface AIGiftCardProps {
  gift: {
    id: string;
    name: string;
    searchQuery?: string; // Generic search term (no brands)
    description: string;
    priceEstimate: string;
    whyItWorks: string;
    whereToBuy: string[];
    tags: string[];
  };
}

// Map tags to accent colors
const tagAccents: Record<string, string> = {
  romantic: 'border-l-[var(--burgundy)]',
  practical: 'border-l-[var(--gold)]',
  experience: 'border-l-[var(--burgundy-light)]',
  luxury: 'border-l-[var(--gold-muted)]',
  'budget-friendly': 'border-l-[var(--charcoal-light)]',
  personalised: 'border-l-[var(--burgundy)]',
  tech: 'border-l-[var(--charcoal)]',
  handmade: 'border-l-[var(--gold)]',
};

// Map tags to background colors for image placeholder
const tagBackgrounds: Record<string, string> = {
  romantic: 'bg-[var(--burgundy)]/10',
  practical: 'bg-[var(--gold)]/10',
  experience: 'bg-[var(--burgundy-light)]/10',
  luxury: 'bg-[var(--gold-muted)]/10',
  'budget-friendly': 'bg-[var(--cream-dark)]',
  personalised: 'bg-[var(--burgundy)]/10',
  tech: 'bg-[var(--charcoal)]/10',
  handmade: 'bg-[var(--gold)]/10',
};

// Category icons - displayed in card header to help identify gift type at a glance
const categoryIcons: Record<string, ReactNode> = {
  romantic: (
    <svg className="h-12 w-12" viewBox="0 0 48 48" fill="none">
      <path d="M24 40 C16 32, 6 28, 6 16 C6 8, 12 6, 24 16 C36 6, 42 8, 42 16 C42 28, 32 32, 24 40" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M16 14 C18 10, 22 9, 24 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  practical: (
    <svg className="h-12 w-12" viewBox="0 0 48 48" fill="none">
      <path d="M24 8 L24 16 M16 24 L8 24 M32 24 L40 24 M24 32 L24 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2"/>
      <circle cx="24" cy="24" r="3" fill="currentColor"/>
    </svg>
  ),
  experience: (
    <svg className="h-12 w-12" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="12" width="32" height="24" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 20 L40 20" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 12 L16 36 M32 12 L32 36" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
      <circle cx="24" cy="28" r="4" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  luxury: (
    <svg className="h-12 w-12" viewBox="0 0 48 48" fill="none">
      <path d="M24 6 L28 18 L40 18 L30 26 L34 38 L24 30 L14 38 L18 26 L8 18 L20 18 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="24" cy="22" r="4" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  'budget-friendly': (
    <svg className="h-12 w-12" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2"/>
      <path d="M24 14 L24 34 M18 20 L30 20 M18 28 L30 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  personalised: (
    <svg className="h-12 w-12" viewBox="0 0 48 48" fill="none">
      <path d="M10 38 L38 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M36 12 L38 10 L40 12 L38 14 Z" fill="currentColor"/>
      <path d="M14 34 L10 38 L14 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3"/>
    </svg>
  ),
  tech: (
    <svg className="h-12 w-12" viewBox="0 0 48 48" fill="none">
      <rect x="10" y="12" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M18 36 L30 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M24 32 L24 36" stroke="currentColor" strokeWidth="2"/>
      <circle cx="18" cy="22" r="2" fill="currentColor"/>
      <circle cx="30" cy="22" r="2" fill="currentColor"/>
    </svg>
  ),
  handmade: (
    <svg className="h-12 w-12" viewBox="0 0 48 48" fill="none">
      <path d="M16 40 L16 24 C16 18, 20 14, 24 14 C28 14, 32 18, 32 24 L32 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 24 L20 32 M24 22 L24 34 M28 24 L28 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="24" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
};

// Small inline icons for title area (16px)
const titleIcons: Record<string, ReactNode> = {
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
  experience: (
    <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="4" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 7 L14 7" stroke="currentColor" strokeWidth="1"/>
    </svg>
  ),
  luxury: (
    <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
      <path d="M8 2 L9.5 6 L14 6 L10.5 9 L12 14 L8 11 L4 14 L5.5 9 L2 6 L6.5 6 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  'budget-friendly': (
    <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 5 L8 11 M6 7 L10 7 M6 9 L10 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  ),
  personalised: (
    <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
      <path d="M3 13 L13 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="4" r="1.5" fill="currentColor"/>
    </svg>
  ),
  tech: (
    <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
      <rect x="3" y="4" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 13 L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  handmade: (
    <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
      <path d="M5 14 L5 8 C5 5, 8 4, 8 4 C8 4, 11 5, 11 8 L11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="3" r="1" fill="currentColor"/>
    </svg>
  ),
};

export function AIGiftCard({ gift }: AIGiftCardProps) {
  const primaryTag = gift.tags[0] || 'romantic';
  const accentClass = tagAccents[primaryTag] || 'border-l-[var(--burgundy)]';
  const bgClass = tagBackgrounds[primaryTag] || 'bg-[var(--burgundy)]/10';

  // Determine best retailer based on gift tags
  const bestRetailer = getBestRetailerForGift(gift.tags);
  // Use searchQuery for URLs (generic, no brands), fall back to name if not provided
  const searchTerm = gift.searchQuery || gift.name;
  const primaryUrl = getRetailerSearchUrl(bestRetailer, searchTerm) || '#';
  const primaryRetailerName = RETAILER_NAMES[bestRetailer];

  // Amazon as fallback (only show if not already the primary)
  const showFallback = bestRetailer !== 'amazon';
  const fallbackUrl = showFallback ? getRetailerSearchUrl('amazon', searchTerm) : null;

  // Get the category icon (use first matching tag)
  const getCategoryIcon = () => {
    for (const tag of gift.tags) {
      if (categoryIcons[tag.toLowerCase()]) {
        return categoryIcons[tag.toLowerCase()];
      }
    }
    return categoryIcons['romantic']; // fallback
  };

  const getTitleIcon = () => {
    for (const tag of gift.tags) {
      if (titleIcons[tag.toLowerCase()]) {
        return titleIcons[tag.toLowerCase()];
      }
    }
    return titleIcons['romantic']; // fallback
  };

  return (
    <div className={`group bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[var(--gold)] border-l-4 ${accentClass}`}>
      {/* Image placeholder area with category icon */}
      <div className={`h-36 ${bgClass} flex items-center justify-center relative overflow-hidden`}>
        {/* Category-specific icon */}
        <div className="text-[var(--burgundy)]/25 group-hover:text-[var(--burgundy)]/35 transition-colors">
          {getCategoryIcon()}
        </div>
        {/* Corner flourish */}
        <svg className="absolute top-2 right-2 h-5 w-5 text-[var(--gold)]/30" viewBox="0 0 20 20" fill="none">
          <path d="M16 4 C13 4, 11 6, 11 9 M4 16 C4 13, 6 11, 9 11" stroke="currentColor" strokeWidth="1"/>
        </svg>
        {/* AI badge */}
        <div className="absolute top-2 left-2">
          <span className="inline-flex items-center rounded-full bg-[var(--burgundy)] px-2.5 py-0.5 text-xs font-medium text-white">
            AI Pick
          </span>
        </div>
      </div>

      <div className="p-5">

        {/* Gift name with category icon */}
        <div className="flex items-start gap-2">
          <span className="text-[var(--burgundy)] mt-1">
            {getTitleIcon()}
          </span>
          <h3 className="font-serif text-lg font-semibold text-[var(--charcoal)] line-clamp-2">
            {gift.name}
          </h3>
        </div>

        {/* Description */}
        <p className="mt-2 text-sm text-[var(--charcoal-light)] line-clamp-2">
          {gift.description}
        </p>

        {/* Price */}
        <div className="mt-4">
          <span className="inline-flex items-center rounded-full bg-[var(--cream-dark)] px-3 py-1 text-sm font-medium text-[var(--burgundy)]">
            {gift.priceEstimate}
          </span>
        </div>

        {/* Why it works */}
        <div className="mt-4 p-3 bg-[var(--cream)] rounded border-l-2 border-[var(--gold)]">
          <p className="text-xs text-[var(--charcoal-light)] italic">
            {gift.whyItWorks}
          </p>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {gift.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[var(--cream-dark)] px-2 py-0.5 text-xs text-[var(--charcoal-light)] capitalize"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Primary buy button */}
      <div className="px-5 pb-5 space-y-2">
        <a
          href={primaryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded bg-[var(--burgundy)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--burgundy-dark)]"
        >
          Shop on {primaryRetailerName}
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
            <path d="M3 8 H11 M11 8 L8 5 M11 8 L8 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        {/* Fallback link to Amazon */}
        {showFallback && fallbackUrl && (
          <a
            href={fallbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center text-xs text-[var(--charcoal-light)] hover:text-[var(--burgundy)] transition-colors"
          >
            See more options on Amazon →
          </a>
        )}
      </div>
    </div>
  );
}
