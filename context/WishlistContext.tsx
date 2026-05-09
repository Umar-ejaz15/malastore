'use client'

import { useEffect } from 'react'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUIStore } from '@/store/uiStore'
import type { WishlistItem, Product } from '@/types'

export type { WishlistItem }

// Thin provider — handles auth-logout side effect only.
export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const clearWishlist = useWishlistStore((s) => s.clearWishlist)

  useEffect(() => {
    const onLogout = () => clearWishlist()
    window.addEventListener('auth:logout', onLogout)
    return () => window.removeEventListener('auth:logout', onLogout)
  }, [clearWishlist])

  return <>{children}</>
}

export function useWishlist() {
  const items         = useWishlistStore((s) => s.items)
  const _toggleItem   = useWishlistStore((s) => s.toggleItem)
  const clearWishlist = useWishlistStore((s) => s.clearWishlist)
  const addToast      = useUIStore((s) => s.addToast)

  const count   = items.length
  const hasItem = (productId: string) => items.some((i) => i.productId === productId)

  const toggleItem = (product: Product) => {
    const alreadyIn = hasItem(product.id)
    _toggleItem(product)
    addToast(
      alreadyIn ? 'Removed from wishlist' : 'Added to wishlist',
      alreadyIn ? 'info' : 'success',
      product.name
    )
  }

  return { items, count, toggleItem, hasItem, clearWishlist }
}
