import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
    const secret = process.env.REVALIDATE_SECRET;
    const body = await req.json().catch(() => ({}));
    if (!secret || body?.secret !== secret) {
        return new Response("Unauthorized", { status: 401 });
    }

    // From Sanity webhook: expect { slug?: string }
    const slug = body?.slug as string | undefined;

    // Revalidate listing + home
    revalidatePath("/work");
    revalidatePath("/");

    // Revalidate a specific project page if we have a slug
    if (slug) revalidatePath(`/work/${slug}`);

    return new Response(JSON.stringify({ revalidated: true, slug }), { status: 200 });
}
