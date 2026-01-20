'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SearchBar } from '@/components/SearchBar';
import { AIGiftCard } from '@/components/AIGiftCard';
import { BrowseGiftCard } from '@/components/BrowseGiftCard';
import { getAllGifts } from '@/lib/gifts';
import type { Gift } from '@/lib/types';

interface AIGift {
  id: string;
  name: string;
  description: string;
  priceEstimate: string;
  whyItWorks: string;
  whereToBuy: string[];
  tags: string[];
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [aiResults, setAiResults] = useState<AIGift[]>([]);
  const [curatedResults, setCuratedResults] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Get query from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) {
      setQuery(q);
      handleSearch(q);
    }
  }, []);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setSearched(true);

    // Search curated database first
    const allGifts = getAllGifts();
    const localResults = allGifts.filter(
      (gift) =>
        gift.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gift.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gift.interests.some((interest) =>
          interest.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    setCuratedResults(localResults);

    // Then fetch AI suggestions
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (response.ok) {
        const data = await response.json();
        setAiResults(data.suggestions || []);
      }
    } catch (error) {
      console.error('AI search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Update URL
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(query)}`);
      handleSearch(query);
    }
  };

  const totalResults = curatedResults.length + aiResults.length;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 text-[var(--cream)]/70 hover:text-[var(--gold)]"
          >
            <svg className="h-4 w-6" viewBox="0 0 24 16" fill="none">
              <path d="M20 8 H8 M8 8 C10 6, 10 4, 8 4 M8 8 C10 10, 10 12, 8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="4" cy="8" r="2" stroke="currentColor" strokeWidth="1" fill="none"/>
            </svg>
            Back to home
          </Link>

          {/* Ornate header flourish */}
          <div className="mb-4 flex items-center gap-3">
            <svg className="h-6 w-16 text-[var(--gold)]" viewBox="0 0 64 24" fill="none">
              <path d="M32 12 C24 12, 20 4, 10 4 C4 4, 2 12, 2 12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M32 12 C24 12, 20 20, 10 20 C4 20, 2 12, 2 12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <circle cx="32" cy="12" r="2" fill="currentColor"/>
            </svg>
          </div>

          <h1 className="font-serif text-3xl font-semibold text-[var(--cream)] mb-4">
            Find the Perfect Gift
          </h1>

          <form onSubmit={handleSubmit} className="max-w-xl">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try: 'gift for my boyfriend who loves gaming'"
                className="w-full rounded-lg border border-[var(--gold)]/30 bg-[var(--cream)] py-4 pl-5 pr-14 text-[var(--charcoal)] placeholder-[var(--charcoal-light)] shadow-lg transition-all focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/20"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-[var(--gold)] p-3 text-[var(--burgundy-dark)] transition-colors hover:bg-[var(--gold-light)] disabled:bg-[var(--cream)]/30"
              >
                {loading ? (
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
                    <path d="M14.5 14.5 L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M18 18 C19 17, 21 17, 21 19" stroke="currentColor" strokeWidth="1"/>
                  </svg>
                )}
              </button>
            </div>
          </form>

          <p className="mt-3 text-sm text-[var(--cream)]/70">
            Describe who you're shopping for - our AI will find personalised suggestions
          </p>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            {/* Ornate loading flourish */}
            <div className="mb-4">
              <svg className="h-10 w-20 text-[var(--gold)] animate-pulse" viewBox="0 0 80 40" fill="none">
                <path d="M40 20 C30 20, 25 8, 15 8 C5 8, 2 20, 2 20" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M40 20 C50 20, 55 8, 65 8 C75 8, 78 20, 78 20" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M40 20 C30 20, 25 32, 15 32 C5 32, 2 20, 2 20" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M40 20 C50 20, 55 32, 65 32 C75 32, 78 20, 78 20" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <circle cx="40" cy="20" r="3" fill="currentColor"/>
              </svg>
            </div>
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[var(--cream)]/20 border-t-[var(--gold)]" />
            <p className="mt-4 text-[var(--cream)]/70">Finding perfect gifts...</p>
          </div>
        )}

        {/* Results */}
        {!loading && searched && (
          <>
            {totalResults > 0 ? (
              <div className="space-y-10">
                {/* AI Suggestions */}
                {aiResults.length > 0 && (
                  <section>
                    <div className="mb-4 flex items-center gap-3">
                      <svg className="h-4 w-8 text-[var(--gold)]" viewBox="0 0 32 16" fill="none">
                        <path d="M2 8 H28" stroke="currentColor" strokeWidth="1"/>
                        <circle cx="16" cy="8" r="3" stroke="currentColor" strokeWidth="1" fill="none"/>
                      </svg>
                      <h2 className="font-serif text-xl font-semibold text-[var(--cream)]">
                        AI Suggestions
                      </h2>
                      <span className="rounded-full bg-[var(--gold)]/20 px-3 py-0.5 text-xs font-medium text-[var(--gold)]">
                        Powered by AI
                      </span>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {aiResults.map((gift) => (
                        <AIGiftCard key={gift.id} gift={gift} />
                      ))}
                    </div>
                  </section>
                )}

                {/* Curated Results */}
                {curatedResults.length > 0 && (
                  <section>
                    <div className="mb-4 flex items-center gap-3">
                      <svg className="h-4 w-8 text-[var(--gold)]" viewBox="0 0 32 16" fill="none">
                        <path d="M2 8 H28" stroke="currentColor" strokeWidth="1"/>
                        <circle cx="16" cy="8" r="3" stroke="currentColor" strokeWidth="1" fill="none"/>
                      </svg>
                      <h2 className="font-serif text-xl font-semibold text-[var(--cream)]">
                        From Our Collection
                      </h2>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {curatedResults.map((gift) => (
                        <BrowseGiftCard key={gift.id} gift={gift} />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            ) : (
              <div className="rounded-lg bg-[var(--cream)]/10 border border-[var(--gold)]/30 p-12 text-center">
                <p className="text-lg text-[var(--cream)]/70">
                  No gifts found for "{query}"
                </p>
                <p className="mt-2 text-[var(--cream)]/70">
                  Try a different search term or{' '}
                  <Link href="/quiz" className="font-medium text-[var(--gold)] hover:text-[var(--gold-light)]">
                    take the quiz
                  </Link>{' '}
                  for personalised recommendations.
                </p>
              </div>
            )}
          </>
        )}

        {/* Initial State */}
        {!loading && !searched && (
          <div className="rounded-lg bg-[var(--cream)]/10 border border-[var(--gold)]/30 p-12 text-center">
            <div className="flex justify-center mb-4">
              <svg className="h-6 w-24 text-[var(--gold)]" viewBox="0 0 96 24" fill="none">
                <path d="M48 12 C40 12, 35 6, 24 6 C12 6, 8 12, 2 12" stroke="currentColor" strokeWidth="1" fill="none"/>
                <path d="M48 12 C56 12, 61 6, 72 6 C84 6, 88 12, 94 12" stroke="currentColor" strokeWidth="1" fill="none"/>
                <path d="M48 12 C40 12, 35 18, 24 18 C12 18, 8 12, 2 12" stroke="currentColor" strokeWidth="1" fill="none"/>
                <path d="M48 12 C56 12, 61 18, 72 18 C84 18, 88 12, 94 12" stroke="currentColor" strokeWidth="1" fill="none"/>
                <circle cx="48" cy="12" r="2" fill="currentColor"/>
              </svg>
            </div>
            <h2 className="font-serif text-xl font-semibold text-[var(--cream)]">
              Search for gift ideas
            </h2>
            <p className="mt-2 text-[var(--cream)]/70">
              Describe your partner and we'll suggest perfect Valentine's gifts
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {[
                'boyfriend who loves cooking',
                'girlfriend into fitness',
                'partner who has everything',
                'romantic experience',
              ].map((example) => (
                <button
                  key={example}
                  onClick={() => {
                    setQuery(example);
                    handleSearch(example);
                    window.history.pushState({}, '', `/search?q=${encodeURIComponent(example)}`);
                  }}
                  className="rounded-lg border border-[var(--cream)]/30 px-4 py-2 text-sm text-[var(--cream)]/70 transition-colors hover:border-[var(--gold)]/50 hover:bg-[var(--cream)]/10"
                >
                  "{example}"
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
