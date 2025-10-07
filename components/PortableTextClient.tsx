"use client";
import { PortableText, type PortableTextReactComponents } from "@portabletext/react";

export default function PortableTextClient({
    value,
    components,
}: {
    value: any;
    components?: PortableTextReactComponents;
}) {
    return <PortableText value={value} components={components} />;
}
