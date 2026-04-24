'use client'

import Link from 'next/link'
import { useEffect } from 'react'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

const navLinks = [
  { label: 'New Arrivals', href: '/shop?filter=new' },
  { label: 'Collections', href: '/shop' },
  { label: 'Ready to Wear', href: '/shop?category=ready-to-wear' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-navy/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 left-0 z-[70] h-full w-[min(280px,85vw)] bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-grey-light">
          <Link
            href="/"
            onClick={onClose}
            className="font-display text-xl font-bold text-navy leading-none"
          >
            Mal<span className="text-gold">ā</span>
          </Link>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-md text-navy/60 hover:text-gold hover:bg-gold/5 transition-colors"
            aria-label="Close menu"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="14" y1="2" x2="2" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col py-4 overflow-y-auto flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              onClick={onClose}
              className="font-ui text-xs font-semibold uppercase tracking-widest text-navy/80 hover:text-gold hover:bg-gold/5 transition-colors px-5 py-4 border-b border-grey-light/50"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-grey-light flex items-center gap-5">
          <Link
            href="/account"
            onClick={onClose}
            className="font-ui text-[10px] uppercase tracking-widest text-navy/50 hover:text-gold transition-colors"
          >
            Account
          </Link>
          <span className="w-px h-3 bg-grey-light" aria-hidden="true" />
          <Link
            href="/wishlist"
            onClick={onClose}
            className="font-ui text-[10px] uppercase tracking-widest text-navy/50 hover:text-gold transition-colors"
          >
            Wishlist
          </Link>
        </div>
      </div>
    </>
  )
}
