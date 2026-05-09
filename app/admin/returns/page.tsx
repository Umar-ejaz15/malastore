'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const STATUS_PILL: Record<string, string> = {
  requested: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  approved:  'bg-sky-50 text-sky-700 ring-1 ring-sky-200',
  rejected:  'bg-red-50 text-red-600 ring-1 ring-red-200',
  received:  'bg-violet-50 text-violet-700 ring-1 ring-violet-200',
  refunded:  'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
}

const STATUS_BAR: Record<string, string> = {
  requested: 'from-amber-400 to-amber-300',
  approved:  'from-sky-400 to-sky-300',
  rejected:  'from-red-400 to-red-300',
  received:  'from-violet-400 to-violet-300',
  refunded:  'from-emerald-400 to-emerald-300',
}

const RETURN_STATUSES = ['requested', 'approved', 'rejected', 'received', 'refunded']

interface ReturnItem {
  id: string; reason: string; status: string; adminNotes: string | null; createdAt: string
  order: {
    id: string; orderNumber: string; total: string
    user?: { name: string; email: string } | null
    guestName?: string | null
    items: { productName: string; quantity: number }[]
  }
}

const inputCls = 'w-full bg-white border border-[#e5e2dc] rounded-xl px-3 py-2.5 font-body text-sm text-[#0c1628] focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/10 transition-colors'
const labelCls = 'font-ui text-[9px] uppercase tracking-widest text-slate-400 block mb-1.5'

export default function AdminReturnsPage() {
  const [returns, setReturns] = useState<ReturnItem[]>([])
  const [loading, setLoading] = useState(true)
  const [forms,   setForms]   = useState<Record<string, { status: string; adminNotes: string }>>({})
  const [saving,  setSaving]  = useState<string | null>(null)
  const [saved,   setSaved]   = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/returns').then(r => r.json()).then(d => {
      setReturns(d.returns ?? [])
      const init: Record<string, { status: string; adminNotes: string }> = {}
      for (const r of d.returns ?? []) init[r.id] = { status: r.status, adminNotes: r.adminNotes ?? '' }
      setForms(init)
    }).finally(() => setLoading(false))
  }, [])

  const update = async (id: string) => {
    setSaving(id); setSaved(null)
    const res = await fetch(`/api/admin/returns/${id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(forms[id]),
    })
    if (res.ok) {
      const d = await res.json()
      setReturns(p => p.map(r => r.id === id ? { ...r, ...d.return } : r))
      setSaved(id); setTimeout(() => setSaved(null), 2500)
    }
    setSaving(null)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-ui text-[10px] uppercase tracking-widest text-slate-400">
          {loading ? 'Loading…' : `${returns.length} return${returns.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-7 h-7 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : returns.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#e5e2dc] py-16 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#f4f3ef] flex items-center justify-center mx-auto mb-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-slate-300">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
            </svg>
          </div>
          <p className="font-body text-sm text-slate-400">No return requests yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {returns.map(ret => (
            <div key={ret.id} className="bg-white rounded-2xl border border-[#e5e2dc] overflow-hidden shadow-sm">
              <div className={`h-0.75 bg-linear-to-r ${STATUS_BAR[ret.status] ?? 'from-slate-200 to-slate-100'}`} />

              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <Link href={`/admin/orders/${ret.order.id}`}
                        className="font-ui text-xs font-semibold text-[#0c1628] hover:text-[#c9a84c] transition-colors">
                        {ret.order.orderNumber}
                      </Link>
                      <span className={`font-ui text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-lg ${STATUS_PILL[ret.status]}`}>
                        {ret.status}
                      </span>
                    </div>
                    <p className="font-body text-sm font-semibold text-[#0c1628]">
                      {ret.order.user?.name ?? ret.order.guestName ?? 'Guest'}
                    </p>
                    <p className="font-body text-xs text-slate-400 mt-0.5">
                      {ret.order.items.length} item{ret.order.items.length !== 1 ? 's' : ''}
                      <span className="mx-1.5 text-slate-200">·</span>
                      {new Date(ret.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <p className="font-display text-xl font-semibold text-[#0c1628]">
                    Rs.&nbsp;{Number(ret.order.total).toLocaleString('en-PK')}
                  </p>
                </div>

                {/* Reason */}
                <div className="bg-[#faf9f7] border border-[#ece9e3] rounded-xl p-3.5 mb-4">
                  <p className="font-ui text-[9px] uppercase tracking-widest text-slate-400 mb-1">Customer Reason</p>
                  <p className="font-body text-sm text-[#0c1628]">{ret.reason}</p>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className={labelCls}>Update Status</label>
                    <select
                      value={forms[ret.id]?.status ?? ret.status}
                      onChange={e => setForms(f => ({ ...f, [ret.id]: { ...f[ret.id], status: e.target.value } }))}
                      className={inputCls}
                    >
                      {RETURN_STATUSES.map(s => (
                        <option key={s} value={s}>{s.replace(/\b\w/g, c => c.toUpperCase())}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Admin Notes</label>
                    <input
                      type="text"
                      value={forms[ret.id]?.adminNotes ?? ''}
                      onChange={e => setForms(f => ({ ...f, [ret.id]: { ...f[ret.id], adminNotes: e.target.value } }))}
                      className={inputCls}
                      placeholder="Response to customer…"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={() => update(ret.id)} disabled={saving === ret.id}
                    className="bg-[#0c1628] hover:bg-[#162035] text-white font-ui text-[10px] uppercase tracking-widest px-4 py-2.5 rounded-xl transition-colors disabled:opacity-50">
                    {saving === ret.id ? 'Saving…' : 'Update Return'}
                  </button>
                  {saved === ret.id && (
                    <span className="flex items-center gap-1.5 font-ui text-[9px] uppercase tracking-widest text-emerald-600">
                      <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7L5.5 10.5L12 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                      Saved
                    </span>
                  )}
                  <Link href={`/admin/orders/${ret.order.id}`}
                    className="font-ui text-[9px] uppercase tracking-widest text-slate-400 hover:text-[#0c1628] transition-colors border border-[#e5e2dc] hover:border-slate-300 px-4 py-2.5 rounded-xl">
                    View Order
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
