'use client'

import { useState, useEffect } from 'react'

interface Customer {
  id: string; name: string; email: string; phone: string | null
  createdAt: string; orderCount: number
}

const AVATAR_COLORS = [
  'bg-violet-100 text-violet-700',
  'bg-sky-100 text-sky-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-indigo-100 text-indigo-700',
]

function avatarColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

export default function AdminCustomersPage() {
  const [all,     setAll]     = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [search,  setSearch]  = useState('')

  useEffect(() => {
    fetch('/api/admin/customers')
      .then(r => r.json())
      .then(d => setAll(d.customers ?? []))
      .finally(() => setLoading(false))
  }, [])

  const customers = search
    ? all.filter(c => {
        const q = search.toLowerCase()
        return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone?.includes(q)
      })
    : all

  return (
    <div className="max-w-5xl mx-auto space-y-4">

      {/* Search */}
      <div className="relative">
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <circle cx="8.5" cy="8.5" r="5.5"/><line x1="13.5" y1="13.5" x2="18" y2="18"/>
        </svg>
        <input
          type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email or phone…"
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#e5e2dc] rounded-xl font-body text-sm text-[#0c1628] placeholder:text-slate-300 focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/10 transition-colors"
        />
      </div>

      <p className="font-ui text-[10px] uppercase tracking-widest text-slate-400">
        {loading ? 'Loading…' : `${customers.length} customer${customers.length !== 1 ? 's' : ''}`}
      </p>

      <div className="bg-white rounded-2xl border border-[#e5e2dc] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-7 h-7 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : customers.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#f4f3ef] flex items-center justify-center mx-auto mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-slate-300">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            </div>
            <p className="font-body text-sm text-slate-400">{search ? 'No customers match your search.' : 'No customers yet.'}</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <table className="hidden md:table w-full">
              <thead>
                <tr className="border-b border-[#f0ede6] bg-[#faf9f7]">
                  {['Customer', 'Email', 'Phone', 'Orders', 'Joined'].map(h => (
                    <th key={h} className="px-5 py-3 text-left font-ui text-[9px] uppercase tracking-widest text-slate-400 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5f3ef]">
                {customers.map(c => (
                  <tr key={c.id} className="hover:bg-[#faf9f7] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${avatarColor(c.name)}`}>
                          <span className="font-ui text-xs font-bold leading-none">{c.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <p className="font-body text-sm font-semibold text-[#0c1628]">{c.name}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="font-body text-sm text-slate-500">{c.email}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="font-body text-sm text-slate-500">{c.phone ?? '—'}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`font-ui text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                        c.orderCount > 0 ? 'bg-[#0c1628]/8 text-[#0c1628]' : 'bg-[#f4f3ef] text-slate-400'
                      }`}>
                        {c.orderCount}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="font-body text-xs text-slate-400">
                        {new Date(c.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile list */}
            <div className="md:hidden divide-y divide-[#f5f3ef]">
              {customers.map(c => (
                <div key={c.id} className="flex items-center gap-3 px-4 py-3.5">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${avatarColor(c.name)}`}>
                    <span className="font-ui text-sm font-bold leading-none">{c.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-semibold text-[#0c1628]">{c.name}</p>
                    <p className="font-body text-xs text-slate-400 truncate">{c.email}</p>
                  </div>
                  <span className={`font-ui text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-lg shrink-0 ${
                    c.orderCount > 0 ? 'bg-[#0c1628]/8 text-[#0c1628]' : 'bg-[#f4f3ef] text-slate-400'
                  }`}>
                    {c.orderCount}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
