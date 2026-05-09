'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useAuth } from '@/context/AuthContext'
import { MobileNav } from './MobileNav'
import { SearchOverlay } from './SearchOverlay'

const NAV = [
  { label: 'New Arrivals',  href: '/shop?filter=new' },
  { label: 'Collections',   href: '/shop' },
  { label: 'Ready to Wear', href: '/shop?category=ready-to-wear' },
  { label: 'About Us',      href: '/about' },
  { label: 'Contact',       href: '/contact' },
]

export function Header() {
  const { count: cartCount, openCart } = useCart()
  const { count: wishlistCount }       = useWishlist()
  const { user }                       = useAuth()
  const [scrolled, setScrolled]           = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [searchOpen, setSearchOpen]       = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const iconCls    = 'text-navy/70 hover:text-gold'
  const accountHref = user?.role === 'admin' ? '/admin' : '/account'

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white transition-all duration-500 ${
          scrolled
            ? 'border-b border-grey-light/60 shadow-[0_2px_24px_rgba(12,22,40,0.07)]'
            : 'border-b border-grey-light/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* ── LEFT ──────────────────────────────────────────────────── */}
            <div className="flex items-center gap-2 lg:min-w-40">
              <button
                onClick={() => setMobileNavOpen(true)}
                className="lg:hidden flex flex-col justify-center gap-[5px] w-10 h-10 -ml-1 text-navy"
                aria-label="Open navigation"
              >
                <span className="block h-px w-5 rounded-full bg-navy" />
                <span className="block h-px w-3.5 rounded-full bg-navy" />
                <span className="block h-px w-5 rounded-full bg-navy" />
              </button>

              <Link href="/" className="hidden lg:block select-none shrink-0" aria-label="Mala By Kashmala — Home">
                <div className="relative" style={{ width: 126, height: 50 }}>
                  <Image src="/logo.jpeg" alt="Mala By Kashmala" fill style={{ objectFit: 'contain' }} priority />
                </div>
              </Link>
            </div>

            {/* ── CENTER ────────────────────────────────────────────────── */}
            <div className="flex-1 flex justify-center">
              <Link href="/" className="lg:hidden select-none" aria-label="Mala By Kashmala — Home">
                <div className="relative" style={{ width: 108, height: 42 }}>
                  <Image src="/logo.jpeg" alt="Mala By Kashmala" fill style={{ objectFit: 'contain' }} priority />
                </div>
              </Link>

              <nav className="hidden lg:flex items-center gap-7 xl:gap-9" aria-label="Main navigation">
                {NAV.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="relative font-ui text-[11px] font-semibold uppercase tracking-widest text-navy/70 hover:text-gold transition-colors duration-300 group whitespace-nowrap"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* ── RIGHT ─────────────────────────────────────────────────── */}
            <div className="flex items-center justify-end gap-0.5 sm:gap-1 lg:min-w-40">

              <button
                onClick={() => setSearchOpen(true)}
                className={`p-2.5 rounded-lg transition-all duration-300 hover:scale-105 ${iconCls}`}
                aria-label="Search"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="8.5" cy="8.5" r="5.5"/><line x1="13.5" y1="13.5" x2="18" y2="18"/>
                </svg>
              </button>

              <Link
                href="/wishlist"
                className={`hidden sm:flex relative p-2.5 rounded-lg transition-all duration-300 hover:scale-105 ${iconCls}`}
                aria-label={`Wishlist${wishlistCount > 0 ? `, ${wishlistCount} items` : ''}`}
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 17.5C10 17.5 3.5 13.5 3.5 8A3.5 3.5 0 0 1 10 5a3.5 3.5 0 0 1 6.5 3c0 5.5-6.5 9.5-6.5 9.5Z"/>
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 flex items-center justify-center rounded-full bg-gold text-navy font-bold text-[8px]">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href={accountHref}
                className={`relative p-2.5 rounded-lg transition-all duration-300 hover:scale-105 ${iconCls}`}
                aria-label={user ? `Account: ${user.name}` : 'Sign In'}
              >
                {user ? (
                  <span className="flex items-center justify-center w-[18px] h-[18px] rounded-full bg-gold">
                    <span className="font-ui text-[8px] font-bold text-navy leading-none">{user.name.charAt(0).toUpperCase()}</span>
                  </span>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="10" cy="7" r="4"/>
                    <path d="M3 19c0-4 3.1-7 7-7s7 3 7 7"/>
                  </svg>
                )}
              </Link>

              <button
                onClick={openCart}
                className={`relative p-2.5 rounded-lg transition-all duration-300 hover:scale-105 ${iconCls}`}
                aria-label={`Cart, ${cartCount} items`}
              >
                <svg width="18" height="19" viewBox="0 0 20 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M6 8V5a4 4 0 0 1 8 0v3"/>
                  <rect x="2" y="8" width="16" height="13" rx="1.5"/>
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 flex items-center justify-center rounded-full bg-gold text-navy font-bold text-[8px]">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
