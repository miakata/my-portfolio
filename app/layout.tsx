import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import DotCursor from "@/components/DotCursor";
import BackgroundOrb from "@/components/BackgroundOrb";

export const metadata: Metadata = {
    metadataBase: new URL("https://mia-portfolio.vercel.app"),
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
            <head>
                {/* Preload hover GIFs so they’re ready instantly */}
                <link rel="preload" as="image" href="/videos/keybird.png" />
                <link rel="preload" as="image" href="/videos/teamtours.png" />
                <link rel="preload" as="image" href="/videos/sfg.png" />
                <link rel="preload" as="image" href="/videos/mattssonnielsen.png" />
                <link rel="preload" as="image" href="/videos/overgrown.png" />
                <link rel="preload" as="image" href="/videos/syncopus.png" />
                <link rel="preload" as="image" href="/videos/yokai.png" />
                <link rel="preload" as="image" href="/videos/mysterymakers.png" />
            </head>
            <body className="antialiased bg-black text-white">
                <SmoothScroll />
                <Header />
                <BackgroundOrb />
                <PageTransition>{children}</PageTransition>
                <Footer />
                <DotCursor />
                <Analytics />
            </body>
        </html>
    );
}
