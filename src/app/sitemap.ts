import type { MetadataRoute } from "next";

// Two routes, two entries. The resume is a static asset, not a route.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://umarfarook-ai.vercel.app",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://umarfarook-ai.vercel.app/services",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
