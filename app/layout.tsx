import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import DotCursor from "@/components/DotCursor";
import Header from "@/components/Header";
import HoverPreview from "@/components/HoverPreview";





export const metadata: Metadata = {
    metadataBase: new URL("https://mia-portfolio-nu.vercel.app"),
    title: {
        default: "Mia Katarina — Portfolio",
        template: "%s · Mia Katarina",
    },
    description:
        "Designer & Frontend developer crafting sleek, performant experiences with Next.js and Sanity.",
    openGraph: {
        type: "website",
        url: "/",
        title: "Mia Katarina — Portfolio",
        description:
            "Designer & Frontend developer crafting sleek, performant experiences with Next.js and Sanity.",
        images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased">
                <SmoothScroll />
                <Header />
                <PageTransition>{children}</PageTransition>
                <Footer />
                <DotCursor />
                <HoverPreview />
                <Analytics />
                         </body>
        </html>
    );
}
