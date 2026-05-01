'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { MobileNav } from './MobileNav'
import { SearchOverlay } from './SearchOverlay'

const NAV = [
  { label: 'New Arrivals', href: '/shop?filter=new' },
  { label: 'Collections', href: '/shop' },
  { label: 'Ready to Wear', href: '/shop?category=ready-to-wear' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const { count: cartCount, openCart } = useCart()
  const { count: wishlistCount } = useWishlist()
  const [scrolled, setScrolled] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isDark = scrolled

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isDark
            ? 'bg-navy/96 backdrop-blur-md shadow-lg border-b border-gold/10'
            : 'bg-white border-b border-grey-light/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* ── LEFT: hamburger (mobile/tablet) + Logo (desktop) ── */}
            <div className="flex items-center gap-3 lg:min-w-40">
              {/* Hamburger — visible below lg */}
              <button
                onClick={() => setMobileNavOpen(true)}
                className={`lg:hidden flex flex-col justify-center gap-1.25 w-10 h-10 -ml-1 transition-colors duration-300 ${
                  isDark ? 'text-off-white hover:text-gold' : 'text-navy hover:text-gold'
                }`}
                aria-label="Open navigation"
              >
                <span className={`block h-px w-5 transition-colors duration-300 ${isDark ? 'bg-off-white' : 'bg-navy'}`} />
                <span className={`block h-px w-3.5 transition-colors duration-300 ${isDark ? 'bg-off-white' : 'bg-navy'}`} />
                <span className={`block h-px w-5 transition-colors duration-300 ${isDark ? 'bg-off-white' : 'bg-navy'}`} />
              </button>

              {/* Logo — desktop left, mobile hidden (shown in center) */}
              <Link href="/" className="hidden lg:block select-none" aria-label="Mala By Kashmala — Home">
                <div className={`relative transition-all duration-300 ${isDark ? 'bg-white/95 rounded px-2 py-1' : ''}`} style={{ width: 130, height: 52 }}>
                  <Image src="/logo.jpeg" alt="Mala By Kashmala" fill style={{ objectFit: 'contain' }} priority />
                </div>
              </Link>
            </div>

            {/* ── CENTER: Logo (mobile/tablet) + Nav (desktop) ── */}
            <div className="flex-1 flex justify-center">
              {/* Logo — mobile/tablet only */}
              <Link href="/" className="lg:hidden select-none" aria-label="Mala By Kashmala — Home">
                <div className={`relative transition-all duration-300 ${isDark ? 'bg-white/95 rounded px-1.5 py-0.5' : ''}`} style={{ width: 110, height: 44 }}>
                  <Image src="/logo.jpeg" alt="Mala By Kashmala" fill style={{ objectFit: 'contain' }} priority />
                </div>
              </Link>

              {/* Desktop nav */}
              <nav className="hidden lg:flex items-center gap-7 xl:gap-10" aria-label="Main navigation">
                {NAV.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`relative font-ui text-[11px] font-semibold uppercase tracking-widest transition-colors duration-300 group whitespace-nowrap ${
                      isDark
                        ? 'text-off-white/75 hover:text-gold'
                        : 'text-navy/75 hover:text-gold'
                    }`}
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* ── RIGHT: Action icons ── */}
            <div className="flex items-center justify-end gap-1 sm:gap-2 lg:min-w-40">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className={`p-2.5 rounded-lg transition-all duration-300 hover:scale-105 ${
                  isDark ? 'text-off-white/70 hover:text-gold' : 'text-navy/70 hover:text-gold'
                }`}
                aria-label="Search"
              >
                <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="8.5" cy="8.5" r="5.5" />
                  <line x1="13.5" y1="13.5" x2="18" y2="18" />
                </svg>
              </button>

              {/* Wishlist — hidden on very small phones, shown sm+ */}
              <Link
                href="/wishlist"
                className={`hidden sm:flex relative p-2.5 rounded-lg transition-all duration-300 hover:scale-105 ${
                  isDark ? 'text-off-white/70 hover:text-gold' : 'text-navy/70 hover:text-gold'
                }`}
                aria-label={`Wishlist${wishlistCount > 0 ? `, ${wishlistCount} items` : ''}`}
              >
                <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 17.5C10 17.5 3.5 13.5 3.5 8A3.5 3.5 0 0 1 10 5a3.5 3.5 0 0 1 6.5 3c0 5.5-6.5 9.5-6.5 9.5Z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center rounded-full bg-gold text-navy font-bold text-[9px]">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={openCart}
                className={`relative p-2.5 rounded-lg transition-all duration-300 hover:scale-105 ${
                  isDark ? 'text-off-white/70 hover:text-gold' : 'text-navy/70 hover:text-gold'
                }`}
                aria-label={`Cart, ${cartCount} items`}
              >
                <svg width="19" height="20" viewBox="0 0 20 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M6 8V5a4 4 0 0 1 8 0v3" />
                  <rect x="2" y="8" width="16" height="13" rx="1.5" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center rounded-full bg-gold text-navy font-bold text-[9px]">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Scroll progress line */}
        {scrolled && (
          <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-gold/40 to-transparent" />
        )}
      </header>

      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
