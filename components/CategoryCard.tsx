import Link from 'next/link';
import type { Category } from '@/lib/types';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group block rounded-lg border border-[var(--gold)]/30 bg-[var(--cream)]/10 p-6 transition-all duration-300 hover:bg-[var(--cream)]/20 hover:border-[var(--gold)]/50"
    >
      <div className="flex flex-col">
        <h3 className="font-serif text-lg font-semibold text-[var(--cream)] group-hover:text-[var(--gold)] transition-colors">
          {category.name}
        </h3>
        <p className="mt-2 text-sm text-[var(--cream)]/70">
          {category.description}
        </p>
        <div className="mt-4 flex items-center text-[var(--gold)] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Browse
          <svg className="ml-2 h-4 w-8" viewBox="0 0 32 16" fill="none">
            <path d="M2 8 H20 M20 8 C18 6, 18 4, 20 4 M20 8 C18 10, 18 12, 20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="26" cy="8" r="2" stroke="currentColor" strokeWidth="1" fill="none"/>
          </svg>
        </div>
      </div>
    </Link>
  );
}
