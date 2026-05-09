'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

function OrderSuccessContent() {
  const searchParams  = useSearchParams()
  const orderNumber   = searchParams.get('order') ?? '—'
  const email         = searchParams.get('email') ?? ''
  const { user }      = useAuth()

  const trackUrl = `/track-order?order=${encodeURIComponent(orderNumber)}&email=${encodeURIComponent(email)}`

  return (
    <div className="max-w-lg mx-auto px-4 py-20 flex flex-col items-center text-center">

      {/* Check mark */}
      <div className="w-20 h-20 rounded-full border-2 border-gold/50 flex items-center justify-center mb-7 bg-gold/5">
        <svg width="32" height="32" viewBox="0 0 40 40" fill="none" className="text-gold">
          <path d="M8 20L16 28L32 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <p className="font-ui text-gold text-[10px] tracking-[0.35em] uppercase mb-3">Order Confirmed</p>

      <h1 className="font-display text-3xl md:text-4xl font-semibold text-navy leading-tight mb-3">
        Thank you for shopping with <span className="text-gold">Mala By Kashmala</span>
      </h1>

      <p className="font-body text-grey text-sm mb-8 leading-relaxed max-w-sm">
        Your order has been received. Our team will call you shortly to confirm before dispatch.
      </p>

      {/* Order number box */}
      <div className="bg-beige/50 border border-grey-light rounded-2xl px-8 py-5 mb-6 w-full">
        <p className="font-ui text-grey text-[10px] tracking-widest uppercase mb-2">Your Order Number</p>
        <p className="font-display text-3xl font-semibold text-navy select-all">{orderNumber}</p>
        <p className="font-body text-xs text-grey mt-2">Save this number to track your order</p>
      </div>

      {/* Delivery estimate */}
      <div className="flex items-center gap-6 mb-8 flex-wrap justify-center">
        <div className="flex items-center gap-2 text-grey">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <span className="font-body text-xs">3–5 business days</span>
        </div>
        <div className="flex items-center gap-2 text-grey">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12a19.79 19.79 0 0 1-3-8.6A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <span className="font-body text-xs">Confirmation call coming</span>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 w-full mb-6">
        {user ? (
          <Link href="/account/orders"
            className="flex-1 inline-flex items-center justify-center gap-2 font-ui text-xs font-semibold uppercase tracking-widest bg-navy text-white hover:bg-charcoal transition-colors px-6 py-4 rounded-xl">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
              <rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/>
            </svg>
            View My Orders
          </Link>
        ) : (
          <Link href={trackUrl}
            className="flex-1 inline-flex items-center justify-center gap-2 font-ui text-xs font-semibold uppercase tracking-widest bg-navy text-white hover:bg-charcoal transition-colors px-6 py-4 rounded-xl">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="8.5" cy="8.5" r="5.5"/><line x1="13.5" y1="13.5" x2="18" y2="18"/>
            </svg>
            Track This Order
          </Link>
        )}
        <Link href="/shop"
          className="flex-1 inline-flex items-center justify-center font-ui text-xs font-semibold uppercase tracking-widest border border-grey-light text-navy hover:border-navy transition-colors px-6 py-4 rounded-xl">
          Continue Shopping
        </Link>
      </div>

      {/* Create account prompt for guests */}
      {!user && (
        <div className="w-full bg-gold/8 border border-gold/20 rounded-2xl p-5 mb-6">
          <p className="font-ui text-[10px] uppercase tracking-widest text-gold mb-2 font-semibold">Create a Free Account</p>
          <p className="font-body text-sm text-navy mb-3 leading-relaxed">
            Save your order history, track deliveries, and checkout faster next time.
          </p>
          <Link href="/account"
            className="inline-flex items-center font-ui text-xs font-semibold uppercase tracking-widest text-navy hover:text-gold transition-colors gap-1.5">
            Create Account →
          </Link>
        </div>
      )}

      {/* WhatsApp reminder for online payments */}
      <a href="https://wa.me/923257166006" target="_blank" rel="noopener noreferrer"
        className="w-full flex items-center gap-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl hover:bg-emerald-100 transition-colors">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-emerald-600 shrink-0">
          <path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.46 0 .12 5.34.1 11.93c0 2.1.55 4.16 1.6 5.97L0 24l6.27-1.65a11.94 11.94 0 0 0 5.77 1.47h.01c6.58 0 11.93-5.34 11.94-11.93 0-3.18-1.24-6.18-3.48-8.41Z"/>
        </svg>
        <div className="text-left">
          <p className="font-ui text-[10px] uppercase tracking-widest text-emerald-700 font-semibold mb-0.5">
            Paid via JazzCash or Bank?
          </p>
          <p className="font-body text-sm text-navy font-semibold">Send payment screenshot → 0325 7166006</p>
          <p className="font-body text-xs text-grey mt-0.5">Send on WhatsApp to confirm your order faster</p>
        </div>
      </a>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  )
}
