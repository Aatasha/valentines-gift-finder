// Site-wide identity used in bylines, the about page and structured data
export const SITE_URL = 'https://valentinesgiftfinder.com';
export const SITE_NAME = "Valentine's Gift Finder";

// Guides are credited to the site rather than a named person
export const SITE_ORGANIZATION = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
} as const;
