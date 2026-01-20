'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AIGiftCard } from '@/components/AIGiftCard';

interface QuizAnswer {
  recipient: string;
  relationship: string;
  interests: string[];
  budget: string;
  personality: string;
}

interface AIGift {
  id: string;
  name: string;
  description: string;
  priceEstimate: string;
  whyItWorks: string;
  whereToBuy: string[];
  tags: string[];
}

type Step = 'recipient' | 'relationship' | 'interests' | 'budget' | 'personality' | 'loading' | 'results';

const questions: Record<Exclude<Step, 'loading' | 'results'>, {
  title: string;
  subtitle: string;
  options: { value: string; label: string; emoji: string }[];
  multiple?: boolean;
}> = {
  recipient: {
    title: "Who are you shopping for?",
    subtitle: "Select who'll receive this gift",
    options: [
      { value: 'boyfriend', label: 'Boyfriend', emoji: '👨' },
      { value: 'girlfriend', label: 'Girlfriend', emoji: '👩' },
      { value: 'husband', label: 'Husband', emoji: '💑' },
      { value: 'wife', label: 'Wife', emoji: '💑' },
      { value: 'partner', label: 'Partner', emoji: '💕' },
    ],
  },
  relationship: {
    title: "How long have you been together?",
    subtitle: "This helps us suggest appropriate gifts",
    options: [
      { value: 'new', label: 'Less than 6 months', emoji: '🌱' },
      { value: 'established', label: '6 months - 2 years', emoji: '🌿' },
      { value: 'longterm', label: '2+ years', emoji: '🌳' },
    ],
  },
  interests: {
    title: "What are they into?",
    subtitle: "Select all that apply",
    multiple: true,
    options: [
      { value: 'cooking', label: 'Cooking & Food', emoji: '🍳' },
      { value: 'fitness', label: 'Fitness & Sports', emoji: '💪' },
      { value: 'tech', label: 'Tech & Gaming', emoji: '🎮' },
      { value: 'reading', label: 'Books & Reading', emoji: '📚' },
      { value: 'music', label: 'Music', emoji: '🎵' },
      { value: 'travel', label: 'Travel & Adventures', emoji: '✈️' },
      { value: 'fashion', label: 'Fashion & Beauty', emoji: '👗' },
      { value: 'art', label: 'Art & Creative', emoji: '🎨' },
      { value: 'home', label: 'Home & Cosy', emoji: '🏠' },
      { value: 'outdoors', label: 'Outdoors & Nature', emoji: '🌲' },
    ],
  },
  budget: {
    title: "What's your budget?",
    subtitle: "We'll find options in your range",
    options: [
      { value: 'under25', label: 'Under £25', emoji: '💰' },
      { value: '25to50', label: '£25 - £50', emoji: '💵' },
      { value: '50to100', label: '£50 - £100', emoji: '💎' },
      { value: 'over100', label: '£100+', emoji: '✨' },
      { value: 'any', label: 'No budget limit', emoji: '🎁' },
    ],
  },
  personality: {
    title: "What vibe fits them best?",
    subtitle: "Pick the one that feels most right",
    options: [
      { value: 'romantic', label: 'Romantic & Sentimental', emoji: '💕' },
      { value: 'practical', label: 'Practical & Useful', emoji: '🎁' },
      { value: 'adventurous', label: 'Adventurous & Experiential', emoji: '🎭' },
      { value: 'funny', label: 'Fun & Playful', emoji: '😄' },
      { value: 'luxury', label: 'Luxurious & Indulgent', emoji: '👑' },
    ],
  },
};

const stepOrder: Exclude<Step, 'loading' | 'results'>[] = ['recipient', 'relationship', 'interests', 'budget', 'personality'];

export default function QuizPage() {
  const [step, setStep] = useState<Step>('recipient');
  const [answers, setAnswers] = useState<Partial<QuizAnswer>>({});
  const [results, setResults] = useState<AIGift[]>([]);

  const currentStepIndex = stepOrder.indexOf(step as Exclude<Step, 'loading' | 'results'>);
  const progress = step === 'loading' || step === 'results'
    ? 100
    : ((currentStepIndex) / stepOrder.length) * 100;

  const handleSelect = async (value: string) => {
    const currentQuestion = questions[step as Exclude<Step, 'loading' | 'results'>];

    if (currentQuestion?.multiple) {
      // Toggle selection for multi-select
      const current = (answers.interests as string[]) || [];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      setAnswers({ ...answers, interests: updated });
    } else {
      // Single select - save and move to next
      const newAnswers = { ...answers, [step]: value };
      setAnswers(newAnswers);

      const nextIndex = currentStepIndex + 1;
      if (nextIndex < stepOrder.length) {
        setStep(stepOrder[nextIndex]);
      } else {
        // Quiz complete - get results
        await getResults(newAnswers as QuizAnswer);
      }
    }
  };

  const handleContinue = async () => {
    // For multi-select steps
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < stepOrder.length) {
      setStep(stepOrder[nextIndex]);
    } else {
      await getResults(answers as QuizAnswer);
    }
  };

  const getResults = async (finalAnswers: QuizAnswer) => {
    setStep('loading');

    // Build search query from answers
    const query = buildSearchQuery(finalAnswers);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data.suggestions || []);
      }
    } catch (error) {
      console.error('Quiz search failed:', error);
    }

    setStep('results');
  };

  const buildSearchQuery = (a: QuizAnswer): string => {
    const parts = [];

    parts.push(`Valentine's gift for my ${a.recipient}`);

    if (a.relationship === 'new') {
      parts.push("we're in a new relationship");
    } else if (a.relationship === 'longterm') {
      parts.push("we've been together for years");
    }

    if (a.interests?.length > 0) {
      parts.push(`they love ${a.interests.join(', ')}`);
    }

    if (a.budget && a.budget !== 'any') {
      const budgetMap: Record<string, string> = {
        under25: 'under £25',
        '25to50': '£25-50',
        '50to100': '£50-100',
        over100: 'over £100',
      };
      parts.push(`budget ${budgetMap[a.budget]}`);
    }

    if (a.personality) {
      const personalityMap: Record<string, string> = {
        romantic: 'romantic and sentimental gifts',
        practical: 'practical and useful gifts',
        adventurous: 'experience-based or adventurous gifts',
        funny: 'fun and playful gifts',
        luxury: 'luxurious and indulgent gifts',
      };
      parts.push(`prefer ${personalityMap[a.personality]}`);
    }

    return parts.join('. ');
  };

  const restart = () => {
    setStep('recipient');
    setAnswers({});
    setResults([]);
  };

  // Loading state
  if (step === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 mx-auto animate-spin rounded-full border-4 border-rose-200 border-t-rose-600" />
          <h2 className="mt-6 text-xl font-semibold text-gray-900">Finding perfect gifts...</h2>
          <p className="mt-2 text-gray-600">Our AI is searching for personalised suggestions</p>
        </div>
      </div>
    );
  }

  // Results state
  if (step === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <header className="mb-8 text-center">
            <span className="text-5xl">🎁</span>
            <h1 className="mt-4 text-3xl font-bold text-gray-900">
              Your Personalised Gift Ideas
            </h1>
            <p className="mt-2 text-gray-600">
              Based on your answers, here are our top picks
            </p>
          </header>

          {results.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((gift) => (
                <AIGiftCard key={gift.id} gift={gift} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg bg-white p-12 text-center shadow-sm">
              <p className="text-lg text-gray-600">
                We couldn't generate suggestions right now. Please try searching manually.
              </p>
            </div>
          )}

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={restart}
              className="rounded-full border-2 border-rose-600 px-8 py-3 font-semibold text-rose-600 transition-colors hover:bg-rose-50"
            >
              Take Quiz Again
            </button>
            <Link
              href="/search"
              className="rounded-full bg-rose-600 px-8 py-3 font-semibold text-white text-center transition-colors hover:bg-rose-700"
            >
              Search for More Ideas
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Question steps
  const currentQuestion = questions[step];
  const isMultiple = currentQuestion.multiple;
  const selectedInterests = (answers.interests as string[]) || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <Link href="/" className="text-sm text-gray-500 hover:text-rose-600">
              ← Back to home
            </Link>
            <span className="text-sm text-gray-500">
              {currentStepIndex + 1} of {stepOrder.length}
            </span>
          </div>
          <div className="h-2 rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-rose-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {currentQuestion.title}
          </h1>
          <p className="mt-2 text-gray-600">{currentQuestion.subtitle}</p>
        </div>

        {/* Options */}
        <div className="grid gap-3 sm:grid-cols-2">
          {currentQuestion.options.map((option) => {
            const isSelected = isMultiple
              ? selectedInterests.includes(option.value)
              : answers[step as keyof QuizAnswer] === option.value;

            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                  isSelected
                    ? 'border-rose-500 bg-rose-50'
                    : 'border-gray-200 bg-white hover:border-rose-300'
                }`}
              >
                <span className="text-3xl">{option.emoji}</span>
                <span className="font-medium text-gray-900">{option.label}</span>
                {isSelected && (
                  <svg className="ml-auto h-5 w-5 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        {/* Continue button for multi-select */}
        {isMultiple && (
          <div className="mt-8 text-center">
            <button
              onClick={handleContinue}
              disabled={selectedInterests.length === 0}
              className="rounded-full bg-rose-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-rose-700 disabled:bg-gray-300"
            >
              Continue ({selectedInterests.length} selected)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
