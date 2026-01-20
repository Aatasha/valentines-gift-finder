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

// Map vibes to emoji for visual interest
const vibeEmoji: Record<string, string> = {
  romantic: '💕',
  practical: '🎁',
  experiential: '🎭',
  funny: '😄',
};

export function BrowseGiftCard({ gift }: BrowseGiftCardProps) {
  const primaryVibe = gift.vibe[0];
  const emoji = vibeEmoji[primaryVibe] || '💝';

  return (
    <div className="group rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:border-rose-300 hover:shadow-md">
      {/* Clickable area for gift details */}
      <Link href={`/gifts/${gift.id}`} className="block">
        {/* Placeholder for future image */}
        <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-gradient-to-br from-rose-50 to-pink-50">
          <span className="text-5xl" role="img" aria-hidden="true">
            {emoji}
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-rose-600 line-clamp-2">
            {gift.name}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-2">
            {gift.description}
          </p>

          <div className="flex items-center justify-between pt-2">
            <span className="inline-flex items-center rounded-full bg-rose-100 px-3 py-1 text-sm font-medium text-rose-700">
              {getPriceLabel(gift.priceRange)}
            </span>

            <span className="text-xs text-gray-500 capitalize">
              {gift.vibe.join(' · ')}
            </span>
          </div>
        </div>
      </Link>

      {/* Buy on Amazon button */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <a
          href={getAmazonSearchUrl(gift.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#FF9900] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#E88B00]"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
          Find on Amazon
        </a>
      </div>
    </div>
  );
}
