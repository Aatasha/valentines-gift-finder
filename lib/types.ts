// Gift types matching the database structure
export type PriceRange = 'under25' | '25to50' | '50to100' | 'over100';
export type RecipientType = 'girlfriend' | 'boyfriend' | 'wife' | 'husband' | 'partner';
export type Vibe = 'romantic' | 'practical' | 'experiential' | 'funny';
export type RelationshipStage = 'new' | 'established' | 'longterm';

export interface Gift {
  id: string;
  name: string;
  description: string;
  priceRange: PriceRange;
  recipientType: RecipientType[];
  interests: string[];
  vibe: Vibe[];
  relationshipStage: RelationshipStage[];
  imageUrl: string;
  affiliateLinks: Record<string, string>;
  notes: string;
  searchTerm?: string; // Optional: custom search term for better retailer results
}

export interface GiftDatabase {
  metadata: {
    lastUpdated: string;
    totalGifts: number;
    targetGifts: number;
  };
  gifts: Gift[];
  interestOptions: string[];
  budgetTiers: Record<PriceRange, string>;
}

// Category filter configuration
export interface CategoryFilter {
  priceRange?: PriceRange | PriceRange[];
  recipientType?: RecipientType | RecipientType[];
  vibe?: Vibe | Vibe[];
  interests?: string[];
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  emoji: string;
  filter: CategoryFilter;
  color: string; // Tailwind color class
}
