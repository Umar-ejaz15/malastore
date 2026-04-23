export interface Product {
  id: string
  slug: string
  name: string
  sku: string
  price: number
  originalPrice?: number
  category: string
  categorySlug: string
  description: string
  fabric?: string
  pieces?: number
  isNew?: boolean
  isRestocked?: boolean
  isFeatured?: boolean
  imgVariant: string
  sizes: string[]
  // Sanity integration: replace imgVariant with image: SanityImage
}

export interface Category {
  id: string
  slug: string
  name: string
  description?: string
  imgVariant: string
  // Sanity integration: replace imgVariant with image: SanityImage
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
