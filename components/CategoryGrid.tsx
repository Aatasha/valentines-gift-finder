import { CategoryCard } from './CategoryCard';
import { getAllCategories } from '@/lib/categories';

export function CategoryGrid() {
  const categories = getAllCategories();

  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center sm:text-left">
        Browse by Category
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </section>
  );
}
