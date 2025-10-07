"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const path = usePathname();
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={path}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.35, ease: "easeIn" } }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
