import Image from "next/image";
import { urlFor, type SanityImgSource } from "@/lib/image";
import { allSlugsQuery, projectBySlugQuery } from "@/lib/queries";
import PortableTextClient from "@/components/PortableTextClient";
import { sanityClient } from "@/lib/sanity.client";
import type { PortableTextBlock } from "@portabletext/types";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SharedCover from "@/components/SharedCover"
// app/work/page.tsx (and others)
import Container from "@/components/Container";





export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
    const { slug } = await params;
    const project = await sanityClient.fetch<ProjectDoc>(projectBySlugQuery, { slug });
    if (!project) return { title: "Not found" };

    const title = project.title ?? "Project";
    const description = project.summary ?? "Case study";
    const og =
        project.cover ? urlFor(project.cover).width(1200).height(630).url() : "/og-default.png";

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

export const revalidate = 60;

type ProjectDoc = {
    title: string;
    slug: string; // ensure your GROQ maps "slug": slug.current
    year?: string;
    role?: string;
    summary?: string;
    cover?: SanityImgSource;
    gallery?: SanityImgSource[];
    body?: PortableTextBlock[];
};

// Prebuild static paths
export async function generateStaticParams() {
    const slugs: string[] = await sanityClient.fetch(allSlugsQuery);
    return slugs.map((slug) => ({ slug }));
}

// Page component render
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
                    <h1 className="text-2xl font-medium text-gray-300 tracking-tight">Project not found.</h1>
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
            <header className="max-w-4xl mx-auto">
                <Reveal>
                    <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">{project.title}</h1>
                </Reveal>

                <div className="mt-4 text-gray-400 space-x-6 text-sm">
                    {project.year && <span>{project.year}</span>}
                    {project.role && <span>{project.role}</span>}
                </div>

                {project.summary && (
                    <p className="mt-6 text-gray-300 text-lg leading-relaxed">{project.summary}</p>
                )}
            </header>

            {coverSrc && (
                <div className="max-w-6xl mx-auto mt-12">
                    <SharedCover id={project.slug} src={coverSrc} alt={project.title} />
                    </div>
            )}

            {Array.isArray(project.body) && project.body.length > 0 && (
                <article className="prose prose-invert mt-16 max-w-4xl mx-auto">
                    <PortableTextClient
                        value={project.body}
                        components={{
                            types: {
                                image: ({ value }: { value: SanityImgSource }) => {
                                    const imgUrl = urlFor(value).width(1600).height(1000).url();
                                    return (
                                        <div className="relative my-8 aspect-[16/10] rounded-xl overflow-hidden">
                                            <Image src={imgUrl} alt="" fill className="object-cover" />
                                        </div>
                                    );
                                },
                            },
                        }}
                    />
                </article>
            )}

            {Array.isArray(project.gallery) && project.gallery.length > 0 && (
                <section className="mt-12 grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
                    {project.gallery.map((img, i) => {
                        const gsrc = urlFor(img).width(1200).height(800).url();
                        return (
                            <div key={i} className="relative aspect-[16/10] rounded-xl overflow-hidden">
                                <Image src={gsrc} alt="" fill className="object-cover" />
                            </div>
                        );
                    })}
                </section>
            )}
        </main>
    );
}
