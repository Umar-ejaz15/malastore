'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import type { Product } from '@/types'

export function ProductActions({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { toggleItem, hasItem } = useWishlist()
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] ?? '')
  const [qty, setQty] = useState(1)
  const [openAccordion, setOpenAccordion] = useState<string | null>('description')
  const isWishlisted = hasItem(product.id)

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product, selectedSize)
  }

  const accordions = [
    {
      id: 'description',
      label: 'Description',
      content: product.description,
    },
    {
      id: 'fabric',
      label: 'Fabric & Care',
      content: `Fabric: ${product.fabric ?? 'Premium quality fabric'}${product.pieces ? `. Pieces: ${product.pieces}` : ''}.\n\nCare: Machine wash cold on gentle cycle. Do not bleach. Iron on low heat. Dry clean recommended for embellished pieces.`,
    },
    {
      id: 'shipping',
      label: 'Shipping & Returns',
      content: 'Free shipping nationwide on all orders. International shipping available. Delivery within 3–5 business days across Pakistan. Returns and exchanges accepted within 7 days of delivery on unworn items in original packaging.',
    },
  ]

  return (
    <div className="flex flex-col gap-6">

      {/* Size selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-ui text-xs uppercase tracking-widest text-navy font-semibold">Select Size</span>
          <button className="font-ui text-[10px] uppercase tracking-widest text-gold hover:text-gold-dark transition-colors">
            Size Guide
          </button>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-2.5 text-center font-ui text-[11px] font-semibold border rounded-lg transition-all duration-200 ${
                selectedSize === size
                  ? 'border-navy bg-navy text-white'
                  : 'border-grey-light text-navy hover:border-navy'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <span className="font-ui text-xs uppercase tracking-widest text-navy font-semibold block mb-3">Quantity</span>
        <div className="flex items-center border border-grey-light rounded-lg overflow-hidden w-fit">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-navy hover:bg-beige transition-colors select-none" aria-label="Decrease">−</button>
          <span className="w-10 text-center font-body text-sm text-navy select-none">{qty}</span>
          <button onClick={() => setQty((q) => q + 1)} className="w-10 h-10 flex items-center justify-center text-navy hover:bg-beige transition-colors select-none" aria-label="Increase">+</button>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-2.5">
        <button
          onClick={handleAddToCart}
          className="w-full bg-navy text-white font-ui text-xs font-semibold uppercase tracking-widest py-4 rounded-lg hover:bg-charcoal transition-colors duration-300"
        >
          Add to Cart
        </button>
        <button
          onClick={() => toggleItem(product)}
          className={`w-full border font-ui text-xs font-semibold uppercase tracking-widest py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
            isWishlisted
              ? 'bg-navy text-white border-navy'
              : 'bg-transparent text-navy border-navy hover:bg-navy hover:text-white'
          }`}
        >
          <svg width="13" height="13" viewBox="0 0 18 18" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
            <path d="M9 15S2 10.5 2 5.5A3.5 3.5 0 0 1 9 4.2 3.5 3.5 0 0 1 16 5.5C16 10.5 9 15 9 15Z"/>
          </svg>
          {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
        </button>
      </div>

      {/* Accordions */}
      <div className="mt-1 border-t border-grey-light">
        {accordions.map((acc) => (
          <div key={acc.id} className="border-b border-grey-light">
            <button
              onClick={() => setOpenAccordion(openAccordion === acc.id ? null : acc.id)}
              className="flex items-center justify-between w-full py-4 text-left"
            >
              <span className="font-ui text-xs uppercase tracking-widest font-semibold text-navy">{acc.label}</span>
              <span className="text-navy font-body text-lg leading-none transition-transform duration-200" style={{ transform: openAccordion === acc.id ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
            </button>
            {openAccordion === acc.id && (
              <div className="pb-5">
                <p className="font-body text-grey text-sm leading-relaxed whitespace-pre-line">{acc.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
