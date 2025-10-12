"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function BackgroundOrb() {
    const wrapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const prefersReduced =
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

        const el = wrapRef.current!;
        let rafId = 0;

        // targets we ease toward
        let targetX = 0; // mouse x drift
        let targetY = 0; // mouse y drift
        let targetScroll = 0; // scroll drift

        // current transform values
        let x = 0, y = 0, s = 0;

        // sensitivity (tweak to taste)
        const MOUSE_AMT = 14;      // px offset from mouse
        const SCROLL_AMT = 60;     // px offset from scroll depth
        const EASE = prefersReduced ? 1 : 0.06;

        const onMouseMove = (e: MouseEvent) => {
            const { innerWidth: w, innerHeight: h } = window;
            // normalize [-1, 1]
            const nx = (e.clientX / w) * 2 - 1;
            const ny = (e.clientY / h) * 2 - 1;
            targetX = nx * MOUSE_AMT;
            targetY = ny * MOUSE_AMT;
        };

        const onScroll = () => {
            const yScroll = window.scrollY || 0;
            // map scroll to 0..1 then to px
            targetScroll = Math.min(1, yScroll / 1200) * SCROLL_AMT;
        };

        const tick = () => {
            // ease values
            x += (targetX - x) * EASE;
            y += (targetY - y) * EASE;
            s += (targetScroll - s) * EASE;

            // base position is bottom-right; we offset by x/y and add a gentle rotate
            const rotate = (x + y + s) * 0.15; // subtle rotation derived from drift

            el.style.transform =
                `translate3d(${x}px, ${y - s}px, 0) rotate(${rotate}deg)`;

            rafId = requestAnimationFrame(tick);
        };

        // init
        onScroll();
        if (!prefersReduced) {
            window.addEventListener("mousemove", onMouseMove, { passive: true });
            window.addEventListener("scroll", onScroll, { passive: true });
        }
        rafId = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <div
            aria-hidden
            className="
        fixed -z-10 pointer-events-none
        right-[-10%] bottom-[-12%]  /* lower-right quadrant */
      "
            ref={wrapRef}
            // keep an initial transform so there’s no snap on hydration
            style={{ transform: "translate3d(0,0,0) rotate(0deg)" }}
        >
            <Image
                src="/orb-3.png"   /* put your image in /public/orb.png */
                alt=""
                width={1200}
                height={1200}
                priority={false}
                className="animate-orb-pulse opacity-90"
            />
        </div>
    );
}
