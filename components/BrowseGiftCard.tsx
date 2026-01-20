import Link from 'next/link';
import type { Gift } from '@/lib/types';
import { getPriceLabel } from '@/lib/gifts';

const AMAZON_AFFILIATE_TAG = 'aanthony08-21';

function getAmazonSearchUrl(productName: string): string {
  const searchTerm = encodeURIComponent(productName);
  return `https://www.amazon.co.uk/s?k=${searchTerm}&tag=${AMAZON_AFFILIATE_TAG}`;
}

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

export function BrowseGiftCard({ gift }: BrowseGiftCardProps) {
  const primaryVibe = gift.vibe[0];
  const accentClass = vibeAccents[primaryVibe] || 'border-l-[var(--burgundy)]';
  const bgClass = vibeBackgrounds[primaryVibe] || 'bg-[var(--burgundy)]/10';

  return (
    <div className={`group bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[var(--gold)] border-l-4 ${accentClass}`}>
      {/* Image placeholder area */}
      <Link href={`/gifts/${gift.id}`} className="block">
        <div className={`h-40 ${bgClass} flex items-center justify-center relative overflow-hidden`}>
          {/* Decorative ornate heart placeholder */}
          <svg className="h-16 w-16 text-[var(--burgundy)]/20 group-hover:text-[var(--burgundy)]/30 transition-colors" viewBox="0 0 64 64" fill="none">
            <path d="M32 52 C24 44, 12 42, 12 28 C12 16, 20 14, 32 26 C44 14, 52 16, 52 28 C52 42, 40 44, 32 52" stroke="currentColor" strokeWidth="2" fill="none"/>
            <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4"/>
          </svg>
          {/* Corner flourish */}
          <svg className="absolute top-2 right-2 h-6 w-6 text-[var(--gold)]/30" viewBox="0 0 24 24" fill="none">
            <path d="M20 4 C16 4, 14 6, 14 10 M4 20 C4 16, 6 14, 10 14" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>
      </Link>

      {/* Clickable area for gift details */}
      <Link href={`/gifts/${gift.id}`} className="block p-5">
        {/* Gift name - serif font */}
        <h3 className="font-serif text-lg font-semibold text-[var(--charcoal)] group-hover:text-[var(--burgundy)] transition-colors line-clamp-2">
          {gift.name}
        </h3>

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
