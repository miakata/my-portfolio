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
    const src = p.cover
        ? urlFor(p.cover).width(800).height(600).fit("crop").auto("format").url()
        : "/og-default.jpg";

    return (
        <Link
            href={`/work/${p.slug}`}
            className="
        block relative overflow-hidden rounded-2xl
        ring-1 ring-white/10
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
      "
            aria-label={`Open project ${p.title}`}
        >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
                <Image
                    src={src}
                    alt={p.title}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover"
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
