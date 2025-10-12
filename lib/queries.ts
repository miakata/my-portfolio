// lib/queries.ts
import { groq } from "next-sanity";

// All projects for the Work page
export const allProjectsQuery = groq`*[_type == "project"] | order(orderRank asc) {
  title,
  "slug": slug.current,
  year,
  role,
  summary,
category,
  cover{
    alt,
    asset->{
      url,
      metadata
    }
  },
gallery[]{ asset-> }[0...2] 
}`;

// Single project by slug
export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  title,
  year,
  role,
  summary,
category,
  cover{
    alt,
    asset->{
      url,
      metadata
    }
  },
gallery[]{ asset->, alt },
  body
}`;

// All slugs (for routes/sitemap)
// return an array of strings
export const allSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`;

