import { Metadata } from 'next';

const title = "Valentine's Gift Quiz: Personalised Ideas in 60 Seconds";
const description =
  "Answer a few quick questions about your partner and get personalised Valentine's gift ideas for your budget.";

// The quiz page is a client component, so its metadata lives here
export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: 'https://valentinesgiftfinder.com/quiz',
  },
  openGraph: {
    title,
    description,
    url: 'https://valentinesgiftfinder.com/quiz',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: { title, description },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
