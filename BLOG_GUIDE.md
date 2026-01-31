# Blog Post Writing & Formatting Guide

Reference for writing and formatting blog posts on valentinesgiftfinder.com. Based on patterns established in the "Last-Minute Valentine's Gifts" article.

## File Structure

Blog posts live in `lib/blog-posts.ts` as HTML strings inside the `blogPosts` array. Each post is a `BlogPost` object.

### Required Fields

```typescript
{
  slug: 'your-post-slug',              // URL-friendly, keyword-rich
  title: "Post Title With Year (2026)", // Include year for freshness
  description: "150-160 char meta description with primary keyword.",
  publishedAt: '2026-01-28',           // ISO date
  author: "Valentine's Gift Finder",
  category: 'gift-guide',             // 'gift-guide' | 'tips' | 'ideas' | 'seasonal'
  tags: ['keyword1', 'keyword2'],      // For internal filtering and OG tags
  readingTime: 12,                     // Estimated minutes
  content: `...HTML content...`,
  faqs: [                              // Optional but strongly recommended for SEO
    { question: "...", answer: "..." },
  ],
}
```

## Content Structure

### Opening

1. **Lead paragraph** - Use `<p class="lead">` for the opening hook. Should acknowledge the reader's situation and promise a solution.
2. **Context paragraph** - Establish credibility. Why should they trust this guide?
3. **Scope paragraph** - What's covered, price range, delivery options.
4. **Affiliate disclosure** - Required. Use: `<p class="affiliate-notice"><em>This post contains affiliate links. If you buy through our links, we may earn a small commission at no extra cost to you. We only recommend products we'd genuinely consider giving.</em></p>`
5. **Jump links** - For long posts: `<p><strong>In a rush?</strong> <a href="#top-picks">Jump straight to our top picks</a> | <a href="/quiz">Take our 30-second gift finder quiz</a></p>`

### Top Picks Summary

For gift guides, include a "Top 5 Picks" section immediately after the intro. Each pick uses:

```html
<h3>1. Product Name</h3>
<p><strong>£XX</strong> | Best for: One-line summary.</p>
<p><a href="LINK" target="_blank" rel="noopener">Get it now →</a></p>
```

This gives skimmers what they need without scrolling.

### Product Sections (Full Reviews)

Each product in the main body follows this structure:

```html
<h3>Product Name</h3>
<p><strong>£XX</strong> | Delivery info</p>
<p>2-3 sentence description. What it is, why it works, who it's for.</p>
<ul>
  <li><strong>Pros</strong>
    <ul>
      <li>Pro point 1</li>
      <li>Pro point 2</li>
    </ul>
  </li>
  <li><strong>Cons</strong>
    <ul>
      <li>Con point 1</li>
    </ul>
  </li>
</ul>
<p><strong>Why this over alternatives:</strong> Optional comparison paragraph.</p>
<p><a href="LINK" target="_blank" rel="noopener">Get it now →</a></p>
```

**Important formatting rules:**

- Pros and Cons use nested `<ul>` lists (outer list has Pros/Cons headers, inner list has the actual points)
- Each product gets exactly ONE "Get it now →" link in its own `<p>` tag (this triggers the button styling)
- If a product isn't on Amazon, link to the best retailer directly
- "Why this over alternatives" is optional, use it for products where a comparison adds value

### Section Headers (h2)

Use `<h2>` for major category sections. These render as uppercase with a top border. Include `id` attributes for jump links where useful.

```html
<h2 id="top-picks">Our Top 5 Last-Minute Picks</h2>
```

Each h2 section should open with a 1-2 sentence intro paragraph before the first product.

### Internal Links

Sprinkle internal links between sections to other parts of the site:

```html
<p>Looking for more experience-based presents? <a href="/category/experiences">Browse our full collection</a>.</p>
```

Good link targets: `/quiz`, `/category/[slug]`, `/blog/[other-post-slug]`

### Closing

1. **Final recommendation** - Narrow down to 3 top picks with links
2. **Quiz CTA** - Always end with a link to the quiz
3. **Sign-off** - Brief, warm, encouraging

## SEO Checklist

### On-Page

- [ ] **Title** includes primary keyword + year (e.g., "Last-Minute Valentine's Gifts ... (2026)")
- [ ] **Slug** contains primary keyword, is concise (e.g., `last-minute-valentines-gifts`)
- [ ] **Meta description** (the `description` field) is 150-160 chars, includes primary keyword, has a call to action
- [ ] **H1** (auto-generated from `title`) contains primary keyword
- [ ] **H2s** include secondary keywords naturally
- [ ] **H3s** are product names (these are long-tail keywords themselves)
- [ ] **Opening paragraph** mentions primary keyword within first 100 words
- [ ] **Internal links** to at least 3 other pages on the site
- [ ] **External links** use `target="_blank" rel="noopener"`

### Schema / Structured Data

- [ ] **Article schema** - Automatic from the page template (JSON-LD)
- [ ] **FAQ schema** - Add `faqs` array to the post object. Each FAQ should match an h3 question in the "Frequently Asked Questions" section. Keep answers concise (2-3 sentences) in the schema even if the HTML answer is longer.

### Content Quality

- [ ] **Word count** - Gift guides should be 2,500-4,000 words (this helps ranking for competitive keywords)
- [ ] **FAQ section** - Include 5-6 questions that match "People also ask" queries on Google
- [ ] **No thin sections** - Every h2 section should have substantial content, not just a product list
- [ ] **Delivery/practical info** - Include a section on delivery cut-offs, practical tips, etc. This adds unique value.

## Affiliate Links

### Amazon UK

All Amazon links must include the affiliate tag:

```
https://www.amazon.co.uk/dp/ASIN?tag=aanthony08-21
```

- Use the `/dp/ASIN` format, not full product URLs
- For search links: `https://www.amazon.co.uk/s?k=search+terms&tag=aanthony08-21`
- Always verify the ASIN points to the correct product before publishing

### Non-Amazon Links

When a product isn't available on Amazon or has a better dedicated retailer:
- Link directly to the product page, not the homepage
- Use the Valentine's/seasonal landing page where available
- One link per product (don't put two "Get it now" links side by side)

### Link Button Text

Always use `Get it now →` as the CTA text. Exceptions:
- Moonpig cards: `Create a card on Moonpig →`
- Other cases where the action isn't a direct purchase

## Writing Style

### Tone

- **Conversational but knowledgeable** - Write like a friend who's done the research
- **Honest** - Mention genuine cons. Readers trust reviews that acknowledge downsides
- **UK-focused** - British spellings, GBP prices, UK retailers, UK delivery info
- **Not salesy** - Don't oversell. State what the product is, why it works, who it suits

### Formatting Tips

- Keep paragraphs short (2-3 sentences max)
- Use bold for prices, key terms, and emphasis
- Break up long sections with subheadings
- Include practical details (price, delivery time, who it's for)

### Things to Avoid

- "Click here" link text (bad for SEO and accessibility)
- Multiple CTA buttons per product
- Prices without the £ symbol
- Vague descriptions ("this is a great gift") — be specific about why
- Overusing exclamation marks

## Adding a New Post

1. Add a new object to the `blogPosts` array in `lib/blog-posts.ts` (newest first)
2. Write all content as HTML in the `content` template literal
3. Add FAQs to the `faqs` array if the post has a FAQ section
4. The blog index page, sitemap, and RSS will pick it up automatically
5. Test locally with `npm run dev` and check `/blog/your-slug`
6. Verify all links work before merging to main
