import type { StructureResolver, StructureBuilder } from "sanity/structure";

/**
 * Customizes the desk structure in Sanity Studio
 */
export const structure: StructureResolver = (S: StructureBuilder) =>
    S.list()
        .title("Content")
        .items([
            S.documentTypeListItem("project").title("Projects"),
           // S.documentTypeListItem("settings").title("Settings"),
        ]);
