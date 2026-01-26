import { NextRequest, NextResponse } from 'next/server';

const KIT_API_KEY = process.env.KIT_API_KEY;
const KIT_FORM_ID = process.env.KIT_FORM_ID;

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

  try {
    const body: SubscribeRequest = await request.json();
    const { email, recipient, budget, personality } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      );
    }

    // Build tags from quiz context for segmentation
    const tags: string[] = ['valentine-quiz'];
    if (recipient) tags.push(`recipient-${recipient}`);
    if (budget) tags.push(`budget-${budget}`);
    if (personality) tags.push(`personality-${personality}`);

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
