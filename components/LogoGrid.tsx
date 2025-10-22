"use client";

import Image from "next/image";
import { urlFor, type SanityImgSource } from "@/lib/image";

type LogoImage = SanityImgSource & {
    asset?: {
        url?: string;
        mimeType?: string;
    };
    href?: string;
    label?: string;
    alt?: string;
};

type LogoGridProps = {
    title?: string;
    images: LogoImage[];
    max?: number;
};

export default function LogoGrid({
    title = "Tools & Platforms",
    images,
    max,
}: LogoGridProps) {
    if (!Array.isArray(images) || images.length === 0) return null;
    const logos = typeof max === "number" ? images.slice(0, max) : images;

    return (
        <section className="max-w-6xl mx-auto mt-12">
            <h2 className="text-lg font-semibold text-neutral-200 mb-4">{title}</h2>

            {/* Wraps naturally: 2 → 3 → 4 columns; generous gaps */}
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 items-center">
                {logos.map((img, i) => {
                    const mime = img.asset?.mimeType ?? "";
                    const isSvg = mime.includes("svg");

                    // For rasters, ask Sanity for a crisp rendition
                    const rasterSrc = urlFor(img).width(400).fit("max").auto("format").dpr(2).url();
                    const src = isSvg ? img.asset?.url ?? "" : rasterSrc;

                    const logoEl = (
                        <div className="relative h-10 w-[160px]">
                            <Image
                                src={src || "/og-default.png"}
                                alt={img.alt || img.label || "Logo"}
                                fill
                                sizes="160px"
                                className="object-contain opacity-80 hover:opacity-100 transition"
                                priority={false}
                            // For SVGs, Next.js serves as-is; for rasters, it optimizes via Sanity CDN.
                            />
                        </div>
                    );

                    return (
                        <li key={i} className="flex items-center justify-center">
                            {img.href ? (
                                <a
                                    href={img.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={img.label || img.alt || ""}
                                    className="inline-flex"
                                >
                                    {logoEl}
                                </a>
                            ) : (
                                logoEl
                            )}
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
