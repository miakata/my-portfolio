import Image from "next/image";
import PortableTextClient from "@/components/PortableTextClient";
import { sanityClient } from "@/lib/sanity.client";
import { urlFor } from "@/lib/image";
import { allSlugsQuery, projectBySlugQuery } from "@/lib/queries";
import type { SanityImageSource } from "@sanity/image-url";

export const revalidate = 60;

type ProjectDoc = {
    title: string;
    slug: string;
    year?: string;
    role?: string;
    summary?: string;
    cover?: SanityImageSource;
    gallery?: SanityImageSource[];
    body?: unknown; 
};

export async function generateStaticParams() {
    const slugs = await sanityClient.fetch<string[]>(allSlugsQuery);
    return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
    const project = await sanityClient.fetch<ProjectDoc | null>(projectBySlugQuery, {
        slug: params.slug,
    });
    if (!project) return <div className="p-6">Not found</div>;

    const coverSrc = project.cover ? urlFor(project.cover).width(1600).height(1000).url() : undefined;

    return (
        <main className="px-6 md:px-10 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold">{project.title}</h1>
            {project.summary && <p className="mt-3 text-neutral-500">{project.summary}</p>}

            {coverSrc && (
                <div className="relative mt-8 aspect-[16/10] rounded-2xl overflow-hidden">
                    <Image src={coverSrc} alt={project.title} fill className="object-cover" />
                </div>
            )}

            {project.body && (
                <article className="prose prose-invert mt-10 max-w-none">
                    <PortableTextClient
                        value={project.body}
                        components={{
                            types: {
                                image: ({ value }: { value: SanityImageSource }) => {
                                    const img = urlFor(value).width(1600).height(1000).url();
                                    return (
                                        <div className="relative my-6 aspect-[16/10] rounded-xl overflow-hidden">
                                            <Image src={img} alt="" fill className="object-cover" />
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
                        const src = urlFor(img).width(1200).height(800).url();
                        return (
                            <div key={i} className="relative aspect-[16/10] rounded-xl overflow-hidden">
                                <Image src={src} alt="" fill className="object-cover" />
                            </div>
                        );
                    })}
                </section>
            )}
        </main>
    );
}
