'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'

export function CartSidebar() {
  const { items, total, isOpen, closeCart, removeItem, updateQty } = useCart()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, closeCart])

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-mala-black/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-ivory flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-beige">
          <h2 className="font-display italic text-xl text-brown">Your Cart</h2>
          <button onClick={closeCart} className="p-1 text-brown hover:text-gold transition-colors" aria-label="Close cart">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <line x1="2" y1="2" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="16" y1="2" x2="2" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <svg width="48" height="56" viewBox="0 0 48 56" fill="none" className="text-sand">
                <path d="M14 18V14A10 10 0 0 1 34 14V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <rect x="3" y="18" width="42" height="34" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <p className="font-display italic text-lg text-brown">Your cart is empty</p>
              <p className="font-body text-sm text-brown-light">Discover our latest collections</p>
              <button
                onClick={closeCart}
                className="mt-2 font-ui text-xs uppercase tracking-widest text-gold border-b border-gold pb-0.5"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                  <div className="w-16 h-20 flex-shrink-0 overflow-hidden">
                    <PlaceholderImage variant={item.product.imgVariant} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-ui text-xs uppercase tracking-wide text-brown-light mb-0.5">
                      {item.product.category}
                    </p>
                    <p className="font-body text-sm text-brown leading-snug line-clamp-2">
                      {item.product.name}
                    </p>
                    {item.size && item.size !== 'Unstitched' && (
                      <p className="font-ui text-xs text-brown-light mt-0.5">Size: {item.size}</p>
                    )}
                    <p className="font-body text-sm text-brown mt-1">
                      Rs. {item.product.price.toLocaleString('en-PK')}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-beige">
                        <button
                          onClick={() => updateQty(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-brown hover:bg-beige transition-colors"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-7 text-center font-body text-sm text-brown">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-brown hover:bg-beige transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="font-ui text-[10px] uppercase tracking-wider text-brown-light hover:text-brown transition-colors"
                        aria-label="Remove item"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-beige">
            <div className="flex justify-between mb-1.5">
              <span className="font-ui text-xs uppercase tracking-wider text-brown-light">Subtotal</span>
              <span className="font-body text-sm text-brown">Rs. {total.toLocaleString('en-PK')}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-ui text-xs uppercase tracking-wider text-brown-light">Shipping</span>
              <span className="font-body text-sm text-gold">Free</span>
            </div>
            <div className="flex justify-between mb-5 pt-3 border-t border-beige">
              <span className="font-ui text-xs uppercase tracking-wider text-brown">Total</span>
              <span className="font-display italic text-lg text-brown">Rs. {total.toLocaleString('en-PK')}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full text-center bg-brown text-mala-white font-ui text-xs uppercase tracking-widest py-3.5 hover:bg-brown-mid transition-colors"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={closeCart}
              className="block w-full text-center font-ui text-xs uppercase tracking-widest text-brown-light mt-3 hover:text-brown transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
