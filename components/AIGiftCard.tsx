'use client';

import { type ReactNode } from 'react';
import { getRetailerSearchUrl, getBestRetailerForGift, RETAILER_NAMES } from '@/lib/retailers';
import { trackAffiliateClick } from '@/lib/analytics';

interface AIGiftCardProps {
  gift: {
    id: string;
    name: string;
    searchQuery?: string;
    description: string;
    priceEstimate: string;
    whyItWorks: string;
    whereToBuy: string[];
    tags: string[];
  };
  featured?: boolean;
}

// Category config - distinct colors and icons for each type
const categoryConfig: Record<string, {
  bg: string;
  text: string;
  border: string;
  icon: ReactNode;
  label: string;
}> = {
  romantic: {
    bg: 'bg-rose-100',
    text: 'text-rose-700',
    border: 'border-l-rose-500',
    label: 'Romantic',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 14 C5 11, 1 8, 1 4.5 C1 2, 3 1, 5.5 1 C7 1, 8 2, 8 2 C8 2, 9 1, 10.5 1 C13 1, 15 2, 15 4.5 C15 8, 11 11, 8 14"/>
      </svg>
    ),
  },
  practical: {
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    border: 'border-l-slate-500',
    label: 'Practical',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1 L8 4 M8 12 L8 15 M1 8 L4 8 M12 8 L15 8 M3 3 L5 5 M11 11 L13 13 M3 13 L5 11 M11 5 L13 3"/>
        <circle cx="8" cy="8" r="3"/>
      </svg>
    ),
  },
  experience: {
    bg: 'bg-violet-100',
    text: 'text-violet-700',
    border: 'border-l-violet-500',
    label: 'Experience',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
        <rect x="1" y="4" width="14" height="9" rx="1"/>
        <path d="M1 7 L15 7" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="8" cy="10" r="1.5" fill="white"/>
      </svg>
    ),
  },
  luxury: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    border: 'border-l-amber-500',
    label: 'Luxury',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1 L9.5 5.5 L14 6 L10.5 9 L11.5 14 L8 11.5 L4.5 14 L5.5 9 L2 6 L6.5 5.5 Z"/>
      </svg>
    ),
  },
  'budget-friendly': {
    bg: 'bg-emerald-100',
    text: 'text-emerald-700',
    border: 'border-l-emerald-500',
    label: 'Budget',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
        <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 4 L8 12 M6 6 L10 6 M6 10 L10 10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  personalised: {
    bg: 'bg-pink-100',
    text: 'text-pink-700',
    border: 'border-l-pink-500',
    label: 'Personalised',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
        <path d="M11 2 L14 5 L5 14 L2 14 L2 11 Z"/>
        <path d="M9 4 L12 7" fill="none" stroke="white" strokeWidth="1"/>
      </svg>
    ),
  },
  tech: {
    bg: 'bg-sky-100',
    text: 'text-sky-700',
    border: 'border-l-sky-500',
    label: 'Tech',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
        <rect x="2" y="3" width="12" height="8" rx="1"/>
        <path d="M5 14 L11 14" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 11 L8 14" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  handmade: {
    bg: 'bg-orange-100',
    text: 'text-orange-700',
    border: 'border-l-orange-500',
    label: 'Handmade',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 3 C6 3, 4 5, 4 8 L4 14 L6 14 L6 8 M8 3 C10 3, 12 5, 12 8 L12 14 L10 14 L10 8"/>
        <circle cx="8" cy="2" r="1.5"/>
      </svg>
    ),
  },
};

// Default fallback
const defaultCategory = {
  bg: 'bg-gray-100',
  text: 'text-gray-700',
  border: 'border-l-gray-400',
  label: 'Gift',
  icon: (
    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
      <rect x="2" y="6" width="12" height="9" rx="1"/>
      <path d="M8 2 L8 6 M2 9 L14 9" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5 2 C5 4, 8 6, 8 6 C8 6, 11 4, 11 2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
};

export function AIGiftCard({ gift, featured = false }: AIGiftCardProps) {
  // Get category config for primary tag
  const primaryTag = gift.tags[0]?.toLowerCase() || '';
  const category = categoryConfig[primaryTag] || defaultCategory;

  // Determine best retailer based on gift tags
  const bestRetailer = getBestRetailerForGift(gift.tags);
  const searchTerm = gift.searchQuery || gift.name;
  const primaryUrl = getRetailerSearchUrl(bestRetailer, searchTerm) || '#';
  const primaryRetailerName = RETAILER_NAMES[bestRetailer];

  // Amazon as fallback (only show if not already the primary)
  const showFallback = bestRetailer !== 'amazon';
  const fallbackUrl = showFallback ? getRetailerSearchUrl('amazon', searchTerm) : null;

  return (
    <div className={`group bg-white rounded-lg border overflow-hidden transition-all duration-300 hover:shadow-lg border-l-4 ${category.border} ${
      featured
        ? 'border-[var(--gold)] border-2 shadow-md'
        : 'border-gray-200 hover:border-[var(--gold)]'
    }`}>
      <div className={`${featured ? 'p-6' : 'p-4'}`}>
        {/* Header row: Category badge + Title */}
        <div className="flex items-start gap-3">
          {/* Category badge - distinctive per type */}
          <div className={`flex-shrink-0 ${category.bg} ${category.text} rounded-lg p-2`}>
            {category.icon}
          </div>

          {/* Title and badges */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {featured && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--gold)] px-2 py-0.5 text-xs font-semibold text-[var(--burgundy-dark)]">
                  <svg className="h-3 w-3" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 1 L9.5 5.5 L14 6 L10.5 9 L11.5 14 L8 11.5 L4.5 14 L5.5 9 L2 6 L6.5 5.5 Z"/>
                  </svg>
                  Top Match
                </span>
              )}
              <span className={`text-xs font-medium ${category.text}`}>
                {category.label}
              </span>
            </div>
            <h3 className={`font-serif font-semibold text-[var(--charcoal)] ${featured ? 'text-xl' : 'text-base'} line-clamp-2`}>
              {gift.name}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className={`mt-3 text-sm text-[var(--charcoal-light)] ${featured ? '' : 'line-clamp-2'}`}>
          {gift.description}
        </p>

        {/* Price + Why it works row */}
        <div className="mt-3 flex items-start gap-3">
          <span className="flex-shrink-0 inline-flex items-center rounded-full bg-[var(--cream-dark)] px-3 py-1 text-sm font-medium text-[var(--burgundy)]">
            {gift.priceEstimate}
          </span>
          <p className="text-xs text-[var(--charcoal-light)] italic line-clamp-2">
            "{gift.whyItWorks}"
          </p>
        </div>

        {/* Tags - only show if there are secondary tags */}
        {gift.tags.length > 1 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {gift.tags.slice(1, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 capitalize"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Buy button */}
      <div className="px-4 pb-4 pt-0">
        <a
          href={primaryUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackAffiliateClick({
            retailer: primaryRetailerName,
            giftName: gift.name,
            source: 'quiz',
          })}
          className={`flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--burgundy)] px-4 ${featured ? 'py-3' : 'py-2.5'} text-sm font-medium text-white transition-colors hover:bg-[var(--burgundy-dark)]`}
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
            onClick={() => trackAffiliateClick({
              retailer: 'Amazon',
              giftName: gift.name,
              source: 'quiz',
            })}
            className="block w-full text-center text-xs text-[var(--charcoal-light)] hover:text-[var(--burgundy)] transition-colors mt-2"
          >
            See more options on Amazon →
          </a>
        )}
      </div>
    </div>
  );
}
