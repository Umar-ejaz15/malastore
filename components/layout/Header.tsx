'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { MobileNav } from './MobileNav'
import { SearchOverlay } from './SearchOverlay'

const NAV = [
  { label: 'Collections', href: '/shop' },
  { label: 'New Arrivals', href: '/shop?filter=new' },
  { label: 'Lookbook', href: '/about' },
  { label: 'Sale', href: '/shop?filter=sale' },
  { label: 'About', href: '/about' },
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

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-navy/95 backdrop-glass shadow-lg border-b border-gold/10'
            : 'bg-off-white border-b border-grey-light'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center h-20 md:h-24 gap-4">
            {/* Left — Mobile menu button + Desktop nav */}
            <div className="flex items-center gap-8">
              <button
                onClick={() => setMobileNavOpen(true)}
                className={`md:hidden flex flex-col gap-1.5 p-2 transition-all duration-300 ${
                  scrolled ? 'text-off-white hover:text-gold' : 'text-navy hover:text-gold'
                }`}
                aria-label="Open navigation"
              >
                <span className={`block h-0.5 transition-all duration-300 ${scrolled ? 'w-5 bg-off-white' : 'w-5 bg-navy'}`} />
                <span className={`block h-0.5 transition-all duration-300 ${scrolled ? 'w-4 bg-off-white' : 'w-4 bg-navy'}`} />
                <span className={`block h-0.5 transition-all duration-300 ${scrolled ? 'w-5 bg-off-white' : 'w-5 bg-navy'}`} />
              </button>

              <nav className="hidden md:flex items-center gap-10" aria-label="Main">
                {NAV.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`relative font-ui text-xs font-semibold uppercase transition-colors duration-300 tracking-widest group ${
                      scrolled
                        ? 'text-off-white/80 hover:text-gold'
                        : 'text-navy/80 hover:text-gold'
                    }`}
                  >
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-400 ${scrolled ? 'bg-gold' : 'bg-gold'} w-0 group-hover:w-full`} />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Center — Logo */}
            <div className="flex justify-center">
              <Link
                href="/"
                className={`font-display text-2xl md:text-3xl font-bold leading-none select-none transition-colors duration-300 ${
                  scrolled ? 'text-gold' : 'text-navy'
                }`}
              >
                Malā
              </Link>
            </div>

            {/* Right — Action icons */}
            <div className="flex items-center justify-end gap-4 sm:gap-6">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className={`p-2 transition-all duration-300 hover:scale-110 ${
                  scrolled ? 'text-off-white/70 hover:text-gold' : 'text-navy/70 hover:text-gold'
                }`}
                aria-label="Search"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="8" cy="8" r="5.5" />
                  <line x1="13" y1="13" x2="18" y2="18" />
                </svg>
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className={`relative p-2 transition-all duration-300 hover:scale-110 ${
                  scrolled ? 'text-off-white/70 hover:text-gold' : 'text-navy/70 hover:text-gold'
                }`}
                aria-label={`Wishlist${wishlistCount > 0 ? `, ${wishlistCount} items` : ''}`}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 18C10 18 3 14 3 8.2A4.2 4.2 0 0 1 10 4 4.2 4.2 0 0 1 17 8.2C17 14 10 18 10 18Z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-gradient-to-r from-gold to-coral text-off-white font-bold text-xs animate-glow-pulse">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={openCart}
                className={`relative p-2 transition-all duration-300 hover:scale-110 ${
                  scrolled ? 'text-off-white/70 hover:text-gold' : 'text-navy/70 hover:text-gold'
                }`}
                aria-label={`Cart, ${cartCount} items`}
              >
                <svg width="20" height="22" viewBox="0 0 20 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M6 8V5a4 4 0 0 1 8 0v3" />
                  <rect x="2" y="8" width="16" height="13" rx="1" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-gradient-to-r from-coral to-terracotta text-off-white font-bold text-xs animate-scale-up">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Scroll progress indicator */}
        {scrolled && (
          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
        )}
      </header>

      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
