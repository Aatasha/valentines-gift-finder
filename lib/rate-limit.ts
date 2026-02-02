// Simple in-memory sliding window rate limiter for API routes.
// Tracks request timestamps per key (typically IP address).
// Note: resets on serverless cold starts, but still blocks sustained abuse.

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

// Clean up stale entries every 5 minutes to prevent memory leaks
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  for (const [key, entry] of store) {
    entry.timestamps = entry.timestamps.filter(t => now - t < windowMs);
    if (entry.timestamps.length === 0) {
      store.delete(key);
    }
  }
}

export function rateLimit(
  key: string,
  { maxRequests, windowMs }: { maxRequests: number; windowMs: number }
): { allowed: boolean; remaining: number } {
  const now = Date.now();

  cleanup(windowMs);

  const entry = store.get(key) || { timestamps: [] };

  // Remove timestamps outside the current window
  entry.timestamps = entry.timestamps.filter(t => now - t < windowMs);

  if (entry.timestamps.length >= maxRequests) {
    store.set(key, entry);
    return { allowed: false, remaining: 0 };
  }

  entry.timestamps.push(now);
  store.set(key, entry);

  return { allowed: true, remaining: maxRequests - entry.timestamps.length };
}
