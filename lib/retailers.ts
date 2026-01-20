// Centralized retailer configuration and search URL generation

export const AFFILIATE_TAGS = {
  amazon: 'aanthony08-21',
} as const;

export type RetailerKey = 'amazon' | 'etsy' | 'noths';

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
    default:
      return null;
  }
}
