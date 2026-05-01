import { client } from '@/lib/sanity/client'
import {
  ALL_PRODUCTS_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  PRODUCTS_BY_CATEGORY_QUERY,
  FEATURED_PRODUCTS_QUERY,
  RELATED_PRODUCTS_QUERY,
  ALL_CATEGORIES_QUERY,
  LOOKBOOK_QUERY,
  SITE_SETTINGS_QUERY,
} from '@/lib/sanity/queries'
import type { Product, Category, LookbookItem, SiteSettings, SanityImage } from '@/types'

// Palette fallbacks — deterministic from category
const CATEGORY_VARIANTS: Record<string, string> = {
  'luxury-lawn': 'warm-1',
  'ready-to-wear': 'warm-5',
  'formals': 'dark-1',
}
const FALLBACK_VARIANTS = ['warm-1', 'warm-2', 'warm-3', 'warm-4', 'warm-5', 'warm-6', 'warm-7', 'warm-8', 'dark-1', 'dark-2']

function fallbackVariant(categorySlug: string, index = 0): string {
  return CATEGORY_VARIANTS[categorySlug] ?? FALLBACK_VARIANTS[index % FALLBACK_VARIANTS.length]
}

// ─── Raw Sanity shapes ────────────────────────────────────────────────────────

interface RawProduct {
  _id: string
  name: string
  slug: string
  sku: string
  price: number
  originalPrice?: number
  category?: { name: string; slug: string; _id?: string }
  description?: string
  fabric?: string
  pieces?: number
  occasions?: string[]
  isNew?: boolean
  isRestocked?: boolean
  isFeatured?: boolean
  images?: SanityImage[]
  videoUrl?: string
  sizeStock?: { size: string; stock: number }[]
}

interface RawCategory {
  _id: string
  name: string
  slug: string
  description?: string
  image?: SanityImage
}

// ─── Transformers ─────────────────────────────────────────────────────────────

function toProduct(raw: RawProduct, index = 0): Product {
  const categorySlug = raw.category?.slug ?? ''
  const availableSizes = (raw.sizeStock ?? [])
    .filter((ss) => ss.stock > 0)
    .map((ss) => ss.size)

  return {
    id: raw._id,
    slug: raw.slug,
    name: raw.name,
    sku: raw.sku,
    price: raw.price,
    originalPrice: raw.originalPrice,
    category: raw.category?.name ?? '',
    categorySlug,
    categoryId: raw.category?._id,
    description: raw.description ?? '',
    fabric: raw.fabric,
    pieces: raw.pieces,
    occasions: raw.occasions,
    isNew: raw.isNew,
    isRestocked: raw.isRestocked,
    isFeatured: raw.isFeatured,
    imgVariant: fallbackVariant(categorySlug, index),
    sanityImages: raw.images,
    videoUrl: raw.videoUrl,
    sizes: availableSizes.length > 0 ? availableSizes : [],
    sizeStock: raw.sizeStock,
  }
}

function toCategory(raw: RawCategory, index = 0): Category {
  const slug = raw.slug ?? ''
  return {
    id: raw._id,
    slug,
    name: raw.name,
    description: raw.description,
    imgVariant: CATEGORY_VARIANTS[slug] ?? FALLBACK_VARIANTS[index % FALLBACK_VARIANTS.length],
    sanityImage: raw.image,
  }
}

// ─── Fetch options ────────────────────────────────────────────────────────────

const FETCH_OPTS = { next: { revalidate: 60 } }

// ─── Public API ───────────────────────────────────────────────────────────────

export async function getAllProducts(): Promise<Product[]> {
  const raw = await client.fetch<RawProduct[]>(ALL_PRODUCTS_QUERY, {}, FETCH_OPTS)
  return raw.map((r, i) => toProduct(r, i))
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const raw = await client.fetch<RawProduct | null>(PRODUCT_BY_SLUG_QUERY, { slug }, FETCH_OPTS)
  return raw ? toProduct(raw) : null
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const raw = await client.fetch<RawProduct[]>(PRODUCTS_BY_CATEGORY_QUERY, { categorySlug }, FETCH_OPTS)
  return raw.map((r, i) => toProduct(r, i))
}

export async function getFeaturedProducts(limit = 5): Promise<Product[]> {
  const raw = await client.fetch<RawProduct[]>(FEATURED_PRODUCTS_QUERY, { limit }, FETCH_OPTS)
  return raw.map((r, i) => toProduct(r, i))
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  if (!product.categoryId) return []
  const raw = await client.fetch<RawProduct[]>(
    RELATED_PRODUCTS_QUERY,
    { categoryId: product.categoryId, productId: product.id, limit },
    FETCH_OPTS
  )
  return raw.map((r, i) => toProduct(r, i))
}

export async function getCategories(): Promise<Category[]> {
  const raw = await client.fetch<RawCategory[]>(ALL_CATEGORIES_QUERY, {}, FETCH_OPTS)
  return raw.map((r, i) => toCategory(r, i))
}

export async function getLookbookItems(): Promise<LookbookItem[]> {
  const raw = await client.fetch<Array<{
    _id: string
    title: string
    image?: SanityImage
    href?: string
    season?: string
  }>>(LOOKBOOK_QUERY, {}, FETCH_OPTS)

  return raw.map((r) => ({
    _id: r._id,
    title: r.title,
    image: r.image,
    href: r.href ?? '/shop',
    season: r.season,
  }))
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const raw = await client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY, {}, FETCH_OPTS)
  return raw ?? {}
}
