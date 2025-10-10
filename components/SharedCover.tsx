"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function SharedCover({
    id,
    src,
    alt,
    aspect = "aspect-[4/3]", // match the card aspect for a perfect morph
}: {
    id: string;
    src: string;
    alt: string;
    aspect?: string;
}) {
    return (
        <motion.div
            layoutId={`cover-${id}`}
            className={`relative ${aspect} overflow-hidden rounded-2xl`}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" priority />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
        </motion.div>
    );
}
