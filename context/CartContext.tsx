'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import type { CartItem, Product } from '@/types'

export type { CartItem }

// Thin provider — handles auth-logout side effect only.
// Zustand persist handles localStorage automatically.
export function CartProvider({ children }: { children: React.ReactNode }) {
  const clearCart = useCartStore((s) => s.clearCart)

  useEffect(() => {
    const onLogout = () => clearCart()
    window.addEventListener('auth:logout', onLogout)
    return () => window.removeEventListener('auth:logout', onLogout)
  }, [clearCart])

  return <>{children}</>
}

export function useCart() {
  const items     = useCartStore((s) => s.items)
  const isOpen    = useCartStore((s) => s.isOpen)
  const openCart  = useCartStore((s) => s.openCart)
  const closeCart = useCartStore((s) => s.closeCart)
  const _addItem  = useCartStore((s) => s.addItem)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQty  = useCartStore((s) => s.updateQty)
  const clearCart  = useCartStore((s) => s.clearCart)
  const addToast   = useUIStore((s) => s.addToast)

  const count = items.reduce((sum, i) => sum + i.quantity, 0)
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

  const addItem = (product: Product, size?: string) => {
    _addItem(product, size)
    addToast(product.name, 'cart', size ? `Size ${size}` : undefined)
  }

  return {
    items,
    count,
    total,
    isOpen,
    openCart,
    closeCart,
    addItem,
    removeItem,
    updateQty,
    clearCart,
  }
}
