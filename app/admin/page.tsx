'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const STATUS_PILL: Record<string, string> = {
  pending:          'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  confirmed:        'bg-sky-50 text-sky-700 ring-1 ring-sky-200',
  processing:       'bg-violet-50 text-violet-700 ring-1 ring-violet-200',
  shipped:          'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200',
  delivered:        'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  cancelled:        'bg-red-50 text-red-600 ring-1 ring-red-200',
  return_requested: 'bg-orange-50 text-orange-700 ring-1 ring-orange-200',
  returned:         'bg-slate-100 text-slate-500 ring-1 ring-slate-200',
}

const STATUS_LABEL: Record<string, string> = {
  pending: 'Pending', confirmed: 'Confirmed', processing: 'Processing',
  shipped: 'Shipped', delivered: 'Delivered', cancelled: 'Cancelled',
  return_requested: 'Return Req.', returned: 'Returned',
}

interface ShippingAddress { name: string; phone: string; city: string; province: string }

interface PendingOrder {
  id: string; orderNumber: string; total: string; paymentMethod: string; createdAt: string
  shippingAddress: ShippingAddress
  guestName: string | null; guestPhone: string | null
  user: { name: string; phone: string | null } | null
  items: { productName: string; quantity: number; size: string | null }[]
}

interface RecentOrder {
  id: string; orderNumber: string; status: string; total: string; createdAt: string
  user: { name: string } | null; guestName: string | null
  items: { productName: string }[]
}

interface Stats {
  totalOrders: number; totalRevenue: number
  pendingOrders: number; totalCustomers: number; openReturns: number
}

// ── Verify card ───────────────────────────────────────────────────────────────

function VerifyCard({ order, onDone }: { order: PendingOrder; onDone: (id: string) => void }) {
  const [busy, setBusy] = useState(false)

  const name  = order.user?.name ?? order.guestName ?? 'Guest'
  const phone = order.shippingAddress?.phone ?? order.user?.phone ?? order.guestPhone
  const wa    = phone ? `https://wa.me/92${phone.replace(/\D/g, '').replace(/^0/, '')}` : null

  const confirm = async () => {
    setBusy(true)
    await fetch(`/api/admin/orders/${order.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'confirmed' }),
    })
    onDone(order.id)
  }

  return (
    <div className="bg-white rounded-2xl border border-amber-200 overflow-hidden shadow-sm">
      <div className="h-0.75 bg-linear-to-r from-amber-400 to-amber-300" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex items-center gap-1.5 font-ui text-[9px] uppercase tracking-widest text-amber-600 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Verification Required
              </span>
            </div>
            <p className="font-display text-lg font-semibold text-[#0c1628]">{name}</p>
            <p className="font-body text-xs text-slate-400 mt-0.5">
              {order.orderNumber}
              <span className="mx-1.5 text-slate-200">·</span>
              {order.shippingAddress?.city}, {order.shippingAddress?.province}
              <span className="mx-1.5 text-slate-200">·</span>
              {new Date(order.createdAt).toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-display text-xl font-semibold text-[#0c1628]">
              Rs.&nbsp;{Number(order.total).toLocaleString('en-PK')}
            </p>
            <p className="font-ui text-[9px] uppercase tracking-wider text-slate-400 mt-0.5">
              {order.paymentMethod.replace(/_/g, ' ')}
            </p>
          </div>
        </div>

        {/* Items */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {order.items.map((item, i) => (
            <span key={i} className="font-body text-[11px] text-slate-500 bg-[#f4f3ef] px-2.5 py-1 rounded-lg">
              {item.productName}{item.size ? ` · ${item.size}` : ''} ×{item.quantity}
            </span>
          ))}
        </div>

        {phone ? (
          <div className="flex items-center gap-3 p-3.5 bg-amber-50 rounded-xl border border-amber-100 mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-amber-500 shrink-0">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12a19.79 19.79 0 0 1-3-8.6A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <a href={`tel:${phone}`} className="font-body text-sm font-semibold text-[#0c1628] hover:text-amber-600 transition-colors flex-1">{phone}</a>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-ui text-[9px] uppercase tracking-widest text-emerald-600 hover:text-emerald-700 transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.46 0 .12 5.34.1 11.93c0 2.1.55 4.16 1.6 5.97L0 24l6.27-1.65a11.94 11.94 0 0 0 5.77 1.47h.01c6.58 0 11.93-5.34 11.94-11.93 0-3.18-1.24-6.18-3.48-8.41Z"/>
                </svg>
                WhatsApp
              </a>
            )}
          </div>
        ) : (
          <div className="p-3 bg-red-50 rounded-xl border border-red-100 mb-4">
            <p className="font-body text-xs text-red-500">No phone number — check order details</p>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button onClick={confirm} disabled={busy}
            className="flex items-center gap-2 bg-[#0c1628] hover:bg-[#162035] text-white font-ui text-[10px] uppercase tracking-widest px-4 py-2.5 rounded-xl transition-colors disabled:opacity-50">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
              <path d="M2 7L5.5 10.5L12 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            {busy ? 'Saving…' : 'Mark Verified'}
          </button>
          <Link href={`/admin/orders/${order.id}`}
            className="font-ui text-[10px] uppercase tracking-widest text-slate-400 hover:text-[#0c1628] transition-colors border border-[#e5e2dc] hover:border-slate-300 px-4 py-2.5 rounded-xl">
            Full Details
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [stats,   setStats]   = useState<Stats | null>(null)
  const [pending, setPending] = useState<PendingOrder[]>([])
  const [recent,  setRecent]  = useState<RecentOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then(r => r.json())
      .then(d => {
        setStats(d.stats)
        setPending(d.pendingVerification ?? [])
        setRecent(d.recentOrders ?? [])
      })
      .finally(() => setLoading(false))
  }, [])

  const onVerified = (id: string) => {
    setPending(p => p.filter(o => o.id !== id))
    setStats(s => s ? { ...s, pendingOrders: Math.max(0, s.pendingOrders - 1) } : s)
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-7 h-7 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const s = stats ?? { totalOrders: 0, totalRevenue: 0, pendingOrders: 0, totalCustomers: 0, openReturns: 0 }

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

        {/* Revenue — spans 2 cols on lg */}
        <div className="col-span-2 bg-[#0a1220] rounded-2xl p-5 flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-[#c9a84c]/15 flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <div className="min-w-0">
            <p className="font-ui text-[9px] uppercase tracking-[0.2em] text-white/35 mb-1">Total Revenue</p>
            <p className="font-display text-3xl font-semibold text-white leading-none">
              Rs.&nbsp;{s.totalRevenue.toLocaleString('en-PK')}
            </p>
            <p className="font-ui text-[9px] text-white/25 mt-1.5">Delivered orders only</p>
          </div>
        </div>

        {/* Needs call */}
        <div className={`rounded-2xl p-5 flex items-center gap-4 ${s.pendingOrders > 0 ? 'bg-amber-50 border border-amber-200' : 'bg-white border border-[#e5e2dc]'}`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.pendingOrders > 0 ? 'bg-amber-100' : 'bg-[#f4f3ef]'}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={s.pendingOrders > 0 ? 'text-amber-600' : 'text-slate-400'}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12a19.79 19.79 0 0 1-3-8.6A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
          <div>
            <p className={`font-ui text-[9px] uppercase tracking-[0.2em] mb-1 ${s.pendingOrders > 0 ? 'text-amber-600' : 'text-slate-400'}`}>Needs Call</p>
            <p className={`font-display text-2xl font-semibold leading-none ${s.pendingOrders > 0 ? 'text-amber-700' : 'text-[#0c1628]'}`}>{s.pendingOrders}</p>
          </div>
        </div>

        {/* Total orders */}
        <div className="bg-white rounded-2xl border border-[#e5e2dc] p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#f4f3ef] flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-slate-400">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
              <rect x="9" y="3" width="6" height="4" rx="1"/>
              <path d="M9 12h6M9 16h4"/>
            </svg>
          </div>
          <div>
            <p className="font-ui text-[9px] uppercase tracking-[0.2em] text-slate-400 mb-1">Total Orders</p>
            <p className="font-display text-2xl font-semibold text-[#0c1628] leading-none">{s.totalOrders}</p>
          </div>
        </div>
      </div>

      {/* ── Second stats row ── */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl border border-[#e5e2dc] p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#f4f3ef] flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-slate-400">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          </div>
          <div>
            <p className="font-ui text-[9px] uppercase tracking-[0.2em] text-slate-400 mb-1">Customers</p>
            <p className="font-display text-2xl font-semibold text-[#0c1628] leading-none">{s.totalCustomers}</p>
          </div>
        </div>
        <div className={`rounded-2xl border p-5 flex items-center gap-4 ${s.openReturns > 0 ? 'bg-orange-50 border-orange-200' : 'bg-white border-[#e5e2dc]'}`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.openReturns > 0 ? 'bg-orange-100' : 'bg-[#f4f3ef]'}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={s.openReturns > 0 ? 'text-orange-600' : 'text-slate-400'}>
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
            </svg>
          </div>
          <div>
            <p className={`font-ui text-[9px] uppercase tracking-[0.2em] mb-1 ${s.openReturns > 0 ? 'text-orange-600' : 'text-slate-400'}`}>Open Returns</p>
            <p className={`font-display text-2xl font-semibold leading-none ${s.openReturns > 0 ? 'text-orange-700' : 'text-[#0c1628]'}`}>{s.openReturns}</p>
          </div>
        </div>
      </div>

      {/* ── Verification queue ── */}
      {pending.length > 0 && (
        <section>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <h2 className="font-ui text-[10px] uppercase tracking-widest font-semibold text-[#0c1628]">
              Verification Queue · {pending.length} order{pending.length !== 1 ? 's' : ''}
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {pending.map(o => <VerifyCard key={o.id} order={o} onDone={onVerified} />)}
          </div>
        </section>
      )}

      {/* ── Quick actions ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { href: '/admin/orders?status=confirmed',  label: 'Confirmed',  cls: 'text-sky-700 bg-sky-50 border-sky-200 hover:bg-sky-100',         dot: 'bg-sky-400' },
          { href: '/admin/orders?status=shipped',    label: 'In Transit', cls: 'text-indigo-700 bg-indigo-50 border-indigo-200 hover:bg-indigo-100', dot: 'bg-indigo-400' },
          { href: '/admin/returns',                  label: 'Returns',    cls: 'text-orange-700 bg-orange-50 border-orange-200 hover:bg-orange-100', dot: 'bg-orange-400' },
          { href: '/admin/customers',                label: 'Customers',  cls: 'text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100', dot: 'bg-emerald-400' },
        ].map(q => (
          <Link key={q.href} href={q.href}
            className={`group border rounded-2xl px-4 py-3.5 flex items-center justify-between transition-colors ${q.cls}`}>
            <span className="font-ui text-[10px] uppercase tracking-widest font-semibold">{q.label}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-50 group-hover:opacity-100 transition-opacity">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        ))}
      </div>

      {/* ── Recent orders ── */}
      <section className="bg-white rounded-2xl border border-[#e5e2dc] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#ece9e3]">
          <h2 className="font-ui text-[10px] uppercase tracking-widest font-semibold text-[#0c1628]">Recent Orders</h2>
          <Link href="/admin/orders" className="font-ui text-[10px] uppercase tracking-widest text-[#c9a84c] hover:text-[#0c1628] transition-colors">
            View all →
          </Link>
        </div>
        {recent.length === 0 ? (
          <div className="px-5 py-14 text-center">
            <p className="font-body text-sm text-slate-400">All caught up — no recent orders.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#f0ede6]">
            {recent.map(o => (
              <Link key={o.id} href={`/admin/orders/${o.id}`}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#faf9f7] transition-colors group">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span className="font-ui text-xs font-semibold text-[#0c1628]">{o.orderNumber}</span>
                    <span className={`font-ui text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-lg ${STATUS_PILL[o.status]}`}>
                      {STATUS_LABEL[o.status] ?? o.status}
                    </span>
                  </div>
                  <p className="font-body text-xs text-slate-400 mt-0.5 truncate">
                    {o.user?.name ?? o.guestName ?? 'Guest'} · {o.items.length} item{o.items.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-body text-sm font-semibold text-[#0c1628]">Rs. {Number(o.total).toLocaleString('en-PK')}</p>
                  <p className="font-body text-[11px] text-slate-400">
                    {new Date(o.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                  className="text-slate-300 group-hover:text-[#c9a84c] transition-colors shrink-0">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
