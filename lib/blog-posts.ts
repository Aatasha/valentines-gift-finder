// Blog post data structure
// Easy to add new posts - just add to the array

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // ISO date string
  updatedAt?: string;
  author: string;
  category: 'gift-guide' | 'tips' | 'ideas' | 'seasonal';
  tags: string[];
  readingTime: number; // minutes
  featuredImage?: string;
  content: string; // HTML content
}

// Blog posts array - newest first
export const blogPosts: BlogPost[] = [
  {
    slug: 'valentines-gifts-for-boyfriend-who-has-everything',
    title: "Valentine's Gifts for the Boyfriend Who Has Everything (2026)",
    description: "Struggling to find a gift for the man who seemingly wants for nothing? These thoughtful, unique ideas focus on experiences and personalisation over material goods.",
    publishedAt: '2026-01-26',
    author: "Valentine's Gift Finder",
    category: 'gift-guide',
    tags: ['boyfriend', 'difficult to buy for', 'unique gifts', 'experiences'],
    readingTime: 6,
    content: `
      <p class="lead">We've all been there. Your boyfriend says "I don't need anything" and genuinely means it. His Amazon wish list is empty. He buys himself whatever he wants. So what do you get the man who has everything?</p>

      <p>The secret isn't finding something he doesn't have—it's finding something he'd never think to get himself. Something that shows you truly understand him.</p>

      <h2>1. Experiences Over Things</h2>
      <p>When someone has everything material, experiences become the ultimate luxury. Consider:</p>
      <ul>
        <li><strong>A surprise day out</strong> planned entirely around his interests</li>
        <li><strong>Cooking class for two</strong> in a cuisine he loves</li>
        <li><strong>Tickets to something special</strong> he'd never splurge on himself</li>
        <li><strong>A weekend getaway</strong> to somewhere meaningful</li>
      </ul>

      <h2>2. Personalised Keepsakes</h2>
      <p>Generic gifts won't cut it here. Think deeply personal:</p>
      <ul>
        <li><strong>Custom illustration</strong> of a meaningful moment you've shared</li>
        <li><strong>A book of reasons</strong> why you love him (yes, it's cheesy—and effective)</li>
        <li><strong>Personalised map print</strong> of where you met or a special location</li>
      </ul>

      <h2>3. Upgrade Something He Uses Daily</h2>
      <p>Look at what he uses every single day and find the premium version:</p>
      <ul>
        <li><strong>His favourite coffee or tea</strong> in a subscription box</li>
        <li><strong>Luxury version of his everyday carry</strong> (wallet, watch strap, keyring)</li>
        <li><strong>High-end grooming products</strong> he'd never buy himself</li>
      </ul>

      <h2>4. Quality Time, Elevated</h2>
      <p>Sometimes the best gift is your undivided attention, packaged thoughtfully:</p>
      <ul>
        <li><strong>A "yes day"</strong> where you do whatever he wants</li>
        <li><strong>Tech-free weekend</strong> focused entirely on each other</li>
        <li><strong>Recreate your first date</strong> with a luxury twist</li>
      </ul>

      <h2>Still Stuck?</h2>
      <p>Take our 30-second quiz and we'll suggest personalised gift ideas based on his personality and your budget.</p>
    `,
  },
  // Add more posts here
];

// Helper functions
export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostsByCategory(category: BlogPost['category']): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.category === category);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getAllBlogPosts().filter((post) =>
    post.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getBlogPostBySlug(currentSlug);
  if (!currentPost) return [];

  return getAllBlogPosts()
    .filter((post) => post.slug !== currentSlug)
    .filter((post) =>
      post.category === currentPost.category ||
      post.tags.some((tag) => currentPost.tags.includes(tag))
    )
    .slice(0, limit);
}
