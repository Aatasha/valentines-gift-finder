import type { Category } from './types';

export const categories: Category[] = [
  {
    slug: 'under-25',
    name: 'Under £25',
    description: 'Thoughtful gifts that won\'t break the bank',
    emoji: '💰',
    filter: {
      priceRange: 'under25',
    },
    color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200',
  },
  {
    slug: 'for-him',
    name: 'For Him',
    description: 'Gifts perfect for boyfriends and husbands',
    emoji: '👨',
    filter: {
      recipientType: ['boyfriend', 'husband'],
    },
    color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
  },
  {
    slug: 'for-her',
    name: 'For Her',
    description: 'Gifts perfect for girlfriends and wives',
    emoji: '👩',
    filter: {
      recipientType: ['girlfriend', 'wife'],
    },
    color: 'bg-pink-50 hover:bg-pink-100 border-pink-200',
  },
  {
    slug: 'experiences',
    name: 'Experiences',
    description: 'Create memories together with experiential gifts',
    emoji: '🎭',
    filter: {
      vibe: 'experiential',
    },
    color: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
  },
  {
    slug: 'romantic',
    name: 'Romantic',
    description: 'Classic romantic gifts to sweep them off their feet',
    emoji: '💕',
    filter: {
      vibe: 'romantic',
    },
    color: 'bg-rose-50 hover:bg-rose-100 border-rose-200',
  },
  {
    slug: 'practical',
    name: 'Practical',
    description: 'Useful gifts they\'ll actually use every day',
    emoji: '🎁',
    filter: {
      vibe: 'practical',
    },
    color: 'bg-amber-50 hover:bg-amber-100 border-amber-200',
  },
  {
    slug: 'luxury',
    name: 'Luxury',
    description: 'Special occasion splurges for someone special',
    emoji: '✨',
    filter: {
      priceRange: 'over100',
    },
    color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200',
  },
  {
    slug: 'fun-playful',
    name: 'Fun & Playful',
    description: 'Lighthearted gifts that bring joy and laughter',
    emoji: '😄',
    filter: {
      vibe: 'funny',
    },
    color: 'bg-orange-50 hover:bg-orange-100 border-orange-200',
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(cat => cat.slug === slug);
}

export function getAllCategories(): Category[] {
  return categories;
}
