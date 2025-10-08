import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./sanity.client";
import type { Image } from "sanity";

/**
 * A minimal type for sources the Sanity image builder accepts
 */
export type SanityImgSource = string | Image | { asset: { _ref: string } };

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImgSource) {
    return builder.image(source);
}
