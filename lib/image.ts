// lib/image.ts
import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./sanity.client";

export type SanityImgSource = Parameters<
    ReturnType<typeof imageUrlBuilder>["image"]
>[0];

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (src: SanityImgSource) => builder.image(src);
