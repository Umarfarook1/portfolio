import type { MetadataRoute } from "next";

// Four routes, four entries. The resume is a static asset, not a route.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: "https://umarfarook-ai.vercel.app",
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://umarfarook-ai.vercel.app/work",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://umarfarook-ai.vercel.app/about",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://umarfarook-ai.vercel.app/services",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
