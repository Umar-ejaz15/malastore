'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

const NAV_SECTIONS = [
  {
    label: 'Main',
    items: [
      {
        href: '/admin',
        label: 'Dashboard',
        exact: true,
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1.5"/>
            <rect x="14" y="3" width="7" height="7" rx="1.5"/>
            <rect x="14" y="14" width="7" height="7" rx="1.5"/>
            <rect x="3" y="14" width="7" height="7" rx="1.5"/>
          </svg>
        ),
      },
      {
        href: '/admin/orders',
        label: 'Orders',
        exact: false,
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
            <rect x="9" y="3" width="6" height="4" rx="1"/>
            <path d="M9 12h6M9 16h4"/>
          </svg>
        ),
      },
      {
        href: '/admin/returns',
        label: 'Returns',
        exact: false,
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
          </svg>
        ),
      },
    ],
  },
  {
    label: 'Finance',
    items: [
      {
        href: '/admin/payout',
        label: 'Payouts',
        exact: false,
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2"/>
            <path d="M2 10h20"/>
            <path d="M6 15h2M10 15h4"/>
          </svg>
        ),
      },
    ],
  },
  {
    label: 'People',
    items: [
      {
        href: '/admin/customers',
        label: 'Customers',
        exact: false,
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="7" r="4"/>
            <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            <path d="M21 21v-2a4 4 0 0 0-3-3.85"/>
          </svg>
        ),
      },
    ],
  },
]

function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()
  const router   = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    router.push('/admin/login')
  }

  return (
    <div className="flex flex-col h-full bg-[#0a1220]">

      {/* Brand */}
      <div className="px-5 pt-6 pb-5 border-b border-white/[0.06]">
        <Link href="/" className="block group" onClick={onClose}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#c9a84c]/15 flex items-center justify-center shrink-0">
              <span className="font-display text-sm font-semibold text-[#c9a84c] leading-none">M</span>
            </div>
            <div>
              <p className="font-display text-[15px] font-semibold text-white tracking-tight leading-none">
                Mala <span className="text-[#c9a84c]">By</span> Kashmala
              </p>
              <p className="font-ui text-[8px] tracking-[0.28em] uppercase text-white/25 mt-1">Admin Console</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 pt-5 pb-3 overflow-y-auto space-y-5">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <p className="font-ui text-[8px] uppercase tracking-[0.22em] text-white/20 px-3 mb-1.5">{section.label}</p>
            {section.items.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all duration-150 ${
                    active
                      ? 'bg-white/[0.07] text-white'
                      : 'text-white/45 hover:text-white/85 hover:bg-white/[0.04]'
                  }`}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-[#c9a84c]" />
                  )}
                  <span className={`shrink-0 transition-colors ${active ? 'text-[#c9a84c]' : 'text-white/30 group-hover:text-white/55'}`}>
                    {item.icon}
                  </span>
                  <span className="font-ui text-[11px] uppercase tracking-[0.14em] font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 pt-3 border-t border-white/[0.06] space-y-0.5">
        {/* User pill */}
        <div className="flex items-center gap-3 px-3 py-2.5 mb-1">
          <div className="w-7 h-7 rounded-full bg-[#c9a84c]/20 flex items-center justify-center shrink-0">
            <span className="font-ui text-[10px] font-bold text-[#c9a84c] leading-none">
              {user?.name?.charAt(0)?.toUpperCase() ?? 'A'}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-body text-[12px] font-semibold text-white/80 truncate leading-none">{user?.name}</p>
            <p className="font-body text-[10px] text-white/30 truncate mt-0.5">{user?.email}</p>
          </div>
        </div>

        <Link href="/" onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/35 hover:text-white/75 hover:bg-white/[0.04] transition-all duration-150">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span className="font-ui text-[10px] uppercase tracking-[0.14em]">View Store</span>
        </Link>

        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/35 hover:text-white/75 hover:bg-white/[0.04] transition-all duration-150">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          <span className="font-ui text-[10px] uppercase tracking-[0.14em]">Sign Out</span>
        </button>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const pageTitle = (() => {
    if (pathname === '/admin')                                                      return 'Dashboard'
    if (pathname.startsWith('/admin/orders/') && pathname !== '/admin/orders')     return 'Order Detail'
    if (pathname.startsWith('/admin/orders'))                                      return 'Orders'
    if (pathname.startsWith('/admin/returns'))                                     return 'Returns'
    if (pathname.startsWith('/admin/customers'))                                   return 'Customers'
    if (pathname.startsWith('/admin/payout'))                                      return 'Payouts'
    return 'Admin'
  })()

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f3ef]">

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 overflow-hidden shadow-[1px_0_0_0_rgba(255,255,255,0.04)]">
        <Sidebar />
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="relative w-60 flex flex-col shadow-2xl">
            <Sidebar onClose={() => setOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">

        {/* Top bar */}
        <header className="shrink-0 flex items-center justify-between h-14 px-4 sm:px-6 bg-white border-b border-[#e5e2dc]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-[#0c1628]/50 hover:bg-[#f4f3ef] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <div className="flex items-center gap-2.5">
              <div className="hidden lg:block w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
              <h1 className="font-ui text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0c1628]">{pageTitle}</h1>
            </div>
          </div>
          <Link
            href="/admin/orders?status=pending"
            className="hidden sm:flex items-center gap-2 font-ui text-[10px] uppercase tracking-widest text-[#c9a84c] hover:text-[#0c1628] transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            Pending Orders
          </Link>
        </header>

        {/* Page */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
