import { defineType, defineField } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "year", type: "string" }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "summary", type: "text" }),
    defineField({ name: "cover", type: "image" }),
    defineField({ name: "gallery", type: "array", of: [{ type: "image" }] }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }, { type: "image" }] }),
  ],
});
