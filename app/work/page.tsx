import ProjectCard from "@/components/ProjectCard";
import { sanityClient } from "@/lib/sanity.client";
import { allProjectsQuery } from "@/lib/queries";
import type { SanityImgSource } from "@/lib/image";


export const revalidate = 60;

type ProjectListItem = {
    title: string;
    slug: string;
    year?: string;
    role?: string;
    summary?: string;
    cover?: SanityImgSource;
};

export default async function WorkPage() {
    const projects = await sanityClient.fetch<ProjectListItem[]>(allProjectsQuery); 
    if (!projects?.length) {
        return (
            <main className="px-6 md:px-10 max-w-5xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-8">Work</h1>
                <p className="text-neutral-500">No projects yet. Publish one in Studio.</p>
            </main>
        );
    }

    return (
        <main className="px-6 md:px-10 max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-8">Work</h1>
            <div className="grid gap-10 md:grid-cols-2">
                {projects.map((p) => (
                    <ProjectCard
                        key={p.slug}
                        slug={p.slug}
                        title={p.title}
                        summary={p.summary}
                        cover={p.cover}
                    />
                ))}
            </div>
        </main>
    );
}
