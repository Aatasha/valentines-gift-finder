import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME, SITE_ORGANIZATION, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    "What Valentine's Gift Finder is, how the site makes money, and how to get in touch.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: `About ${SITE_NAME}`,
    url: `${SITE_URL}/about`,
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: { title: `About ${SITE_NAME}` },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: `${SITE_URL}/about`,
  mainEntity: SITE_ORGANIZATION,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--cream)] px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-sm text-[var(--burgundy)] hover:text-[var(--burgundy-dark)]"
        >
          ← Back to Home
        </Link>

        <h1 className="font-serif text-3xl text-[var(--burgundy-dark)] mb-8">About {SITE_NAME}</h1>

        <div className="space-y-6 text-[var(--burgundy)]">
          <p>
            {SITE_NAME} is a small, independent UK site. It exists to help you find a Valentine&apos;s gift that fits the person you&apos;re buying for,
            without wading through a 50-item listicle.
          </p>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">What you&apos;ll find here</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Gift guides written for UK shoppers: UK retailers, prices in pounds and UK delivery
                times.
              </li>
              <li>
                A short <Link href="/quiz" className="underline">gift quiz</Link> that suggests ideas
                from your answers about your partner, your budget and the kind of gift you want to give.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">How the site makes money</h2>
            <p>
              Some links are affiliate links. As an Amazon Associate we earn from qualifying purchases,
              and we may earn a commission from other retailers too. It costs you nothing extra.
              Brands don&apos;t pay to be included, and commission doesn&apos;t decide what makes a
              list. Read <Link href="/how-we-pick" className="underline">how we pick gifts</Link>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[var(--burgundy-dark)] mt-8 mb-4">Get in touch</h2>
            <p>
              Spotted a broken link, a price that&apos;s changed, or a gift we should add? Email{' '}
              <strong>hello@valentinesgiftfinder.co.uk</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
