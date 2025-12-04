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

export const CATEGORY_IDS_QUERY = groq`
*[_type in ["productCategory", "productCategoryLevel2"]]{
  _id
}
`

export const LEVEL_1_CATEGORIES_QUERY = groq`
*[_type == "productCategory" && level == 1] | order(sortOrder asc, label.zhHans asc){
  _id,
  label,
  level,
  sortOrder,
  isEvent,
  "coverURL": coverURL.asset->url,
  "children": children[]-> {
    _id,
    label,
    level,
    isEvent,
    "coverURL": coverURL.asset->url
  }
}
`

export const PRODUCT_IDS_QUERY = groq`
*[_type == "productItem"]{
  _id
}
`

export const PRODUCT_BY_ID_QUERY = groq`
*[_type == "productItem" && _id == $id][0]{
  _id,
  "slug": slug.current,
  title,
  summary,
  description,
  "gallery": gallery[].asset->url,
  "videoUrl": video.asset->url,
  videoLink,
  materials,
  size,
  price,
  "level1Category": level1Category-> {
    _id,
    "title": label,
    level,
    "coverURL": coverURL.asset->url
  },
  "level2Category": level2Category-> {
    _id,
    "title": label,
    level,
    "coverURL": coverURL.asset->url
  }
}
`

export const CATEGORY_BY_ID_QUERY = groq`
coalesce(
  *[_type == "productCategory" && _id == $id][0]{
    _id,
    "title": label,
    level,
    sortOrder,
    isEvent,
    "coverURL": coverURL.asset->url,
    leftColumnTitle,
    leftColumnDescription,
    relatedEvents[]->{
      _id,
      title,
      description,
      startDate,
      endDate,
      "cover": cover.asset->url
    },
    featuredProducts[]->{
      _id,
      title,
      summary,
      "thumbnail": gallery[0].asset->url,
      price
    },
    "children": children[]-> {
      _id,
      "title": label,
      level,
      isEvent,
      "coverURL": coverURL.asset->url
    },
    "products": *[_type == "productItem" && level1Category._ref == ^._id] | order(sortOrder asc){
      _id,
      "slug": slug.current,
      title,
      summary,
      materials,
      size,
      price,
      "thumbnail": coalesce(gallery[0].asset->url, "")
    },
    "events": *[_type == "event" && level1Category._ref == ^._id] | order(startDate desc){
      _id,
      title,
      description,
      startDate,
      endDate,
      "cover": cover.asset->url
    }
  },
  *[_type == "productCategoryLevel2" && _id == $id][0]{
    _id,
    "title": label,
    level,
    isEvent,
    "coverURL": coverURL.asset->url,
    "parent": *[_type == "productCategory" && ^._id in children[]._ref][0]{
      _id,
      "title": label,
      level,
      isEvent,
      "coverURL": coverURL.asset->url,
      leftColumnTitle,
      leftColumnDescription
    },
    "events": *[_type == "event" && level2Category._ref == ^._id] | order(startDate desc){
      _id,
      title,
      description,
      startDate,
      endDate,
      "cover": cover.asset->url
    },
    "products": *[_type == "productItem" && level2Category._ref == ^._id] | order(sortOrder asc){
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
)
`


