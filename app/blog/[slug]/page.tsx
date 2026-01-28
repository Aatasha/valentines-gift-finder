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

  // Note: Content is from our own blog-posts.ts file (trusted source),
  // not user-generated content, so dangerouslySetInnerHTML is safe here

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-[var(--cream)]/80 prose-p:leading-relaxed
              prose-a:text-[var(--gold)] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-[var(--cream)] prose-strong:font-semibold
              prose-ul:text-[var(--cream)]/80 prose-li:marker:text-[var(--gold)]
              prose-ol:text-[var(--cream)]/80
              [&_.lead]:text-xl [&_.lead]:text-[var(--cream)]/90 [&_.lead]:leading-relaxed [&_.lead]:mb-6"
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
