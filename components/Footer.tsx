import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-[var(--gold)]/20 bg-[var(--burgundy-dark)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Main footer content */}
        <div className="text-center">
          {/* Ornate brand flourish */}
          <div className="mb-4 flex justify-center">
            <svg className="h-6 w-24 text-[var(--gold)]" viewBox="0 0 96 24" fill="none">
              <path d="M48 12 C40 12, 35 6, 24 6 C12 6, 8 12, 2 12" stroke="currentColor" strokeWidth="1" fill="none"/>
              <path d="M48 12 C56 12, 61 6, 72 6 C84 6, 88 12, 94 12" stroke="currentColor" strokeWidth="1" fill="none"/>
              <path d="M48 12 C40 12, 35 18, 24 18 C12 18, 8 12, 2 12" stroke="currentColor" strokeWidth="1" fill="none"/>
              <path d="M48 12 C56 12, 61 18, 72 18 C84 18, 88 12, 94 12" stroke="currentColor" strokeWidth="1" fill="none"/>
              <circle cx="48" cy="12" r="2" fill="currentColor"/>
            </svg>
          </div>
          <p className="font-serif text-lg text-[var(--cream)]">
            Valentine's Gift Finder
          </p>
          <p className="mt-1 text-sm text-[var(--cream)]/70">
            Curated gifts for the ones you love
          </p>

          {/* Navigation links */}
          <div className="mt-6 flex justify-center gap-8">
            <Link href="/" className="text-sm text-[var(--cream)]/70 hover:text-[var(--gold)] transition-colors">
              Home
            </Link>
            <Link href="/quiz" className="text-sm text-[var(--cream)]/70 hover:text-[var(--gold)] transition-colors">
              Gift Quiz
            </Link>
            <Link href="/search" className="text-sm text-[var(--cream)]/70 hover:text-[var(--gold)] transition-colors">
              Search
            </Link>
          </div>

          {/* Legal links */}
          <div className="mt-4 flex justify-center gap-6">
            <Link href="/privacy" className="text-xs text-[var(--cream)]/50 hover:text-[var(--gold)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-[var(--cream)]/50 hover:text-[var(--gold)] transition-colors">
              Terms of Service
            </Link>
          </div>

          {/* Affiliate Disclosure - REQUIRED FOR COMPLIANCE */}
          <div className="mt-8 rounded-lg bg-[var(--burgundy)]/50 p-4 max-w-2xl mx-auto">
            <p className="text-xs text-[var(--cream)]/60">
              <span className="font-medium text-[var(--cream)]/80">Affiliate Disclosure:</span> This
              site contains affiliate links from partners including Amazon, Etsy, and Virgin Experience
              Days. As an Amazon Associate and affiliate partner, we earn from qualifying purchases. If
              you click through and make a purchase, we may receive a small commission at no extra cost
              to you. This helps support the site and allows us to continue providing gift recommendations.
            </p>
          </div>

          <p className="mt-6 text-xs text-[var(--cream)]/50">
            © {new Date().getFullYear()} Valentine's Gift Finder
          </p>
        </div>
      </div>
    </footer>
  );
}
