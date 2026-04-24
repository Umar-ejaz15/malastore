'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'

export function CartSidebar() {
  const { items, total, isOpen, closeCart, removeItem, updateQty } = useCart()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeCart() }
    if (isOpen) {
      document.addEventListener('keydown', handler)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeCart])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-60 bg-navy/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 z-70 h-full w-full max-w-sm bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-grey-light">
          <h2 className="font-display text-xl font-semibold text-navy">Your Cart</h2>
          <button onClick={closeCart} className="w-8 h-8 flex items-center justify-center rounded-md text-navy/60 hover:text-gold transition-colors" aria-label="Close cart">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="14" y1="2" x2="2" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-16 h-16 rounded-full border border-grey-light flex items-center justify-center text-grey-light">
                <svg width="28" height="32" viewBox="0 0 48 56" fill="none">
                  <path d="M14 18V14A10 10 0 0 1 34 14V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <rect x="3" y="18" width="42" height="34" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <p className="font-display text-lg font-semibold text-navy">Your cart is empty</p>
              <p className="font-body text-sm text-grey">Discover our latest collections</p>
              <button onClick={closeCart} className="mt-1 font-ui text-xs uppercase tracking-widest text-gold border-b border-gold pb-0.5 hover:text-gold-dark transition-colors">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                  <div className="w-16 h-20 shrink-0 overflow-hidden rounded-md bg-beige">
                    <PlaceholderImage variant={item.product.imgVariant} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-ui text-[10px] uppercase tracking-wider text-grey mb-0.5">{item.product.category}</p>
                    <p className="font-body text-sm text-navy leading-snug line-clamp-2">{item.product.name}</p>
                    {item.size && (
                      <p className="font-ui text-[10px] text-grey mt-0.5 uppercase tracking-wider">Size: {item.size}</p>
                    )}
                    <p className="font-body text-sm font-semibold text-navy mt-1">
                      Rs. {item.product.price.toLocaleString('en-PK')}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-grey-light rounded">
                        <button onClick={() => updateQty(item.product.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-navy hover:bg-beige transition-colors text-sm" aria-label="Decrease">−</button>
                        <span className="w-7 text-center font-body text-sm text-navy">{item.quantity}</span>
                        <button onClick={() => updateQty(item.product.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-navy hover:bg-beige transition-colors text-sm" aria-label="Increase">+</button>
                      </div>
                      <button onClick={() => removeItem(item.product.id)} className="font-ui text-[10px] uppercase tracking-wider text-grey hover:text-navy transition-colors" aria-label="Remove">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-5 border-t border-grey-light">
            <div className="flex justify-between mb-1.5">
              <span className="font-ui text-xs uppercase tracking-wider text-grey">Subtotal</span>
              <span className="font-body text-sm text-navy">Rs. {total.toLocaleString('en-PK')}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-ui text-xs uppercase tracking-wider text-grey">Shipping</span>
              <span className="font-ui text-xs font-semibold text-gold uppercase tracking-wider">Free</span>
            </div>
            <div className="flex justify-between mb-5 pt-3 border-t border-grey-light">
              <span className="font-ui text-xs uppercase tracking-wider font-semibold text-navy">Total</span>
              <span className="font-display text-lg font-semibold text-navy">Rs. {total.toLocaleString('en-PK')}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full text-center bg-navy text-white font-ui text-xs font-semibold uppercase tracking-widest py-3.5 rounded-lg hover:bg-charcoal transition-colors"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={closeCart}
              className="block w-full text-center font-ui text-xs uppercase tracking-widest text-grey mt-3 hover:text-navy transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
