import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCategoryBySlug, getAllCategories } from '@/lib/categories';
import { filterGiftsByCategory } from '@/lib/gifts';
import { BrowseGiftCard } from '@/components/BrowseGiftCard';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all categories
export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} Valentine's Gifts | Valentine's Gift Finder`,
    description: `${category.description}. Find the perfect ${category.name.toLowerCase()} Valentine's gift for your partner.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const gifts = filterGiftsByCategory(category.filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-rose-600">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">{category.name}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-8 text-center sm:text-left">
          <div className="flex items-center justify-center gap-3 sm:justify-start">
            <span className="text-4xl" role="img" aria-hidden="true">
              {category.emoji}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {category.name}
            </h1>
          </div>
          <p className="mt-2 text-lg text-gray-600">
            {category.description}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {gifts.length} {gifts.length === 1 ? 'gift' : 'gifts'} found
          </p>
        </header>

        {/* Gift Grid */}
        {gifts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gifts.map((gift) => (
              <BrowseGiftCard key={gift.id} gift={gift} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg bg-white p-12 text-center shadow-sm">
            <p className="text-lg text-gray-600">
              No gifts found in this category yet. Check back soon!
            </p>
            <Link
              href="/"
              className="mt-4 inline-block text-rose-600 hover:text-rose-700 font-medium"
            >
              ← Back to home
            </Link>
          </div>
        )}

        {/* Quiz CTA */}
        <div className="mt-12 rounded-2xl bg-rose-100 p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Not sure which to pick?
          </h2>
          <p className="mt-2 text-gray-600">
            Take our 30-second quiz and we'll find the perfect match
          </p>
          <Link
            href="/quiz"
            className="mt-4 inline-block rounded-full bg-rose-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-rose-700"
          >
            Take the Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}
