'use client';

import { useEffect } from 'react';
import { trackAffiliateClick, trackOutboundClick } from '@/lib/analytics';
import { isAffiliateUrl, RETAILER_NAMES } from '@/lib/retailers';

// Blog buttons mostly say "Get it now", so name the gift from the nearest heading above the link
function nearestHeading(link: Element): string | null {
  let node: Element | null = link;
  while (node && node.tagName !== 'ARTICLE') {
    let sibling = node.previousElementSibling;
    while (sibling) {
      if (/^H[23]$/.test(sibling.tagName)) return sibling.textContent?.trim() || null;
      sibling = sibling.previousElementSibling;
    }
    node = node.parentElement;
  }
  return null;
}

// Blog posts are static HTML, so their outbound clicks are tracked with one delegated listener
export function OutboundClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest('article a[href^="http"]');
      if (!(link instanceof HTMLAnchorElement)) return;

      const linkText = (link.textContent || '').trim();
      const giftName = (nearestHeading(link) || linkText).slice(0, 100);

      if (isAffiliateUrl(link.href)) {
        trackAffiliateClick({ retailer: RETAILER_NAMES.amazon, giftName, source: 'blog' });
      } else {
        trackOutboundClick({ domain: link.hostname.replace(/^www\./, ''), linkText: giftName, source: 'blog' });
      }
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
