import { Metadata } from 'next';

// Search results are generated per query, so keep the page out of the index
export const metadata: Metadata = {
  title: "Search Valentine's Gift Ideas",
  description: "Describe your partner and get Valentine's gift ideas to match.",
  robots: { index: false, follow: true },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
