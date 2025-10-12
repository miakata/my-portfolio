"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/image";
import type { SanityImgSource } from "@/lib/image";

// components/ProjectCard.tsx
export type CardProject = {
    slug: string;
    title: string;
    year?: string;
    role?: string;
    summary?: string;
    cover?: SanityImgSource;
    gallery?: SanityImgSource[];
    category?: "ecommerce" | "websites" | "games";
};


export default function ProjectCard({ p }: { p: CardProject }) {
    const src = p.cover
        ? urlFor(p.cover).width(800).height(600).fit("crop").auto("format").url()
        : "/og-default.png";

    return (
        <Link
            href={`/work/${p.slug}`}
            className="
        block relative overflow-hidden
        focus:outline-none  transition-transform duration-500
        hover:scale-[1.02]          /* 💫 soft lift on hover */
       
        focus:outline-none
      "
            aria-label={`Open project ${p.title}`}
        >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
                <Image
                    src={src}
                    alt={p.title}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={false}
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
