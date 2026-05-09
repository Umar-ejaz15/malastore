import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { WishlistItem, Product } from '@/types'

interface WishlistStore {
  items: WishlistItem[]
  toggleItem: (product: Product) => void
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set) => ({
      items: [],

      toggleItem: (product) =>
        set((s) => {
          const exists = s.items.some((i) => i.productId === product.id)
          return {
            items: exists
              ? s.items.filter((i) => i.productId !== product.id)
              : [...s.items, { productId: product.id, product }],
          }
        }),

      clearWishlist: () => set({ items: [] }),
    }),
    { name: 'mala-wishlist' }
  )
)
