'use client'

import Link from 'next/link'
import { useWishlist } from '@/context/WishlistContext'
import { useCart } from '@/context/CartContext'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'
import type { Product } from '@/types'

export function ProductCard({ product }: { product: Product }) {
  const { toggleItem, hasItem } = useWishlist()
  const { addItem } = useCart()
  const isWishlisted = hasItem(product.id)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, product.sizes[0])
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleItem(product)
  }

  return (
    <Link href={`/products/${product.slug}`} className="group block cursor-pointer">

      {/* Product Image */}
      <div className="relative bg-gradient-soft overflow-hidden rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-300" style={{ aspectRatio: '3/4' }}>
        
        {/* Image */}
        <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
          <PlaceholderImage variant={product.imgVariant} />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.isNew && (
            <span className="inline-block bg-gradient-to-r from-gold to-gold-light text-navy font-ui font-bold px-3 py-1.5 rounded-full text-xs tracking-wider shadow-md">
              NEW
            </span>
          )}
          {product.isRestocked && (
            <span className="inline-block bg-emerald text-off-white font-ui font-bold px-3 py-1.5 rounded-full text-xs tracking-wider shadow-md">
              RESTOCKED
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 shadow-md ${
            isWishlisted
              ? 'bg-coral text-off-white scale-110'
              : 'bg-off-white/90 backdrop-blur text-navy hover:bg-off-white hover:scale-110'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill={isWishlisted ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          >
            <path d="M9 15S2 10.5 2 5.8A3.8 3.8 0 0 1 9 4.4 3.8 3.8 0 0 1 16 5.8C16 10.5 9 15 9 15Z" />
          </svg>
        </button>

        {/* Quick Add Button */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-navy text-off-white font-ui font-bold py-4 hover:bg-charcoal transition-colors duration-200 text-sm uppercase tracking-wider"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="pt-5 pb-1">
        <p className="font-ui text-xs text-grey uppercase tracking-widest mb-2">
          {product.category}
        </p>
        <h3 className="font-display font-bold text-navy leading-tight line-clamp-2 mb-3 text-base group-hover:text-gold transition-colors">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2.5">
          <span className="font-body font-bold text-navy text-lg">
            Rs.&nbsp;{product.price.toLocaleString('en-PK')}
          </span>
          {product.originalPrice && (
            <span className="font-body text-grey-light line-through text-sm">
              Rs.&nbsp;{product.originalPrice.toLocaleString('en-PK')}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
