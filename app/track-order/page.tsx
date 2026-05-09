'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const STATUS_STEPS = ['pending', 'confirmed', 'processing', 'shipped', 'delivered']

const STATUS_LABEL: Record<string, string> = {
  pending: 'Order Received',
  confirmed: 'Verified',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  return_requested: 'Return Requested',
  returned: 'Returned',
}

const STATUS_COLOR: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
  processing: 'bg-purple-50 text-purple-700 border-purple-200',
  shipped: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  cancelled: 'bg-red-50 text-red-600 border-red-200',
  return_requested: 'bg-orange-50 text-orange-700 border-orange-200',
  returned: 'bg-grey-light text-grey border-grey-light',
}

const STATUS_DESC: Record<string, string> = {
  pending: 'Your order has been received. Our team will call you shortly to confirm.',
  confirmed: 'Order verified! We are preparing your items.',
  processing: 'Your order is being packed and prepared for dispatch.',
  shipped: 'Your order is on its way!',
  delivered: 'Your order has been delivered. Enjoy!',
  cancelled: 'This order has been cancelled. Contact us on WhatsApp for help.',
  return_requested: 'Your return request is being reviewed.',
  returned: 'Return processed. Refund will be issued shortly.',
}

interface TrackedOrder {
  orderNumber: string
  status: string
  paymentMethod: string
  paymentStatus: string
  total: string
  shippingCost: string
  createdAt: string
  trackingNumber: string | null
  trackingCarrier: string | null
  shippingAddress: { name: string; address: string; city: string; province: string }
  items: { productName: string; quantity: number; size: string | null; totalPrice: string }[]
}

function TrackOrderContent() {
  const searchParams = useSearchParams()
  const [orderNum, setOrderNum] = useState(searchParams.get('order') ?? '')
  const [email,    setEmail]    = useState(searchParams.get('email') ?? '')
  const [result,   setResult]   = useState<TrackedOrder | null>(null)
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [searched, setSearched] = useState(false)

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderNum.trim() || !email.trim()) return
    setLoading(true)
    setError('')
    setResult(null)
    setSearched(true)

    const params = new URLSearchParams({ order: orderNum.trim().toUpperCase(), email: email.trim().toLowerCase() })
    const res = await fetch(`/api/orders/track?${params}`)
    const data = await res.json()

    if (!res.ok) {
      setError('No order found with those details. Please check your order number and email.')
    } else {
      setResult(data.order)
    }
    setLoading(false)
  }

  const stepIndex = result ? STATUS_STEPS.indexOf(result.status) : -1
  const isFinal   = result && ['cancelled', 'return_requested', 'returned'].includes(result.status)

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="font-ui text-gold text-[10px] tracking-[0.35em] uppercase mb-3">Mala By Kashmala</p>
        <h1 className="font-display text-4xl font-semibold text-navy mb-3">Track Your Order</h1>
        <p className="font-body text-grey text-sm leading-relaxed">
          Enter your order number and email address to see the latest status of your order.
        </p>
      </div>

      {/* Search form */}
      <div className="bg-white rounded-2xl border border-grey-light p-6 sm:p-8 mb-6">
        <form onSubmit={handleTrack} className="flex flex-col gap-4">
          <div>
            <label className="font-ui text-[10px] uppercase tracking-widest text-grey block mb-1.5">
              Order Number
            </label>
            <input
              type="text"
              value={orderNum}
              onChange={(e) => setOrderNum(e.target.value.toUpperCase())}
              placeholder="e.g. MLK-2026-12345"
              required
              className="w-full border border-grey-light bg-white text-navy font-body text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-colors px-4 py-3 rounded-lg placeholder:text-grey/40"
            />
          </div>
          <div>
            <label className="font-ui text-[10px] uppercase tracking-widest text-grey block mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="The email used at checkout"
              required
              className="w-full border border-grey-light bg-white text-navy font-body text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-colors px-4 py-3 rounded-lg placeholder:text-grey/40"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy text-white font-ui text-xs font-semibold uppercase tracking-widest py-3.5 rounded-xl hover:bg-charcoal transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Searching…</>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="8.5" cy="8.5" r="5.5"/><line x1="13.5" y1="13.5" x2="18" y2="18"/>
                </svg>
                Track Order
              </>
            )}
          </button>
        </form>
      </div>

      {/* Error */}
      {searched && error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center mb-6">
          <p className="font-body text-sm text-red-600 mb-4">{error}</p>
          <p className="font-body text-xs text-grey">
            Your order number is on your order confirmation page (e.g. MLK-2026-XXXXX).{' '}
            <a href="https://wa.me/923257166006" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
              Contact us on WhatsApp
            </a>{' '}
            if you need help.
          </p>
        </div>
      )}

      {/* Result */}
      {result && !loading && (
        <div className="flex flex-col gap-5">
          {/* Status header */}
          <div className={`rounded-2xl border p-6 ${STATUS_COLOR[result.status]?.replace('text-', 'border-').split(' ')[2] ? '' : ''} bg-white border-grey-light`}>
            <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
              <div>
                <p className="font-ui text-[10px] uppercase tracking-widest text-grey mb-1">Order</p>
                <p className="font-display text-2xl font-semibold text-navy">{result.orderNumber}</p>
                <p className="font-body text-xs text-grey mt-1">
                  Placed {new Date(result.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
              <span className={`font-ui text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border ${STATUS_COLOR[result.status]}`}>
                {STATUS_LABEL[result.status] ?? result.status}
              </span>
            </div>
            <p className="font-body text-sm text-navy leading-relaxed bg-beige/50 rounded-xl px-4 py-3">
              {STATUS_DESC[result.status]}
            </p>
          </div>

          {/* Progress bar */}
          {!isFinal && (
            <div className="bg-white rounded-2xl border border-grey-light p-6">
              <p className="font-ui text-[10px] uppercase tracking-widest text-grey mb-5">Order Progress</p>
              <div className="flex items-center overflow-x-auto pb-1">
                {STATUS_STEPS.map((s, i) => (
                  <div key={s} className="flex items-center shrink-0">
                    <div className="flex flex-col items-center gap-1.5">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        i < stepIndex  ? 'bg-emerald-500 text-white' :
                        i === stepIndex ? 'bg-navy text-white ring-4 ring-navy/15' :
                                          'bg-beige text-grey'
                      }`}>
                        {i < stepIndex ? (
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                            <path d="M2 7L5.5 10.5L12 4" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                          </svg>
                        ) : <span className="font-ui text-[10px] font-semibold">{i + 1}</span>}
                      </div>
                      <span className={`font-ui text-[9px] uppercase tracking-wider whitespace-nowrap ${
                        i <= stepIndex ? 'text-navy font-semibold' : 'text-grey'
                      }`}>
                        {STATUS_LABEL[s]}
                      </span>
                    </div>
                    {i < STATUS_STEPS.length - 1 && (
                      <div className={`w-8 sm:w-14 h-px mx-1.5 mb-5 ${i < stepIndex ? 'bg-emerald-400' : 'bg-grey-light'}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tracking number */}
          {result.trackingNumber && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 flex items-center gap-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-indigo-600 shrink-0">
                <path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/>
                <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              <div>
                <p className="font-ui text-[10px] uppercase tracking-widest text-indigo-600 mb-0.5">Tracking Number</p>
                <p className="font-body text-base font-semibold text-navy select-all">{result.trackingNumber}</p>
                {result.trackingCarrier && (
                  <p className="font-body text-xs text-grey">via {result.trackingCarrier}</p>
                )}
              </div>
            </div>
          )}

          {/* Items */}
          <div className="bg-white rounded-2xl border border-grey-light overflow-hidden">
            <div className="px-6 py-4 border-b border-grey-light">
              <p className="font-ui text-[10px] uppercase tracking-widest font-semibold text-navy">Items Ordered</p>
            </div>
            <div className="divide-y divide-grey-light/60">
              {result.items.map((item, i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-ui text-xs font-semibold text-navy">{item.productName}</p>
                    <p className="font-body text-xs text-grey mt-0.5">
                      {item.size ? `Size ${item.size} · ` : ''}Qty {item.quantity}
                    </p>
                  </div>
                  <p className="font-body text-sm font-semibold text-navy whitespace-nowrap">
                    Rs. {Number(item.totalPrice).toLocaleString('en-PK')}
                  </p>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-grey-light bg-beige/20 flex flex-col gap-1.5">
              <div className="flex justify-between">
                <span className="font-ui text-[10px] uppercase tracking-widest text-grey">Delivery</span>
                <span className="font-body text-sm text-navy">
                  {Number(result.shippingCost) === 0 ? 'Free' : `Rs. ${Number(result.shippingCost).toLocaleString('en-PK')}`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-grey-light">
                <span className="font-ui text-xs uppercase tracking-widest font-semibold text-navy">Total</span>
                <span className="font-display text-lg font-semibold text-navy">
                  Rs. {Number(result.total).toLocaleString('en-PK')}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping address */}
          <div className="bg-white rounded-2xl border border-grey-light p-5">
            <p className="font-ui text-[10px] uppercase tracking-widest text-grey mb-3">Shipping Address</p>
            <p className="font-body text-sm text-navy font-semibold">{result.shippingAddress?.name}</p>
            <p className="font-body text-sm text-grey">{result.shippingAddress?.address}</p>
            <p className="font-body text-sm text-grey">{result.shippingAddress?.city}, {result.shippingAddress?.province}</p>
          </div>

          {/* Need help */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-center gap-4">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-emerald-600 shrink-0">
              <path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.46 0 .12 5.34.1 11.93c0 2.1.55 4.16 1.6 5.97L0 24l6.27-1.65a11.94 11.94 0 0 0 5.77 1.47h.01c6.58 0 11.93-5.34 11.94-11.93 0-3.18-1.24-6.18-3.48-8.41Z"/>
            </svg>
            <div>
              <p className="font-ui text-[10px] uppercase tracking-widest text-emerald-700 mb-0.5 font-semibold">Need Help?</p>
              <a href="https://wa.me/923257166006" target="_blank" rel="noopener noreferrer"
                className="font-body text-sm font-semibold text-navy hover:text-gold transition-colors">
                Chat with us on WhatsApp →
              </a>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link href="/shop" className="font-ui text-xs uppercase tracking-widest text-grey hover:text-navy transition-colors">
              Continue Shopping →
            </Link>
          </div>
        </div>
      )}

      {/* Bottom links */}
      {!result && !loading && (
        <div className="text-center mt-6 flex flex-col gap-3">
          <p className="font-body text-xs text-grey">
            Have an account?{' '}
            <Link href="/account/orders" className="text-gold hover:underline font-semibold">View all your orders →</Link>
          </p>
          <p className="font-body text-xs text-grey">
            Questions?{' '}
            <a href="https://wa.me/923257166006" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
              Contact us on WhatsApp
            </a>
          </p>
        </div>
      )}
    </div>
  )
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <TrackOrderContent />
    </Suspense>
  )
}
