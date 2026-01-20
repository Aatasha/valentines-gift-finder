import Link from 'next/link';
import { SearchBar } from '@/components/SearchBar';
import { CategoryGrid } from '@/components/CategoryGrid';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50">
      {/* Hero Section */}
      <section className="px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Logo/Brand */}
          <div className="mb-6 flex justify-center">
            <span className="text-6xl" role="img" aria-label="Valentine's heart">
              💝
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Find Their{' '}
            <span className="text-rose-600">Perfect Gift</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Discover thoughtful Valentine's gifts curated for every personality,
            budget, and relationship. Because they deserve more than chocolates.
          </p>

          {/* Search Bar */}
          <div className="mt-8 flex justify-center">
            <SearchBar />
          </div>

          {/* Quiz Link */}
          <p className="mt-4 text-gray-500">
            or{' '}
            <Link
              href="/quiz"
              className="font-medium text-rose-600 underline underline-offset-2 hover:text-rose-700"
            >
              take the 30-second quiz
            </Link>
            {' '}for personalised picks
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <CategoryGrid />
        </div>
      </section>

      {/* Quiz CTA Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500 to-pink-500 shadow-xl">
            <div className="px-8 py-12 text-center sm:px-12 sm:py-16">
              <span className="text-5xl" role="img" aria-hidden="true">
                🎯
              </span>
              <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                Not sure what to get?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-lg text-rose-100">
                Answer a few quick questions about your partner and we'll suggest
                the perfect gifts tailored to their personality.
              </p>
              <Link
                href="/quiz"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-rose-600 shadow-lg transition-all hover:bg-rose-50 hover:shadow-xl"
              >
                Take the Quiz
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <p className="mt-4 text-sm text-rose-200">
                Takes less than 30 seconds
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
