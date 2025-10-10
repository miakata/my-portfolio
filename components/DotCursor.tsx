"use client";

import { useEffect, useRef } from "react";

const isCoarsePointer = () =>
    typeof window !== "undefined" &&
    (window.matchMedia?.("(pointer: coarse)").matches || "ontouchstart" in window);

export default function DotCursor() {
    const dotRef = useRef<HTMLDivElement | null>(null);
    const labelRef = useRef<HTMLDivElement | null>(null);
    const hidden = useRef(false);

    useEffect(() => {
        if (isCoarsePointer()) return;

        const prefersReduced =
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

        const dot = dotRef.current!;
        const label = labelRef.current!;

        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        let tx = x;
        let ty = y;

        const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
        const ease = prefersReduced ? 1 : 0.18;

        const setVisible = (v: boolean) => {
            hidden.current = !v;
            const op = v ? "1" : "0";
            dot.style.opacity = op;
            label.style.opacity = op;
        };

        const onMove = (e: MouseEvent) => {
            tx = e.clientX;
            ty = e.clientY;
            if (hidden.current) setVisible(true);
        };

        const onLeave = () => setVisible(false);

        const qInteractive =
            'a, button, [role="button"], input, textarea, select, [data-cursor="hover"], [data-cursor-text]';

        const onOver = (ev: MouseEvent) => {
            const t = (ev.target as Element | null)?.closest(qInteractive) as HTMLElement | null;
            if (!t) return;

            // grow ring/dot on generic hover
            dot.classList.add("scale-150", "opacity-90");

            // label mode if attribute exists
            const text = t.getAttribute("data-cursor-text");
            if (text) {
                label.textContent = text;
                label.classList.remove("scale-50");
                label.classList.add("scale-100");
            }
        };

        const onOut = (ev: MouseEvent) => {
            const t = (ev.target as Element | null)?.closest(qInteractive) as HTMLElement | null;
            if (!t) return;
            dot.classList.remove("scale-150", "opacity-90");
            // hide label smoothly
            label.classList.add("scale-50");
            label.textContent = "";
        };

        const raf = () => {
            x = lerp(x, tx, ease);
            y = lerp(y, ty, ease);
            const transform = `translate3d(${x}px, ${y}px, 0)`;
            dot.style.transform = transform;
            label.style.transform = transform;
            requestAnimationFrame(raf);
        };

        // init
        setVisible(false);
        label.classList.add("scale-50");
        requestAnimationFrame(raf);

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mouseout", onLeave, { passive: true });
        document.addEventListener("mouseover", onOver, { passive: true });
        document.addEventListener("mouseout", onOut, { passive: true });

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseout", onLeave);
            document.removeEventListener("mouseover", onOver);
            document.removeEventListener("mouseout", onOut);
        };
    }, []);

    if (isCoarsePointer()) return null;

    return (
        <>
            {/* base dot / ring */}
            <div
                ref={dotRef}
                aria-hidden
                className="
          fixed left-0 top-0 z-[100]
          h-3 w-3 -translate-x-1/2 -translate-y-1/2
          rounded-full bg-white/80 mix-blend-difference
          ring-0 group-hover:ring-2 ring-white/40
          pointer-events-none select-none will-change-transform
          transition-transform duration-200 ease-out
        "
                style={{ opacity: 0 }}
            />
            {/* label bubble */}
            <div
                ref={labelRef}
                aria-hidden
                className="
          fixed left-0 top-0 z-[100]
          -translate-x-1/2 -translate-y-1/2
          pointer-events-none select-none will-change-transform
          px-2 py-1 rounded-full
          bg-white text-black text-[11px] leading-none font-medium tracking-tight
          shadow-[0_2px_10px_rgba(0,0,0,0.25)]
          transition-all duration-150 ease-out
        "
                style={{ opacity: 0 }}
            />
        </>
    );
}
