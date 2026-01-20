import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCategoryBySlug, getAllCategories } from '@/lib/categories';
import { filterGiftsByCategory } from '@/lib/gifts';
import { BrowseGiftCard } from '@/components/BrowseGiftCard';
import { CategoryAISuggestions } from '@/components/CategoryAISuggestions';

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
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="flex items-center gap-2 text-[var(--cream)]/70 hover:text-[var(--gold)]">
                <svg className="h-3 w-4" viewBox="0 0 16 12" fill="none">
                  <path d="M14 6 H4 M4 6 C6 4, 6 2, 4 2 M4 6 C6 8, 6 10, 4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Home
              </Link>
            </li>
            <li className="text-[var(--cream)]/50">/</li>
            <li className="text-[var(--gold)] font-medium">{category.name}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-8 text-center sm:text-left">
          {/* Ornate flourish */}
          <div className="flex items-center justify-center gap-3 sm:justify-start mb-4">
            <svg className="h-6 w-16 text-[var(--gold)]" viewBox="0 0 64 24" fill="none">
              <path d="M32 12 C24 12, 20 4, 10 4 C4 4, 2 12, 2 12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M32 12 C24 12, 20 20, 10 20 C4 20, 2 12, 2 12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <circle cx="32" cy="12" r="2" fill="currentColor"/>
            </svg>
          </div>
          <h1 className="font-serif text-3xl font-semibold text-[var(--cream)] sm:text-4xl">
            {category.name}
          </h1>
          <p className="mt-2 text-lg text-[var(--cream)]/80">
            {category.description}
          </p>
          <p className="mt-1 text-sm text-[var(--cream)]/60">
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
          <div className="rounded-lg bg-[var(--cream)]/10 border border-[var(--gold)]/30 p-12 text-center">
            <p className="text-lg text-[var(--cream)]/70">
              No gifts found in this category yet. Check back soon!
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex items-center gap-2 text-[var(--gold)] hover:text-[var(--gold-light)] font-medium"
            >
              <svg className="h-3 w-4" viewBox="0 0 16 12" fill="none">
                <path d="M14 6 H4 M4 6 C6 4, 6 2, 4 2 M4 6 C6 8, 6 10, 4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Back to home
            </Link>
          </div>
        )}

        {/* AI-Powered Suggestions */}
        <CategoryAISuggestions
          categoryName={category.name}
          categoryDescription={category.description}
        />

        {/* Quiz CTA */}
        <div className="mt-12 rounded-lg bg-[var(--cream)] p-8 text-center">
          <div className="mb-4 flex justify-center">
            <svg className="h-8 w-16 text-[var(--burgundy)]" viewBox="0 0 64 32" fill="none">
              <path d="M32 28 C24 20, 12 20, 12 12 C12 4, 20 4, 32 14 C44 4, 52 4, 52 12 C52 20, 40 20, 32 28" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M4 16 C12 16, 16 16, 20 14" stroke="currentColor" strokeWidth="1"/>
              <path d="M60 16 C52 16, 48 16, 44 14" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </div>
          <h2 className="font-serif text-xl font-semibold text-[var(--burgundy-dark)]">
            Not sure which to pick?
          </h2>
          <p className="mt-2 text-[var(--charcoal-light)]">
            Take our 30-second quiz and we'll find the perfect match
          </p>
          <Link
            href="/quiz"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[var(--burgundy)] px-8 py-3 font-medium text-white transition-colors hover:bg-[var(--burgundy-dark)]"
          >
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
              <path d="M8 14 C5 11, 2 9, 2 5 C2 2, 4 1, 8 5 C12 1, 14 2, 14 5 C14 9, 11 11, 8 14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
            Take the Quiz
            <svg className="h-4 w-6" viewBox="0 0 24 16" fill="none">
              <path d="M4 8 H16 M16 8 C14 6, 14 4, 16 4 M16 8 C14 10, 14 12, 16 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="20" cy="8" r="2" stroke="currentColor" strokeWidth="1" fill="none"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
