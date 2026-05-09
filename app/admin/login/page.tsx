'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function AdminLoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await login(form.email, form.password)
    setLoading(false)
    if (res.error) { setError(res.error); return }
    router.push('/admin')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-navy">
      <Link href="/" className="font-display text-2xl font-semibold text-white mb-1 tracking-tight">
        Mala <span className="text-gold">By</span> Kashmala
      </Link>
      <p className="font-ui text-[10px] tracking-[0.35em] uppercase text-white/40 mb-10">Admin Portal</p>

      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="font-display text-2xl font-semibold text-navy mb-1 text-center">Admin Sign In</h1>
        <p className="font-body text-grey text-xs text-center mb-7">Restricted access. Admins only.</p>

        {error && (
          <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="font-body text-sm text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="font-ui text-[10px] uppercase tracking-widest text-grey block mb-1.5">Email</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-grey-light bg-white text-navy font-body text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-colors px-4 py-3 rounded-lg"
              placeholder="admin@store.com" />
          </div>
          <div>
            <label className="font-ui text-[10px] uppercase tracking-widest text-grey block mb-1.5">Password</label>
            <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border border-grey-light bg-white text-navy font-body text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-colors px-4 py-3 rounded-lg"
              placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-navy text-white font-ui text-xs font-semibold uppercase tracking-widest py-3.5 rounded-lg hover:bg-charcoal transition-colors disabled:opacity-60">
            {loading ? 'Signing In…' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-grey-light text-center">
          <Link href="/" className="font-ui text-[10px] uppercase tracking-widest text-grey hover:text-navy transition-colors">← Back to Store</Link>
        </div>
      </div>
    </div>
  )
}
