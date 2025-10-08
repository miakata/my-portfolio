"use client";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

export default function PortableTextClient({
    value,
    components,
}: {
    value?: PortableTextBlock[];               
    components?: Parameters<typeof PortableText>[0]["components"];
}) {
    return <PortableText value={value ?? []} components={components} />;
}
