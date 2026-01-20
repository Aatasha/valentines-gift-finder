'use client';

const AMAZON_AFFILIATE_TAG = 'aanthony08-21';

function getAmazonSearchUrl(productName: string): string {
  const searchTerm = encodeURIComponent(productName);
  return `https://www.amazon.co.uk/s?k=${searchTerm}&tag=${AMAZON_AFFILIATE_TAG}`;
}

interface AIGiftCardProps {
  gift: {
    id: string;
    name: string;
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
};

// Map tags to background colors for image placeholder
const tagBackgrounds: Record<string, string> = {
  romantic: 'bg-[var(--burgundy)]/10',
  practical: 'bg-[var(--gold)]/10',
  experience: 'bg-[var(--burgundy-light)]/10',
  luxury: 'bg-[var(--gold-muted)]/10',
  'budget-friendly': 'bg-[var(--cream-dark)]',
};

export function AIGiftCard({ gift }: AIGiftCardProps) {
  const primaryTag = gift.tags[0] || 'romantic';
  const accentClass = tagAccents[primaryTag] || 'border-l-[var(--burgundy)]';
  const bgClass = tagBackgrounds[primaryTag] || 'bg-[var(--burgundy)]/10';

  return (
    <div className={`group bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[var(--gold)] border-l-4 ${accentClass}`}>
      {/* Image placeholder area */}
      <div className={`h-36 ${bgClass} flex items-center justify-center relative overflow-hidden`}>
        {/* Decorative AI sparkle icon */}
        <svg className="h-14 w-14 text-[var(--burgundy)]/20 group-hover:text-[var(--burgundy)]/30 transition-colors" viewBox="0 0 56 56" fill="none">
          <path d="M28 8 L30 22 L44 20 L32 28 L44 36 L30 34 L28 48 L26 34 L12 36 L24 28 L12 20 L26 22 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <circle cx="28" cy="28" r="20" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4"/>
        </svg>
        {/* Corner flourish */}
        <svg className="absolute top-2 right-2 h-5 w-5 text-[var(--gold)]/30" viewBox="0 0 20 20" fill="none">
          <path d="M16 4 C13 4, 11 6, 11 9 M4 16 C4 13, 6 11, 9 11" stroke="currentColor" strokeWidth="1"/>
        </svg>
        {/* AI badge */}
        <div className="absolute top-2 left-2">
          <span className="inline-flex items-center rounded-full bg-[var(--burgundy)] px-2.5 py-0.5 text-xs font-medium text-white">
            AI Suggestion
          </span>
        </div>
      </div>

      <div className="p-5">

        {/* Gift name - serif font */}
        <h3 className="font-serif text-lg font-semibold text-[var(--charcoal)] line-clamp-2">
          {gift.name}
        </h3>

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

      {/* Buy on Amazon button */}
      <div className="px-5 pb-5">
        <a
          href={getAmazonSearchUrl(gift.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded bg-[var(--burgundy)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--burgundy-dark)]"
        >
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
            <path d="M10 18 C6 14, 2 12, 2 7 C2 3, 5 1, 10 6 C15 1, 18 3, 18 7 C18 12, 14 14, 10 18" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
          Find on Amazon
          <svg className="h-4 w-6" viewBox="0 0 24 16" fill="none">
            <path d="M4 8 H16 M16 8 C14 6, 14 4, 16 4 M16 8 C14 10, 14 12, 16 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="20" cy="8" r="2" stroke="currentColor" strokeWidth="1" fill="none"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
