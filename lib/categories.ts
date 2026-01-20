import type { Category } from './types';

export const categories: Category[] = [
  {
    slug: 'under-25',
    name: 'Under £25',
    description: 'Thoughtful gifts that won\'t break the bank',
    emoji: '', // No longer used
    filter: {
      priceRange: 'under25',
    },
    color: 'bg-white hover:bg-[var(--cream-dark)] border-[var(--gold)]/30 hover:border-[var(--gold)]',
  },
  {
    slug: 'for-him',
    name: 'For Him',
    description: 'Gifts perfect for boyfriends and husbands',
    emoji: '',
    filter: {
      recipientType: ['boyfriend', 'husband'],
    },
    color: 'bg-white hover:bg-[var(--cream-dark)] border-[var(--burgundy)]/30 hover:border-[var(--burgundy)]',
  },
  {
    slug: 'for-her',
    name: 'For Her',
    description: 'Gifts perfect for girlfriends and wives',
    emoji: '',
    filter: {
      recipientType: ['girlfriend', 'wife'],
    },
    color: 'bg-white hover:bg-[var(--cream-dark)] border-[var(--burgundy)]/30 hover:border-[var(--burgundy)]',
  },
  {
    slug: 'experiences',
    name: 'Experiences',
    description: 'Create memories together with experiential gifts',
    emoji: '',
    filter: {
      vibe: 'experiential',
    },
    color: 'bg-white hover:bg-[var(--cream-dark)] border-[var(--burgundy-light)]/30 hover:border-[var(--burgundy-light)]',
  },
  {
    slug: 'romantic',
    name: 'Romantic',
    description: 'Classic romantic gifts to sweep them off their feet',
    emoji: '',
    filter: {
      vibe: 'romantic',
    },
    color: 'bg-white hover:bg-[var(--cream-dark)] border-[var(--burgundy)]/30 hover:border-[var(--burgundy)]',
  },
  {
    slug: 'practical',
    name: 'Practical',
    description: 'Useful gifts they\'ll actually use every day',
    emoji: '',
    filter: {
      vibe: 'practical',
    },
    color: 'bg-white hover:bg-[var(--cream-dark)] border-[var(--gold)]/30 hover:border-[var(--gold)]',
  },
  {
    slug: 'luxury',
    name: 'Luxury',
    description: 'Special occasion splurges for someone special',
    emoji: '',
    filter: {
      priceRange: 'over100',
    },
    color: 'bg-white hover:bg-[var(--cream-dark)] border-[var(--gold-muted)]/30 hover:border-[var(--gold-muted)]',
  },
  {
    slug: 'fun-playful',
    name: 'Fun & Playful',
    description: 'Lighthearted gifts that bring joy and laughter',
    emoji: '',
    filter: {
      vibe: 'funny',
    },
    color: 'bg-white hover:bg-[var(--cream-dark)] border-[var(--burgundy-light)]/30 hover:border-[var(--burgundy-light)]',
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(cat => cat.slug === slug);
}

export function getAllCategories(): Category[] {
  return categories;
}
