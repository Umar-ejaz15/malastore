'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { WishlistItem, Product } from '@/types'

interface WishlistContextType {
  items: WishlistItem[]
  count: number
  toggleItem: (product: Product) => void
  hasItem: (productId: string) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | null>(null)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mala-wishlist')
      if (stored) setItems(JSON.parse(stored))
    } catch {}
  }, [])

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mala-wishlist', JSON.stringify(items))
    } catch {}
  }, [items])

  const count = items.length

  const toggleItem = useCallback((product: Product) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.productId === product.id)
      if (exists) return prev.filter((i) => i.productId !== product.id)
      return [...prev, { productId: product.id, product }]
    })
  }, [])

  const hasItem = useCallback(
    (productId: string) => items.some((i) => i.productId === productId),
    [items]
  )

  const clearWishlist = useCallback(() => setItems([]), [])

  return (
    <WishlistContext.Provider value={{ items, count, toggleItem, hasItem, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
