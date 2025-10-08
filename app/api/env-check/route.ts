import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    // Never expose actual secret values — just whether they exist
    const present = (v?: string) => Boolean(v && v.length > 0);

    return NextResponse.json({
        NEXT_PUBLIC_SANITY_PROJECT_ID: present(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID),
        NEXT_PUBLIC_SANITY_DATASET: present(process.env.NEXT_PUBLIC_SANITY_DATASET),
        SANITY_READ_TOKEN: present(process.env.SANITY_READ_TOKEN),
        REVALIDATE_SECRET: present(process.env.REVALIDATE_SECRET),
        PREVIEW_SECRET: present(process.env.PREVIEW_SECRET),
        NODE_ENV: process.env.NODE_ENV, // safe to show
    });
}
