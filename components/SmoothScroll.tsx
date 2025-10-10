// components/SmoothScroll.tsx
"use client";
import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll() {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const lenis = new Lenis({ smoothWheel: true, duration: 1.1 });
        const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, []);
    return null;
}
