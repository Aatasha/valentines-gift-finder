import type { Gift, GiftDatabase, CategoryFilter, PriceRange, RecipientType, Vibe } from './types';
import giftData from './gifts-database.json';

// Type assertion for the imported JSON (using unknown as intermediate for looser JSON matching)
const database = giftData as unknown as GiftDatabase;

// Get all gifts
export function getAllGifts(): Gift[] {
  return database.gifts;
}

// Get a single gift by ID
export function getGiftById(id: string): Gift | undefined {
  return database.gifts.find(gift => gift.id === id);
}

// Get database metadata
export function getMetadata() {
  return database.metadata;
}

// Get price tier labels
export function getPriceLabel(priceRange: PriceRange): string {
  return database.budgetTiers[priceRange];
}

// Filter gifts by category filter configuration
export function filterGiftsByCategory(filter: CategoryFilter): Gift[] {
  return database.gifts.filter(gift => {
    // Check price range filter
    if (filter.priceRange) {
      const priceRanges = Array.isArray(filter.priceRange)
        ? filter.priceRange
        : [filter.priceRange];
      if (!priceRanges.includes(gift.priceRange)) {
        return false;
      }
    }

    // Check recipient type filter
    if (filter.recipientType) {
      const recipientTypes = Array.isArray(filter.recipientType)
        ? filter.recipientType
        : [filter.recipientType];
      const hasMatchingRecipient = gift.recipientType.some(
        r => recipientTypes.includes(r as RecipientType)
      );
      if (!hasMatchingRecipient) {
        return false;
      }
    }

    // Check vibe filter
    if (filter.vibe) {
      const vibes = Array.isArray(filter.vibe) ? filter.vibe : [filter.vibe];
      const hasMatchingVibe = gift.vibe.some(v => vibes.includes(v as Vibe));
      if (!hasMatchingVibe) {
        return false;
      }
    }

    // Check interests filter (any match)
    if (filter.interests && filter.interests.length > 0) {
      const hasMatchingInterest = gift.interests.some(
        interest => filter.interests!.includes(interest)
      );
      if (!hasMatchingInterest) {
        return false;
      }
    }

    return true;
  });
}

// Get random gifts (for shuffle feature)
export function getRandomGifts(count: number, filter?: CategoryFilter): Gift[] {
  let gifts = filter ? filterGiftsByCategory(filter) : database.gifts;

  // Fisher-Yates shuffle
  const shuffled = [...gifts];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}

// Get all unique interests from gifts (for search suggestions)
export function getAllInterests(): string[] {
  return database.interestOptions;
}
