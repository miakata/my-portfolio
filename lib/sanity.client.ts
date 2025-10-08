// lib/sanity.client.ts
import { createClient } from "@sanity/client";

export const projectId =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3b01vlau";
export const dataset =
    process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const sanityClient = createClient({
    projectId,
    dataset,
    apiVersion: "2024-08-01",
    useCdn: process.env.NODE_ENV === "production",
});
