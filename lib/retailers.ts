// Centralized retailer configuration and search URL generation
//
// AFFILIATE PROGRAM SETUP:
// 1. Amazon Associates: Already configured ✓
//    - Manage at: https://affiliate-program.amazon.co.uk/
//
// 2. Virgin Experience Days (via Impact.com):
//    - Sign up at: https://impact.com/
//    - Search for Virgin Experience Days program

export const AFFILIATE_TAGS = {
  amazon: 'aanthony08-21',
} as const;

// Google requires paid/affiliate links to be marked "sponsored"; ordinary outbound links are not.
// No "noreferrer": Amazon must be able to see which site a click came from, and merchants
// seeing our referrals helps when we apply to their affiliate programmes.
export const AFFILIATE_LINK_REL = 'sponsored nofollow noopener';
const PLAIN_LINK_REL = 'noopener';

export function isAffiliateUrl(url: string): boolean {
  return url.includes(`tag=${AFFILIATE_TAGS.amazon}`);
}

export function getLinkRel(url: string): string {
  return isAffiliateUrl(url) ? AFFILIATE_LINK_REL : PLAIN_LINK_REL;
}

// Rewrite the rel attribute on affiliate anchors inside our own (trusted) blog HTML
export function markAffiliateLinks(html: string): string {
  return html.replace(/<a\s[^>]*>/g, (tag) => {
    const href = tag.match(/href="([^"]*)"/)?.[1];
    if (!href || !isAffiliateUrl(href)) return tag;
    return tag.replace(/\srel="[^"]*"/, '').replace(/^<a\s/, `<a rel="${AFFILIATE_LINK_REL}" `);
  });
}

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

export type RetailerKey = 'amazon' | 'virginexp';

// Retailer display names
export const RETAILER_NAMES: Record<RetailerKey, string> = {
  amazon: 'Amazon',
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
    case 'virginexp':
      // TODO: Add Impact.com tracking when program is approved
      return `https://www.virginexperiencedays.co.uk/search?query=${searchTerm}`;
    default:
      return null;
  }
}

// Determine the best retailer based on gift tags
// TODO: Re-enable Virgin Experience Days once affiliate program is approved
export function getBestRetailerForGift(tags: string[]): RetailerKey {
  // For now, always use Amazon until other affiliate programs are approved
  return 'amazon';

  // Uncomment below once approved:
  // const lowerTags = tags.map(t => t.toLowerCase());
  //
  // // Experiences → Virgin Experience Days (ONLY for actual experience vouchers, not physical products)
  // if (lowerTags.includes('experience')) {
  //   return 'virginexp';
  // }
  //
  // return 'amazon';
}
