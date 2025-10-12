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
        defineField({
            name: "cover",
            title: "Cover Image",
            type: "image",
            options: { hotspot: true },
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
