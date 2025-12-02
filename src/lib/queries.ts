import {groq} from 'next-sanity'

export const HOME_PAGE_QUERY = groq`
*[_type == "homePage"][0]{
  sections[]{
    _key,
    _type,
    "backgroundImage": background.asset->url,
    languageLinks[]{
      label,
      href
    },
    eyebrow,
    title,
    quote,
    author,
    source,
    body,
    signature,
    items[]{
      _key,
      label,
      description,
      "iconUrl": icon.asset->url,
      "slug": slug.current,
      link
    },
    studioName,
    address,
    phone,
    mobile,
    email,
    businessHours,
    notes
  }
}
`

export const CATEGORY_SLUGS_QUERY = groq`
*[_type == "productCategory" && defined(slug.current)]{
  "slug": slug.current
}
`

export const CATEGORY_BY_SLUG_QUERY = groq`
*[_type == "productCategory" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  title,
  level,
  "coverUrl": cover.asset->url,
  leftColumnTitle,
  leftColumnDescription,
  relatedEvents[]->{
    _id,
    title,
    description,
    startDate,
    endDate
  },
  featuredProducts[]->{
    _id,
    title,
    summary,
    "thumbnail": gallery[0].asset->url,
    price
  },
  parent->{
    _id,
    "slug": slug.current,
    title,
    level
  },
  "children": *[_type == "productCategory" && references(^._id)] | order(sortOrder asc){
    _id,
    "slug": slug.current,
    title,
    level,
    "coverUrl": cover.asset->url
  },
  "products": *[_type == "productItem" && references(^._id)] | order(sortOrder asc){
    _id,
    "slug": slug.current,
    title,
    summary,
    materials,
    size,
    price,
    "thumbnail": coalesce(gallery[0].asset->url, "")
  }
}
`


