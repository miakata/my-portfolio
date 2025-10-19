import CategorySection from "@/components/CategorySection";
import { sanityClient } from "@/lib/sanity.client";
import { allProjectsQuery } from "@/lib/queries";
import type { CardProject } from "@/lib/types";
import { VIDEO_OVERRIDES } from "@/lib/videoOverrides";

export const revalidate = 60;

export default async function WorkPage() {
    const projects = await sanityClient.fetch<CardProject[]>(allProjectsQuery);

    const withOverrides: CardProject[] = projects.map((p) => {
        const o = VIDEO_OVERRIDES[p.slug];
        return o ? { ...p, coverVideoSrc: o.src, coverPoster: o.poster } : p;
    });

    const ecommerce = withOverrides.filter((p) => p.category === "ecommerce");
    const websites = withOverrides.filter((p) => p.category === "websites");
    const games = withOverrides.filter((p) => p.category === "games");

    return (
        <main className="px-6 md:px-10 max-w-6xl mx-auto py-24">
            <h1 className="text-4xl md:text-6xl font-bold mb-12 tracking-tight">Selected Work</h1>
            <CategorySection title="E-commerce" items={ecommerce} />
            <CategorySection title="Websites & Implementations" items={websites} />
            <CategorySection title="Game Development" items={games} />
        </main>
    );
}
