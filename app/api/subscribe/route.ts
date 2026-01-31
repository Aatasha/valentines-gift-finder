import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

const KIT_API_KEY = process.env.KIT_API_KEY;
const KIT_FORM_ID = process.env.KIT_FORM_ID;

const RATE_LIMIT = { maxRequests: 5, windowMs: 60 * 1000 }; // 5 per minute per IP

// Basic email regex - catches obvious garbage without being overly strict
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Allowed values for quiz fields - prevents arbitrary tag injection into ConvertKit
const ALLOWED_RECIPIENTS = new Set(['boyfriend', 'girlfriend', 'husband', 'wife', 'partner']);
const ALLOWED_BUDGETS = new Set(['under25', '25to50', '50to100', 'over100', 'any']);
const ALLOWED_PERSONALITIES = new Set(['romantic', 'practical', 'adventurous', 'funny', 'luxury']);

interface SubscribeRequest {
  email: string;
  // Quiz context for segmentation
  recipient?: string;
  budget?: string;
  personality?: string;
}

export async function POST(request: NextRequest) {
  if (!KIT_API_KEY || !KIT_FORM_ID) {
    console.error('Kit API key or Form ID not configured');
    return NextResponse.json(
      { error: 'Email service not configured' },
      { status: 500 }
    );
  }

  // Rate limit by IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const { allowed } = rateLimit(`subscribe:${ip}`, RATE_LIMIT);
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again shortly.' },
      { status: 429 }
    );
  }

  try {
    const body: SubscribeRequest = await request.json();
    const { email, recipient, budget, personality } = body;

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      );
    }

    // Build tags from quiz context - only allow known values
    const tags: string[] = ['valentine-quiz'];
    if (recipient && ALLOWED_RECIPIENTS.has(recipient)) tags.push(`recipient-${recipient}`);
    if (budget && ALLOWED_BUDGETS.has(budget)) tags.push(`budget-${budget}`);
    if (personality && ALLOWED_PERSONALITIES.has(personality)) tags.push(`personality-${personality}`);

    // Kit API v4 - Add subscriber to form
    const response = await fetch(
      `https://api.convertkit.com/v4/forms/${KIT_FORM_ID}/subscribers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${KIT_API_KEY}`,
        },
        body: JSON.stringify({
          email_address: email,
          tags: tags,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Kit API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
