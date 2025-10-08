import Image from "next/image";
import { urlFor, type SanityImgSource } from "@/lib/image";
import { allSlugsQuery, projectBySlugQuery } from "@/lib/queries";
import PortableTextClient from "@/components/PortableTextClient";
import { sanityClient } from "@/lib/sanity.client";
import type { PortableTextBlock } from "@portabletext/types";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> },
    _parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const project = await sanityClient.fetch<ProjectDoc>(projectBySlugQuery, { slug });
    if (!project) return { title: "Not found" };

    const title = project.title ?? "Project";
    const description = project.summary ?? "Case study";
    const og = project.cover ? urlFor(project.cover).width(1200).height(630).url() : "/og-default.jpg";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: og ? [{ url: og, width: 1200, height: 630 }] : undefined,
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
        },
    };
}


export const revalidate = 60;

type ProjectDoc = {
    title: string;
    slug: string;
    year?: string;
    role?: string;
    summary?: string;
    cover?: SanityImgSource;
    gallery?: SanityImgSource[];
    body?: PortableTextBlock[];
};


// Build-time params for all projects
export async function generateStaticParams() {
    const slugs = await sanityClient.fetch<string[]>(allSlugsQuery);
    return slugs.map((slug) => ({ slug }));
}

// ✅ Dynamic route: params is a Promise<{ slug: string }>
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
                <h1 className="text-2xl font-medium text-gray-300">Project not found.</h1>
            </main>
        );
    }

    const coverSrc =
        project.cover && urlFor(project.cover).width(1600).height(900).url();

    return (
        <main className="min-h-screen bg-black text-white px-6 py-20 md:px-20">
            <header className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-semibold">{project.title}</h1>

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

            {coverSrc && (
                <div className="relative max-w-6xl mx-auto mt-12 aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image src={coverSrc} alt={project.title} fill className="object-cover" />
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
                <section className="mt-12 grid gap-6 md:grid-cols-2">
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
