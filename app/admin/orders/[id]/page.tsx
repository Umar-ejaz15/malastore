'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const PIPELINE = [
  { status: 'pending',    label: 'Received'   },
  { status: 'confirmed',  label: 'Verified'   },
  { status: 'processing', label: 'Processing' },
  { status: 'shipped',    label: 'Shipped'    },
  { status: 'delivered',  label: 'Delivered'  },
]

const ORDER_STATUSES   = ['pending','confirmed','processing','shipped','delivered','cancelled','return_requested','returned']
const PAYMENT_STATUSES = ['pending','paid','failed','refunded']

const STATUS_PILL: Record<string, string> = {
  pending:          'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  confirmed:        'bg-sky-50 text-sky-700 ring-1 ring-sky-200',
  processing:       'bg-violet-50 text-violet-700 ring-1 ring-violet-200',
  shipped:          'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200',
  delivered:        'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  cancelled:        'bg-red-50 text-red-600 ring-1 ring-red-200',
  return_requested: 'bg-orange-50 text-orange-700 ring-1 ring-orange-200',
  returned:         'bg-slate-100 text-slate-500 ring-1 ring-slate-200',
  paid:             'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  failed:           'bg-red-50 text-red-600 ring-1 ring-red-200',
  refunded:         'bg-violet-50 text-violet-700 ring-1 ring-violet-200',
}

const NEXT_ACTION: Record<string, { label: string; next: string }> = {
  pending:    { label: 'Mark Verified & Confirmed', next: 'confirmed'  },
  confirmed:  { label: 'Mark as Processing',        next: 'processing' },
  processing: { label: 'Mark as Shipped',           next: 'shipped'    },
  shipped:    { label: 'Mark as Delivered',         next: 'delivered'  },
}

interface OrderFull {
  id: string; orderNumber: string; status: string; paymentMethod: string
  paymentStatus: string; subtotal: string; shippingCost: string; total: string
  createdAt: string; trackingNumber?: string | null; trackingCarrier?: string | null
  adminNotes?: string | null
  shippingAddress: { name: string; email?: string; phone: string; address: string; city: string; province: string; postal?: string }
  user?: { name: string; email: string; phone?: string | null } | null
  guestName?: string | null; guestEmail?: string | null; guestPhone?: string | null
  items: { id: string; productName: string; size?: string | null; quantity: number; unitPrice: string; totalPrice: string }[]
  returns: { id: string; reason: string; status: string; createdAt: string }[]
}

const inputCls = 'w-full bg-white border border-[#e5e2dc] rounded-xl px-3 py-2.5 font-body text-sm text-[#0c1628] focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/10 transition-colors'
const labelCls = 'font-ui text-[9px] uppercase tracking-widest text-slate-400 block mb-1.5'

export default function AdminOrderDetail() {
  const { id } = useParams<{ id: string }>()
  const [order,        setOrder]        = useState<OrderFull | null>(null)
  const [loading,      setLoading]      = useState(true)
  const [saving,       setSaving]       = useState(false)
  const [saved,        setSaved]        = useState(false)
  const [tracking,     setTracking]     = useState('')
  const [carrier,      setCarrier]      = useState('')
  const [payStatus,    setPayStatus]    = useState('')
  const [notes,        setNotes]        = useState('')
  const [statusSelect, setStatusSelect] = useState('')

  useEffect(() => {
    fetch(`/api/admin/orders/${id}`).then(r => r.json()).then(d => {
      setOrder(d.order)
      setTracking(d.order.trackingNumber ?? '')
      setCarrier(d.order.trackingCarrier ?? '')
      setPayStatus(d.order.paymentStatus)
      setNotes(d.order.adminNotes ?? '')
      setStatusSelect(d.order.status)
    }).finally(() => setLoading(false))
  }, [id])

  const patch = async (updates: Record<string, unknown>) => {
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })
    if (res.ok) { const d = await res.json(); setOrder(o => o ? { ...o, ...d.order } : o) }
    return res.ok
  }

  const advance = async () => {
    if (!order) return
    const action = NEXT_ACTION[order.status]
    if (!action) return
    setSaving(true)
    const updates: Record<string, unknown> = { status: action.next }
    if (action.next === 'shipped' && tracking) { updates.trackingNumber = tracking; updates.trackingCarrier = carrier }
    if (action.next === 'delivered') updates.paymentStatus = 'paid'
    await patch(updates)
    setSaving(false)
  }

  const save = async () => {
    setSaving(true); setSaved(false)
    const ok = await patch({ status: statusSelect, trackingNumber: tracking, trackingCarrier: carrier, paymentStatus: payStatus, adminNotes: notes })
    if (ok) { setSaved(true); setTimeout(() => setSaved(false), 3000) }
    setSaving(false)
  }

  const cancel = async () => {
    if (!confirm('Cancel this order?')) return
    setSaving(true)
    await patch({ status: 'cancelled' })
    setSaving(false)
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-7 h-7 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
    </div>
  )
  if (!order) return (
    <div className="text-center py-20">
      <p className="font-display text-xl text-[#0c1628]">Order not found</p>
      <Link href="/admin/orders" className="font-ui text-xs uppercase tracking-widest text-[#c9a84c] mt-3 inline-block">← Back to Orders</Link>
    </div>
  )

  const name   = order.user?.name  ?? order.guestName  ?? 'Guest'
  const email  = order.user?.email ?? order.guestEmail ?? ''
  const phone  = order.shippingAddress?.phone ?? order.user?.phone ?? order.guestPhone
  const wa     = phone ? `https://wa.me/92${phone.replace(/\D/g, '').replace(/^0/, '')}` : null
  const pipeIdx = PIPELINE.findIndex(p => p.status === order.status)
  const nextAct = NEXT_ACTION[order.status]
  const isFinal = ['delivered', 'cancelled', 'returned', 'return_requested'].includes(order.status)

  return (
    <div className="max-w-5xl mx-auto space-y-4">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2">
        <Link href="/admin" className="font-ui text-[9px] uppercase tracking-widest text-slate-400 hover:text-[#0c1628] transition-colors">Admin</Link>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-slate-200">
          <path d="M9 18l6-6-6-6"/>
        </svg>
        <Link href="/admin/orders" className="font-ui text-[9px] uppercase tracking-widest text-slate-400 hover:text-[#0c1628] transition-colors">Orders</Link>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-slate-200">
          <path d="M9 18l6-6-6-6"/>
        </svg>
        <span className="font-ui text-[9px] uppercase tracking-widest text-[#0c1628]">{order.orderNumber}</span>
      </nav>

      {/* Header card */}
      <div className="bg-white rounded-2xl border border-[#e5e2dc] p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
          <div>
            <div className="flex items-center gap-3 flex-wrap mb-1.5">
              <h1 className="font-display text-2xl font-semibold text-[#0c1628]">{order.orderNumber}</h1>
              <span className={`font-ui text-[9px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-lg ${STATUS_PILL[order.status]}`}>
                {order.status.replace(/_/g, ' ')}
              </span>
            </div>
            <p className="font-body text-sm text-slate-400">
              {new Date(order.createdAt).toLocaleDateString('en-PK', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              {' · '}
              {new Date(order.createdAt).toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            {saved && (
              <span className="flex items-center gap-1.5 font-ui text-[9px] uppercase tracking-widest text-emerald-600">
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7L5.5 10.5L12 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                Saved
              </span>
            )}
            <button onClick={save} disabled={saving}
              className="bg-[#0c1628] hover:bg-[#162035] text-white font-ui text-[10px] uppercase tracking-widest px-4 py-2.5 rounded-xl transition-colors disabled:opacity-50">
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Pipeline */}
        {!['cancelled', 'return_requested', 'returned'].includes(order.status) && (
          <div className="flex items-center overflow-x-auto pb-1 mb-5">
            {PIPELINE.map((step, i) => {
              const done = i < pipeIdx; const cur = i === pipeIdx
              return (
                <div key={step.status} className="flex items-center shrink-0">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                      done ? 'bg-emerald-500 text-white' :
                      cur  ? 'bg-[#0c1628] text-white ring-4 ring-[#0c1628]/10' :
                             'bg-[#f4f3ef] text-slate-400'
                    }`}>
                      {done
                        ? <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2 7L5.5 10.5L12 4" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
                        : i + 1}
                    </div>
                    <span className={`font-ui text-[9px] uppercase tracking-wider whitespace-nowrap ${
                      cur  ? 'text-[#0c1628] font-semibold' :
                      done ? 'text-emerald-600' :
                             'text-slate-400'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {i < PIPELINE.length - 1 && (
                    <div className={`w-10 sm:w-16 h-px mx-2 mb-5 ${done ? 'bg-emerald-400' : 'bg-[#e5e2dc]'}`} />
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Pending alert */}
        {order.status === 'pending' && (
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse mt-1.5 shrink-0" />
            <div>
              <p className="font-ui text-[10px] uppercase tracking-widest text-amber-700 font-semibold mb-0.5">Call Required</p>
              <p className="font-body text-sm text-amber-800">Call the customer to verify this order before processing.</p>
            </div>
          </div>
        )}

        {/* Primary action */}
        {nextAct && !isFinal && (
          <div className="flex items-center gap-2.5 flex-wrap">
            <button onClick={advance} disabled={saving}
              className="flex items-center gap-2 bg-[#0c1628] hover:bg-[#162035] text-white font-ui text-[10px] uppercase tracking-widest px-5 py-3 rounded-xl transition-colors disabled:opacity-50">
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                <path d="M2 7L5.5 10.5L12 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              {saving ? 'Updating…' : nextAct.label}
            </button>
            {!['delivered', 'returned', 'cancelled'].includes(order.status) && (
              <button onClick={cancel} disabled={saving}
                className="font-ui text-[10px] uppercase tracking-widest text-red-400 hover:text-red-600 border border-[#e5e2dc] hover:border-red-300 px-4 py-3 rounded-xl transition-colors">
                Cancel Order
              </button>
            )}
          </div>
        )}

        {order.status === 'delivered' && (
          <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7L5.5 10.5L12 4" stroke="#059669" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <p className="font-ui text-[10px] uppercase tracking-widest text-emerald-700 font-semibold">Order completed and delivered</p>
          </div>
        )}
      </div>

      {/* Customer contact bar */}
      {phone && (
        <div className="bg-[#0a1220] rounded-2xl p-4 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-ui text-[8px] uppercase tracking-[0.22em] text-white/30 mb-0.5">Customer</p>
            <p className="font-body text-base font-semibold text-white">{name}</p>
            <p className="font-body text-sm text-[#c9a84c]">{phone}</p>
          </div>
          <div className="flex gap-2">
            <a href={`tel:${phone}`}
              className="flex items-center gap-2 bg-white text-[#0c1628] font-ui text-[10px] uppercase tracking-widest px-4 py-2.5 rounded-xl hover:bg-[#f4f3ef] transition-colors">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12a19.79 19.79 0 0 1-3-8.6A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Call
            </a>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-ui text-[10px] uppercase tracking-widest px-4 py-2.5 rounded-xl transition-colors">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.46 0 .12 5.34.1 11.93c0 2.1.55 4.16 1.6 5.97L0 24l6.27-1.65a11.94 11.94 0 0 0 5.77 1.47h.01c6.58 0 11.93-5.34 11.94-11.93 0-3.18-1.24-6.18-3.48-8.41Z"/>
                </svg>
                WhatsApp
              </a>
            )}
          </div>
        </div>
      )}

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-4">

        {/* Left */}
        <div className="space-y-4">

          {/* Items */}
          <div className="bg-white rounded-2xl border border-[#e5e2dc] overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#ece9e3]">
              <p className="font-ui text-[10px] uppercase tracking-widest font-semibold text-[#0c1628]">Items · {order.items.length}</p>
            </div>
            <div className="divide-y divide-[#f5f3ef]">
              {order.items.map(item => (
                <div key={item.id} className="px-5 py-3.5 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-ui text-xs font-semibold text-[#0c1628]">{item.productName}</p>
                    <p className="font-body text-xs text-slate-400 mt-0.5">
                      {item.size ? `Size ${item.size} · ` : ''}Qty {item.quantity}
                    </p>
                  </div>
                  <p className="font-body text-sm font-semibold text-[#0c1628] whitespace-nowrap tabular-nums">
                    Rs.&nbsp;{Number(item.totalPrice).toLocaleString('en-PK')}
                  </p>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 border-t border-[#ece9e3] bg-[#faf9f7] space-y-2">
              <div className="flex justify-between">
                <span className="font-ui text-[9px] uppercase tracking-widest text-slate-400">Subtotal</span>
                <span className="font-body text-sm text-[#0c1628] tabular-nums">Rs.&nbsp;{Number(order.subtotal).toLocaleString('en-PK')}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-ui text-[9px] uppercase tracking-widest text-slate-400">Delivery</span>
                <span className="font-body text-sm text-[#0c1628]">
                  {Number(order.shippingCost) === 0 ? 'Free' : `Rs. ${Number(order.shippingCost).toLocaleString('en-PK')}`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#e5e2dc]">
                <span className="font-ui text-[10px] uppercase tracking-widest font-semibold text-[#0c1628]">Total</span>
                <span className="font-display text-lg font-semibold text-[#0c1628] tabular-nums">Rs.&nbsp;{Number(order.total).toLocaleString('en-PK')}</span>
              </div>
            </div>
          </div>

          {/* Manage */}
          <div className="bg-white rounded-2xl border border-[#e5e2dc] p-5">
            <p className="font-ui text-[10px] uppercase tracking-widest font-semibold text-[#0c1628] mb-4">Manage Order</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className={labelCls}>Order Status</label>
                <select value={statusSelect} onChange={e => setStatusSelect(e.target.value)} className={inputCls}>
                  {ORDER_STATUSES.map(s => (
                    <option key={s} value={s}>{s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>Payment Status</label>
                <select value={payStatus} onChange={e => setPayStatus(e.target.value)} className={inputCls}>
                  {PAYMENT_STATUSES.map(s => (
                    <option key={s} value={s}>{s.replace(/\b\w/g, c => c.toUpperCase())}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>Tracking Number</label>
                <input type="text" value={tracking} onChange={e => setTracking(e.target.value)} className={inputCls} placeholder="TCS-123456789" />
              </div>
              <div>
                <label className={labelCls}>Carrier</label>
                <input type="text" value={carrier} onChange={e => setCarrier(e.target.value)} className={inputCls} placeholder="TCS, Leopards, M&P…" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Internal Notes</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
                className={`${inputCls} resize-none`} placeholder="Notes visible to admin only…" />
            </div>
          </div>

          {/* Returns */}
          {order.returns.length > 0 && (
            <div className="bg-white rounded-2xl border border-orange-200 overflow-hidden">
              <div className="px-5 py-3.5 border-b border-orange-100 bg-orange-50">
                <p className="font-ui text-[10px] uppercase tracking-widest font-semibold text-orange-700">Return Request</p>
              </div>
              {order.returns.map(r => (
                <div key={r.id} className="px-5 py-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-ui text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-lg bg-orange-50 text-orange-700 ring-1 ring-orange-200">{r.status}</span>
                    <span className="font-body text-xs text-slate-400">{new Date(r.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <p className="font-body text-sm text-[#0c1628]">{r.reason}</p>
                  <Link href="/admin/returns" className="font-ui text-[9px] uppercase tracking-widest text-[#c9a84c] hover:underline mt-2 inline-block">
                    Manage Return →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right */}
        <div className="space-y-4">

          <div className="bg-white rounded-2xl border border-[#e5e2dc] p-5">
            <p className="font-ui text-[9px] uppercase tracking-widest text-slate-400 mb-3">Customer</p>
            <p className="font-body text-sm font-semibold text-[#0c1628]">{name}</p>
            <p className="font-body text-sm text-slate-400 mt-0.5">{email}</p>
            {phone && (
              <a href={`tel:${phone}`} className="block font-body text-sm text-[#c9a84c] hover:underline mt-0.5">{phone}</a>
            )}
            {!order.user && (
              <span className="inline-block mt-2 font-ui text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-lg bg-slate-100 text-slate-400">Guest</span>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-[#e5e2dc] p-5">
            <p className="font-ui text-[9px] uppercase tracking-widest text-slate-400 mb-3">Shipping Address</p>
            <p className="font-body text-sm font-semibold text-[#0c1628]">{order.shippingAddress?.name}</p>
            <p className="font-body text-sm text-slate-500 mt-0.5">{order.shippingAddress?.address}</p>
            <p className="font-body text-sm text-slate-500">{order.shippingAddress?.city}, {order.shippingAddress?.province}</p>
            {order.shippingAddress?.phone && (
              <a href={`tel:${order.shippingAddress.phone}`} className="block font-body text-sm text-[#c9a84c] hover:underline mt-0.5">
                {order.shippingAddress.phone}
              </a>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-[#e5e2dc] p-5">
            <p className="font-ui text-[9px] uppercase tracking-widest text-slate-400 mb-3">Payment</p>
            <p className="font-body text-sm font-semibold text-[#0c1628] capitalize mb-2">{order.paymentMethod.replace(/_/g, ' ')}</p>
            <div className="flex flex-wrap gap-2">
              <span className={`font-ui text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-lg ${STATUS_PILL[order.paymentStatus]}`}>
                {order.paymentStatus}
              </span>
              <span className={`font-ui text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-lg ${STATUS_PILL[order.status]}`}>
                {order.status.replace(/_/g, ' ')}
              </span>
            </div>
          </div>

          {order.trackingNumber && (
            <div className="bg-indigo-50 rounded-2xl border border-indigo-200 p-5">
              <p className="font-ui text-[9px] uppercase tracking-widest text-indigo-500 mb-2">Tracking</p>
              <p className="font-body text-sm font-semibold text-[#0c1628]">{order.trackingNumber}</p>
              {order.trackingCarrier && (
                <p className="font-body text-xs text-slate-400 mt-0.5">via {order.trackingCarrier}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
