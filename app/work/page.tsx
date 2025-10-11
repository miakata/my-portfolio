import ProjectCard from "@/components/ProjectCard";
import { sanityClient } from "@/lib/sanity.client";
import { allProjectsQuery } from "@/lib/queries";
import Reveal from "@/components/Reveal";
import type { SanityImgSource } from "@/lib/image";
// app/work/page.tsx (and others)
import Container from "@/components/Container";





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

           
            <main className="min-h-screen px-6 md:px-10">
                <Container>
                <section className="mx-auto max-w-6xl py-20">
                    <Reveal>
                        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
                            Selected Work
                        </h1>
                    </Reveal>
                    <p className="text-white/60">No projects yet. Publish one in Studio.</p>
                    </section>
            </Container>
            </main>
        );
    }

    return (
        <main className="min-h-screen px-6 md:px-10">
            <Container>
            <section className="mx-auto max-w-6xl py-20">
                <Reveal>
                    <header className="mb-10">
                        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">Selected Work</h1>
                        <p className="mt-4 text-white/90 max-w-3xl">
                            A mix of product, web, and visuals. Built with Next.js + Sanity.
                        </p>
                    </header>
                </Reveal>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((p) => (
                        <Reveal key={p.slug}>
                            <ProjectCard
                                p={{
                                    slug: p.slug,
                                    title: p.title,
                                    cover: p.cover,
                                    year: p.year,
                                    role: p.role,
                                    // summary: p.summary, // enable if your card shows it
                                }}
                            />
                        </Reveal>
                    ))}
                </div>
                </section>
                </Container>
        </main>
    );
}
