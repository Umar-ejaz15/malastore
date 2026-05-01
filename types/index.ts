// ─── Sanity primitives ───────────────────────────────────────────────────────

export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  alt?: string
}

export interface SizeStock {
  size: string
  stock: number
}

export interface SiteSettings {
  announcementMessages?: string[]
  codDeliveryCharge?: number
  jazzcashNumber?: string
  bankDetails?: {
    bankName?: string
    accountTitle?: string
    accountNumber?: string
    iban?: string
  }
  contactEmail?: string
  contactPhone?: string
  whatsappNumber?: string
  socialLinks?: {
    instagram?: string
    facebook?: string
    tiktok?: string
    pinterest?: string
  }
}

export interface LookbookItem {
  _id?: string
  title: string
  image?: SanityImage
  imgVariant?: string
  href?: string
  season?: string
}

// ─── Domain types ─────────────────────────────────────────────────────────────

export interface Product {
  id: string
  slug: string
  name: string
  sku: string
  price: number
  originalPrice?: number
  category: string
  categorySlug: string
  categoryId?: string
  description: string
  fabric?: string
  pieces?: number
  occasions?: string[]
  isNew?: boolean
  isRestocked?: boolean
  isFeatured?: boolean
  imgVariant: string           // palette fallback key
  images?: string[]            // palette fallback keys
  sanityImages?: SanityImage[] // real Sanity product images
  videoUrl?: string
  sizes: string[]              // available sizes (stock > 0)
  sizeStock?: SizeStock[]
}

export interface Category {
  id: string
  slug: string
  name: string
  description?: string
  imgVariant: string           // palette fallback key
  sanityImage?: SanityImage    // real Sanity category image
}

export interface CartItem {
  product: Product
  quantity: number
  size?: string
}

export interface WishlistItem {
  productId: string
  product: Product
}

export interface FilterState {
  categories: string[]
  priceMin: number
  priceMax: number
  fabrics: string[]
  occasions: string[]
}
