'use client'

import { useWishlist } from '@/context/WishlistContext'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { ProductGrid } from '@/components/store/ProductGrid'
import { Button } from '@/components/ui/Button'

export default function WishlistPage() {
  const { items, count, clearWishlist } = useWishlist()

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 flex flex-col items-center text-center gap-5">
        <div className="w-20 h-20 rounded-full border border-grey-light flex items-center justify-center text-grey-light mb-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 21S3 14.5 3 8a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.5-9 13-9 13Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="font-ui text-gold text-[10px] tracking-[0.35em] uppercase">Wishlist</p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-navy">Your wishlist is empty</h1>
        <p className="font-body text-grey text-sm max-w-sm">Save your favourite pieces to revisit them anytime.</p>
        <Button href="/shop" variant="primary" size="lg">Explore Collections</Button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-20">
      <Breadcrumb items={[{ label: 'Shop', href: '/shop' }, { label: 'Wishlist' }]} />

      <div className="mt-8 mb-10 border-b border-grey-light pb-6 flex items-baseline justify-between flex-wrap gap-4">
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-navy">
          My Wishlist
          <span className="font-body text-grey text-xl ml-3 font-normal">({count})</span>
        </h1>
        <button
          onClick={clearWishlist}
          className="font-ui text-[10px] uppercase tracking-widest text-grey hover:text-gold transition-colors"
        >
          Clear All
        </button>
      </div>

      <ProductGrid products={items.map((i) => i.product)} />
    </div>
  )
}
