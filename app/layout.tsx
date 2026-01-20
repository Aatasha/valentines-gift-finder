import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Valentine's Gift Finder | Find Their Perfect Gift",
  description:
    "Discover thoughtful Valentine's gifts curated for every personality, budget, and relationship. Take our 30-second quiz for personalised recommendations.",
  keywords: [
    "valentine's gifts",
    "valentine's gift ideas",
    "gifts for him",
    "gifts for her",
    "romantic gifts",
    "valentine's day",
    "gift finder",
    "personalised gifts",
  ],
  openGraph: {
    title: "Valentine's Gift Finder | Find Their Perfect Gift",
    description:
      "Discover thoughtful Valentine's gifts curated for every personality, budget, and relationship.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
