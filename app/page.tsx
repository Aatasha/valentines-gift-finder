import Link from 'next/link';
import { SearchBar } from '@/components/SearchBar';
import { CategoryGrid } from '@/components/CategoryGrid';
import { ValentineCountdown } from '@/components/ValentineCountdown';

// JSON-LD structured data for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://valentinesgiftfinder.com/#website',
      url: 'https://valentinesgiftfinder.com',
      name: "Valentine's Gift Finder",
      description: "Find the perfect Valentine's gift with our AI-powered quiz and curated recommendations.",
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://valentinesgiftfinder.com/search?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://valentinesgiftfinder.com/#organization',
      name: "Valentine's Gift Finder",
      url: 'https://valentinesgiftfinder.com',
      logo: 'https://valentinesgiftfinder.com/og-image.png',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does the Valentine\'s gift quiz work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our quiz asks you a few simple questions about your partner - their personality, interests, and your budget. Our AI then suggests personalised gift ideas tailored to your answers.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does the gift quiz take?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The quiz takes less than 30 seconds to complete. You\'ll receive personalised gift recommendations immediately after.',
          },
        },
        {
          '@type': 'Question',
          name: 'What types of Valentine\'s gifts can I find?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We offer a wide range of gifts including romantic presents, experience days, tech gadgets, personalised items, luxury gifts, and budget-friendly options for all relationships.',
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      {/* JSON-LD structured data for SEO - static content, safe to use */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section - Quiz as Primary */}
      <section className="px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Ornate brand flourish */}
          <div className="mb-6 flex justify-center">
            <svg className="h-8 w-32 text-[var(--gold)]" viewBox="0 0 120 30" fill="none">
              <path d="M60 15 C50 15, 45 5, 30 5 C15 5, 10 15, 5 15" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M60 15 C70 15, 75 5, 90 5 C105 5, 110 15, 115 15" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M60 15 C50 15, 45 25, 30 25 C15 25, 10 15, 5 15" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M60 15 C70 15, 75 25, 90 25 C105 25, 110 15, 115 15" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <circle cx="60" cy="15" r="3" fill="currentColor"/>
            </svg>
          </div>

          {/* Countdown badge */}
          <div className="mb-8 flex justify-center">
            <ValentineCountdown />
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-[var(--cream)] sm:text-5xl lg:text-6xl">
            Find Their{' '}
            <span className="text-[var(--gold)]">Perfect Gift</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--cream)]/80">
            Answer a few questions and discover Valentine's gifts
            tailored to your partner's personality.
          </p>

          {/* Primary Quiz CTA */}
          <div className="mt-10">
            <Link
              href="/quiz"
              className="group inline-flex items-center gap-3 rounded-lg bg-[var(--gold)] px-10 py-5 text-xl font-semibold text-[var(--charcoal)] shadow-lg transition-all hover:bg-[var(--gold-light)] hover:shadow-xl hover:scale-[1.02]"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                <path d="M12 20 C8 16, 4 14, 4 9 C4 5, 7 3, 12 8 C17 3, 20 5, 20 9 C20 14, 16 16, 12 20" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
              Start the Gift Quiz
              <svg className="h-6 w-6 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none">
                <path d="M5 12 H16 M16 12 C14 10, 14 8, 16 8 M16 12 C14 14, 14 16, 16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="19" cy="12" r="2" fill="currentColor"/>
              </svg>
            </Link>
          </div>

          <p className="mt-4 text-sm text-[var(--cream)]/60">
            Takes less than 30 seconds
          </p>
        </div>
      </section>

      {/* Ornate Divider */}
      <div className="flex justify-center py-4">
        <svg className="h-6 w-48 text-[var(--gold)]/40" viewBox="0 0 200 24" fill="none">
          <path d="M0 12 H80 M120 12 H200" stroke="currentColor" strokeWidth="1"/>
          <path d="M90 12 C90 6, 100 2, 100 12 C100 2, 110 6, 110 12 C110 6, 100 22, 100 12 C100 22, 90 18, 90 12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
      </div>

      {/* Search Alternative Section */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[var(--cream)]/60 mb-4">
            Already know what you're looking for?
          </p>
          <div className="flex justify-center">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Second Ornate Divider */}
      <div className="flex justify-center py-4">
        <svg className="h-4 w-32 text-[var(--gold)]/30" viewBox="0 0 120 16" fill="none">
          <path d="M0 8 H50 M70 8 H120" stroke="currentColor" strokeWidth="1"/>
          <circle cx="60" cy="8" r="4" stroke="currentColor" strokeWidth="1" fill="none"/>
        </svg>
      </div>

      {/* Categories Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-serif text-2xl font-semibold text-[var(--cream)] text-center mb-10">
            Browse by Category
          </h2>
          <CategoryGrid />
        </div>
      </section>

      {/* Bottom CTA - Different approach (browse all) */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-lg bg-[var(--cream)] shadow-xl">
            <div className="px-8 py-10 text-center sm:px-12">
              {/* Decorative flourish */}
              <div className="mb-4 flex justify-center">
                <svg className="h-8 w-16 text-[var(--burgundy)]" viewBox="0 0 64 32" fill="none">
                  <path d="M32 28 C24 20, 12 20, 12 12 C12 4, 20 4, 32 14 C44 4, 52 4, 52 12 C52 20, 40 20, 32 28" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M4 16 C12 16, 16 16, 20 14" stroke="currentColor" strokeWidth="1"/>
                  <path d="M60 16 C52 16, 48 16, 44 14" stroke="currentColor" strokeWidth="1"/>
                </svg>
              </div>

              <h2 className="font-serif text-xl font-semibold text-[var(--burgundy-dark)] sm:text-2xl">
                Want to see everything?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[var(--charcoal-light)]">
                Explore our full collection of curated Valentine's gifts
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/category/romantic"
                  className="inline-flex items-center gap-2 rounded bg-[var(--burgundy)] px-6 py-3 font-medium text-white transition-colors hover:bg-[var(--burgundy-dark)]"
                >
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                    <path d="M8 14 C5 11, 2 9, 2 5 C2 2, 4 1, 8 5 C12 1, 14 2, 14 5 C14 9, 11 11, 8 14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  </svg>
                  Romantic Gifts
                </Link>
                <Link
                  href="/category/experiences"
                  className="inline-flex items-center gap-2 rounded border-2 border-[var(--burgundy)] px-6 py-3 font-medium text-[var(--burgundy)] transition-colors hover:bg-[var(--burgundy)]/10"
                >
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2 L9 6 L13 5 L10 8 L13 11 L9 10 L8 14 L7 10 L3 11 L6 8 L3 5 L7 6 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  </svg>
                  Experiences
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
