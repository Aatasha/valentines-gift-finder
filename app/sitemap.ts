import { MetadataRoute } from "next";
import { categories } from "@/lib/categories";
import { getAllGifts } from "@/lib/gifts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://valentinesgiftfinder.com";
  const now = new Date();

  // Core pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/quiz`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Gift detail pages
  const gifts = getAllGifts();
  const giftPages: MetadataRoute.Sitemap = gifts.map((gift) => ({
    url: `${baseUrl}/gifts/${gift.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...giftPages];
}
