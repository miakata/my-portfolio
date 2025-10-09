// lib/sanity.client.ts
import { createClient } from "@sanity/client";

// ✅ Always have fallback values even if env vars aren’t loaded
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3b01vlau";
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

if (!projectId) {
  console.warn("⚠️ Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
}
if (!dataset) {
  console.warn("⚠️ Missing NEXT_PUBLIC_SANITY_DATASET");
}

// ✅ Export one shared client instance for the whole app
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-08-01",
  useCdn: process.env.NODE_ENV === "production",
});
