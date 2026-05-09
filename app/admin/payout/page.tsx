'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Order {
  id: string
  orderNumber: string
  status: string
  paymentMethod: string
  paymentStatus: string
  total: string
  createdAt: string
  user?: { name: string; email: string } | null
  guestName?: string | null
  items: { productName: string; quantity: number }[]
}

const METHOD_LABEL: Record<string, string> = {
  cod:       'Cash on Delivery',
  jazzcash:  'JazzCash',
  easypaisa: 'EasyPaisa',
}

const METHOD_STYLE: Record<string, { dot: string; bg: string; text: string; bar: string; icon: React.ReactNode }> = {
  cod: {
    dot:  'bg-amber-400',
    bg:   'bg-amber-50',
    text: 'text-amber-700',
    bar:  'bg-amber-400',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
        <line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
  },
  jazzcash: {
    dot:  'bg-red-400',
    bg:   'bg-red-50',
    text: 'text-red-700',
    bar:  'bg-red-400',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <path d="M2 10h20"/>
        <path d="M6 15h2M12 15h4"/>
      </svg>
    ),
  },
  easypaisa: {
    dot:  'bg-emerald-400',
    bg:   'bg-emerald-50',
    text: 'text-emerald-700',
    bar:  'bg-emerald-400',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <path d="M2 10h20"/>
        <path d="M6 15h4M16 15h2"/>
      </svg>
    ),
  },
}

const PAYMENT_STATUS_STYLE: Record<string, string> = {
  paid:    'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  pending: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  failed:  'bg-red-50 text-red-600 ring-1 ring-red-200',
  refunded:'bg-violet-50 text-violet-700 ring-1 ring-violet-200',
}

function Skeleton() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-pulse">
      <div className="h-16 bg-white rounded-2xl border border-[#e5e2dc]" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => <div key={i} className="h-28 bg-white rounded-2xl border border-[#e5e2dc]" />)}
      </div>
      <div className="h-52 bg-white rounded-2xl border border-[#e5e2dc]" />
      <div className="h-80 bg-white rounded-2xl border border-[#e5e2dc]" />
    </div>
  )
}

export default function AdminPayoutPage() {
  const [allOrders, setAllOrders] = useState<Order[]>([])
  const [loading,   setLoading]   = useState(true)

  useEffect(() => {
    fetch('/api/admin/orders')
      .then(r => r.json())
      .then(d => setAllOrders(d.orders ?? []))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Skeleton />

  // ── Compute financials ──────────────────────────────────────────────────────

  const delivered  = allOrders.filter(o => o.status === 'delivered')
  const inTransit  = allOrders.filter(o => ['confirmed', 'processing', 'shipped'].includes(o.status))

  const totalRevenue   = delivered.reduce((s, o) => s + Number(o.total), 0)
  const totalCollected = delivered.filter(o => o.paymentStatus === 'paid').reduce((s, o) => s + Number(o.total), 0)
  const pendingCOD     = inTransit.filter(o => o.paymentMethod === 'cod').reduce((s, o) => s + Number(o.total), 0)
  const totalRefunded  = allOrders.filter(o => o.paymentStatus === 'refunded').reduce((s, o) => s + Number(o.total), 0)

  // Payment method breakdown (delivered orders only)
  const byMethod: Record<string, { amount: number; count: number }> = {}
  for (const o of delivered) {
    const m = o.paymentMethod
    if (!byMethod[m]) byMethod[m] = { amount: 0, count: 0 }
    byMethod[m].amount += Number(o.total)
    byMethod[m].count  += 1
  }
  const sortedMethods = Object.entries(byMethod).sort((a, b) => b[1].amount - a[1].amount)

  // Collection rate
  const collectionRate = totalRevenue > 0 ? Math.round((totalCollected / totalRevenue) * 100) : 0

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* ── Page header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-ui text-[9px] uppercase tracking-[0.22em] text-slate-400 mb-1">Financial Overview</p>
          <h1 className="font-display text-2xl font-semibold text-[#0c1628]">Payout Summary</h1>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="inline-flex items-center gap-1.5 font-ui text-[9px] uppercase tracking-widest text-slate-400 bg-white border border-[#e5e2dc] px-3 py-2 rounded-xl">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            All Time
          </span>
        </div>
      </div>

      {/* ── Summary cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Total Revenue */}
        <div className="col-span-2 lg:col-span-1 bg-[#0a1220] rounded-2xl p-5">
          <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center mb-4">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <p className="font-ui text-[8px] uppercase tracking-[0.22em] text-white/35 mb-1.5">Total Revenue</p>
          <p className="font-display text-2xl font-semibold text-white leading-none">
            Rs.&nbsp;{totalRevenue.toLocaleString('en-PK')}
          </p>
          <p className="font-ui text-[9px] text-white/25 mt-2">{delivered.length} delivered order{delivered.length !== 1 ? 's' : ''}</p>
        </div>

        {/* Collected */}
        <div className="bg-white rounded-2xl border border-[#e5e2dc] p-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.5" strokeLinecap="round">
              <path d="M9 12l2 2 4-4"/>
              <circle cx="12" cy="12" r="10"/>
            </svg>
          </div>
          <p className="font-ui text-[8px] uppercase tracking-[0.22em] text-slate-400 mb-1.5">Collected</p>
          <p className="font-display text-2xl font-semibold text-[#0c1628] leading-none">
            Rs.&nbsp;{totalCollected.toLocaleString('en-PK')}
          </p>
          <p className="font-ui text-[9px] text-emerald-600 mt-2">{collectionRate}% collection rate</p>
        </div>

        {/* Pending COD */}
        <div className="bg-white rounded-2xl border border-[#e5e2dc] p-5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>
          <p className="font-ui text-[8px] uppercase tracking-[0.22em] text-slate-400 mb-1.5">Pending COD</p>
          <p className="font-display text-2xl font-semibold text-[#0c1628] leading-none">
            Rs.&nbsp;{pendingCOD.toLocaleString('en-PK')}
          </p>
          <p className="font-ui text-[9px] text-amber-600 mt-2">{inTransit.filter(o => o.paymentMethod === 'cod').length} orders in transit</p>
        </div>

        {/* Refunded */}
        <div className="bg-white rounded-2xl border border-[#e5e2dc] p-5">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-4">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
            </svg>
          </div>
          <p className="font-ui text-[8px] uppercase tracking-[0.22em] text-slate-400 mb-1.5">Refunded</p>
          <p className="font-display text-2xl font-semibold text-[#0c1628] leading-none">
            Rs.&nbsp;{totalRefunded.toLocaleString('en-PK')}
          </p>
          <p className="font-ui text-[9px] text-red-500 mt-2">Total issued refunds</p>
        </div>
      </div>

      {/* ── Payment method breakdown ── */}
      <div className="bg-white rounded-2xl border border-[#e5e2dc] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-ui text-[10px] uppercase tracking-widest font-semibold text-[#0c1628]">
            Payment Method Breakdown
          </h2>
          <span className="font-ui text-[9px] uppercase tracking-widest text-slate-400">Delivered Orders</span>
        </div>

        {sortedMethods.length === 0 ? (
          <div className="py-10 text-center">
            <p className="font-body text-sm text-slate-400">No delivered orders yet.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {sortedMethods.map(([method, data]) => {
              const pct    = totalRevenue > 0 ? Math.round((data.amount / totalRevenue) * 100) : 0
              const style  = METHOD_STYLE[method] ?? METHOD_STYLE.cod
              const label  = METHOD_LABEL[method] ?? method.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
              return (
                <div key={method}>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${style.dot}`} />
                      <span className="font-ui text-xs font-semibold text-[#0c1628]">{label}</span>
                      <span className="font-body text-xs text-slate-400">{data.count} order{data.count !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`font-ui text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-lg ${style.bg} ${style.text}`}>
                        {pct}%
                      </span>
                      <span className="font-body text-sm font-semibold text-[#0c1628] tabular-nums w-36 text-right">
                        Rs.&nbsp;{data.amount.toLocaleString('en-PK')}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-[#f4f3ef] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${style.bar} rounded-full transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Delivered orders table ── */}
      <div className="bg-white rounded-2xl border border-[#e5e2dc] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ece9e3]">
          <div className="flex items-center gap-2.5">
            <h2 className="font-ui text-[10px] uppercase tracking-widest font-semibold text-[#0c1628]">
              Delivered Orders
            </h2>
            <span className="font-ui text-[9px] font-semibold px-2 py-0.5 rounded-lg bg-[#f4f3ef] text-slate-500">
              {delivered.length}
            </span>
          </div>
          <Link
            href="/admin/orders?status=delivered"
            className="font-ui text-[10px] uppercase tracking-widest text-[#c9a84c] hover:text-[#0c1628] transition-colors"
          >
            View All →
          </Link>
        </div>

        {delivered.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#f4f3ef] flex items-center justify-center mx-auto mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-slate-300">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <p className="font-body text-sm text-slate-400">No delivered orders yet.</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <table className="hidden md:table w-full">
              <thead>
                <tr className="border-b border-[#f0ede6] bg-[#faf9f7]">
                  {['Order', 'Customer', 'Method', 'Payment', 'Amount', 'Date'].map(h => (
                    <th key={h} className="px-5 py-3 text-left font-ui text-[9px] uppercase tracking-widest text-slate-400 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5f3ef]">
                {delivered.slice(0, 25).map(o => {
                  const mStyle = METHOD_STYLE[o.paymentMethod] ?? METHOD_STYLE.cod
                  return (
                    <tr key={o.id} className="hover:bg-[#faf9f7] transition-colors group">
                      <td className="px-5 py-3.5">
                        <Link href={`/admin/orders/${o.id}`}
                          className="font-ui text-xs font-semibold text-[#0c1628] hover:text-[#c9a84c] transition-colors">
                          {o.orderNumber}
                        </Link>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="font-body text-sm text-[#0c1628]">{o.user?.name ?? o.guestName ?? 'Guest'}</p>
                        <p className="font-body text-xs text-slate-400 truncate max-w-40">{o.user?.email ?? ''}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 font-ui text-[9px] font-semibold uppercase tracking-wider px-2 py-1 rounded-lg ${mStyle.bg} ${mStyle.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${mStyle.dot}`} />
                          {METHOD_LABEL[o.paymentMethod] ?? o.paymentMethod}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`font-ui text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-lg ${PAYMENT_STATUS_STYLE[o.paymentStatus] ?? ''}`}>
                          {o.paymentStatus}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="font-body text-sm font-semibold text-[#0c1628] tabular-nums">
                          Rs.&nbsp;{Number(o.total).toLocaleString('en-PK')}
                        </p>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="font-body text-xs text-slate-400 whitespace-nowrap">
                          {new Date(o.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              {delivered.length > 25 && (
                <tfoot>
                  <tr className="border-t border-[#f0ede6] bg-[#faf9f7]">
                    <td colSpan={6} className="px-5 py-3 text-center">
                      <Link href="/admin/orders?status=delivered"
                        className="font-ui text-[10px] uppercase tracking-widest text-[#c9a84c] hover:text-[#0c1628] transition-colors">
                        View all {delivered.length} delivered orders →
                      </Link>
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>

            {/* Mobile list */}
            <div className="md:hidden divide-y divide-[#f5f3ef]">
              {delivered.slice(0, 25).map(o => {
                const mStyle = METHOD_STYLE[o.paymentMethod] ?? METHOD_STYLE.cod
                return (
                  <Link key={o.id} href={`/admin/orders/${o.id}`}
                    className="flex items-center gap-4 px-4 py-3.5 hover:bg-[#faf9f7] transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-ui text-xs font-semibold text-[#0c1628]">{o.orderNumber}</span>
                        <span className={`font-ui text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-lg ${mStyle.bg} ${mStyle.text}`}>
                          {METHOD_LABEL[o.paymentMethod] ?? o.paymentMethod}
                        </span>
                      </div>
                      <p className="font-body text-xs text-slate-400 truncate">{o.user?.name ?? o.guestName ?? 'Guest'}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-body text-sm font-semibold text-[#0c1628] tabular-nums">
                        Rs.&nbsp;{Number(o.total).toLocaleString('en-PK')}
                      </p>
                      <p className="font-body text-[11px] text-slate-400">
                        {new Date(o.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short' })}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
