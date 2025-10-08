import type { MetadataRoute } from "next";
import { sanityClient } from "@/lib/sanity.client";
import { allSlugsQuery } from "@/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://mia-portfolio-nu.vercel.app";
  const slugs = await sanityClient.fetch<string[]>(allSlugsQuery);

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/work`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  ];

  const projectPages: MetadataRoute.Sitemap =
    slugs.map((slug) => ({
      url: `${base}/work/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    })) ?? [];

  return [...staticPages, ...projectPages];
}
