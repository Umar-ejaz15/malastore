'use client'

import { useEffect, useState } from 'react'
import { useUIStore, type Toast } from '@/store/uiStore'

function ToastItem({ toast }: { toast: Toast }) {
  const removeToast = useUIStore((s) => s.removeToast)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(t)
  }, [])

  const icons = {
    success: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-emerald-500 shrink-0">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    error: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-red-500 shrink-0">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    info: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-sapphire shrink-0">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 7v5M8 5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    cart: (
      <svg width="16" height="16" viewBox="0 0 20 22" fill="none" className="text-gold shrink-0">
        <path d="M6 8V5a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="2" y="8" width="16" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  }

  return (
    <div
      className={`flex items-start gap-3 bg-white border border-grey-light rounded-xl px-4 py-3 shadow-lg min-w-[240px] max-w-[320px] transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      {icons[toast.type]}
      <div className="flex-1 min-w-0">
        <p className="font-ui text-[11px] font-semibold text-navy uppercase tracking-widest leading-tight">
          {toast.message}
        </p>
        {toast.sub && (
          <p className="font-body text-xs text-grey mt-0.5 truncate">{toast.sub}</p>
        )}
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className="text-grey/50 hover:text-navy transition-colors shrink-0 mt-0.5"
        aria-label="Dismiss"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}

export function ToastContainer() {
  const toasts = useUIStore((s) => s.toasts)

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="fixed bottom-6 right-4 sm:right-6 z-[200] flex flex-col gap-2.5 pointer-events-none"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} />
        </div>
      ))}
    </div>
  )
}
