import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '@/types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (product: Product, size?: string) => void
  removeItem: (productId: string, size?: string) => void
  updateQty: (productId: string, size: string | undefined, qty: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,

      openCart:  () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (product, size) =>
        set((s) => {
          const existing = s.items.find(
            (i) => i.product.id === product.id && i.size === size
          )
          return {
            isOpen: true,
            items: existing
              ? s.items.map((i) =>
                  i.product.id === product.id && i.size === size
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
                )
              : [...s.items, { product, quantity: 1, size }],
          }
        }),

      removeItem: (productId, size) =>
        set((s) => ({
          items: s.items.filter(
            (i) => !(i.product.id === productId && i.size === size)
          ),
        })),

      updateQty: (productId, size, qty) => {
        if (qty <= 0) {
          set((s) => ({
            items: s.items.filter(
              (i) => !(i.product.id === productId && i.size === size)
            ),
          }))
          return
        }
        set((s) => ({
          items: s.items.map((i) =>
            i.product.id === productId && i.size === size
              ? { ...i, quantity: qty }
              : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'mala-cart',
      partialize: (s) => ({ items: s.items }),
    }
  )
)
