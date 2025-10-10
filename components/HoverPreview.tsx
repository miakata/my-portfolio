/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef } from "react";

const isCoarsePointer = () =>
    typeof window !== "undefined" &&
    (window.matchMedia?.("(pointer: coarse)").matches || "ontouchstart" in window);

export default function HoverPreview() {
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const imgARef = useRef<HTMLImageElement | null>(null);
    const imgBRef = useRef<HTMLImageElement | null>(null);

    // state refs
    const activeEl = useRef<HTMLElement | null>(null);
    const hidden = useRef(true);
    const frames = useRef<string[]>([]);
    const frameIdx = useRef(0);
    const useA = useRef(true);
    const timer = useRef<number | null>(null);

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
            timer.current = window.setInterval(() => {
                frameIdx.current = (frameIdx.current + 1) % frames.current.length;
                const next = frames.current[frameIdx.current];
                if (useA.current) {
                    imgB.src = next;
                    imgB.style.opacity = "1";
                    imgA.style.opacity = "0";
                } else {
                    imgA.src = next;
                    imgA.style.opacity = "1";
                    imgB.style.opacity = "0";
                }
                useA.current = !useA.current;
            }, 900);
        };

        const stopCycle = () => {
            if (timer.current) {
                clearInterval(timer.current);
                timer.current = null;
            }
        };

        const onPointerMove = (e: PointerEvent) => {
            tx = e.clientX + 18;
            ty = e.clientY + 18;
        };

        // Use pointerenter/leave with capture so it always fires,
        // and only for elements that opt-in with [data-cursor-preview]
        const onPointerEnter = async (e: Event) => {
            const t = (e.target as Element | null)?.closest("[data-cursor-preview]") as
                | HTMLElement
                | null;
            if (!t) return;

            activeEl.current = t;

            const raw = t.getAttribute("data-cursor-preview") || "";
            const urls = raw
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);

            if (!urls.length) return;

            frames.current = urls;
            frameIdx.current = 0;
            useA.current = true;

            await preload(urls);

            imgA.src = urls[0];
            imgA.style.opacity = "1";
            imgB.style.opacity = "0";

            setVisible(true);
            startCycle();
        };

        const onPointerLeave = (e: Event) => {
            // Only hide if we're leaving the SAME active element
            const t = e.target as HTMLElement | null;
            if (t && activeEl.current && t.contains(activeEl.current)) {
                // noop, nested leave
                return;
            }
            activeEl.current = null;
            stopCycle();
            setVisible(false);
        };

        const raf = () => {
            x = lerp(x, tx, ease);
            y = lerp(y, ty, ease);
            wrap.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${hidden.current ? 0.9 : 1})`;
            requestAnimationFrame(raf);
        };

        const hideNow = () => {
            activeEl.current = null;
            stopCycle();
            setVisible(false);
        };

        window.addEventListener("blur", hideNow);
        window.addEventListener("mouseleave", hideNow);          // pointer exits viewport (Mac)
        document.documentElement.addEventListener("mouseleave", hideNow, true); // extra guard
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) hideNow();
        });


        // init
        wrap.style.opacity = "0";
        wrap.style.transform = "translate3d(0,0,0) scale(0.9)";
        requestAnimationFrame(raf);

        window.addEventListener("pointermove", onPointerMove, { passive: true });
        // capture = true ensures we catch enter/leave even when bubbling is weird
        document.addEventListener("pointerenter", onPointerEnter, true);
        document.addEventListener("pointerleave", onPointerLeave, true);

        return () => {
            stopCycle();
            window.removeEventListener("pointermove", onPointerMove);
            document.removeEventListener("pointerenter", onPointerEnter, true);
            document.removeEventListener("pointerleave", onPointerLeave, true);
            window.removeEventListener("blur", hideNow);
            window.removeEventListener("mouseleave", hideNow);
            document.documentElement.removeEventListener("mouseleave", hideNow, true);

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
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-out"
                style={{ opacity: 0 }}
            />
            <img
                ref={imgBRef}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-out"
                style={{ opacity: 0 }}
            />
        </div>
    );
}
