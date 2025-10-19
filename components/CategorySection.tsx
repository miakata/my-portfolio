"use client";

import { motion, type Variants, cubicBezier } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import type { CardProject } from "@/lib/types";

const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
    },
};

// Use a properly typed easing function
const smoothEase = cubicBezier(0.22, 1, 0.36, 1);

const item: Variants = {
    hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.8, ease: smoothEase },
    },
};

export default function CategorySection({
    title,
    items,
}: {
    title: string;
    items: CardProject[];
}) {
    if (!items?.length) return null;

    return (
        <motion.section
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
        >
            <h2 className="mb-6 text-2xl md:text-3xl font-semibold tracking-tight">
                {title}
            </h2>

            <div className="grid gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-2">
                {items.map((p) => (
                    <motion.div key={p.slug} variants={item}>
                        <ProjectCard p={p} />
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
