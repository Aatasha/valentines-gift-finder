// Google Analytics 4 tracking utilities
// GA_MEASUREMENT_ID should be set in .env.local

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Track page views (called automatically by GA, but useful for SPA navigation)
export function trackPageView(url: string) {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

// Track affiliate link clicks - most important metric for revenue
export function trackAffiliateClick(params: {
  retailer: string;
  giftName: string;
  source: 'quiz' | 'search' | 'browse' | 'category';
}) {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  window.gtag('event', 'affiliate_click', {
    retailer: params.retailer,
    gift_name: params.giftName,
    source: params.source,
  });
}

// Track quiz completion
export function trackQuizComplete(params: {
  recipient: string;
  budget: string;
  personality: string;
  resultsCount: number;
}) {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  window.gtag('event', 'quiz_complete', {
    recipient: params.recipient,
    budget: params.budget,
    personality: params.personality,
    results_count: params.resultsCount,
  });
}

// Track search queries
export function trackSearch(query: string, resultsCount: number) {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  window.gtag('event', 'search', {
    search_term: query,
    results_count: resultsCount,
  });
}

// Track category browsing
export function trackCategoryView(category: string) {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  window.gtag('event', 'view_category', {
    category_name: category,
  });
}
