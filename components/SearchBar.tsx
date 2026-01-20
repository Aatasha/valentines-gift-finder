'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe who you're shopping for..."
          className="w-full rounded-lg border border-[var(--gold)]/30 bg-[var(--cream)] py-4 pl-5 pr-14 text-[var(--charcoal)] placeholder-[var(--charcoal-light)] shadow-lg transition-all focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-[var(--gold)] p-3 text-[var(--burgundy-dark)] transition-colors hover:bg-[var(--gold-light)]"
          aria-label="Search"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
            <path d="M14.5 14.5 L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M18 18 C19 17, 21 17, 21 19" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </button>
      </div>
    </form>
  );
}
