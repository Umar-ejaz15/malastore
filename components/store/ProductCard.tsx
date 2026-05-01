'use client'

import Link from 'next/link'
import { useWishlist } from '@/context/WishlistContext'
import { useCart } from '@/context/CartContext'
import { ProductImage } from '@/components/ui/ProductImage'
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

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <Link href={`/products/${product.slug}`} className="group block cursor-pointer">

      {/* Product Image */}
      <div
        className="relative overflow-hidden rounded-2xl shadow-sm group-hover:shadow-xl transition-shadow duration-500"
        style={{ aspectRatio: '3/4' }}
      >
        {/* Image with zoom */}
        <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
          <ProductImage
            sanityImage={product.sanityImages?.[0]}
            fallbackVariant={product.imgVariant}
            alt={product.name}
          />
        </div>

        {/* Badges — top left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="inline-block bg-navy text-white font-ui font-bold px-2.5 py-1 rounded-full text-[10px] tracking-widest uppercase shadow-sm">
              New In
            </span>
          )}
          {product.isRestocked && (
            <span className="inline-block bg-emerald text-white font-ui font-bold px-2.5 py-1 rounded-full text-[10px] tracking-widest uppercase shadow-sm">
              Restocked
            </span>
          )}
          {discount && (
            <span className="inline-block bg-coral text-white font-ui font-bold px-2.5 py-1 rounded-full text-[10px] tracking-widest uppercase shadow-sm">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist button — top right */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 shadow-md ${
            isWishlisted
              ? 'bg-coral text-white scale-110'
              : 'bg-white/85 backdrop-blur-sm text-navy hover:bg-white hover:scale-110'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 18 18"
            fill={isWishlisted ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          >
            <path d="M9 15S2 10.5 2 5.8A3.8 3.8 0 0 1 9 4.4 3.8 3.8 0 0 1 16 5.8C16 10.5 9 15 9 15Z" />
          </svg>
        </button>

        {/* Quick Add — slides up on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-navy/95 backdrop-blur-sm text-white font-ui font-semibold py-3.5 hover:bg-navy transition-colors duration-200 text-[11px] uppercase tracking-widest"
          >
            Quick Add
          </button>
        </div>

        {/* Subtle inner border on hover */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 group-hover:ring-white/20 transition-all duration-500 pointer-events-none" />
      </div>

      {/* Product Info */}
      <div className="pt-4 pb-1">
        <p className="font-ui text-[10px] text-grey uppercase tracking-widest mb-1.5">
          {product.category}
          {product.pieces && <span className="ml-2 text-grey/60">· {product.pieces}pc</span>}
        </p>
        <h3 className="font-display font-semibold text-navy leading-snug mb-3 text-[15px] group-hover:text-gold transition-colors duration-300 line-clamp-2">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="font-body font-bold text-navy text-base">
            Rs.&nbsp;{product.price.toLocaleString('en-PK')}
          </span>
          {product.originalPrice && (
            <span className="font-body text-grey/70 line-through text-sm">
              Rs.&nbsp;{product.originalPrice.toLocaleString('en-PK')}
            </span>
          )}
        </div>

        {/* Size chips — compact */}
        <div className="flex flex-wrap gap-1 mt-2.5">
          {product.sizes.slice(0, 5).map((s) => (
            <span key={s} className="font-ui text-[9px] uppercase tracking-wider text-grey/70 border border-grey-light px-1.5 py-0.5 rounded">
              {s}
            </span>
          ))}
          {product.sizes.length > 5 && (
            <span className="font-ui text-[9px] text-grey/50">+{product.sizes.length - 5}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
