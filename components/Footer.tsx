import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Main footer content */}
        <div className="text-center text-sm text-gray-500">
          <p>
            Made with 💕 to help you find the perfect Valentine's gift
          </p>

          {/* Navigation links */}
          <div className="mt-4 flex justify-center gap-6">
            <Link href="/" className="hover:text-rose-600">
              Home
            </Link>
            <Link href="/quiz" className="hover:text-rose-600">
              Gift Quiz
            </Link>
            <Link href="/search" className="hover:text-rose-600">
              Search
            </Link>
          </div>

          {/* Amazon Associates Disclosure - REQUIRED */}
          <div className="mt-6 rounded-lg bg-gray-50 p-4">
            <p className="text-xs text-gray-500">
              <strong>Affiliate Disclosure:</strong> As an Amazon Associate I earn from qualifying purchases.
              This site contains affiliate links - if you click through and make a purchase,
              we may receive a small commission at no extra cost to you.
            </p>
          </div>

          <p className="mt-4">
            © {new Date().getFullYear()} Valentine's Gift Finder
          </p>
        </div>
      </div>
    </footer>
  );
}
