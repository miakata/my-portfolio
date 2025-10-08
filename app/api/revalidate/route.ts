import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Secure your webhook
        const secret = req.nextUrl.searchParams.get("secret");
        if (secret !== process.env.REVALIDATE_SECRET) {
            return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
        }

        // Optional: log for debugging
        console.log("🔁 Revalidate webhook triggered:", body);

        // Revalidate specific paths (customize as needed)
        const paths = ["/", "/work"];
        for (const path of paths) {
            await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/revalidate-path`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ path }),
            });
        }

        return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (err) {
        console.error("Error revalidating:", err);
        return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
    }
}
