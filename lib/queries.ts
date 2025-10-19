import { groq } from "next-sanity";


// All projects for the Work page
export const allProjectsQuery = groq`*[_type == "project"] | order(orderRank asc) {
  title,
  "slug": slug.current,
  year,
  role,
  summary,
  category,
  coverMedia{
    type,
    image{
      asset->{
        url,
        mimeType
      }
    },
    videoUrl,
    videoFile{
      asset->{
        url,
        mimeType
      }
    }
  },
  gallery[]{
    asset->{
      url,
      mimeType
    }
  }[0...2]
}`;

// Single project by slug
export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  title,
  year,
  role,
  summary,
  category,
  coverMedia{
    type,
    image{
      asset->{
        url,
        mimeType
      }
    },
    videoUrl,
    videoFile{
      asset->{
        url,
        mimeType
      }
    }
  },
  gallery[]{
    asset->{
      url,
      mimeType
    }
  },
  body
}`;

// All slugs (for routes/sitemap)
export const allSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`;
