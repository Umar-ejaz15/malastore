'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { ProductImage } from '@/components/ui/ProductImage'

export function CartSidebar() {
  const { items, total, isOpen, closeCart, removeItem, updateQty } = useCart()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    if (isOpen) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeCart])

  const shippingCod   = 250
  const freeThreshold = 2500 // show "add X more for free shipping" hint

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
        className={`fixed top-0 right-0 z-70 h-full w-full max-w-100 bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-grey-light">
          <div className="flex items-center gap-2.5">
            <h2 className="font-display text-xl font-semibold text-navy">
              Your Cart
            </h2>
            {items.length > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-navy text-white font-ui font-bold text-[9px]">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-navy/50 hover:text-navy hover:bg-beige transition-all"
            aria-label="Close cart"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 2l10 10M12 2L2 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* ── Items ──────────────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-5 py-4 overscroll-contain">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
              <div className="w-20 h-20 rounded-full bg-beige/60 flex items-center justify-center">
                <svg
                  width="32"
                  height="36"
                  viewBox="0 0 48 56"
                  fill="none"
                  className="text-grey-light"
                >
                  <path
                    d="M14 18V14A10 10 0 0 1 34 14V18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <rect
                    x="3"
                    y="18"
                    width="42"
                    height="34"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-navy mb-1">
                  Your cart is empty
                </p>
                <p className="font-body text-sm text-grey">
                  Discover our latest collections
                </p>
              </div>
              <button
                onClick={closeCart}
                className="mt-1 font-ui text-xs uppercase tracking-widest text-gold border-b border-gold/60 pb-0.5 hover:text-gold-dark transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-grey-light/60">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 py-5 first:pt-1"
                >
                  {/* Image */}
                  <Link
                    href={`/products/${item.product.slug}`}
                    onClick={closeCart}
                    className="w-18 aspect-3/4 shrink-0 overflow-hidden rounded-xl bg-beige hover-zoom block"
                  >
                    <ProductImage
                      sanityImage={item.product.sanityImages?.[0]}
                      fallbackVariant={item.product.imgVariant}
                      alt={item.product.name}
                      sizes="72px"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-ui text-[9px] uppercase tracking-widest text-grey mb-0.5">
                      {item.product.category}
                    </p>
                    <Link
                      href={`/products/${item.product.slug}`}
                      onClick={closeCart}
                      className="font-body text-sm text-navy hover:text-gold transition-colors leading-snug line-clamp-2 font-medium"
                    >
                      {item.product.name}
                    </Link>
                    {item.size && (
                      <span className="inline-block mt-1 bg-beige text-navy font-ui text-[9px] uppercase tracking-widest px-2 py-0.5 rounded">
                        Size {item.size}
                      </span>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      {/* Qty stepper */}
                      <div className="flex items-center border border-grey-light rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            updateQty(item.product.id, item.size, item.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center text-navy hover:bg-beige transition-colors select-none"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-7 text-center font-body text-sm text-navy select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQty(item.product.id, item.size, item.quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center text-navy hover:bg-beige transition-colors select-none"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Price + remove */}
                      <div className="text-right">
                        <p className="font-body text-sm font-semibold text-navy">
                          Rs.{' '}
                          {(item.product.price * item.quantity).toLocaleString('en-PK')}
                        </p>
                        <button
                          onClick={() => removeItem(item.product.id, item.size)}
                          className="font-ui text-[9px] uppercase tracking-widest text-grey/60 hover:text-navy transition-colors mt-0.5"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Footer ─────────────────────────────────────────────────────────── */}
        {items.length > 0 && (
          <div className="border-t border-grey-light px-5 pt-4 pb-6 space-y-4 bg-off-white/60">
            {/* Free shipping hint */}
            {total < freeThreshold && (
              <div className="flex items-center gap-2 bg-gold/8 border border-gold/20 rounded-lg px-3 py-2">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="text-gold shrink-0"
                >
                  <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
                  <path
                    d="M6 4v3M6 8.5v.3"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="font-ui text-[9px] uppercase tracking-widest text-gold">
                  Add Rs.{' '}
                  {(freeThreshold - total).toLocaleString('en-PK')} more for free
                  delivery
                </p>
              </div>
            )}

            {/* Totals */}
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="font-ui text-[10px] uppercase tracking-widest text-grey">
                  Subtotal
                </span>
                <span className="font-body text-sm text-navy">
                  Rs. {total.toLocaleString('en-PK')}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="font-ui text-[10px] uppercase tracking-widest text-grey">
                  Shipping
                </span>
                <div className="text-right">
                  <span className="font-body text-sm text-navy block">
                    Rs. {shippingCod.toLocaleString('en-PK')}
                  </span>
                  <span className="font-ui text-[8px] text-gold uppercase tracking-wider">
                    Free on JazzCash / Bank
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-3 border-t border-grey-light">
              <span className="font-ui text-[10px] uppercase tracking-widest font-semibold text-navy">
                Est. Total
              </span>
              <span className="font-display text-lg font-semibold text-navy">
                Rs. {(total + shippingCod).toLocaleString('en-PK')}
              </span>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex items-center justify-center gap-2 w-full bg-navy text-white font-ui text-xs font-semibold uppercase tracking-widest py-4 rounded-xl hover:bg-charcoal transition-colors duration-200"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Proceed to Checkout
            </Link>

            <button
              onClick={closeCart}
              className="block w-full text-center font-ui text-[10px] uppercase tracking-widest text-grey hover:text-navy transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
