import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getGiftById, getAllGifts, getPriceLabel, getRandomGifts } from '@/lib/gifts';
import { BrowseGiftCard } from '@/components/BrowseGiftCard';
import { getRetailerSearchUrl } from '@/lib/retailers';

interface GiftPageProps {
  params: Promise<{ id: string }>;
}

// Generate static paths for all gifts
export async function generateStaticParams() {
  const gifts = getAllGifts();
  return gifts.map((gift) => ({
    id: gift.id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: GiftPageProps): Promise<Metadata> {
  const { id } = await params;
  const gift = getGiftById(id);

  if (!gift) {
    return {
      title: 'Gift Not Found',
    };
  }

  return {
    title: `${gift.name} | Valentine's Gift Finder`,
    description: `${gift.description}. ${getPriceLabel(gift.priceRange)}. Perfect for ${gift.recipientType.join(' or ')}.`,
  };
}

// Map vibes to accent colors
const vibeColors: Record<string, string> = {
  romantic: 'bg-[var(--burgundy)]',
  practical: 'bg-[var(--gold)]',
  experiential: 'bg-[var(--burgundy-light)]',
  funny: 'bg-[var(--gold-light)]',
};

export default async function GiftPage({ params }: GiftPageProps) {
  const { id } = await params;
  const gift = getGiftById(id);

  if (!gift) {
    notFound();
  }

  // Get similar gifts (same vibe, different gift)
  const similarGifts = getRandomGifts(3, { vibe: gift.vibe[0] as 'romantic' | 'practical' | 'experiential' | 'funny' })
    .filter((g) => g.id !== gift.id)
    .slice(0, 3);

  const accentColor = vibeColors[gift.vibe[0]] || 'bg-[var(--burgundy)]';

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
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
            <li className="text-[var(--gold)] font-medium line-clamp-1">{gift.name}</li>
          </ol>
        </nav>

        {/* Gift Details */}
        <article className="rounded-lg border border-gray-200 bg-white p-8">
          <div className="flex flex-col sm:flex-row gap-8">
            {/* Accent Color Block with ornate design */}
            <div className="flex-shrink-0">
              <div className={`h-48 w-48 rounded-lg ${accentColor} flex items-center justify-center relative`}>
                {/* Ornate inner decoration */}
                <svg className="h-20 w-20 text-white/30" viewBox="0 0 80 80" fill="none">
                  <path d="M40 60 C30 50, 15 50, 15 35 C15 20, 25 20, 40 35 C55 20, 65 20, 65 35 C65 50, 50 50, 40 60" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4"/>
                </svg>
              </div>
            </div>

            {/* Details */}
            <div className="flex-1">
              <h1 className="font-serif text-3xl font-semibold text-[var(--charcoal)]">{gift.name}</h1>

              <p className="mt-4 text-lg text-[var(--charcoal-light)]">{gift.description}</p>

              {/* Price Badge */}
              <div className="mt-4">
                <span className="inline-flex items-center rounded-lg bg-[var(--cream-dark)] px-4 py-2 text-lg font-medium text-[var(--burgundy)]">
                  {getPriceLabel(gift.priceRange)}
                </span>
              </div>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {gift.vibe.map((v) => (
                  <span
                    key={v}
                    className="rounded-lg bg-[var(--cream-dark)] px-3 py-1 text-sm text-[var(--charcoal-light)] capitalize"
                  >
                    {v}
                  </span>
                ))}
                {gift.recipientType.slice(0, 3).map((r) => (
                  <span
                    key={r}
                    className="rounded-lg bg-[var(--burgundy)]/10 px-3 py-1 text-sm text-[var(--burgundy)] capitalize"
                  >
                    For {r}
                  </span>
                ))}
              </div>

              {/* Notes */}
              {gift.notes && (
                <p className="mt-6 text-sm text-[var(--charcoal-light)] italic border-l-2 border-[var(--gold)] pl-3">
                  {gift.notes}
                </p>
              )}

              {/* Buy on Amazon Button */}
              <div className="mt-8">
                <a
                  href={getRetailerSearchUrl('amazon', gift) || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--burgundy)] px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-[var(--burgundy-dark)]"
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none">
                    <path d="M10 18 C6 14, 2 12, 2 7 C2 3, 5 1, 10 6 C15 1, 18 3, 18 7 C18 12, 14 14, 10 18" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  </svg>
                  Find on Amazon
                  <svg className="h-4 w-6" viewBox="0 0 24 16" fill="none">
                    <path d="M4 8 H16 M16 8 C14 6, 14 4, 16 4 M16 8 C14 10, 14 12, 16 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="20" cy="8" r="2" stroke="currentColor" strokeWidth="1" fill="none"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* Similar Gifts */}
        {similarGifts.length > 0 && (
          <section className="mt-12">
            <div className="mb-6 flex items-center gap-3">
              <svg className="h-4 w-8 text-[var(--gold)]" viewBox="0 0 32 16" fill="none">
                <path d="M2 8 H28" stroke="currentColor" strokeWidth="1"/>
                <circle cx="16" cy="8" r="3" stroke="currentColor" strokeWidth="1" fill="none"/>
              </svg>
              <h2 className="font-serif text-xl font-semibold text-[var(--cream)]">
                Similar Gifts You Might Like
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similarGifts.map((g) => (
                <BrowseGiftCard key={g.id} gift={g} />
              ))}
            </div>
          </section>
        )}

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
            Want more personalised suggestions?
          </h2>
          <p className="mt-2 text-[var(--charcoal-light)]">
            Take our quick quiz to find gifts tailored to your partner
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
