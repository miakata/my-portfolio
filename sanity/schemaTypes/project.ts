import { defineType, defineField } from "sanity";

export default defineType({
    name: "project",
    title: "Project",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title", maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    { title: "E-commerce", value: "ecommerce" },
                    { title: "Websites & Implementations", value: "websites" },
                    { title: "Game Development", value: "games" },
                ],
                layout: "radio",
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "year",
            title: "Year",
            type: "string",
        }),
        defineField({
            name: "role",
            title: "Role",
            type: "string",
        }),
        defineField({
            name: "summary",
            title: "Summary",
            type: "text",
        }),

        // ✅ Single, well-scoped media field
        defineField({
            name: "coverMedia",
            title: "Cover Media",
            type: "object",
            fields: [
                defineField({
                    name: "type",
                    title: "Type",
                    type: "string",
                    options: { list: ["image", "video"], layout: "radio" },
                    initialValue: "image",
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "image",
                    title: "Cover Image",
                    type: "image",
                    options: { hotspot: true },
                    hidden: ({ parent }) => parent?.type !== "image",
                }),
                defineField({
                    name: "videoFile",
                    title: "Video File",
                    type: "file",
                    options: { accept: "video/mp4, video/webm" },
                    description: "Upload an MP4 or WebM (under ~50MB recommended).",
                    hidden: ({ parent }) => parent?.type !== "video",
                }),
                defineField({
                    name: "videoUrl",
                    title: "Video URL (MP4/WebM)",
                    type: "url",
                    description: "Alternatively, paste a hosted video URL or /videos/… path.",
                    hidden: ({ parent }) => parent?.type !== "video",
                }),
            ],
        }),

        defineField({
            name: "gallery",
            title: "Gallery",
            type: "array",
            of: [{ type: "image" }],
        }),

        defineField({
            name: "body",
            title: "Body",
            type: "array",
            of: [{ type: "block" }],
        }),
    ],
});
