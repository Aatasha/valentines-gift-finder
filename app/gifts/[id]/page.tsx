import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getGiftById, getAllGifts, getPriceLabel, getRandomGifts } from '@/lib/gifts';
import { BrowseGiftCard } from '@/components/BrowseGiftCard';

const AMAZON_AFFILIATE_TAG = 'aanthony08-21';

function getAmazonSearchUrl(productName: string): string {
  const searchTerm = encodeURIComponent(productName);
  return `https://www.amazon.co.uk/s?k=${searchTerm}&tag=${AMAZON_AFFILIATE_TAG}`;
}

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

// Map vibes to emoji
const vibeEmoji: Record<string, string> = {
  romantic: '💕',
  practical: '🎁',
  experiential: '🎭',
  funny: '😄',
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

  const primaryEmoji = vibeEmoji[gift.vibe[0]] || '💝';

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-rose-600">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">{gift.name}</li>
          </ol>
        </nav>

        {/* Gift Details */}
        <article className="rounded-2xl bg-white p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-8">
            {/* Image Placeholder */}
            <div className="flex-shrink-0">
              <div className="flex h-48 w-48 items-center justify-center rounded-xl bg-gradient-to-br from-rose-100 to-pink-100">
                <span className="text-7xl" role="img" aria-hidden="true">
                  {primaryEmoji}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{gift.name}</h1>

              <p className="mt-4 text-lg text-gray-600">{gift.description}</p>

              {/* Price Badge */}
              <div className="mt-4">
                <span className="inline-flex items-center rounded-full bg-rose-100 px-4 py-2 text-lg font-semibold text-rose-700">
                  {getPriceLabel(gift.priceRange)}
                </span>
              </div>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {gift.vibe.map((v) => (
                  <span
                    key={v}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 capitalize"
                  >
                    {v}
                  </span>
                ))}
                {gift.recipientType.slice(0, 3).map((r) => (
                  <span
                    key={r}
                    className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700 capitalize"
                  >
                    For {r}
                  </span>
                ))}
              </div>

              {/* Notes */}
              {gift.notes && (
                <p className="mt-6 text-sm text-gray-500 italic">
                  💡 {gift.notes}
                </p>
              )}

              {/* Buy on Amazon Button */}
              <div className="mt-8">
                <a
                  href={getAmazonSearchUrl(gift.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#FF9900] px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-[#E88B00]"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                  Find on Amazon
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* Similar Gifts */}
        {similarGifts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Similar Gifts You Might Like
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similarGifts.map((g) => (
                <BrowseGiftCard key={g.id} gift={g} />
              ))}
            </div>
          </section>
        )}

        {/* Quiz CTA */}
        <div className="mt-12 rounded-xl bg-rose-100 p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Want more personalised suggestions?
          </h2>
          <p className="mt-2 text-gray-600">
            Take our quick quiz to find gifts tailored to your partner
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
