"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Reveal({ children }: { children: React.ReactNode }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-10% 0px" });
    const controls = useAnimation();
    useEffect(() => { if (inView) controls.start({ opacity: 1, y: 0 }); }, [inView, controls]);
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 12 }}
            animate={controls}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}
