// app/work/[slug]/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge"; // required for next/og on Vercel
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
    params,
}: {
    params: { slug: string };
}) {
    const title =
        params.slug?.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()) ||
        "Project";

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#000",
                    color: "#fff",
                    fontSize: 72,
                    letterSpacing: -1,
                    fontWeight: 700,
                }}
            >
                <div
                    style={{
                        maxWidth: 1000,
                        textAlign: "center",
                        padding: "0 40px",
                        lineHeight: 1.1,
                    }}
                >
                    {title} · Mia Katarina
                </div>
            </div>
        ),
        size
    );
}
