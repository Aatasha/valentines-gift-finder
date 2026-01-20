'use client';

import { useState, useEffect } from 'react';
import { AIGiftCard } from './AIGiftCard';

interface AIGiftSuggestion {
  id: string;
  name: string;
  description: string;
  priceEstimate: string;
  whyItWorks: string;
  whereToBuy: string[];
  tags: string[];
}

interface CategoryAISuggestionsProps {
  categoryName: string;
  categoryDescription: string;
}

export function CategoryAISuggestions({ categoryName, categoryDescription }: CategoryAISuggestionsProps) {
  const [suggestions, setSuggestions] = useState<AIGiftSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSuggestions() {
      setIsLoading(true);
      setError(null);

      try {
        // Build a query based on the category
        const query = `Valentine's Day ${categoryName.toLowerCase()} gifts - ${categoryDescription}`;

        const response = await fetch('/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch suggestions');
        }

        const data = await response.json();
        setSuggestions(data.suggestions || []);
      } catch (err) {
        console.error('Error fetching AI suggestions:', err);
        setError('Unable to load AI suggestions');
      } finally {
        setIsLoading(false);
      }
    }

    fetchSuggestions();
  }, [categoryName, categoryDescription]);

  if (isLoading) {
    return (
      <div className="mt-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <svg className="h-4 w-8 text-[var(--gold)]" viewBox="0 0 32 16" fill="none">
            <path d="M2 8 H28" stroke="currentColor" strokeWidth="1"/>
            <circle cx="16" cy="8" r="3" stroke="currentColor" strokeWidth="1" fill="none"/>
          </svg>
          <h2 className="font-serif text-xl font-semibold text-[var(--cream)]">
            AI-Powered Suggestions
          </h2>
          <svg className="h-4 w-8 text-[var(--gold)]" viewBox="0 0 32 16" fill="none">
            <path d="M2 8 H28" stroke="currentColor" strokeWidth="1"/>
            <circle cx="16" cy="8" r="3" stroke="currentColor" strokeWidth="1" fill="none"/>
          </svg>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-gray-200 p-5 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-20 mb-3" />
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-full mb-4" />
              <div className="h-8 bg-gray-200 rounded w-24" />
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-[var(--cream)]/60 mt-4">
          Finding personalised gift ideas...
        </p>
      </div>
    );
  }

  if (error || suggestions.length === 0) {
    return null; // Silently fail - we still have static gifts
  }

  return (
    <div className="mt-12">
      <div className="flex items-center justify-center gap-3 mb-6">
        <svg className="h-4 w-8 text-[var(--gold)]" viewBox="0 0 32 16" fill="none">
          <path d="M2 8 H28" stroke="currentColor" strokeWidth="1"/>
          <circle cx="16" cy="8" r="3" stroke="currentColor" strokeWidth="1" fill="none"/>
        </svg>
        <h2 className="font-serif text-xl font-semibold text-[var(--cream)]">
          AI-Powered Suggestions
        </h2>
        <svg className="h-4 w-8 text-[var(--gold)]" viewBox="0 0 32 16" fill="none">
          <path d="M2 8 H28" stroke="currentColor" strokeWidth="1"/>
          <circle cx="16" cy="8" r="3" stroke="currentColor" strokeWidth="1" fill="none"/>
        </svg>
      </div>
      <p className="text-center text-sm text-[var(--cream)]/60 mb-6">
        Personalised recommendations based on current trends
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {suggestions.map((gift) => (
          <AIGiftCard key={gift.id} gift={gift} />
        ))}
      </div>
    </div>
  );
}
