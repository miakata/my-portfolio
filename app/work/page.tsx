// app/work/page.tsx (SERVER)
import CategorySection from "@/components/CategorySection";
import { sanityClient } from "@/lib/sanity.client";
import { allProjectsQuery } from "@/lib/queries";
import type { CardProject } from "@/components/ProjectCard";

export const revalidate = 60;

export default async function WorkPage() {
    const projects = await sanityClient.fetch<CardProject[]>(allProjectsQuery);

    const ecommerce = projects.filter((p) => p.category === "ecommerce");
    const websites = projects.filter((p) => p.category === "websites");
    const games = projects.filter((p) => p.category === "games");

    return (
        <main className="px-6 md:px-10 max-w-6xl mx-auto py-24">
            <h1 className="text-4xl md:text-6xl font-bold mb-12 tracking-tight">Selected Work</h1>

            <CategorySection title="E-commerce" items={ecommerce} />
            <CategorySection title="Websites & Implementations" items={websites} />
            <CategorySection title="Game Development" items={games} />
        </main>
    );
}
