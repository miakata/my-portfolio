// components/PortableTextClient.tsx
"use client";

import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { urlFor, type SanityImgSource } from "@/lib/image";

type Props = {
    value: PortableTextBlock[];
};

const components: PortableTextComponents = {
    types: {
        image: ({ value }: { value: SanityImgSource }) => {
            const src = urlFor(value).width(1600).height(1000).url();
            return (
                <div className="relative my-8 aspect-[16/10] rounded-xl overflow-hidden">
                    <Image src={src} alt="" fill className="object-cover" />
                </div>
            );
        },
    },
};

export default function PortableTextClient({ value }: Props) {
    return <PortableText value={value} components={components} />;
}
