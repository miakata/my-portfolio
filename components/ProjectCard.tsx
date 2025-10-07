"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { urlFor } from "@/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

type ProjectCardProps = {
    title: string;
    slug: string;
    summary?: string;
    cover?: SanityImageSource;
};

export default function ProjectCard({ title, slug, summary, cover }: ProjectCardProps) {
    const src = cover ? urlFor(cover).width(1200).height(750).url() : undefined;

    return (
        <Link href={`/work/${slug}`} className="group block">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-100">
                <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.45 }}>
                    {src && <Image src={src} alt={title} fill className="object-cover" />}
                </motion.div>
            </div>
            <h3 className="mt-3 text-xl font-semibold">{title}</h3>
            {summary && <p className="text-neutral-500">{summary}</p>}
        </Link>
    );
}
