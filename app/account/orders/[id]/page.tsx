'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const STATUS_STEPS = ['pending', 'confirmed', 'processing', 'shipped', 'delivered']

const STATUS_LABEL: Record<string, string> = {
  pending: 'Pending', confirmed: 'Confirmed', processing: 'Processing',
  shipped: 'Shipped', delivered: 'Delivered', cancelled: 'Cancelled',
  return_requested: 'Return Requested', returned: 'Returned',
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

interface OrderDetail {
  id: string; orderNumber: string; status: string; paymentMethod: string;
  paymentStatus: string; subtotal: string; shippingCost: string; total: string;
  createdAt: string; trackingNumber?: string; trackingCarrier?: string;
  shippingAddress: { name: string; phone: string; address: string; city: string; province: string; postal: string }
  items: { id: string; productName: string; productSlug: string; size?: string; quantity: number; unitPrice: string; totalPrice: string }[]
  returns: { id: string; reason: string; status: string; createdAt: string }[]
}

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [returnReason, setReturnReason] = useState('')
  const [returning, setReturning] = useState(false)
  const [returnDone, setReturnDone] = useState(false)

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then((r) => r.json())
      .then((d) => setOrder(d.order))
      .finally(() => setLoading(false))
  }, [id])

  const handleReturn = async () => {
    if (!returnReason.trim()) return
    setReturning(true)
    const res = await fetch(`/api/orders/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason: returnReason }),
    })
    if (res.ok) { setReturnDone(true); setOrder((o) => o ? { ...o, status: 'return_requested' } : o) }
    setReturning(false)
  }

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!order) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <p className="font-display text-2xl text-navy mb-4">Order not found</p>
      <Link href="/account/orders" className="font-ui text-xs uppercase tracking-widest text-gold hover:underline">← Back to Orders</Link>
    </div>
  )

  const stepIndex = STATUS_STEPS.indexOf(order.status)
  const isCancelled = order.status === 'cancelled'
  const isReturnable = order.status === 'delivered' && order.returns.length === 0

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 mb-8 flex-wrap">
        <Link href="/account" className="font-ui text-[10px] uppercase tracking-widest text-grey hover:text-navy transition-colors">Account</Link>
        <span className="text-grey-light">/</span>
        <Link href="/account/orders" className="font-ui text-[10px] uppercase tracking-widest text-grey hover:text-navy transition-colors">Orders</Link>
        <span className="text-grey-light">/</span>
        <span className="font-ui text-[10px] uppercase tracking-widest text-navy">{order.orderNumber}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-navy">{order.orderNumber}</h1>
          <p className="font-body text-grey text-sm mt-1">
            Placed on {new Date(order.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <span className={`font-ui text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border ${STATUS_COLOR[order.status]}`}>
          {STATUS_LABEL[order.status]}
        </span>
      </div>

      {/* Order progress tracker */}
      {!isCancelled && !order.status.startsWith('return') && (
        <div className="bg-white border border-grey-light rounded-2xl p-6 mb-6">
          <p className="font-ui text-[10px] uppercase tracking-widest text-grey mb-5">Order Progress</p>
          <div className="flex items-center">
            {STATUS_STEPS.map((s, i) => (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                    i < stepIndex ? 'bg-gold text-navy' : i === stepIndex ? 'bg-navy text-white' : 'bg-beige text-grey'
                  }`}>
                    {i < stepIndex ? (
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7L5.5 10.5L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    ) : i + 1}
                  </div>
                  <span className={`font-ui text-[9px] uppercase tracking-widest ${i <= stepIndex ? 'text-navy' : 'text-grey'}`}>
                    {STATUS_LABEL[s]}
                  </span>
                </div>
                {i < STATUS_STEPS.length - 1 && (
                  <div className={`flex-1 h-px mx-2 mb-5 ${i < stepIndex ? 'bg-gold' : 'bg-grey-light'}`} />
                )}
              </div>
            ))}
          </div>
          {order.trackingNumber && (
            <div className="mt-4 pt-4 border-t border-grey-light flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold shrink-0">
                <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              <div>
                <span className="font-ui text-[10px] uppercase tracking-widest text-grey">Tracking Number</span>
                <p className="font-body text-sm font-semibold text-navy">{order.trackingNumber}{order.trackingCarrier ? ` · ${order.trackingCarrier}` : ''}</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        {/* Items */}
        <div className="bg-white border border-grey-light rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-grey-light">
            <p className="font-ui text-xs uppercase tracking-widest font-semibold text-navy">Order Items</p>
          </div>
          <div className="divide-y divide-grey-light/60">
            {order.items.map((item) => (
              <div key={item.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-ui text-xs font-semibold text-navy">{item.productName}</p>
                  <p className="font-body text-xs text-grey mt-0.5">
                    {item.size && `Size ${item.size} · `}Qty {item.quantity}
                  </p>
                </div>
                <p className="font-body text-sm text-navy font-semibold whitespace-nowrap">
                  Rs. {Number(item.totalPrice).toLocaleString('en-PK')}
                </p>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 border-t border-grey-light bg-beige/20">
            <div className="flex justify-between mb-1.5">
              <span className="font-ui text-[10px] uppercase tracking-widest text-grey">Subtotal</span>
              <span className="font-body text-sm text-navy">Rs. {Number(order.subtotal).toLocaleString('en-PK')}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-ui text-[10px] uppercase tracking-widest text-grey">Delivery</span>
              <span className="font-body text-sm text-navy">
                {Number(order.shippingCost) === 0 ? 'Free' : `Rs. ${Number(order.shippingCost).toLocaleString('en-PK')}`}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-grey-light">
              <span className="font-ui text-xs uppercase tracking-widest font-semibold text-navy">Total</span>
              <span className="font-display text-lg font-semibold text-navy">Rs. {Number(order.total).toLocaleString('en-PK')}</span>
            </div>
          </div>
        </div>

        {/* Sidebar: shipping + payment */}
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-grey-light rounded-2xl p-5">
            <p className="font-ui text-[10px] uppercase tracking-widest text-grey mb-3">Shipping Address</p>
            <p className="font-body text-sm text-navy font-semibold">{order.shippingAddress?.name}</p>
            <p className="font-body text-sm text-grey mt-0.5">{order.shippingAddress?.address}</p>
            <p className="font-body text-sm text-grey">{order.shippingAddress?.city}, {order.shippingAddress?.province}</p>
            {order.shippingAddress?.phone && <p className="font-body text-sm text-grey mt-0.5">{order.shippingAddress.phone}</p>}
          </div>

          <div className="bg-white border border-grey-light rounded-2xl p-5">
            <p className="font-ui text-[10px] uppercase tracking-widest text-grey mb-3">Payment</p>
            <p className="font-body text-sm text-navy capitalize">{order.paymentMethod.replace('_', ' ')}</p>
            <span className={`inline-block mt-1 font-ui text-[9px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
              order.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
              {order.paymentStatus}
            </span>
          </div>

          {/* Return section */}
          {isReturnable && !returnDone && (
            <div className="bg-white border border-grey-light rounded-2xl p-5">
              <p className="font-ui text-[10px] uppercase tracking-widest text-grey mb-3">Request Return</p>
              <textarea
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
                rows={3}
                placeholder="Please describe the reason for your return…"
                className="w-full border border-grey-light rounded-lg px-3 py-2.5 font-body text-sm text-navy focus:outline-none focus:border-gold resize-none"
              />
              <button onClick={handleReturn} disabled={returning || !returnReason.trim()}
                className="mt-3 w-full font-ui text-xs uppercase tracking-widest border border-navy text-navy py-3 rounded-lg hover:bg-navy hover:text-white transition-colors disabled:opacity-50">
                {returning ? 'Submitting…' : 'Submit Return Request'}
              </button>
            </div>
          )}
          {returnDone && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
              <p className="font-ui text-[10px] uppercase tracking-widest text-orange-700 mb-1">Return Requested</p>
              <p className="font-body text-sm text-orange-700">Our team will review your request and contact you shortly.</p>
            </div>
          )}
          {order.returns.length > 0 && !returnDone && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
              <p className="font-ui text-[10px] uppercase tracking-widest text-orange-700 mb-1">Return Status</p>
              <p className="font-body text-sm text-orange-700 capitalize">{order.returns[0].status.replace('_', ' ')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
