// sanity/schemaTypes/project.ts
import { defineType, defineField } from "sanity";

export default defineType({
    name: "project",
    title: "Projects",
    type: "document",
    fields: [
        defineField({ name: "title", type: "string", validation: r => r.required() }),
        defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: r => r.required() }),
        defineField({ name: "year", type: "string" }),
        defineField({ name: "role", type: "string" }),
        defineField({ name: "summary", type: "text" }),
        defineField({ name: "cover", type: "image", options: { hotspot: true } }),
        defineField({
            name: "body",
            title: "Case Study",
            type: "array",
            of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
        }),
    ],
});
