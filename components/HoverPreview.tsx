"use client";

import { useEffect, useRef } from "react";

const isCoarsePointer = () =>
    typeof window !== "undefined" &&
    (window.matchMedia?.("(pointer: coarse)").matches || "ontouchstart" in window);

export default function HoverPreview() {
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const imgARef = useRef<HTMLImageElement | null>(null);
    const imgBRef = useRef<HTMLImageElement | null>(null);
    const hidden = useRef(true);
    const frameIdx = useRef(0);
    const frames = useRef<string[]>([]);
    const activeA = useRef(true);
    const cycleTimer = useRef<number | null>(null);

    useEffect(() => {
        if (isCoarsePointer()) return;

        const prefersReduced =
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

        const wrap = wrapRef.current!;
        const imgA = imgARef.current!;
        const imgB = imgBRef.current!;

        let x = 0, y = 0, tx = 0, ty = 0;
        const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
        const ease = prefersReduced ? 1 : 0.18;

        const setVisible = (v: boolean) => {
            hidden.current = !v;
            wrap.style.opacity = v ? "1" : "0";
            wrap.style.transform = v
                ? wrap.style.transform.replace(" scale(0.9)", " scale(1)")
                : wrap.style.transform.replace(" scale(1)", " scale(0.9)");
        };

        const preload = (urls: string[]) =>
            Promise.all(
                urls.map(
                    (src) =>
                        new Promise<void>((res) => {
                            const i = new Image();
                            i.onload = () => res();
                            i.onerror = () => res();
                            i.src = src;
                        })
                )
            );

        const startCycle = () => {
            stopCycle();
            if (frames.current.length <= 1 || prefersReduced) return;

            cycleTimer.current = window.setInterval(() => {
                // next frame
                frameIdx.current = (frameIdx.current + 1) % frames.current.length;
                const next = frames.current[frameIdx.current];

                // crossfade between A and B
                if (activeA.current) {
                    imgB.src = next;
                    imgB.style.opacity = "1";
                    imgA.style.opacity = "0";
                    activeA.current = false;
                } else {
                    imgA.src = next;
                    imgA.style.opacity = "1";
                    imgB.style.opacity = "0";
                    activeA.current = true;
                }
            }, 900);
        };

        const stopCycle = () => {
            if (cycleTimer.current) {
                clearInterval(cycleTimer.current);
                cycleTimer.current = null;
            }
        };

        const onMove = (e: MouseEvent) => {
            tx = e.clientX + 18;
            ty = e.clientY + 18;
        };

        const onOver = async (e: MouseEvent) => {
            const t = (e.target as Element | null)?.closest("[data-cursor-preview]") as
                | HTMLElement
                | null;
            if (!t) return;

            const raw = t.getAttribute("data-cursor-preview") || "";
            const urls = raw
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);

            if (!urls.length) return;

            frames.current = urls;
            frameIdx.current = 0;
            activeA.current = true;

            // preload before showing
            await preload(urls);

            // set initial frame into A, hide B
            imgA.src = urls[0];
            imgA.style.opacity = "1";
            imgB.style.opacity = "0";

            setVisible(true);
            startCycle();
        };

        const onOut = (e: MouseEvent) => {
            const t = (e.target as Element | null)?.closest("[data-cursor-preview]");
            if (!t) return;
            stopCycle();
            setVisible(false);
        };

        const raf = () => {
            x = lerp(x, tx, ease);
            y = lerp(y, ty, ease);
            wrap.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${hidden.current ? 0.9 : 1})`;
            requestAnimationFrame(raf);
        };

        // init
        wrap.style.opacity = "0";
        wrap.style.transform = "translate3d(0,0,0) scale(0.9)";
        requestAnimationFrame(raf);

        window.addEventListener("mousemove", onMove, { passive: true });
        document.addEventListener("mouseover", onOver, { passive: true });
        document.addEventListener("mouseout", onOut, { passive: true });

        return () => {
            stopCycle();
            window.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseover", onOver);
            document.removeEventListener("mouseout", onOut);
        };
    }, []);

    if (isCoarsePointer()) return null;

    return (
        <div
            ref={wrapRef}
            aria-hidden
            className="
        fixed left-0 top-0 z-[99] pointer-events-none select-none
        w-[260px] h-[170px] rounded-xl overflow-hidden
        shadow-[0_10px_40px_rgba(0,0,0,0.35)]
        ring-1 ring-white/10 bg-black/40 backdrop-blur
        transition-[opacity,transform] duration-200 ease-out
      "
        >
            <img
                ref={imgARef}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ease-out"
                style={{ opacity: 0 }}
            />
            <img
                ref={imgBRef}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ease-out"
                style={{ opacity: 0 }}
            />
        </div>
    );
}
