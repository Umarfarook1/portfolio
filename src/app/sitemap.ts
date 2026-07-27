import type { MetadataRoute } from "next";

// One page, one entry. The resume is a static asset, not a route.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://umarfarook-ai.vercel.app",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
