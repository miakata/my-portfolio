// lib/imageBlur.ts
import { urlFor, type SanityImgSource } from "./image";

export const blurFor = (src: SanityImgSource | null | undefined) =>
    src ? urlFor(src).width(24).height(16).blur(50).quality(20).url() : undefined;
