import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
    const { path } = await req.json();
    if (!path) {
        return NextResponse.json({ message: "Missing path" }, { status: 400 });
    }

    revalidatePath(path);
    console.log(`✅ Revalidated: ${path}`);
    return NextResponse.json({ revalidated: true, path });
}
