'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const ALL_STATUSES = ['', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'return_requested', 'returned']

const STATUS_LABEL: Record<string, string> = {
  '': 'All', pending: 'Pending', confirmed: 'Confirmed', processing: 'Processing',
  shipped: 'Shipped', delivered: 'Delivered', cancelled: 'Cancelled',
  return_requested: 'Return Req.', returned: 'Returned',
}

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

interface Order {
  id: string; orderNumber: string; status: string; paymentMethod: string
  total: string; createdAt: string; trackingNumber?: string | null
  user?: { name: string; email: string } | null
  guestName?: string | null; guestEmail?: string | null
  items: { productName: string; quantity: number }[]
}

function OrdersContent() {
  const searchParams = useSearchParams()
  const [orders,  setOrders]  = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filter,  setFilter]  = useState(searchParams.get('status') ?? '')
  const [search,  setSearch]  = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const p = new URLSearchParams()
    if (filter) p.set('status', filter)
    if (search) p.set('search', search)
    const res  = await fetch(`/api/admin/orders?${p}`)
    const data = await res.json()
    setOrders(data.orders ?? [])
    setLoading(false)
  }, [filter, search])

  useEffect(() => { load() }, [load])

  return (
    <div className="max-w-6xl mx-auto space-y-4">

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <circle cx="8.5" cy="8.5" r="5.5"/><line x1="13.5" y1="13.5" x2="18" y2="18"/>
          </svg>
          <input
            type="text" value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by order number, name or email…"
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#e5e2dc] rounded-xl font-body text-sm text-[#0c1628] placeholder:text-slate-300 focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/10 transition-colors"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-0.5 shrink-0">
          {ALL_STATUSES.slice(0, 7).map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`shrink-0 font-ui text-[9px] uppercase tracking-widest px-3 py-2 rounded-xl border transition-colors ${
                filter === s
                  ? 'bg-[#0c1628] text-white border-[#0c1628]'
                  : 'bg-white border-[#e5e2dc] text-slate-500 hover:border-slate-300 hover:text-[#0c1628]'
              }`}>
              {STATUS_LABEL[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="font-ui text-[10px] uppercase tracking-widest text-slate-400">
        {loading ? 'Loading…' : `${orders.length} order${orders.length !== 1 ? 's' : ''}`}
      </p>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#e5e2dc] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-7 h-7 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#f4f3ef] flex items-center justify-center mx-auto mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-slate-300">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
                <rect x="9" y="3" width="6" height="4" rx="1"/>
              </svg>
            </div>
            <p className="font-body text-sm text-slate-400">No orders match this filter.</p>
          </div>
        ) : (
          <>
            {/* Desktop */}
            <table className="hidden md:table w-full">
              <thead>
                <tr className="border-b border-[#f0ede6] bg-[#faf9f7]">
                  {['Order', 'Customer', 'Items', 'Status', 'Total', 'Date', ''].map(h => (
                    <th key={h} className="px-5 py-3 text-left font-ui text-[9px] uppercase tracking-widest text-slate-400 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5f3ef]">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-[#faf9f7] transition-colors group">
                    <td className="px-5 py-3.5">
                      <p className="font-ui text-xs font-semibold text-[#0c1628]">{o.orderNumber}</p>
                      {o.trackingNumber && (
                        <p className="font-ui text-[9px] text-[#c9a84c] mt-0.5">{o.trackingNumber}</p>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="font-body text-sm text-[#0c1628]">{o.user?.name ?? o.guestName ?? 'Guest'}</p>
                      <p className="font-body text-xs text-slate-400 truncate max-w-40">{o.user?.email ?? o.guestEmail ?? ''}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="font-body text-sm text-slate-500">{o.items.length} item{o.items.length !== 1 ? 's' : ''}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`font-ui text-[9px] font-semibold uppercase tracking-wider px-2 py-1 rounded-lg ${STATUS_PILL[o.status] ?? ''}`}>
                        {STATUS_LABEL[o.status] ?? o.status}
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
                    <td className="px-5 py-3.5">
                      <Link href={`/admin/orders/${o.id}`}
                        className="inline-flex items-center gap-1 font-ui text-[9px] uppercase tracking-widest text-[#c9a84c] hover:text-[#0c1628] transition-colors opacity-0 group-hover:opacity-100">
                        Manage
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile */}
            <div className="md:hidden divide-y divide-[#f5f3ef]">
              {orders.map(o => (
                <Link key={o.id} href={`/admin/orders/${o.id}`}
                  className="flex items-center gap-4 px-4 py-3.5 hover:bg-[#faf9f7] transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-ui text-xs font-semibold text-[#0c1628]">{o.orderNumber}</span>
                      <span className={`font-ui text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-lg ${STATUS_PILL[o.status]}`}>
                        {STATUS_LABEL[o.status]}
                      </span>
                    </div>
                    <p className="font-body text-xs text-slate-400 truncate">
                      {o.user?.name ?? o.guestName ?? 'Guest'} · {o.items.length} items
                    </p>
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
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function AdminOrdersPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-64">
        <div className="w-7 h-7 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <OrdersContent />
    </Suspense>
  )
}
