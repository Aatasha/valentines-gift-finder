import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'How We Pick Gifts',
  description:
    "How Valentine's Gift Finder chooses the gifts in its guides and quiz, how often they're checked, and what we don't do.",
  alternates: {
    canonical: `${SITE_URL}/how-we-pick`,
  },
  openGraph: {
    title: 'How We Pick Gifts',
    url: `${SITE_URL}/how-we-pick`,
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: { title: 'How We Pick Gifts' },
};

export default function HowWePickPage() {
  return (
    <div className="min-h-screen bg-[var(--cream)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-sm text-[var(--burgundy)] hover:text-[var(--burgundy-dark)]"
        >
          ← Back to Home
        </Link>

        <h1 className="font-serif text-3xl text-[var(--burgundy-dark)] mb-8">How we pick gifts</h1>

        <div className="space-y-6 text-[var(--burgundy)]">
          <p>
            Every guide starts from a real question people ask, such as &quot;what do I get my
            boyfriend of three months?&quot; or &quot;what can still arrive by the 14th?&quot;, not from a
            list of products we want to sell.
          </p>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">Our process</h2>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Shortlist from UK retailers.</strong> We look at retailer listings, verified-buyer
                reviews and other UK gift guides. Most picks come from this research rather than
                hands-on testing, and we don&apos;t claim to have tried everything.
              </li>
              <li>
                <strong>Check it&apos;s buyable.</strong> At the time of writing, each gift is in stock
                with UK delivery. Prices are correct when we check them, but retailers change them
                often, so confirm the price before you buy.
              </li>
              <li>
                <strong>Say who it suits.</strong> Each pick explains the kind of person and
                relationship it fits, so you can rule things out quickly.
              </li>
              <li>
                <strong>Refresh before Valentine&apos;s.</strong> Before each season we re-check
                links, prices and delivery cut-offs. Each guide shows when it was published or last
                updated.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">About the quiz</h2>
            <p>
              The <Link href="/quiz" className="underline">quiz</Link> uses AI to suggest gift ideas
              based on your answers. Each suggestion links to matching search results on Amazon UK,
              so check product details, price and delivery before you buy.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">What we don&apos;t do</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We don&apos;t accept payment to include a product.</li>
              <li>We don&apos;t invent ratings or reviews. When we quote a rating, we say where it comes from.</li>
              <li>
                We don&apos;t let commission decide a pick. Some links earn us a small fee (see{' '}
                <Link href="/about" className="underline">about us</Link>), and many don&apos;t.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
