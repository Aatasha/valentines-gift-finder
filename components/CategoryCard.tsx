import Link from 'next/link';
import type { Category } from '@/lib/types';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className={`group block rounded-2xl border-2 p-6 transition-all duration-200 ${category.color}`}
    >
      <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
        <span className="text-4xl mb-3" role="img" aria-hidden="true">
          {category.emoji}
        </span>
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700">
          {category.name}
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          {category.description}
        </p>
      </div>
    </Link>
  );
}
