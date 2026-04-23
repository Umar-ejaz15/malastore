'use client'

import Link from 'next/link'
import { useEffect } from 'react'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

const navLinks = [
  { label: 'Collections', href: '/shop' },
  { label: 'New Arrivals', href: '/shop?filter=new' },
  { label: 'Formals', href: '/shop?category=formals' },
  { label: 'Ready To Wear', href: '/shop?category=ready-to-wear' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-mala-black/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-ivory flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-beige">
          <Link href="/" onClick={onClose} className="font-display italic text-2xl text-brown">
            Mal<span className="text-gold-dark">ā</span>
          </Link>
          <button onClick={onClose} className="p-1 text-brown hover:text-gold transition-colors" aria-label="Close menu">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <line x1="2" y1="2" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="16" y1="2" x2="2" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-6 pt-8 gap-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              onClick={onClose}
              className="font-display italic text-2xl text-brown hover:text-gold transition-colors py-2 border-b border-beige/60"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Footer links */}
        <div className="mt-auto px-6 py-6 border-t border-beige flex gap-4">
          <Link href="/account" onClick={onClose} className="font-ui text-xs uppercase tracking-widest text-brown-light hover:text-gold transition-colors">
            Account
          </Link>
          <Link href="/wishlist" onClick={onClose} className="font-ui text-xs uppercase tracking-widest text-brown-light hover:text-gold transition-colors">
            Wishlist
          </Link>
        </div>
      </div>
    </>
  )
}
