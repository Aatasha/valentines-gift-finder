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

// Map tags to colors
const tagColors: Record<string, string> = {
  romantic: 'bg-rose-100 text-rose-700',
  practical: 'bg-blue-100 text-blue-700',
  experience: 'bg-purple-100 text-purple-700',
  luxury: 'bg-yellow-100 text-yellow-800',
  'budget-friendly': 'bg-green-100 text-green-700',
};

// Map tags to emoji
const tagEmoji: Record<string, string> = {
  romantic: '💕',
  practical: '🎁',
  experience: '🎭',
  luxury: '✨',
  'budget-friendly': '💰',
};

export function AIGiftCard({ gift }: AIGiftCardProps) {
  const primaryTag = gift.tags[0] || 'romantic';
  const emoji = tagEmoji[primaryTag] || '💝';

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:border-rose-300 hover:shadow-md">
      {/* Emoji placeholder */}
      <div className="mb-4 flex h-28 items-center justify-center rounded-lg bg-gradient-to-br from-rose-50 to-pink-50">
        <span className="text-5xl" role="img" aria-hidden="true">
          {emoji}
        </span>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900 line-clamp-2">
          {gift.name}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2">
          {gift.description}
        </p>

        {/* Price */}
        <span className="inline-flex items-center rounded-full bg-rose-100 px-3 py-1 text-sm font-medium text-rose-700">
          {gift.priceEstimate}
        </span>

        {/* Why it works */}
        <p className="text-xs text-gray-500 italic line-clamp-2">
          💡 {gift.whyItWorks}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {gift.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className={`rounded-full px-2 py-0.5 text-xs capitalize ${
                tagColors[tag] || 'bg-gray-100 text-gray-700'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Buy on Amazon button */}
        <div className="pt-3 border-t border-gray-100">
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
    </div>
  );
}
