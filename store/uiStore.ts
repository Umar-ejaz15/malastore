import { create } from 'zustand'

export type ToastType = 'success' | 'error' | 'info' | 'cart'

export interface Toast {
  id: string
  type: ToastType
  message: string
  sub?: string
}

interface UIStore {
  toasts: Toast[]
  addToast: (message: string, type?: ToastType, sub?: string) => void
  removeToast: (id: string) => void
}

export const useUIStore = create<UIStore>((set) => ({
  toasts: [],

  addToast: (message, type = 'success', sub) => {
    const id = Math.random().toString(36).slice(2, 9)
    set((s) => ({ toasts: [...s.toasts.slice(-2), { id, type, message, sub }] }))
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
    }, 3200)
  },

  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))
