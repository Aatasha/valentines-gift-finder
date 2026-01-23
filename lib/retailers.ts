// Centralized retailer configuration and search URL generation
//
// AFFILIATE PROGRAM SETUP:
// 1. Amazon Associates: Already configured ✓
//    - Manage at: https://affiliate-program.amazon.co.uk/
//
// 2. Etsy (via Awin):
//    - Sign up: https://www.awin.com/ → Search for "Etsy UK"
//    - Get your Awin publisher ID and Etsy advertiser ID
//    - Tracking URL format: https://www.awin1.com/cread.php?awinaffid=YOUR_ID&awinmid=ETSY_ID&ued=ENCODED_URL
//
// 3. Not On The High Street (via Awin):
//    - Sign up: https://www.awin.com/ → Search for "Not On The High Street"
//    - Get your Awin publisher ID and NOTHS advertiser ID
//    - Commission: ~8% on sales
//
// 4. Virgin Experience Days:
//    - Check if they use Awin or have direct program
//    - May also be available via TradeDoubler or Commission Junction

export const AFFILIATE_TAGS = {
  amazon: 'aanthony08-21',
  // Add Awin IDs here once registered:
  // awinPublisherId: 'YOUR_AWIN_PUBLISHER_ID',
  // etsyAdvertiserId: 'ETSY_ADVERTISER_ID',
  // nothsAdvertiserId: 'NOTHS_ADVERTISER_ID',
} as const;

// Clean and optimize search terms for better retailer results
export function cleanSearchTerm(rawTerm: string): string {
  let term = rawTerm;

  // Remove content in parentheses (e.g., "Candle (Jo Malone)" → "Candle")
  term = term.replace(/\s*\([^)]*\)/g, '');

  // Remove content in brackets
  term = term.replace(/\s*\[[^\]]*\]/g, '');

  // Remove slashes and content after them if they look like alternatives
  // e.g., "Coffee/Tea Set" → "Coffee Tea Set"
  term = term.replace(/\//g, ' ');

  // Trim and collapse multiple spaces
  term = term.trim().replace(/\s+/g, ' ');

  return term;
}

export type RetailerKey = 'amazon' | 'etsy' | 'noths' | 'virginexp';

// Retailer display names
export const RETAILER_NAMES: Record<RetailerKey, string> = {
  amazon: 'Amazon',
  etsy: 'Etsy',
  noths: 'Not On The High Street',
  virginexp: 'Virgin Experience Days',
};

// Get the best search term for a gift
// Uses custom searchTerm if provided, otherwise cleans the product name
export function getSearchTermForGift(gift: { name: string; searchTerm?: string }): string {
  if (gift.searchTerm) {
    return gift.searchTerm;
  }
  return cleanSearchTerm(gift.name);
}

// Generate search URL for a retailer
// TODO: Add Awin affiliate tracking once IDs are obtained
export function getRetailerSearchUrl(retailer: RetailerKey, productNameOrGift: string | { name: string; searchTerm?: string }): string | null {
  // Handle both string and Gift object inputs
  const rawTerm = typeof productNameOrGift === 'string'
    ? productNameOrGift
    : getSearchTermForGift(productNameOrGift);

  const searchTerm = encodeURIComponent(cleanSearchTerm(rawTerm));

  switch (retailer) {
    case 'amazon':
      return `https://www.amazon.co.uk/s?k=${searchTerm}&tag=${AFFILIATE_TAGS.amazon}`;
    case 'etsy':
      // TODO: Wrap with Awin tracking when affiliate ID is obtained
      // Format: https://www.awin1.com/cread.php?awinaffid=XXX&awinmid=YYY&ued=ENCODED_URL
      return `https://www.etsy.com/uk/search?q=${searchTerm}`;
    case 'noths':
      // TODO: Wrap with Awin tracking when affiliate ID is obtained
      return `https://www.notonthehighstreet.com/search?term=${searchTerm}`;
    case 'virginexp':
      // TODO: Add affiliate tracking when program is joined
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
