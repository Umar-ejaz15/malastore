'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { CartItem, Product } from '@/types'

interface CartContextType {
  items: CartItem[]
  count: number
  total: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (product: Product, size?: string) => void
  removeItem: (productId: string, size?: string) => void
  updateQty: (productId: string, size: string | undefined, qty: number) => void
  clearCart: () => void
}

const CART_KEY = 'mala-cart'
const CART_USER_KEY = 'mala-cart-user'

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Load from localStorage — clear if a different user's cart is stored
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_KEY)
      if (stored) setItems(JSON.parse(stored))
    } catch {}
  }, [])

  // Persist on every change
  useEffect(() => {
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)) } catch {}
  }, [items])

  // Clear cart when user logs out (or switches accounts)
  useEffect(() => {
    const onLogout = () => {
      setItems([])
      try {
        localStorage.removeItem(CART_KEY)
        localStorage.removeItem(CART_USER_KEY)
      } catch {}
    }
    window.addEventListener('auth:logout', onLogout)
    return () => window.removeEventListener('auth:logout', onLogout)
  }, [])

  const count = items.reduce((sum, item) => sum + item.quantity, 0)
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const openCart  = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const addItem = useCallback((product: Product, size?: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id && i.size === size)
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.size === size ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { product, quantity: 1, size }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((productId: string, size?: string) => {
    setItems((prev) => prev.filter((i) => !(i.product.id === productId && i.size === size)))
  }, [])

  const updateQty = useCallback((productId: string, size: string | undefined, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => !(i.product.id === productId && i.size === size)))
      return
    }
    setItems((prev) =>
      prev.map((i) => i.product.id === productId && i.size === size ? { ...i, quantity: qty } : i)
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    try { localStorage.removeItem(CART_KEY) } catch {}
  }, [])

  return (
    <CartContext.Provider value={{ items, count, total, isOpen, openCart, closeCart, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
