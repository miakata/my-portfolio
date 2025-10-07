import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
    name: "mia-katarina-portfolio", 
    title: "Portfolio CMS",        

    projectId: "3b01vlau",
    dataset: "production",

    plugins: [structureTool()],
    schema: { types: schemaTypes },
});
