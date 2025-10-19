// components/ProjectCard.tsx
"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/image";
import type { CardProject } from "@/lib/types";

export default function ProjectCard({ p }: { p: CardProject }) {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const overrideVideo = p.coverVideoSrc ?? null;
    const overridePoster = p.coverPoster ?? null;

    const sanityVideo =
        p.coverMedia?.type === "video"
            ? p.coverMedia.videoFile?.asset?.url ?? p.coverMedia.videoUrl ?? null
            : null;

    const videoSrc = overrideVideo || sanityVideo || null;

    const posterSrc =
        overridePoster ??
        (p.coverMedia?.type === "image" && p.coverMedia.image?.asset?.url
            ? urlFor(p.coverMedia.image).width(800).height(600).fit("crop").auto("format").url()
            : p.cover?.asset?.url
                ? urlFor(p.cover).width(800).height(600).fit("crop").auto("format").url()
                : "/og-default.png");

    const meta = [p.year, p.role].filter(Boolean).join(" · ");

    return (
        <Link
            href={`/work/${p.slug}`}
            aria-label={`Open project ${p.title}`}
            className="group block relative overflow-hidden rounded-2xl transition-transform duration-500 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            onMouseEnter={() => {
                if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                    videoRef.current.play().catch(() => { });
                }
            }}
            onMouseLeave={() => {
                if (videoRef.current) videoRef.current.pause();
            }}
            onFocus={() => {
                if (videoRef.current) videoRef.current.play().catch(() => { });
            }}
            onBlur={() => {
                if (videoRef.current) videoRef.current.pause();
            }}
        >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
                {videoSrc ? (
                    <video
                        ref={videoRef}
                        src={videoSrc}
                        poster={posterSrc}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <Image
                        src={posterSrc}
                        alt={p.title}
                        fill
                        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                )}
            </div>

            <div className="mt-3">
                <h3 className="text-xl font-medium text-white tracking-wide">{p.title}</h3>
                {meta && <p className="text-sm text-neutral-400">{meta}</p>}
            </div>
        </Link>
    );
}
