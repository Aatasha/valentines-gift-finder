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
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 text-gray-600 hover:text-rose-600"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to home
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Find the Perfect Gift
          </h1>

          <form onSubmit={handleSubmit} className="max-w-xl">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try: 'gift for my boyfriend who loves gaming'"
                className="w-full rounded-full border-2 border-gray-200 bg-white py-4 pl-5 pr-14 text-gray-900 placeholder-gray-400 shadow-sm transition-all focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-rose-600 p-3 text-white transition-colors hover:bg-rose-700 disabled:bg-rose-300"
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
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
              </button>
            </div>
          </form>

          <p className="mt-3 text-sm text-gray-500">
            Describe who you're shopping for - our AI will find personalised suggestions
          </p>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-rose-200 border-t-rose-600" />
            <p className="mt-4 text-gray-600">Finding perfect gifts...</p>
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
                    <div className="mb-4 flex items-center gap-2">
                      <span className="text-2xl">✨</span>
                      <h2 className="text-xl font-bold text-gray-900">
                        AI Suggestions
                      </h2>
                      <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-700">
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
                    <div className="mb-4 flex items-center gap-2">
                      <span className="text-2xl">💝</span>
                      <h2 className="text-xl font-bold text-gray-900">
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
              <div className="rounded-lg bg-white p-12 text-center shadow-sm">
                <span className="text-5xl">🔍</span>
                <p className="mt-4 text-lg text-gray-600">
                  No gifts found for "{query}"
                </p>
                <p className="mt-2 text-gray-500">
                  Try a different search term or{' '}
                  <Link href="/quiz" className="font-medium text-rose-600 hover:text-rose-700">
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
          <div className="rounded-lg bg-white p-12 text-center shadow-sm">
            <span className="text-5xl">💝</span>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Search for gift ideas
            </h2>
            <p className="mt-2 text-gray-600">
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
                  className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-600 transition-colors hover:border-rose-300 hover:bg-rose-50"
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
