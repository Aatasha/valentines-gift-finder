import { NextRequest, NextResponse } from 'next/server';

// AI Gift suggestion type
export interface AIGiftSuggestion {
  id: string;
  name: string;
  searchQuery: string; // Generic version for retailer searches (no brand names)
  description: string;
  priceEstimate: string;
  whyItWorks: string;
  whereToBuy: string[];
  tags: string[];
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    // Call Perplexity API for gift suggestions
    const suggestions = await searchGiftsWithAI(query);

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to search for gifts' },
      { status: 500 }
    );
  }
}

async function searchGiftsWithAI(query: string): Promise<AIGiftSuggestion[]> {
  const apiKey = process.env.PERPLEXITY_API_KEY;

  if (!apiKey) {
    console.error('PERPLEXITY_API_KEY not set');
    // Return empty array if no API key (for development)
    return [];
  }

  const systemPrompt = `You are a Valentine's Day gift expert helping people in the UK find the perfect gift for their partner.

When given a search query, suggest 5-8 specific, purchasable gift ideas. For each gift:
- Be specific (brand names, product types) not generic
- Consider UK availability
- Mix price ranges unless budget is specified
- Include both physical products and experience vouchers

For priceEstimate, use ONLY one of these exact tiers (no specific amounts):
- "Under £25"
- "£25-50"
- "£50-100"
- "£100+"

IMPORTANT tag rules:
- "experience" = ONLY for experience vouchers/gift cards (spa days, driving experiences, cooking classes you BOOK). NOT for physical products.
- "personalised" = custom/engraved items, made-to-order gifts
- "practical" = useful everyday items
- "romantic" = sentimental, relationship-focused
- "tech" = electronics, gadgets
- "luxury" = high-end, premium items
- "handmade" = artisan, crafted items
- "budget-friendly" = affordable options

Respond in JSON format only, no other text:
{
  "gifts": [
    {
      "name": "Specific product name (can include brand)",
      "searchQuery": "Generic search term WITHOUT brand names (e.g. 'instant film camera' not 'Fujifilm Instax')",
      "description": "One sentence description",
      "priceEstimate": "Under £25" or "£25-50" or "£50-100" or "£100+",
      "whyItWorks": "Why this matches the query",
      "whereToBuy": ["Amazon UK", "John Lewis", etc],
      "tags": ["romantic", "practical", "experience", "luxury", "budget-friendly", "personalised", "tech", "handmade"]
    }
  ]
}`;

  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'sonar',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Find Valentine's gift ideas for: ${query}` },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Perplexity API error:', error);
    throw new Error('Failed to get AI suggestions');
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    return [];
  }

  try {
    // Parse the JSON response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('No JSON found in response:', content);
      return [];
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Add IDs to each gift
    return (parsed.gifts || []).map((gift: Omit<AIGiftSuggestion, 'id'>, index: number) => ({
      ...gift,
      id: `ai-${Date.now()}-${index}`,
    }));
  } catch (parseError) {
    console.error('Failed to parse AI response:', parseError);
    return [];
  }
}
