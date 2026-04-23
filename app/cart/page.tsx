'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Button } from '@/components/ui/Button'

export default function CartPage() {
  const { items, total, removeItem, updateQty } = useCart()
  const [promo, setPromo] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const handlePromo = (e: React.FormEvent) => {
    e.preventDefault()
    if (promo.trim()) setPromoApplied(true)
  }

  const discountedTotal = promoApplied ? Math.floor(total * 0.9) : total

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 flex flex-col items-center justify-center text-center gap-6">
        <div className="w-20 h-20 rounded-full border border-beige flex items-center justify-center mb-2">
          <svg width="32" height="36" viewBox="0 0 48 56" fill="none" className="text-sand">
            <path d="M14 18V14A10 10 0 0 1 34 14V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <rect x="3" y="18" width="42" height="34" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </div>
        <p className="font-ui text-gold" style={{ fontSize: 10, letterSpacing: '0.35em' }}>YOUR CART</p>
        <h1 className="font-display italic text-3xl md:text-4xl text-brown">Your cart is empty</h1>
        <p className="font-body text-brown-light max-w-sm" style={{ fontSize: 15 }}>
          Explore our collections and discover pieces crafted with heritage and care.
        </p>
        <Button href="/shop" variant="primary" size="lg">Continue Shopping</Button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-20">
      <Breadcrumb items={[{ label: 'Shop', href: '/shop' }, { label: 'Cart' }]} />

      <div className="mt-8 mb-10 border-b border-beige pb-6 flex items-baseline justify-between">
        <h1 className="font-display italic text-3xl md:text-4xl text-brown">Shopping Cart</h1>
        <span className="font-ui text-brown-light" style={{ fontSize: 11, letterSpacing: '0.12em' }}>
          {items.length} {items.length === 1 ? 'Item' : 'Items'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">

        {/* Cart items */}
        <div className="flex flex-col">
          {items.map((item) => (
            <div key={`${item.product.id}-${item.size}`} className="flex gap-5 py-6 border-b border-beige">
              {/* Image */}
              <div className="w-24 aspect-3/4 shrink-0 overflow-hidden bg-off-white">
                <PlaceholderImage variant={item.product.imgVariant} />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <Link
                  href={`/products/${item.product.slug}`}
                  className="font-ui text-brown-light hover:text-gold transition-colors"
                  style={{ fontSize: 10, letterSpacing: '0.18em' }}
                >
                  {item.product.category.toUpperCase()}
                </Link>
                <Link
                  href={`/products/${item.product.slug}`}
                  className="font-ui font-semibold text-brown hover:text-gold transition-colors leading-snug"
                  style={{ fontSize: 12, letterSpacing: '0.1em' }}
                >
                  {item.product.name}
                </Link>
                {item.size && item.size !== 'Unstitched' && (
                  <span
                    className="inline-block bg-beige text-brown font-ui w-fit px-2 py-0.5 mt-0.5"
                    style={{ fontSize: 9, letterSpacing: '0.15em' }}
                  >
                    SIZE {item.size}
                  </span>
                )}
                <p className="font-body text-brown mt-1" style={{ fontSize: 15 }}>
                  Rs. {item.product.price.toLocaleString('en-PK')}
                </p>

                {/* Qty + Remove */}
                <div className="flex items-center gap-5 mt-3">
                  <div className="flex items-center border border-beige">
                    <button
                      onClick={() => updateQty(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-brown hover:bg-beige transition-colors font-body text-base select-none"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-body text-sm text-brown select-none">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-brown hover:bg-beige transition-colors font-body text-base select-none"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="font-ui text-brown-light hover:text-brown transition-colors"
                    style={{ fontSize: 10, letterSpacing: '0.15em' }}
                  >
                    REMOVE
                  </button>
                </div>
              </div>

              {/* Line total */}
              <div className="text-right shrink-0">
                <p className="font-body text-brown" style={{ fontSize: 15 }}>
                  Rs. {(item.product.price * item.quantity).toLocaleString('en-PK')}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:sticky lg:top-24 border border-beige p-7">
          <h2 className="font-display italic text-xl text-brown mb-6">Order Summary</h2>

          <div className="flex flex-col gap-3 mb-5">
            <div className="flex justify-between">
              <span className="font-ui text-brown-light" style={{ fontSize: 11, letterSpacing: '0.12em' }}>SUBTOTAL</span>
              <span className="font-body text-brown" style={{ fontSize: 15 }}>
                Rs. {total.toLocaleString('en-PK')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-ui text-brown-light" style={{ fontSize: 11, letterSpacing: '0.12em' }}>SHIPPING</span>
              <span className="font-ui text-gold" style={{ fontSize: 11, letterSpacing: '0.08em' }}>FREE</span>
            </div>
            {promoApplied && (
              <div className="flex justify-between text-gold-dark">
                <span className="font-ui" style={{ fontSize: 11, letterSpacing: '0.12em' }}>DISCOUNT (10%)</span>
                <span className="font-body" style={{ fontSize: 15 }}>
                  −Rs. {Math.floor(total * 0.1).toLocaleString('en-PK')}
                </span>
              </div>
            )}
          </div>

          <div className="border-t border-beige pt-4 mb-6">
            <div className="flex justify-between items-baseline">
              <span className="font-ui text-brown" style={{ fontSize: 11, letterSpacing: '0.12em' }}>TOTAL</span>
              <span className="font-display italic text-xl text-brown">
                Rs. {discountedTotal.toLocaleString('en-PK')}
              </span>
            </div>
          </div>

          {/* Promo code */}
          <form onSubmit={handlePromo} className="flex mb-6">
            <input
              type="text"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              placeholder="Promo code"
              className="flex-1 border border-beige bg-ivory text-brown font-body focus:outline-none focus:border-gold transition-colors px-3 py-2.5"
              style={{ fontSize: 13, borderRight: 'none' }}
            />
            <button
              type="submit"
              className="bg-brown text-mala-white font-ui hover:bg-brown-mid transition-colors px-4"
              style={{ fontSize: 10, letterSpacing: '0.18em' }}
            >
              APPLY
            </button>
          </form>

          <Link
            href="/checkout"
            className="block w-full text-center bg-brown text-mala-white font-ui font-semibold py-4 hover:bg-brown-mid transition-colors duration-300"
            style={{ fontSize: 11, letterSpacing: '0.22em' }}
          >
            PROCEED TO CHECKOUT
          </Link>

          <div className="mt-4 text-center">
            <Link
              href="/shop"
              className="font-ui text-brown-light hover:text-gold transition-colors"
              style={{ fontSize: 10, letterSpacing: '0.18em' }}
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
