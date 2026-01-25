# Valentine's Gift Finder - Project Documentation

## Project Overview

An AI-powered Valentine's gift discovery website that helps users find personalised gift recommendations through an interactive quiz. The site monetises through affiliate links (primarily Amazon UK Associates).

**Live domain**: valentinesgiftfinder.com
**Business model**: Affiliate marketing (commission on purchases via tracked links)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **React**: v19.2.3
- **TypeScript**: v5
- **Styling**: Tailwind CSS v4
- **Fonts**: Geist Sans (body), Cinzel (serif headings)
- **AI**: Perplexity API for gift suggestions
- **Analytics**: Google Analytics 4
- **Deployment**: Vercel

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

**Note**: If port 3000 is occupied, Next.js will automatically use port 3001.

## Environment Variables

Create `.env.local` with:

```
PERPLEXITY_API_KEY=your_api_key_here
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Directory Structure

```
valentines-gift-finder/
├── app/
│   ├── api/
│   │   └── search/route.ts      # Perplexity AI gift suggestions endpoint
│   ├── category/[slug]/page.tsx # Dynamic category pages
│   ├── gifts/[id]/page.tsx      # Individual gift pages
│   ├── quiz/page.tsx            # Main quiz flow (most important page)
│   ├── search/page.tsx          # Search results page
│   ├── privacy/page.tsx         # Privacy policy
│   ├── terms/page.tsx           # Terms of service
│   ├── layout.tsx               # Root layout with SEO metadata
│   ├── page.tsx                 # Homepage
│   └── globals.css              # Global Tailwind styles
├── components/
│   ├── AIGiftCard.tsx           # Gift display card (category-coded design)
│   ├── Analytics.tsx            # GA4 script injection
│   ├── BrowseGiftCard.tsx       # Static gift card for browse pages
│   ├── CategoryAISuggestions.tsx
│   ├── CategoryCard.tsx
│   ├── CategoryGrid.tsx
│   ├── CookieConsent.tsx
│   ├── Footer.tsx
│   ├── SearchBar.tsx
│   └── ValentineCountdown.tsx   # Countdown to Feb 14th
├── lib/
│   ├── analytics.ts             # GA4 tracking functions
│   ├── categories.ts            # Gift category definitions
│   ├── gifts.ts                 # Static gift data utilities
│   ├── gifts-database.json      # Static gift catalogue
│   ├── retailers.ts             # Affiliate link generation
│   └── types.ts                 # TypeScript interfaces
└── public/                      # Static assets
```

## Key Architectural Patterns

### Quiz Flow (`app/quiz/page.tsx`)

The quiz is the main conversion funnel:
1. **Question steps**: recipient, budget, personality, gift type
2. **Loading state**: Calls Perplexity API with quiz answers
3. **Congratulations overlay**: Loss aversion psychological pattern - "Get Your Matches Now" CTA
4. **Results display**: First result is "featured" with larger styling

State management uses React useState with a `step` variable: `'questions' | 'loading' | 'results'`

### AI Gift Suggestions (`app/api/search/route.ts`)

- Uses Perplexity API (`sonar` model)
- System prompt instructs AI on:
  - UK availability focus
  - Price tier format (`Under £25`, `£25-50`, `£50-100`, `£100+`)
  - Tag categories (romantic, practical, experience, luxury, etc.)
  - Brand rules: Tech brands OK, fashion/beauty should be generic types
- Returns JSON array of `AIGiftSuggestion` objects

### Affiliate Routing (`lib/retailers.ts`)

**Current status**:
- Amazon UK: **Approved** (tag: `aanthony08-21`)
- Etsy (via Awin): **Pending** - set `APPROVED_AFFILIATES.etsy = true` when approved
- Virgin Experience Days (via Impact): **Pending** - set `APPROVED_AFFILIATES.virginexp = true` when approved

The `getBestRetailerForGift()` function routes clicks based on gift tags, but currently all traffic goes to Amazon until other programs are approved.

### Gift Card Design (`components/AIGiftCard.tsx`)

Cards use a category-coded visual system without product images:

| Category | Background | Border | Text Color |
|----------|------------|--------|------------|
| romantic | rose-100 | rose-500 | rose-700 |
| practical | slate-100 | slate-500 | slate-700 |
| experience | violet-100 | violet-500 | violet-700 |
| luxury | amber-100 | amber-500 | amber-700 |
| budget-friendly | emerald-100 | emerald-500 | emerald-700 |
| personalised | pink-100 | pink-500 | pink-700 |
| tech | sky-100 | sky-500 | sky-700 |
| handmade | orange-100 | orange-500 | orange-700 |

Each category has a unique icon displayed inline with the gift title.

### Analytics (`lib/analytics.ts`)

Key tracked events:
- `affiliate_click` - Most important for revenue attribution
- `quiz_complete` - Conversion tracking
- `search` - Search query analytics
- `view_category` - Category browsing

## Styling Conventions

- CSS variables defined in globals.css:
  - `--burgundy`, `--burgundy-dark` - Primary brand colours
  - `--gold` - Accent colour
  - `--cream`, `--cream-dark` - Background tones
  - `--charcoal`, `--charcoal-light` - Text colours
- Mobile-first responsive design
- Cinzel font for headings (serif, elegant feel)
- Geist Sans for body text

## Future Features (from user notes)

- [ ] Flowers guide lead magnet with affiliate links
- [ ] Email series
- [ ] Upsells for packaging and flowers
- [ ] Countdown to Valentine's Day (already implemented)

## Deployment

Deployed on Vercel. Domain: valentinesgiftfinder.com

**Required environment variables for production**:
- `PERPLEXITY_API_KEY`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`

## Related Files

- `/Users/alistairanthony/.../my notes of things to add` - Feature backlog
- `/Users/alistairanthony/.../beyond-the-gift-v7.pdf` - Lead magnet PDF (in progress)
