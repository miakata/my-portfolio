// app/work/[slug]/page.tsx
//import Image from "next/image";
import type { Metadata } from "next";
import type { PortableTextBlock } from "@portabletext/types";

import { sanityClient } from "@/lib/sanity.client";
import { urlFor, type SanityImgSource } from "@/lib/image";
import { allSlugsQuery, projectBySlugQuery } from "@/lib/queries";

import PortableTextClient from "@/components/PortableTextClient";
import SharedCover from "@/components/SharedCover";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import LogoGrid from "@/components/LogoGrid"; // 👈 NEW


export const revalidate = 60;


type ProjectDoc = {
    title: string;
    slug: string; // from GROQ: "slug": slug.current
    year?: string;
    role?: string;
    summary?: string;
     // used for the logo wall
    body?: PortableTextBlock[];

    gallery?: {
        asset?: { url?: string; mimeType?: string };
        href?: string;
        label?: string;
        alt?: string;
    }[];
    cover?: SanityImgSource | null;
    coverMedia?: {
        type?: "image" | "video";
        image?: SanityImgSource;
        videoFile?: { asset?: { url?: string; mimeType?: string } };
        videoUrl?: string;
    };

    logos?: {
        asset?: { url?: string; mimeType?: string };
        href?: string;
        label?: string;
        alt?: string;
    }[];

};

export async function generateStaticParams() {
    const slugs: string[] = await sanityClient.fetch(allSlugsQuery);
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const project = await sanityClient.fetch<ProjectDoc>(projectBySlugQuery, { slug });
    if (!project) return { title: "Not found" };

    const title = project.title ?? "Project";
    const description = project.summary ?? "Case study";
    const coverForOg = project.cover ?? project.coverMedia?.image ?? null;
    const og = coverForOg
        ? urlFor(coverForOg).width(1200).height(630).url()
        : "/og-default.png";
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: og ? [{ url: og, width: 1200, height: 630 }] : undefined,
            type: "article",
        },
        twitter: { card: "summary_large_image" },
    };
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = await sanityClient.fetch<ProjectDoc>(projectBySlugQuery, { slug });

    if (!project) {
        return (
            <main className="min-h-screen flex items-center justify-center text-center">
                <Container>
                    <Reveal>
                        <h1 className="text-2xl font-medium text-gray-300 tracking-tight">
                            Project not found.
                        </h1>
                    </Reveal>
                </Container>
            </main>
        );
    }
    const coverSrc = project.cover
        ? urlFor(project.cover).width(1600).height(900).url()
        : undefined;

    return (
        <main className="min-h-screen px-6 py-20 md:px-20">
            {/* Header */}
            <header className="max-w-4xl mx-auto">
                <Reveal>
                    <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
                        {project.title}
                    </h1>
                </Reveal>

                <div className="mt-4 text-gray-400 space-x-6 text-sm">
                    {project.year && <span>{project.year}</span>}
                    {project.role && <span>{project.role}</span>}
                </div>

                {project.summary && (
                    <p className="mt-6 text-gray-300 text-lg leading-relaxed">
                        {project.summary}
                    </p>
                )}
            </header>

           

            {/* Cover (shared transition) */}
            {coverSrc && (
                <div className="max-w-6xl mx-auto mt-12">
                    <SharedCover id={project.slug} src={coverSrc} alt={project.title} />
                </div>
            )}

            {/* Body content */}
            {Array.isArray(project.body) && project.body.length > 0 && (
                <article className="prose prose-invert mt-16 max-w-4xl mx-auto">
                    <PortableTextClient value={project.body} />
                </article>
            )}
            {/* 🔧 Tools & Platforms (logo wall) — uses GALLERY images */}
            {Array.isArray(project.logos) && project.logos.length > 0 && (
                <div className="mt-16 max-w-4xl mx-auto">
                <LogoGrid title="Tools & Platforms" images={project.logos} max={18} /></div>
            )}
          
        </main>
    );
}
