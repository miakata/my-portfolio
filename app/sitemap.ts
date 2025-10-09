import type { MetadataRoute } from "next";
import { sanityClient } from "@/lib/sanity.client";
import { allSlugsQuery } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const base = "https://mia-portfolio-nu.vercel.app";
    const now = new Date();

    let slugs: string[] = [];
    try {
        // ✅ Safe fetch — won’t break even if Sanity/envs are missing
        slugs = await sanityClient.fetch<string[]>(allSlugsQuery);
    } catch (error) {
        console.warn("⚠️ Failed to fetch slugs from Sanity:", error);
        slugs = [];
    }

    const staticPages: MetadataRoute.Sitemap = [
        { url: `${base}/`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
        { url: `${base}/work`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    ];

    const projectPages: MetadataRoute.Sitemap = slugs.map((slug) => ({
        url: `${base}/work/${slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [...staticPages, ...projectPages];
}
