import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

// ✅ Allow both POST (for Sanity) and GET (for manual browser test)
export async function GET(req: NextRequest) {
    const secret = req.nextUrl.searchParams.get("secret");
    if (secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ ok: false, error: "Invalid secret" }, { status: 401 });
    }
    // optional ?slug=<slug> in the URL for testing specific pages
    const slug = req.nextUrl.searchParams.get("slug") ?? undefined;

    revalidatePath("/");
    revalidatePath("/work");
    if (slug) revalidatePath(`/work/${slug}`);

    return NextResponse.json({ ok: true, method: "GET", slug: slug ?? null });
}

export async function POST(req: NextRequest) {
    const secret = req.nextUrl.searchParams.get("secret");
    if (secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ ok: false, error: "Invalid secret" }, { status: 401 });
    }

    let slug: string | undefined = undefined;
    try {
        const body = await req.json();
        if (typeof body?.slug === "string") slug = body.slug;
    } catch {
        // ignore bad/empty JSON
    }

    revalidatePath("/");
    revalidatePath("/work");
    if (slug) revalidatePath(`/work/${slug}`);

    return NextResponse.json({ ok: true, method: "POST", slug: slug ?? null });
}
