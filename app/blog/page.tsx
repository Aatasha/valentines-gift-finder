import Link from 'next/link';
import { Metadata } from 'next';
import { getAllBlogPosts } from '@/lib/blog-posts';

export const metadata: Metadata = {
  title: "Valentine's Gift Ideas Blog | Tips, Guides & Inspiration",
  description:
    "Expert gift guides, creative ideas, and tips to help you find the perfect Valentine's gift. Updated weekly with fresh inspiration.",
  openGraph: {
    title: "Valentine's Gift Ideas Blog",
    description: "Expert gift guides and creative Valentine's gift ideas",
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <section className="px-4 pt-12 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--cream)]/60 hover:text-[var(--cream)] mb-6"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Gift Finder
          </Link>

          <h1 className="font-serif text-3xl font-semibold text-[var(--cream)] sm:text-4xl">
            Gift Ideas & Inspiration
          </h1>
          <p className="mt-3 text-lg text-[var(--cream)]/70">
            Expert guides to help you find the perfect Valentine's gift
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[var(--cream)]/60">
                Blog posts coming soon! In the meantime, try our gift quiz.
              </p>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 mt-4 rounded-lg bg-[var(--gold)] px-6 py-3 font-medium text-[var(--charcoal)] hover:bg-[var(--gold-light)]"
              >
                Take the Gift Quiz
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {posts.map((post, index) => (
                <article
                  key={post.slug}
                  className={`group rounded-xl bg-[var(--cream)]/5 border border-[var(--cream)]/10 overflow-hidden hover:border-[var(--gold)]/30 transition-colors ${
                    index === 0 ? 'md:grid md:grid-cols-5 md:gap-6' : ''
                  }`}
                >
                  <div className={`p-6 ${index === 0 ? 'md:col-span-3' : ''}`}>
                    {/* Category badge */}
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-[var(--gold)]/20 text-[var(--gold)] mb-3">
                      {post.category.replace('-', ' ')}
                    </span>

                    <Link href={`/blog/${post.slug}`}>
                      <h2 className={`font-serif font-semibold text-[var(--cream)] group-hover:text-[var(--gold)] transition-colors ${
                        index === 0 ? 'text-2xl' : 'text-xl'
                      }`}>
                        {post.title}
                      </h2>
                    </Link>

                    <p className="mt-2 text-[var(--cream)]/70 line-clamp-2">
                      {post.description}
                    </p>

                    <div className="mt-4 flex items-center gap-4 text-sm text-[var(--cream)]/50">
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </time>
                      <span>·</span>
                      <span>{post.readingTime} min read</span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 mt-4 text-[var(--gold)] hover:text-[var(--gold-light)] font-medium"
                    >
                      Read more
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>

                  {/* Featured image placeholder for first post */}
                  {index === 0 && (
                    <div className="hidden md:block md:col-span-2 bg-gradient-to-br from-[var(--burgundy)]/20 to-[var(--gold)]/10">
                      <div className="h-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-[var(--gold)]/30" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-xl bg-[var(--cream)] p-8 text-center">
            <h2 className="font-serif text-xl font-semibold text-[var(--burgundy-dark)]">
              Not sure what to get?
            </h2>
            <p className="mt-2 text-[var(--charcoal-light)]">
              Our quiz matches you with personalised gift ideas in 30 seconds
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 mt-4 rounded-lg bg-[var(--burgundy)] px-6 py-3 font-medium text-white hover:bg-[var(--burgundy-dark)]"
            >
              Take the Gift Quiz
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
