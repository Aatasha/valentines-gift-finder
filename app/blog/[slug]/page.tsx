import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllBlogPosts, getBlogPostBySlug, getRelatedPosts } from '@/lib/blog-posts';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `https://valentinesgiftfinder.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  // JSON-LD structured data for the article
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: "Valentine's Gift Finder",
      url: 'https://valentinesgiftfinder.com',
    },
  };

  // FAQ schema for SEO (Google featured snippets)
  // Safe: content is from our own blog-posts.ts, not user-generated
  const faqJsonLd = post.faqs?.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  // Content is from our own blog-posts.ts file (trusted source),
  // not user-generated content, so dangerouslySetInnerHTML is safe here

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Blog article spacing styles - static CSS, safe to inline */}
      <style dangerouslySetInnerHTML={{ __html: `
        article h2 {
          font-size: 2.25rem !important;
          line-height: 2.5rem !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          margin-top: 5rem !important;
          margin-bottom: 2rem !important;
          padding-top: 3rem !important;
          border-top: 2px solid rgba(253, 248, 245, 0.15) !important;
        }
        article h3 {
          font-size: 1.875rem !important;
          line-height: 2.25rem !important;
          margin-top: 4rem !important;
          margin-bottom: 1.5rem !important;
          padding-top: 2rem !important;
          border-top: 1px solid rgba(253, 248, 245, 0.1) !important;
        }
        article p {
          margin-bottom: 1.5rem !important;
        }
        article ul, article ol {
          margin-top: 1.5rem !important;
          margin-bottom: 2rem !important;
        }
        article li {
          margin-bottom: 0.75rem !important;
        }
        article ul ul, article ol ul {
          list-style-type: disc !important;
          padding-left: 1.25rem !important;
          margin-top: 0.25rem !important;
          margin-bottom: 0.5rem !important;
        }
        article ul ul li, article ol ul li {
          margin-bottom: 0.35rem !important;
        }
        article a {
          text-decoration: none !important;
          transition: all 0.2s ease !important;
        }
        article a:hover {
          text-decoration: underline !important;
          text-underline-offset: 4px !important;
        }
        article p > a:only-child {
          display: inline-block !important;
          background: rgba(212, 175, 55, 0.1) !important;
          border: 1px solid rgba(212, 175, 55, 0.3) !important;
          border-radius: 0.5rem !important;
          padding: 0.75rem 1.25rem !important;
          margin-top: 0.5rem !important;
          font-weight: 500 !important;
          text-decoration: none !important;
        }
        article p > a:only-child:hover {
          background: rgba(212, 175, 55, 0.2) !important;
        }
        article table {
          width: 100% !important;
          border-collapse: collapse !important;
          margin: 2rem 0 !important;
          font-size: 0.95rem !important;
        }
        article thead {
          border-bottom: 2px solid rgba(212, 175, 55, 0.3) !important;
        }
        article th {
          text-align: left !important;
          padding: 0.75rem 1rem !important;
          color: rgba(253, 248, 245, 0.9) !important;
          font-weight: 600 !important;
          white-space: nowrap !important;
        }
        article td {
          padding: 0.75rem 1rem !important;
          color: rgba(253, 248, 245, 0.8) !important;
          border-bottom: 1px solid rgba(253, 248, 245, 0.1) !important;
        }
        article tbody tr:hover {
          background: rgba(253, 248, 245, 0.03) !important;
        }
      `}} />

      <div className="min-h-screen bg-[var(--background)]">
        {/* Header */}
        <header className="px-4 pt-12 pb-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[var(--cream)]/60 hover:text-[var(--cream)] mb-6"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>

            {/* Category badge */}
            <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-[var(--gold)]/20 text-[var(--gold)] mb-4">
              {post.category.replace('-', ' ')}
            </span>

            <h1 className="font-serif text-3xl font-semibold text-[var(--cream)] sm:text-4xl lg:text-5xl leading-tight">
              {post.title}
            </h1>

            <p className="mt-4 text-lg text-[var(--cream)]/70">
              {post.description}
            </p>

            <div className="mt-6 flex items-center gap-4 text-sm text-[var(--cream)]/50">
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
              <span>·</span>
              <span>{post.readingTime} min read</span>
            </div>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-full bg-[var(--cream)]/10 text-[var(--cream)]/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Article Content - content is from trusted source (blog-posts.ts) */}
        <article className="px-4 pb-12 sm:px-6 lg:px-8">
          <div
            className="mx-auto max-w-3xl prose prose-invert prose-lg
              prose-headings:font-serif prose-headings:text-[var(--cream)] prose-headings:font-semibold
              prose-h2:text-3xl sm:prose-h2:text-4xl prose-h2:mt-20 prose-h2:mb-8 prose-h2:pt-10 prose-h2:border-t-2 prose-h2:border-[var(--cream)]/20
              prose-h3:text-2xl sm:prose-h3:text-3xl prose-h3:mt-16 prose-h3:mb-5 prose-h3:pt-8 prose-h3:border-t prose-h3:border-[var(--cream)]/10
              prose-p:text-[var(--cream)]/80 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-[var(--gold)] prose-a:no-underline prose-a:transition-all hover:prose-a:underline hover:prose-a:underline-offset-4 hover:prose-a:text-[var(--gold-light)]
              prose-strong:text-[var(--cream)] prose-strong:font-semibold
              prose-ul:text-[var(--cream)]/80 prose-ul:my-6 prose-li:marker:text-[var(--gold)] prose-li:mb-3
              prose-ol:text-[var(--cream)]/80 prose-ol:my-6
              [&_.lead]:text-xl [&_.lead]:text-[var(--cream)]/90 [&_.lead]:leading-relaxed [&_.lead]:mb-8
              [&_.affiliate-notice]:text-sm [&_.affiliate-notice]:text-[var(--cream)]/50 [&_.affiliate-notice]:border-l-2 [&_.affiliate-notice]:border-[var(--gold)]/30 [&_.affiliate-notice]:pl-4 [&_.affiliate-notice]:my-8
              [&_.product-card]:bg-[var(--cream)]/5 [&_.product-card]:border [&_.product-card]:border-[var(--cream)]/10 [&_.product-card]:rounded-xl [&_.product-card]:p-6 [&_.product-card]:my-8
              [&_.product-card_h3]:mt-0 [&_.product-card_h3]:mb-3
              [&_.product-card_p:last-of-type]:mb-0
              [&_.cta-link]:inline-block [&_.cta-link]:bg-[var(--gold)]/10 [&_.cta-link]:border [&_.cta-link]:border-[var(--gold)]/30 [&_.cta-link]:rounded-lg [&_.cta-link]:px-4 [&_.cta-link]:py-2 [&_.cta-link]:mt-2 [&_.cta-link]:text-[var(--gold)] [&_.cta-link]:font-medium [&_.cta-link]:no-underline hover:[&_.cta-link]:bg-[var(--gold)]/20
              [&_p>a:only-child]:inline-block [&_p>a:only-child]:bg-[var(--gold)]/10 [&_p>a:only-child]:border [&_p>a:only-child]:border-[var(--gold)]/30 [&_p>a:only-child]:rounded-lg [&_p>a:only-child]:px-5 [&_p>a:only-child]:py-3 [&_p>a:only-child]:mt-2 [&_p>a:only-child]:font-medium [&_p>a:only-child]:no-underline hover:[&_p>a:only-child]:bg-[var(--gold)]/20"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* CTA Box */}
        <section className="px-4 pb-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-xl bg-gradient-to-br from-[var(--burgundy)] to-[var(--burgundy-dark)] p-8 text-center">
              <h2 className="font-serif text-2xl font-semibold text-white">
                Ready to find the perfect gift?
              </h2>
              <p className="mt-2 text-white/80">
                Our quiz matches you with personalised gift ideas in just 30 seconds
              </p>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 mt-6 rounded-lg bg-[var(--gold)] px-8 py-4 font-semibold text-[var(--charcoal)] hover:bg-[var(--gold-light)] transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M12 20 C8 16, 4 14, 4 9 C4 5, 7 3, 12 8 C17 3, 20 5, 20 9 C20 14, 16 16, 12 20" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
                Take the Gift Quiz
              </Link>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="px-4 pb-16 sm:px-6 lg:px-8 border-t border-[var(--cream)]/10">
            <div className="mx-auto max-w-3xl pt-12">
              <h2 className="font-serif text-2xl font-semibold text-[var(--cream)] mb-6">
                Related Articles
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group rounded-lg bg-[var(--cream)]/5 border border-[var(--cream)]/10 p-4 hover:border-[var(--gold)]/30 transition-colors"
                  >
                    <span className="text-xs text-[var(--gold)]">
                      {relatedPost.category.replace('-', ' ')}
                    </span>
                    <h3 className="mt-1 font-medium text-[var(--cream)] group-hover:text-[var(--gold)] transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--cream)]/50">
                      {relatedPost.readingTime} min read
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
