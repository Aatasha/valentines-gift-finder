import { CategoryCard } from './CategoryCard';
import { getAllCategories } from '@/lib/categories';

export function CategoryGrid() {
  const categories = getAllCategories();

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {categories.map((category) => (
        <CategoryCard key={category.slug} category={category} />
      ))}
    </div>
  );
}
