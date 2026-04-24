'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const popularSearches = ['Lawn', 'Embroidered', 'Ready to Wear', 'Chiffon', 'New Arrivals']

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) {
      document.addEventListener('keydown', handler)
      setTimeout(() => inputRef.current?.focus(), 100)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`)
      onClose()
      setQuery('')
    }
  }

  const handlePopular = (term: string) => {
    router.push(`/shop?q=${encodeURIComponent(term)}`)
    onClose()
    setQuery('')
  }

  return (
    <div
      className={`fixed inset-0 z-80 bg-white/97 backdrop-blur-sm flex flex-col items-center justify-center transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-lg text-navy/50 hover:text-gold transition-colors"
        aria-label="Close search"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <line x1="2" y1="2" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="16" y1="2" x2="2" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      <div className="w-full max-w-2xl px-6">
        <p className="font-ui text-[10px] uppercase tracking-widest text-gold mb-5 text-center">Search</p>
        <form onSubmit={handleSubmit} className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products…"
            className="w-full bg-transparent border-0 border-b-2 border-grey-light focus:border-gold outline-none font-display text-3xl md:text-4xl font-medium text-navy placeholder:text-grey-light py-3 pr-12 transition-colors"
          />
          <button
            type="submit"
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-navy/50 hover:text-gold transition-colors"
            aria-label="Search"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="14" y1="14" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </form>

        <div className="mt-8">
          <p className="font-ui text-[10px] uppercase tracking-widest text-grey mb-3">Popular Searches</p>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => handlePopular(term)}
                className="px-4 py-1.5 border border-grey-light rounded-full font-ui text-xs uppercase tracking-wider text-navy hover:border-gold hover:text-gold transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
