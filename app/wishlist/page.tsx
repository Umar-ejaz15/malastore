'use client'

import Link from 'next/link'
import { useWishlist } from '@/context/WishlistContext'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { ProductGrid } from '@/components/store/ProductGrid'
import { Button } from '@/components/ui/Button'

export default function WishlistPage() {
  const { items, count, clearWishlist } = useWishlist()

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 flex flex-col items-center text-center gap-6">
        <div className="w-20 h-20 rounded-full border border-beige flex items-center justify-center mb-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-sand">
            <path
              d="M12 21S3 14.5 3 8a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.5-9 13-9 13Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="font-ui text-gold" style={{ fontSize: 10, letterSpacing: '0.35em' }}>WISHLIST</p>
        <h1 className="font-display italic text-3xl md:text-4xl text-brown">Your wishlist is empty</h1>
        <p className="font-body text-brown-light max-w-sm" style={{ fontSize: 15 }}>
          Save your favourite pieces to revisit them anytime.
        </p>
        <Button href="/shop" variant="primary" size="lg">Explore Collections</Button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-20">
      <Breadcrumb items={[{ label: 'Shop', href: '/shop' }, { label: 'Wishlist' }]} />

      <div className="mt-8 mb-10 border-b border-beige pb-6 flex items-baseline justify-between flex-wrap gap-4">
        <h1 className="font-display italic text-3xl md:text-4xl text-brown">
          My Wishlist
          <span className="font-body text-brown-light text-2xl ml-3">({count})</span>
        </h1>
        <button
          onClick={clearWishlist}
          className="font-ui text-gold hover:text-gold-dark transition-colors"
          style={{ fontSize: 10, letterSpacing: '0.2em' }}
        >
          CLEAR ALL
        </button>
      </div>

      <ProductGrid products={items.map((i) => i.product)} />
    </div>
  )
}
