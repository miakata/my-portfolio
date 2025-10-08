// app/sitemap.ts
import type { MetadataRoute } from "next";
import { sanityClient } from "@/lib/sanity.client";
import { allSlugsQuery } from "@/lib/queries";

export const dynamic = "force-dynamic"; // run at request time
export const revalidate = 0;            // no ISR

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const base = "https://mia-portfolio-nu.vercel.app";
    const now = new Date();

    let slugs: string[] = [];
    try {
        slugs = await sanityClient.fetch<string[]>(allSlugsQuery);
    } catch {
        // swallow errors so sitemap still returns, even if Sanity is down
        slugs = [];
    }

    return [
        { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: `${base}/work`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
        ...slugs.map((slug) => ({
            url: `${base}/work/${slug}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        })),
    ];
}
