"use client";

import { useEffect, useRef } from "react";

const isCoarsePointer = () =>
    typeof window !== "undefined" &&
    (window.matchMedia?.("(pointer: coarse)").matches || "ontouchstart" in window);

export default function DotCursor() {
    // ✅ singleton guard: don’t mount another cursor if one exists
    if (typeof window !== "undefined" && document.getElementById("dot-cursor-root")) {
        return null;
    }

    const dotRef = useRef<HTMLDivElement | null>(null);
    const hidden = useRef(true);

    useEffect(() => {
        if (isCoarsePointer()) return;

        const dot = dotRef.current!;
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        let tx = x;
        let ty = y;
        const ease = 0.2;

        const setVisible = (v: boolean) => {
            hidden.current = !v;
            dot.style.opacity = v ? "1" : "0";
        };

        const onMove = (e: PointerEvent) => {
            tx = e.clientX;
            ty = e.clientY;
            if (hidden.current) setVisible(true);
        };

        const onLeave = () => setVisible(false);

        const raf = () => {
            x = x + (tx - x) * ease;
            y = y + (ty - y) * ease;
            dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            requestAnimationFrame(raf);
        };

        setVisible(false);
        requestAnimationFrame(raf);

        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerleave", onLeave);
        window.addEventListener("blur", onLeave);

        return () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerleave", onLeave);
            window.removeEventListener("blur", onLeave);
        };
    }, []);

    if (isCoarsePointer()) return null;

    return (
        <div
            id="dot-cursor-root"
            ref={dotRef}
            aria-hidden
            className="fixed left-0 top-0 z-[100] h-3 w-3 -translate-x-1/2 -translate-y-1/2
                 rounded-full bg-white/80 mix-blend-difference pointer-events-none
                 select-none transition-opacity duration-150 ease-out will-change-transform"
            style={{ opacity: 0 }}
        />
    );
}
