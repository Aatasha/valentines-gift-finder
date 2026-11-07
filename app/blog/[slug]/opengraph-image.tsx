import { ImageResponse } from 'next/og';
import { getBlogPostBySlug } from '@/lib/blog-posts';

// Per-post social card (also used for Pinterest and link previews)
export const alt = "Valentine's Gift Finder";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  const title = post?.title ?? "Valentine's Gift Finder";

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: 'linear-gradient(135deg, #722F37 0%, #4A1F24 100%)',
          color: '#FDF8F5',
        }}
      >
        <div style={{ display: 'flex', fontSize: 30, color: '#D4AF37', letterSpacing: 2 }}>
          VALENTINE&apos;S GIFT FINDER
        </div>
        <div style={{ display: 'flex', fontSize: 64, lineHeight: 1.15 }}>{title}</div>
        <div style={{ display: 'flex', fontSize: 28, opacity: 0.75 }}>
          Curated UK gift ideas · valentinesgiftfinder.com
        </div>
      </div>
    ),
    size
  );
}
