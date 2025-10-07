export const allProjectsQuery = /* groq */ `
*[_type == "project"] | order(year desc, _createdAt desc){
  title,
  "slug": slug.current,
  year,
  role,
  summary,
  cover,
}
`;

export const projectBySlugQuery = /* groq */ `
*[_type == "project" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  year,
  role,
  summary,
  cover,
  gallery,
  body
}
`;

export const allSlugsQuery = /* groq */ `
*[_type == "project" && defined(slug.current)].slug.current
`;
