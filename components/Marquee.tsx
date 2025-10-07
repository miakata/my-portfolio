"use client";
import { useEffect, useRef } from "react";

export default function Marquee({ text = "let’s work together", speed = 0.5 }) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        let x = 0;
        let raf: number;
        const step = () => {
            if (ref.current) {
                x = (x - speed) % (ref.current.scrollWidth / 2);
                ref.current.style.transform = `translateX(${x}px)`;
            }
            raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [speed]);
    return (
        <div className="overflow-hidden py-6 border-t border-neutral-800">
            <div ref={ref} className="whitespace-nowrap will-change-transform">
                {[...Array(10)].map((_, i) => (
                    <span key={i} className="mx-8 text-2xl md:text-4xl uppercase tracking-wide">
                        {text}
                    </span>
                ))}
            </div>
        </div>
    );
}
