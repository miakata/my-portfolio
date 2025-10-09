import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    if (searchParams.get("secret") !== process.env.PREVIEW_SECRET) {
        return new NextResponse("Invalid secret", { status: 401 });
    }
    draftMode().enable();
    const slug = searchParams.get("slug") || "";
    return NextResponse.redirect(new URL(`/work/${slug}`, req.url));
}
