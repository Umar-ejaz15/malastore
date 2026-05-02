import { groq } from 'next-sanity'

const IMAGE_FRAGMENT = groq`{
  asset,
  alt,
  hotspot,
  crop
}`

const CATEGORY_FRAGMENT = groq`{
  name,
  "slug": slug.current
}`

export const ALL_PRODUCTS_QUERY = groq`
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    sku,
    price,
    originalPrice,
    "category": category-> ${CATEGORY_FRAGMENT},
    description,
    fabric,
    pieces,
    occasions,
    tags,
    isNew,
    isRestocked,
    isFeatured,
    images[] ${IMAGE_FRAGMENT},
    "videoUrl": video.asset->url,
    sizeStock[]{ size, stock }
  }
`

export const PRODUCT_BY_SLUG_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    sku,
    price,
    originalPrice,
    "category": category-> ${CATEGORY_FRAGMENT},
    description,
    fabric,
    pieces,
    occasions,
    tags,
    isNew,
    isRestocked,
    isFeatured,
    images[] ${IMAGE_FRAGMENT},
    "videoUrl": video.asset->url,
    sizeStock[]{ size, stock }
  }
`

export const PRODUCTS_BY_CATEGORY_QUERY = groq`
  *[_type == "product" && category->slug.current == $categorySlug] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    sku,
    price,
    originalPrice,
    "category": category-> ${CATEGORY_FRAGMENT},
    description,
    fabric,
    pieces,
    occasions,
    isNew,
    isRestocked,
    isFeatured,
    images[] ${IMAGE_FRAGMENT},
    "videoUrl": video.asset->url,
    sizeStock[]{ size, stock }
  }
`

export const FEATURED_PRODUCTS_QUERY = groq`
  *[_type == "product" && isFeatured == true] | order(_createdAt desc) [0...$limit] {
    _id,
    name,
    "slug": slug.current,
    sku,
    price,
    originalPrice,
    "category": category-> ${CATEGORY_FRAGMENT},
    description,
    fabric,
    pieces,
    isNew,
    isRestocked,
    isFeatured,
    images[] ${IMAGE_FRAGMENT},
    "videoUrl": video.asset->url,
    sizeStock[]{ size, stock }
  }
`

export const RELATED_PRODUCTS_QUERY = groq`
  *[_type == "product" && category._ref == $categoryId && _id != $productId] | order(_createdAt desc) [0...$limit] {
    _id,
    name,
    "slug": slug.current,
    sku,
    price,
    originalPrice,
    "category": category-> ${CATEGORY_FRAGMENT},
    description,
    fabric,
    pieces,
    isNew,
    isRestocked,
    isFeatured,
    images[] ${IMAGE_FRAGMENT},
    sizeStock[]{ size, stock }
  }
`

export const ALL_CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(displayOrder asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    image ${IMAGE_FRAGMENT}
  }
`

export const LOOKBOOK_QUERY = groq`
  *[_type == "lookbook"] | order(displayOrder asc) [0...4] {
    _id,
    title,
    image ${IMAGE_FRAGMENT},
    href,
    season
  }
`

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    announcementMessages,
    codDeliveryCharge,
    jazzcashNumber,
    easypaisaNumber,
    bankDetails,
    contactEmail,
    contactPhone,
    whatsappNumber,
    socialLinks
  }
`
