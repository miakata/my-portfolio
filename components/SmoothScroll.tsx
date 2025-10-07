"use client";
import { useEffect } from "react";
import Lenis from "lenis"; 

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.1,
            smoothWheel: true,
            lerp: 0.1,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
