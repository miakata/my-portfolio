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
    gallery?: SanityImgSource[];
};

export default function ProjectCard({ p }: { p: CardProject }) {
    // Cover image URL
    const src =
        p.cover
            ? urlFor(p.cover).width(800).height(600).fit("crop").auto("format").url()
            : "/og-default.jpg";

    // Collect hover preview frames (cover + 2 gallery images)
    const frames: string[] = [];
    if (p.cover) {
        frames.push(urlFor(p.cover).width(600).height(400).fit("crop").auto("format").url());
    }
    if (Array.isArray(p.gallery)) {
        for (const img of p.gallery.slice(0, 2)) {
            frames.push(urlFor(img).width(600).height(400).fit("crop").auto("format").url());
        }
    }
    const previewList = frames.join(",");

    return (
        <Link
            href={`/work/${p.slug}`}
            className="group block relative overflow-hidden rounded-2xl ring-1 ring-white/10 transition-all duration-300 hover:ring-white/20"
            data-cursor="hover"
            data-cursor-text="View"
            data-cursor-preview={previewList}
            aria-label={`Open project ${p.title}`}
        >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
                <Image
                    src={src}
                    alt={p.title}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <div className="mt-3">
                <h3 className="text-xl font-medium text-white tracking-tight">{p.title}</h3>
                <p className="text-sm text-neutral-400">
                    {[p.year, p.role].filter(Boolean).join(" · ")}
                </p>
            </div>
        </Link>
    );
}
