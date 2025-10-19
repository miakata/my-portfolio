"use client";

import Link from "next/link";

export default function CTAWork() {
    return (
        <div
            className="
        relative
        mt-10                      /* space below text on mobile */
        flex justify-center md:block
      "
        >
            <Link
                href="/work"
                className="
          group inline-flex items-center gap-3
          rounded-full px-5 py-3
          bg-white/10 hover:bg-white/15
          ring-1 ring-white/20 hover:ring-white/30
          backdrop-blur-md text-white transition-all duration-300
          md:absolute md:right-[8vw] md:top-[20vh]   /* desktop: orb area */
          lg:right-[10vw] lg:top-[25vh]
          xl:right-[12vw] xl:top-[28vh]
        "
                aria-label="Go to Work section"
            >
                <span className="text-sm md:text-base font-medium tracking-tight">
                    Check out my work
                </span>

                {/* animated arrow */}
                <span className="relative inline-flex items-center">
                    <svg
                        className="h-4 w-4 opacity-90 transition-transform duration-300 group-hover:translate-x-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M5 12h12" />
                        <path d="M13 6l6 6-6 6" />
                    </svg>
                    <svg
                        className="absolute left-0 h-4 w-4 opacity-30 motion-safe:animate-nudge-right"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M5 12h12" />
                        <path d="M13 6l6 6-6 6" />
                    </svg>
                </span>
            </Link>
        </div>
    );
}
