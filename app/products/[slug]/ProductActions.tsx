'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import type { Product } from '@/types'

interface ProductActionsProps {
  product: Product
}

export function ProductActions({ product }: ProductActionsProps) {
  const { addItem } = useCart()
  const { toggleItem, hasItem } = useWishlist()
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] ?? '')
  const [qty, setQty] = useState(1)
  const [openAccordion, setOpenAccordion] = useState<string | null>('description')
  const isWishlisted = hasItem(product.id)

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem(product, selectedSize)
    }
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
      content: `Fabric: ${product.fabric ?? 'Premium quality fabric'}. ${product.pieces ? `Pieces: ${product.pieces}` : ''}\n\nCare Instructions: Machine wash cold on gentle cycle. Do not bleach. Iron on low heat. Dry clean recommended for embellished pieces.`,
    },
    {
      id: 'shipping',
      label: 'Shipping & Returns',
      content: 'Free shipping nationwide on all orders. International shipping available. Delivery within 3–5 business days across Pakistan. Returns and exchanges accepted within 7 days of delivery on unworn, unaltered items in original packaging.',
    },
  ]

  return (
    <div className="flex flex-col gap-6">

      {/* Size selector */}
      {product.sizes[0] !== 'Unstitched' && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="font-ui text-brown" style={{ fontSize: 11, letterSpacing: '0.2em' }}>
              SELECT SIZE
            </span>
            <button
              className="font-ui text-gold hover:text-gold-dark transition-colors"
              style={{ fontSize: 10, letterSpacing: '0.15em' }}
            >
              Size Guide
            </button>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-2.5 text-center font-ui border transition-all duration-200 ${
                  selectedSize === size
                    ? 'border-brown bg-brown text-mala-white'
                    : 'border-beige text-brown hover:border-brown'
                }`}
                style={{ fontSize: 11 }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Qty */}
      <div>
        <span
          className="font-ui text-brown block mb-3"
          style={{ fontSize: 11, letterSpacing: '0.2em' }}
        >
          QUANTITY
        </span>
        <div className="flex items-center border border-beige w-fit">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center text-brown hover:bg-beige transition-colors font-body text-lg select-none"
            aria-label="Decrease"
          >
            −
          </button>
          <span className="w-10 text-center font-body text-base text-brown select-none">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="w-10 h-10 flex items-center justify-center text-brown hover:bg-beige transition-colors font-body text-lg select-none"
            aria-label="Increase"
          >
            +
          </button>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-2.5">
        <button
          onClick={handleAddToCart}
          className="w-full bg-brown text-mala-white font-ui font-semibold py-4 hover:bg-brown-mid transition-colors duration-300"
          style={{ fontSize: 11, letterSpacing: '0.22em' }}
        >
          ADD TO CART
        </button>
        <button
          onClick={() => toggleItem(product)}
          className={`w-full border font-ui font-semibold py-4 transition-all duration-300 flex items-center justify-center gap-2 ${
            isWishlisted
              ? 'bg-brown text-mala-white border-brown'
              : 'bg-transparent text-brown border-brown hover:bg-brown hover:text-mala-white'
          }`}
          style={{ fontSize: 11, letterSpacing: '0.22em' }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 18 18"
            fill={isWishlisted ? 'currentColor' : 'none'}
          >
            <path
              d="M9 15S2 10.5 2 5.5A3.5 3.5 0 0 1 9 4.2 3.5 3.5 0 0 1 16 5.5C16 10.5 9 15 9 15Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          {isWishlisted ? 'WISHLISTED' : 'ADD TO WISHLIST'}
        </button>
      </div>

      {/* Accordions */}
      <div className="mt-1 border-t border-beige">
        {accordions.map((acc) => (
          <div key={acc.id} className="border-b border-beige">
            <button
              onClick={() => setOpenAccordion(openAccordion === acc.id ? null : acc.id)}
              className="flex items-center justify-between w-full py-4 text-left"
            >
              <span className="font-ui text-brown" style={{ fontSize: 11, letterSpacing: '0.18em' }}>
                {acc.label.toUpperCase()}
              </span>
              <span
                className="text-brown font-body text-lg leading-none transition-transform duration-200"
                style={{ transform: openAccordion === acc.id ? 'rotate(45deg)' : 'rotate(0deg)' }}
              >
                +
              </span>
            </button>
            {openAccordion === acc.id && (
              <div className="pb-5">
                <p className="font-body text-brown-mid leading-relaxed whitespace-pre-line" style={{ fontSize: 14 }}>
                  {acc.content}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
