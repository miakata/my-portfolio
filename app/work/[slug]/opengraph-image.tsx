import { ImageResponse } from "next/og";
import { sanityClient } from "@/lib/sanity.client";
import { projectBySlugQuery } from "@/lib/queries";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = await sanityClient.fetch(projectBySlugQuery, { slug });

    const title = project?.title ?? "Project";
    const role = project?.role ?? "";
    const year = project?.year ?? "";

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    background: "#0b0b0b",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 64,
                    fontFamily: "ui-sans-serif, system-ui, Segoe UI, Helvetica, Arial",
                }}
            >
                <div style={{ fontSize: 36, color: "#9ca3af" }}>Mia Katarina — Portfolio</div>
                <div style={{ display: "grid", gap: 12 }}>
                    <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>{title}</div>
                    <div style={{ fontSize: 32, color: "#9ca3af" }}>
                        {[year, role].filter(Boolean).join(" • ")}
                    </div>
                </div>
                <div style={{ fontSize: 24, color: "#9ca3af" }}>mia-portfolio-nu.vercel.app</div>
            </div>
        ),
        { ...size }
    );
}
