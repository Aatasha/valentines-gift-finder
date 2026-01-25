'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { AIGiftCard } from '@/components/AIGiftCard';
import { ValentineCountdown } from '@/components/ValentineCountdown';
import { trackQuizComplete } from '@/lib/analytics';

interface QuizAnswer {
  recipient: string;
  relationship: string;
  age: string;
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

type Step = 'recipient' | 'relationship' | 'age' | 'interests' | 'budget' | 'personality' | 'loading' | 'results';

// Ornate icons for each option
const optionIcons: Record<string, ReactNode> = {
  // Recipients - dating (heart + gender symbol) vs married (ring)
  boyfriend: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      {/* Heart */}
      <path d="M12 19 C8 15, 4 13, 4 8 C4 5, 6 4, 12 9 C18 4, 20 5, 20 8 C20 13, 16 15, 12 19" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      {/* Mars symbol (male) */}
      <circle cx="18" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M20 4 L23 1 M23 1 L23 4 M23 1 L20 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  girlfriend: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      {/* Heart */}
      <path d="M12 19 C8 15, 4 13, 4 8 C4 5, 6 4, 12 9 C18 4, 20 5, 20 8 C20 13, 16 15, 12 19" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      {/* Venus symbol (female) */}
      <circle cx="18" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M18 9 L18 14 M16 12 L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  husband: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      {/* Wedding ring band */}
      <ellipse cx="12" cy="12" rx="8" ry="4" stroke="currentColor" strokeWidth="1.5"/>
      <ellipse cx="12" cy="12" rx="6" ry="2.5" stroke="currentColor" strokeWidth="1"/>
      {/* Small decorative line on band */}
      <path d="M8 10 L16 10" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
    </svg>
  ),
  wife: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      {/* Wedding ring band */}
      <ellipse cx="12" cy="14" rx="8" ry="4" stroke="currentColor" strokeWidth="1.5"/>
      <ellipse cx="12" cy="14" rx="6" ry="2.5" stroke="currentColor" strokeWidth="1"/>
      {/* Diamond on top */}
      <path d="M12 4 L15 8 L12 10 L9 8 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M9 8 L15 8" stroke="currentColor" strokeWidth="1"/>
    </svg>
  ),
  partner: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      {/* Two interlinked hearts */}
      <path d="M8 16 C5 13, 2 11, 2 7 C2 4, 4 3, 8 7 C12 3, 14 4, 14 7 C14 9, 13 10, 12 11" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M16 18 C13 15, 10 13, 10 9 C10 6, 12 5, 16 9 C20 5, 22 6, 22 9 C22 13, 19 15, 16 18" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  // Relationship duration
  new: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path d="M12 18 C9 15, 6 13, 6 9 C6 6, 8 5, 12 9 C16 5, 18 6, 18 9 C18 13, 15 15, 12 18" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M12 5 L12 2 M9 6 L7 4 M15 6 L17 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  ),
  established: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path d="M12 19 C8 15, 4 13, 4 8 C4 4, 7 3, 12 8 C17 3, 20 4, 20 8 C20 13, 16 15, 12 19" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1"/>
    </svg>
  ),
  longterm: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path d="M12 20 C7 15, 2 12, 2 7 C2 3, 6 2, 12 8 C18 2, 22 3, 22 7 C22 12, 17 15, 12 20" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M8 8 C9 6, 11 5, 12 5 C13 5, 15 6, 16 8" stroke="currentColor" strokeWidth="1"/>
      <circle cx="12" cy="11" r="1.5" fill="currentColor"/>
    </svg>
  ),
  // Age ranges
  under25: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      {/* Young person - single candle on cake */}
      <path d="M6 14 L18 14 L17 20 L7 20 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M8 14 L8 12 C8 10, 16 10, 16 12 L16 14" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 10 L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 7 C11 6, 11 5, 12 4 C13 5, 13 6, 12 7" fill="currentColor"/>
    </svg>
  ),
  '26to35': (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      {/* Two candles on cake */}
      <path d="M6 14 L18 14 L17 20 L7 20 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M8 14 L8 12 C8 10, 16 10, 16 12 L16 14" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 10 L10 7 M14 10 L14 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 7 C9 6, 9 5, 10 4 C11 5, 11 6, 10 7" fill="currentColor"/>
      <path d="M14 7 C13 6, 13 5, 14 4 C15 5, 15 6, 14 7" fill="currentColor"/>
    </svg>
  ),
  '36to50': (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      {/* Three candles on cake */}
      <path d="M6 14 L18 14 L17 20 L7 20 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M8 14 L8 12 C8 10, 16 10, 16 12 L16 14" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 10 L8 7 M12 10 L12 7 M16 10 L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 7 C7 6, 7 5, 8 4 C9 5, 9 6, 8 7" fill="currentColor"/>
      <path d="M12 7 C11 6, 11 5, 12 4 C13 5, 13 6, 12 7" fill="currentColor"/>
      <path d="M16 7 C15 6, 15 5, 16 4 C17 5, 17 6, 16 7" fill="currentColor"/>
    </svg>
  ),
  over50: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      {/* Many candles - fuller cake */}
      <path d="M5 14 L19 14 L18 20 L6 20 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M7 14 L7 11 C7 9, 17 9, 17 11 L17 14" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 11 C9 9, 15 9, 15 11" stroke="currentColor" strokeWidth="1"/>
      <path d="M8 9 L8 6 M10.5 9 L10.5 6 M13.5 9 L13.5 6 M16 9 L16 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <circle cx="8" cy="5" r="1" fill="currentColor"/>
      <circle cx="10.5" cy="5" r="1" fill="currentColor"/>
      <circle cx="13.5" cy="5" r="1" fill="currentColor"/>
      <circle cx="16" cy="5" r="1" fill="currentColor"/>
    </svg>
  ),
  // Interests
  cooking: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path d="M8 2 L8 7 M12 2 L12 7 M16 2 L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M4 10 L20 10 L18 20 C18 21, 17 22, 16 22 L8 22 C7 22, 6 21, 6 20 L4 10" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 14 C9 16, 15 16, 17 14" stroke="currentColor" strokeWidth="1"/>
    </svg>
  ),
  fitness: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path d="M2 12 L6 12 M18 12 L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="6" y="8" width="4" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="14" y="8" width="4" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 12 L14 12" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  tech: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="8" cy="12" r="2" stroke="currentColor" strokeWidth="1"/>
      <circle cx="16" cy="10" r="1" fill="currentColor"/>
      <circle cx="16" cy="14" r="1" fill="currentColor"/>
      <circle cx="14" cy="12" r="1" fill="currentColor"/>
      <circle cx="18" cy="12" r="1" fill="currentColor"/>
    </svg>
  ),
  reading: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path d="M4 4 L4 20 L12 16 L20 20 L20 4 L12 8 L4 4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 8 L12 16" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  music: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <circle cx="7" cy="17" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 17 L10 5 L20 3 L20 15" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="17" cy="15" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 9 L20 7" stroke="currentColor" strokeWidth="1"/>
    </svg>
  ),
  travel: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path d="M12 2 L12 6 M12 18 L12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 12 L18 12" stroke="currentColor" strokeWidth="1"/>
      <path d="M12 6 C10 8, 10 16, 12 18 C14 16, 14 8, 12 6" stroke="currentColor" strokeWidth="1"/>
    </svg>
  ),
  fashion: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path d="M12 2 L8 6 L4 6 L4 10 L8 14 L8 22 L16 22 L16 14 L20 10 L20 6 L16 6 L12 2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1"/>
    </svg>
  ),
  art: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path d="M4 20 L8 4 L12 12 L16 4 L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="6" cy="8" r="1.5" fill="currentColor"/>
      <circle cx="18" cy="8" r="1.5" fill="currentColor"/>
      <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
    </svg>
  ),
  home: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path d="M4 10 L12 4 L20 10 L20 20 L4 20 L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M9 20 L9 14 L15 14 L15 20" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 8 L12 5 L16 8" stroke="currentColor" strokeWidth="1"/>
    </svg>
  ),
  outdoors: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path d="M4 20 L12 6 L20 20 L4 20" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8 20 L12 14 L16 20" stroke="currentColor" strokeWidth="1"/>
      <circle cx="17" cy="6" r="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  // Budget
  'budget-under25': (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 6 L12 18 M9 9 L15 9 M9 15 L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  '25to50': (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <circle cx="8" cy="12" r="6" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="16" cy="12" r="6" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 8 L8 16 M16 8 L16 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  ),
  '50to100': (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="18" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  over100: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path d="M12 2 L15 9 L22 9 L16 14 L18 22 L12 17 L6 22 L8 14 L2 9 L9 9 L12 2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  any: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path d="M12 2 L14 8 L20 8 L15 12 L17 18 L12 14 L7 18 L9 12 L4 8 L10 8 L12 2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1"/>
    </svg>
  ),
  // Personality
  romantic: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path d="M12 20 C7 15, 2 12, 2 7 C2 3, 6 2, 12 8 C18 2, 22 3, 22 7 C22 12, 17 15, 12 20" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M8 7 C9 5, 11 4, 12 4" stroke="currentColor" strokeWidth="1"/>
    </svg>
  ),
  practical: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path d="M14 2 L14 8 L20 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 12 L6 16 L10 20 L14 16 L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M14 8 L14 12 L18 16 L14 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  adventurous: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 3 L12 12 L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
    </svg>
  ),
  funny: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="8" cy="10" r="1.5" fill="currentColor"/>
      <circle cx="16" cy="10" r="1.5" fill="currentColor"/>
      <path d="M8 15 C9 17, 15 17, 16 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  luxury: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path d="M12 2 L15 8 L22 8 L17 13 L19 20 L12 16 L5 20 L7 13 L2 8 L9 8 L12 2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth="1"/>
    </svg>
  ),
};

const questions: Record<Exclude<Step, 'loading' | 'results'>, {
  title: string;
  subtitle: string;
  options: { value: string; label: string }[];
  multiple?: boolean;
}> = {
  recipient: {
    title: "Who are you shopping for?",
    subtitle: "Select who'll receive this gift",
    options: [
      { value: 'boyfriend', label: 'Boyfriend' },
      { value: 'girlfriend', label: 'Girlfriend' },
      { value: 'husband', label: 'Husband' },
      { value: 'wife', label: 'Wife' },
      { value: 'partner', label: 'Partner' },
    ],
  },
  relationship: {
    title: "How long have you been together?",
    subtitle: "This helps us suggest appropriate gifts",
    options: [
      { value: 'new', label: 'Less than 6 months' },
      { value: 'established', label: '6 months - 2 years' },
      { value: 'longterm', label: '2+ years' },
    ],
  },
  age: {
    title: "How old are they?",
    subtitle: "Gift preferences often vary by age",
    options: [
      { value: 'under25', label: 'Under 25' },
      { value: '26to35', label: '26-35' },
      { value: '36to50', label: '36-50' },
      { value: 'over50', label: '50+' },
    ],
  },
  interests: {
    title: "What are they into?",
    subtitle: "Select all that apply",
    multiple: true,
    options: [
      { value: 'cooking', label: 'Cooking & Food' },
      { value: 'fitness', label: 'Fitness & Sports' },
      { value: 'tech', label: 'Tech & Gaming' },
      { value: 'reading', label: 'Books & Reading' },
      { value: 'music', label: 'Music' },
      { value: 'travel', label: 'Travel & Adventures' },
      { value: 'fashion', label: 'Fashion & Beauty' },
      { value: 'art', label: 'Art & Creative' },
      { value: 'home', label: 'Home & Cosy' },
      { value: 'outdoors', label: 'Outdoors & Nature' },
    ],
  },
  budget: {
    title: "What's your budget?",
    subtitle: "We'll find options in your range",
    options: [
      { value: 'under25', label: 'Under £25' },
      { value: '25to50', label: '£25 - £50' },
      { value: '50to100', label: '£50 - £100' },
      { value: 'over100', label: '£100+' },
      { value: 'any', label: 'No budget limit' },
    ],
  },
  personality: {
    title: "What vibe fits them best?",
    subtitle: "Pick the one that feels most right",
    options: [
      { value: 'romantic', label: 'Romantic & Sentimental' },
      { value: 'practical', label: 'Practical & Useful' },
      { value: 'adventurous', label: 'Adventurous & Experiential' },
      { value: 'funny', label: 'Fun & Playful' },
      { value: 'luxury', label: 'Luxurious & Indulgent' },
    ],
  },
};

const stepOrder: Exclude<Step, 'loading' | 'results'>[] = ['recipient', 'relationship', 'age', 'interests', 'budget', 'personality'];

export default function QuizPage() {
  const [step, setStep] = useState<Step>('recipient');
  const [answers, setAnswers] = useState<Partial<QuizAnswer>>({});
  const [results, setResults] = useState<AIGift[]>([]);
  const [showResults, setShowResults] = useState(false);

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
    let suggestions: AIGift[] = [];

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (response.ok) {
        const data = await response.json();
        suggestions = data.suggestions || [];
        setResults(suggestions);
      }
    } catch (error) {
      console.error('Quiz search failed:', error);
    }

    // Track quiz completion
    trackQuizComplete({
      recipient: finalAnswers.recipient,
      budget: finalAnswers.budget,
      personality: finalAnswers.personality,
      resultsCount: suggestions.length,
    });

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

    if (a.age) {
      const ageMap: Record<string, string> = {
        under25: 'in their early 20s',
        '26to35': 'in their late 20s to mid 30s',
        '36to50': 'in their late 30s to 40s',
        over50: 'over 50',
      };
      parts.push(`they're ${ageMap[a.age]}`);
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
    setShowResults(false);
  };

  // Loading state
  if (step === 'loading') {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          {/* Ornate loading flourish */}
          <div className="mb-4 flex justify-center">
            <svg className="h-12 w-24 text-[var(--gold)] animate-pulse" viewBox="0 0 96 48" fill="none">
              <path d="M48 24 C40 24, 35 12, 24 12 C12 12, 8 24, 2 24" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M48 24 C56 24, 61 12, 72 12 C84 12, 88 24, 94 24" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M48 24 C40 24, 35 36, 24 36 C12 36, 8 24, 2 24" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M48 24 C56 24, 61 36, 72 36 C84 36, 88 24, 94 24" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <circle cx="48" cy="24" r="4" fill="currentColor"/>
            </svg>
          </div>
          <div className="h-16 w-16 mx-auto animate-spin rounded-full border-4 border-[var(--cream)]/20 border-t-[var(--gold)]" />
          <h2 className="mt-6 font-serif text-xl font-semibold text-[var(--cream)]">Finding perfect gifts...</h2>
          <p className="mt-2 text-[var(--cream)]/70">Our AI is searching for personalised suggestions</p>
        </div>
      </div>
    );
  }

  // Results state - shown with popup overlay first
  if (step === 'results') {
    return (
      <>
        {/* Congratulations overlay - fullscreen */}
        <div className={`fixed inset-0 z-50 bg-[var(--background)] flex flex-col items-center justify-center px-4 transition-opacity duration-500 ${showResults ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {/* Celebration sparkles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[var(--gold)] rounded-full animate-ping" />
            <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-[var(--gold)] rounded-full animate-ping" style={{ animationDelay: '0.1s' }} />
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-[var(--gold)] rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
            <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-[var(--cream)] rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
          </div>

          {/* Main content */}
          <div className="text-center relative z-10">
            {/* Big celebration icon */}
            <div className="flex justify-center mb-6">
              <div className="h-24 w-24 rounded-full bg-[var(--gold)]/20 flex items-center justify-center animate-pulse">
                <svg className="h-12 w-12 text-[var(--gold)]" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2 L14 8 L20 8 L15 12 L17 18 L12 14 L7 18 L9 12 L4 8 L10 8 Z" fill="currentColor"/>
                </svg>
              </div>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[var(--cream)] mb-3">
              Congratulations!
            </h1>

            <p className="text-2xl text-[var(--gold)] mb-2">
              We found {results.length} perfect {results.length === 1 ? 'match' : 'matches'}
            </p>

            <p className="text-[var(--cream)]/60 mb-6">
              Handpicked by AI just for you
            </p>

            {/* Countdown */}
            <div className="mb-8">
              <ValentineCountdown />
            </div>

            {/* BIG CTA button */}
            {results.length > 0 && (
              <button
                onClick={() => setShowResults(true)}
                className="inline-flex items-center gap-3 rounded-xl bg-[var(--gold)] px-10 py-5 text-xl font-bold text-[var(--burgundy-dark)] transition-all hover:bg-[var(--gold-light)] hover:scale-105 shadow-xl"
              >
                Get Your Matches Now
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12 H17 M17 12 L12 7 M17 12 L12 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}

            {results.length === 0 && (
              <Link
                href="/search"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--burgundy)] px-8 py-4 font-medium text-white"
              >
                Search Manually Instead
              </Link>
            )}
          </div>
        </div>

        {/* Results page - slides in when showResults is true */}
        <div className={`min-h-screen bg-[var(--background)] transition-all duration-500 ${showResults ? 'opacity-100 relative z-[60]' : 'opacity-0 pointer-events-none'}`}>
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Compact header */}
            <header className="mb-6 text-center">
              <h1 className="font-serif text-2xl font-semibold text-[var(--cream)]">
                Your {results.length} Perfect {results.length === 1 ? 'Match' : 'Matches'}
              </h1>
              <div className="mt-2">
                <ValentineCountdown />
              </div>
            </header>

            {results.length > 0 && (
              <div>
                {/* Featured first result - larger and centered */}
                <div className="mb-8 max-w-xl mx-auto">
                  <AIGiftCard gift={results[0]} featured />
                </div>

                {/* Remaining results in grid */}
                {results.length > 1 && (
                  <>
                    <p className="text-center text-[var(--cream)]/60 text-sm mb-4">More great options</p>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {results.slice(1).map((gift) => (
                        <AIGiftCard key={gift.id} gift={gift} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={restart}
                className="rounded-lg border-2 border-[var(--gold)] px-8 py-3 font-medium text-[var(--gold)] transition-colors hover:bg-[var(--cream)]/10"
              >
                Take Quiz Again
              </button>
              <Link
                href="/search"
                className="flex items-center justify-center gap-2 rounded-lg bg-[var(--burgundy)] px-8 py-3 font-medium text-white text-center transition-colors hover:bg-[var(--burgundy-light)]"
              >
                Search for More Ideas
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Question steps
  const currentQuestion = questions[step];
  const isMultiple = currentQuestion.multiple;
  const selectedInterests = (answers.interests as string[]) || [];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <Link href="/" className="flex items-center gap-2 text-sm text-[var(--cream)]/70 hover:text-[var(--gold)]">
              <svg className="h-4 w-6" viewBox="0 0 24 16" fill="none">
                <path d="M20 8 H8 M8 8 C10 6, 10 4, 8 4 M8 8 C10 10, 10 12, 8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="4" cy="8" r="2" stroke="currentColor" strokeWidth="1" fill="none"/>
              </svg>
              Back to home
            </Link>
            <span className="text-sm text-[var(--cream)]/70">
              {currentStepIndex + 1} of {stepOrder.length}
            </span>
          </div>
          <div className="h-1 rounded-full bg-[var(--cream)]/20">
            <div
              className="h-full rounded-full bg-[var(--gold)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-2xl font-semibold text-[var(--cream)] sm:text-3xl">
            {currentQuestion.title}
          </h1>
          <p className="mt-2 text-[var(--cream)]/70">{currentQuestion.subtitle}</p>
        </div>

        {/* Options */}
        <div className="grid gap-3 sm:grid-cols-2">
          {currentQuestion.options.map((option) => {
            const isSelected = isMultiple
              ? selectedInterests.includes(option.value)
              : answers[step as keyof QuizAnswer] === option.value;
            // Budget 'under25' needs special key to avoid collision with age 'under25'
            const iconKey = step === 'budget' && option.value === 'under25' ? 'budget-under25' : option.value;
            const icon = optionIcons[iconKey];

            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`flex items-center gap-3 rounded-lg border-2 p-4 text-left transition-all ${
                  isSelected
                    ? 'border-[var(--gold)] bg-[var(--cream)]/10'
                    : 'border-[var(--cream)]/20 bg-[var(--cream)]/5 hover:border-[var(--gold)]/50'
                }`}
              >
                {/* Icon */}
                <span className={`flex-shrink-0 ${isSelected ? 'text-[var(--gold)]' : 'text-[var(--cream)]/60'}`}>
                  {icon}
                </span>
                {/* Label */}
                <span className="flex-1 font-medium text-[var(--cream)]">{option.label}</span>
                {/* Checkmark when selected */}
                {isSelected && (
                  <svg className="h-5 w-5 flex-shrink-0 text-[var(--gold)]" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M6 10 L9 13 L14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
              className="flex items-center justify-center gap-2 mx-auto rounded-lg bg-[var(--gold)] px-8 py-3 font-medium text-[var(--burgundy-dark)] transition-colors hover:bg-[var(--gold-light)] disabled:bg-[var(--cream)]/20 disabled:text-[var(--cream)]/50"
            >
              Continue ({selectedInterests.length} selected)
              <svg className="h-4 w-6" viewBox="0 0 24 16" fill="none">
                <path d="M4 8 H16 M16 8 C14 6, 14 4, 16 4 M16 8 C14 10, 14 12, 16 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="20" cy="8" r="2" stroke="currentColor" strokeWidth="1" fill="none"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
