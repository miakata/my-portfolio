
export type CardProject = {
    slug: string;
    title: string;
    year?: string;
    role?: string;
    summary?: string;
    category?: "ecommerce" | "websites" | "games";

    cover?: { asset?: { url?: string; mimeType?: string } };
    coverMedia?: {
        type?: "image" | "video";
        image?: { asset?: { url?: string; mimeType?: string } };
        videoUrl?: string;
        videoFile?: { asset?: { url?: string; mimeType?: string } };
    };

    // local overrides (public/)
    coverVideoSrc?: string;   // e.g. /videos/slug.mp4
    coverPoster?: string;     // e.g. /videos/slug.jpg
};
