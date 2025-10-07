"use client";
import { useEffect, useState } from "react";

export default function DotCursor() {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [isHidden, setHidden] = useState(false);

    useEffect(() => {
        const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
        const hide = () => setHidden(true);
        const show = () => setHidden(false);

        window.addEventListener("mousemove", move);
        window.addEventListener("mouseleave", hide);
        window.addEventListener("mouseenter", show);

        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseleave", hide);
            window.removeEventListener("mouseenter", show);
        };
    }, []);

    return (
        <div
            className={`pointer-events-none fixed left-0 top-0 z-[9999] h-4 w-4 rounded-full bg-black/80 mix-blend-difference transition-transform duration-75 ease-out ${isHidden ? "opacity-0" : "opacity-100"
                }`}
            style={{
                transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
            }}
        />
    );
}
