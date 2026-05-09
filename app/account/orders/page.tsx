'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

const STATUS_LABEL: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
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

interface Order {
  id: string
  orderNumber: string
  status: string
  paymentMethod: string
  total: string
  createdAt: string
  items: { productName: string; quantity: number; size?: string }[]
  trackingNumber?: string
}

export default function MyOrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    fetch('/api/orders')
      .then((r) => r.json())
      .then((d) => setOrders(d.orders ?? []))
      .finally(() => setLoading(false))
  }, [user])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/account" className="font-ui text-[10px] uppercase tracking-widest text-grey hover:text-navy transition-colors">← Account</Link>
        <span className="text-grey-light">/</span>
        <span className="font-ui text-[10px] uppercase tracking-widest text-navy">Orders</span>
      </div>

      <h1 className="font-display text-3xl font-semibold text-navy mb-8">My Orders</h1>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-grey-light">
          <p className="font-ui text-[10px] uppercase tracking-widest text-gold mb-3">Nothing Here Yet</p>
          <h2 className="font-display text-2xl font-semibold text-navy mb-4">No orders placed</h2>
          <p className="font-body text-grey text-sm mb-8">Once you place an order, it will appear here.</p>
          <Link href="/shop" className="inline-flex items-center font-ui text-xs uppercase tracking-widest bg-navy text-white px-8 py-3.5 rounded-lg hover:bg-charcoal transition-colors">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <Link key={order.id} href={`/account/orders/${order.id}`}
              className="block bg-white border border-grey-light rounded-2xl p-6 hover:border-navy transition-colors group">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <p className="font-ui text-xs font-semibold uppercase tracking-widest text-navy">{order.orderNumber}</p>
                    <span className={`font-ui text-[9px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${STATUS_COLOR[order.status] ?? 'bg-grey-light text-grey border-grey-light'}`}>
                      {STATUS_LABEL[order.status] ?? order.status}
                    </span>
                  </div>
                  <p className="font-body text-grey text-xs">
                    {new Date(order.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })}
                    {' · '}
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                  </p>
                  {order.trackingNumber && (
                    <p className="font-ui text-[10px] uppercase tracking-wider text-gold mt-1">
                      Tracking: {order.trackingNumber}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-display text-lg font-semibold text-navy">Rs. {Number(order.total).toLocaleString('en-PK')}</p>
                  <p className="font-ui text-[10px] uppercase tracking-wider text-grey mt-0.5 group-hover:text-navy transition-colors">View Details →</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-grey-light/60 flex gap-2 flex-wrap">
                {order.items.slice(0, 3).map((item, i) => (
                  <span key={i} className="font-body text-xs text-grey bg-beige/60 px-3 py-1 rounded-full">
                    {item.productName}{item.size ? ` · ${item.size}` : ''} ×{item.quantity}
                  </span>
                ))}
                {order.items.length > 3 && (
                  <span className="font-body text-xs text-grey bg-beige/60 px-3 py-1 rounded-full">+{order.items.length - 3} more</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
