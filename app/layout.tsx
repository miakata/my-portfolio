import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import DotCursor from "@/components/DotCursor";
import Header from "@/components/Header";

import { Noto_Serif, Inclusive_Sans, Libre_Baskerville } from "next/font/google";


const notoSerif = Noto_Serif({
    subsets: ["latin"],
    variable: "--font-noto-serif",
    weight: ["400", "700"], // optional weights
    display: "swap",
});

const inclusiveSans = Inclusive_Sans({
    subsets: ["latin"],
    variable: "--font-inclusive-sans",
    weight: ["400"],
    display: "swap",
});

const libreBaskerville = Libre_Baskerville({
    subsets: ["latin"],
    variable: "--font-libre-baskerville",
    weight: ["400", "700"],
    display: "swap",
});


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
        images: [{ url: "/og-default.png", width: 1200, height: 630 }],
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
                <Analytics />
                         </body>
        </html>
    );
}
