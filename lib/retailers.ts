// Centralized retailer configuration and search URL generation

export const AFFILIATE_TAGS = {
  amazon: 'aanthony08-21',
} as const;

export type RetailerKey = 'amazon' | 'etsy' | 'noths' | 'virginexp';

// Retailer display names
export const RETAILER_NAMES: Record<RetailerKey, string> = {
  amazon: 'Amazon',
  etsy: 'Etsy',
  noths: 'Not On The High Street',
  virginexp: 'Virgin Experience Days',
};

// Generate search URL for a retailer
export function getRetailerSearchUrl(retailer: RetailerKey, productName: string): string | null {
  const searchTerm = encodeURIComponent(productName);

  switch (retailer) {
    case 'amazon':
      return `https://www.amazon.co.uk/s?k=${searchTerm}&tag=${AFFILIATE_TAGS.amazon}`;
    case 'etsy':
      return `https://www.etsy.com/uk/search?q=${searchTerm}`;
    case 'noths':
      return `https://www.notonthehighstreet.com/search?term=${searchTerm}`;
    case 'virginexp':
      return `https://www.virginexperiencedays.co.uk/search?query=${searchTerm}`;
    default:
      return null;
  }
}

// Determine the best retailer based on gift tags
export function getBestRetailerForGift(tags: string[]): RetailerKey {
  const lowerTags = tags.map(t => t.toLowerCase());

  // Experiences → Virgin Experience Days (ONLY for actual experience vouchers, not physical products)
  if (lowerTags.includes('experience')) {
    return 'virginexp';
  }

  // Personalised/handmade/unique → Not On The High Street (better for UK, no bot blocking)
  if (lowerTags.some(t => ['personalised', 'personalized', 'custom', 'handmade', 'unique'].includes(t))) {
    return 'noths';
  }

  // Default to Amazon for practical, tech, luxury, budget-friendly, etc.
  return 'amazon';
}
