"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/image";
import type { SanityImgSource } from "@/lib/image";

export type CardProject = {
    slug: string;
    title: string;
    year?: string;
    role?: string;
    summary?: string;
    cover?: SanityImgSource;
};

export default function ProjectCard({ p }: { p: CardProject }) {
    // main card image (full-size)
    const src = p.cover
        ? urlFor(p.cover).width(800).height(600).url()
        : "/og-default.png";

    // small preview image for cursor hover
    const preview = p.cover
        ? urlFor(p.cover).width(600).height(400).fit("crop").auto("format").url()
        : "/og-default.png";


    const frames: string[] = [];

    if (p.cover) {
        frames.push(
            urlFor(p.cover).width(600).height(400).fit("crop").auto("format").url()
        );
    }

    if (Array.isArray((p as any).gallery)) {
        (p as any).gallery.slice(0, 2).forEach((g: SanityImgSource) => {
            frames.push(urlFor(g).width(600).height(400).fit("crop").auto("format").url());
        });
    }

    // Fallback if none
    if (frames.length === 0) frames.push("/og-default.png");

    // Join into a comma-separated list for the data-attr:
    const previewList = frames.join(","); // 👈 this is what HoverPreview reads


    return (
        <Link
            href={`/work/${p.slug}`}
            className="
        group block relative overflow-hidden
        rounded-2xl ring-1 ring-white/10 transition-all duration-300
        hover:ring-white/20
      "
            data-cursor="hover"
            data-cursor-text="View"
            data-cursor-preview={previewList}     // 👈 enables hover media preview
            aria-label={`Open project ${p.title}`}
        >
            {/* Cover image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
                <Image
                    src={src}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Text info */}
            <div className="mt-3">
                <h3 className="text-xl font-medium text-white">{p.title}</h3>
                <p className="text-sm text-neutral-400">
                    {[p.year, p.role].filter(Boolean).join(" · ")}
                </p>
            </div>
        </Link>
    );
}
