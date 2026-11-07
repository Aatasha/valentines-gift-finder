import Link from 'next/link';

// Short disclosure shown next to buy buttons (the full version lives in the footer).
// Callers set the text colour so it keeps enough contrast on light and dark backgrounds.
export function AffiliateNote({ className = '' }: { className?: string }) {
  return (
    <p className={`text-xs ${className}`}>
      We may earn a commission if you buy through these links, at no extra cost to you.{' '}
      <Link href="/how-we-pick" className="underline">
        How we pick
      </Link>
    </p>
  );
}
