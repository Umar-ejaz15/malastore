'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { ProductImage } from '@/components/ui/ProductImage'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Button } from '@/components/ui/Button'

export default function CartPage() {
  const { items, total, removeItem, updateQty } = useCart()
  const [promo, setPromo] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const handlePromo = (e: { preventDefault(): void }) => {
    e.preventDefault()
    if (promo.trim()) setPromoApplied(true)
  }

  const discountedTotal = promoApplied ? Math.floor(total * 0.9) : total

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 flex flex-col items-center justify-center text-center gap-5">
        <div className="w-20 h-20 rounded-full border border-grey-light flex items-center justify-center text-grey-light mb-2">
          <svg width="32" height="36" viewBox="0 0 48 56" fill="none">
            <path d="M14 18V14A10 10 0 0 1 34 14V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <rect x="3" y="18" width="42" height="34" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </div>
        <p className="font-ui text-gold text-[10px] tracking-[0.35em] uppercase">Your Cart</p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-navy">Your cart is empty</h1>
        <p className="font-body text-grey text-sm max-w-sm">Explore our collections and discover pieces crafted with heritage and care.</p>
        <Button href="/shop" variant="primary" size="lg">Continue Shopping</Button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-20">
      <Breadcrumb items={[{ label: 'Shop', href: '/shop' }, { label: 'Cart' }]} />

      <div className="mt-8 mb-10 border-b border-grey-light pb-5 flex items-baseline justify-between">
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-navy">Shopping Cart</h1>
        <span className="font-ui text-grey text-xs uppercase tracking-widest">{items.length} {items.length === 1 ? 'Item' : 'Items'}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">

        {/* Cart items */}
        <div className="flex flex-col divide-y divide-grey-light">
          {items.map((item) => (
            <div key={`${item.product.id}-${item.size}`} className="flex gap-5 py-6">
              <div className="w-24 aspect-3/4 shrink-0 overflow-hidden rounded-lg bg-beige">
                <ProductImage
                  sanityImage={item.product.sanityImages?.[0]}
                  fallbackVariant={item.product.imgVariant}
                  alt={item.product.name}
                  sizes="96px"
                />
              </div>

              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <Link href={`/products/${item.product.slug}`} className="font-ui text-[10px] uppercase tracking-widest text-grey hover:text-gold transition-colors">
                  {item.product.category}
                </Link>
                <Link href={`/products/${item.product.slug}`} className="font-ui text-sm font-semibold text-navy hover:text-gold transition-colors leading-snug">
                  {item.product.name}
                </Link>
                {item.size && (
                  <span className="inline-block bg-beige text-navy font-ui text-[9px] uppercase tracking-widest w-fit px-2 py-0.5 rounded mt-0.5">
                    Size {item.size}
                  </span>
                )}
                <p className="font-body text-navy font-semibold mt-1">Rs. {item.product.price.toLocaleString('en-PK')}</p>

                <div className="flex items-center gap-5 mt-3">
                  <div className="flex items-center border border-grey-light rounded-lg overflow-hidden">
                    <button onClick={() => updateQty(item.product.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-navy hover:bg-beige transition-colors select-none">−</button>
                    <span className="w-8 text-center font-body text-sm text-navy select-none">{item.quantity}</span>
                    <button onClick={() => updateQty(item.product.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-navy hover:bg-beige transition-colors select-none">+</button>
                  </div>
                  <button onClick={() => removeItem(item.product.id)} className="font-ui text-[10px] uppercase tracking-widest text-grey hover:text-navy transition-colors">Remove</button>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="font-body text-navy font-semibold">Rs. {(item.product.price * item.quantity).toLocaleString('en-PK')}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:sticky lg:top-24 bg-beige/30 rounded-2xl border border-grey-light p-7">
          <h2 className="font-display text-xl font-semibold text-navy mb-6">Order Summary</h2>

          <div className="flex flex-col gap-3 mb-5">
            <div className="flex justify-between">
              <span className="font-ui text-xs uppercase tracking-widest text-grey">Subtotal</span>
              <span className="font-body text-sm text-navy">Rs. {total.toLocaleString('en-PK')}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="font-ui text-xs uppercase tracking-widest text-grey">Shipping</span>
              <div className="text-right">
                <span className="font-body text-sm text-navy block">Rs. 250</span>
                <span className="font-ui text-[9px] text-gold uppercase tracking-wider">Free on JazzCash / Bank</span>
              </div>
            </div>
            {promoApplied && (
              <div className="flex justify-between text-gold">
                <span className="font-ui text-xs uppercase tracking-widest">Discount (10%)</span>
                <span className="font-body text-sm">−Rs. {Math.floor(total * 0.1).toLocaleString('en-PK')}</span>
              </div>
            )}
          </div>

          <div className="border-t border-grey-light pt-4 mb-6">
            <div className="flex justify-between items-baseline">
              <span className="font-ui text-xs uppercase tracking-widest font-semibold text-navy">Total</span>
              <span className="font-display text-xl font-semibold text-navy">Rs. {discountedTotal.toLocaleString('en-PK')}</span>
            </div>
          </div>

          <form onSubmit={handlePromo} className="flex mb-6 rounded-lg overflow-hidden border border-grey-light">
            <input
              type="text"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              placeholder="Promo code"
              className="flex-1 bg-white text-navy font-body text-sm focus:outline-none px-3 py-2.5"
            />
            <button type="submit" className="bg-navy text-white font-ui text-[10px] uppercase tracking-widest hover:bg-charcoal transition-colors px-4">
              Apply
            </button>
          </form>

          <Link
            href="/checkout"
            className="block w-full text-center bg-navy text-white font-ui text-xs font-semibold uppercase tracking-widest py-4 rounded-lg hover:bg-charcoal transition-colors"
          >
            Proceed to Checkout
          </Link>

          <div className="mt-4 text-center">
            <Link href="/shop" className="font-ui text-[10px] uppercase tracking-widest text-grey hover:text-gold transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
