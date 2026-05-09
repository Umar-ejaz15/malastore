'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

type Tab = 'login' | 'register'

const inputClass = 'w-full border border-grey-light bg-white text-navy font-body text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-colors px-4 py-3 rounded-lg'
const labelClass = 'font-ui text-[10px] uppercase tracking-widest text-grey block mb-1.5'

function AuthForm() {
  const { login, register } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') ?? '/account/orders'

  const [tab, setTab] = useState<Tab>('login')
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const destination = (role?: string) => role === 'admin' ? '/admin' : redirect

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await login(loginForm.email, loginForm.password)
    setLoading(false)
    if (res.error) { setError(res.error); return }
    router.push(destination(res.user?.role))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (registerForm.password !== registerForm.confirm) { setError('Passwords do not match'); return }
    setLoading(true)
    const res = await register(registerForm.name, registerForm.email, registerForm.password)
    setLoading(false)
    if (res.error) { setError(res.error); return }
    router.push(destination(res.user?.role))
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 bg-beige/20">
      <div className="mb-8 text-center">
        <Link href="/" className="font-display text-3xl font-semibold text-navy inline-block tracking-tight">
          Mala <span className="text-gold">By</span> Kashmala
        </Link>
        <p className="font-ui text-grey text-[10px] tracking-[0.3em] uppercase mt-1">Your Account</p>
      </div>

      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-grey-light p-8">
        <div className="flex border-b border-grey-light mb-7">
          {(['login', 'register'] as Tab[]).map((t) => (
            <button key={t} onClick={() => { setTab(t); setError('') }}
              className={`flex-1 py-2.5 font-ui text-[11px] uppercase tracking-widest transition-colors relative ${tab === t ? 'text-navy' : 'text-grey hover:text-navy'}`}>
              {t === 'login' ? 'Sign In' : 'Register'}
              {tab === t && <span className="absolute bottom-0 left-0 right-0 h-px bg-gold" />}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="font-body text-sm text-red-600">{error}</p>
          </div>
        )}

        {tab === 'login' ? (
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <h1 className="font-display text-2xl font-semibold text-navy text-center mb-1">Welcome Back</h1>
            <div>
              <label className={labelClass}>Email</label>
              <input type="email" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} required className={inputClass} placeholder="your@email.com" />
            </div>
            <div>
              <label className={labelClass}>Password</label>
              <input type="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} required className={inputClass} placeholder="••••••••" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-navy text-white font-ui text-xs font-semibold uppercase tracking-widest py-3.5 rounded-lg hover:bg-charcoal transition-colors mt-1 disabled:opacity-60">
              {loading ? 'Signing In…' : 'Sign In'}
            </button>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-grey-light" />
              <span className="font-ui text-grey text-[10px] tracking-widest">OR</span>
              <div className="flex-1 h-px bg-grey-light" />
            </div>
            <button type="button" onClick={() => { setTab('register'); setError('') }} className="w-full border border-grey-light text-navy font-ui text-xs uppercase tracking-widest py-3.5 rounded-lg hover:border-navy transition-colors">
              Create Account
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            <h1 className="font-display text-2xl font-semibold text-navy text-center mb-1">
              Join <span className="text-gold">Mala By Kashmala</span>
            </h1>
            <div>
              <label className={labelClass}>Full Name</label>
              <input type="text" value={registerForm.name} onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })} required className={inputClass} placeholder="Ayesha Khan" />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input type="email" value={registerForm.email} onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} required className={inputClass} placeholder="your@email.com" />
            </div>
            <div>
              <label className={labelClass}>Password</label>
              <input type="password" value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} required minLength={8} className={inputClass} placeholder="Min. 8 characters" />
            </div>
            <div>
              <label className={labelClass}>Confirm Password</label>
              <input type="password" value={registerForm.confirm} onChange={(e) => setRegisterForm({ ...registerForm, confirm: e.target.value })} required className={inputClass} placeholder="••••••••" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-gold text-navy font-ui text-xs font-bold uppercase tracking-widest py-3.5 rounded-lg hover:bg-gold-light transition-colors mt-1 disabled:opacity-60">
              {loading ? 'Creating Account…' : 'Create Account'}
            </button>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-grey-light" />
              <span className="font-ui text-grey text-[10px] tracking-widest">OR</span>
              <div className="flex-1 h-px bg-grey-light" />
            </div>
            <button type="button" onClick={() => { setTab('login'); setError('') }} className="w-full border border-grey-light text-navy font-ui text-xs uppercase tracking-widest py-3.5 rounded-lg hover:border-navy transition-colors">
              Sign In Instead
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

function AccountDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="font-ui text-gold text-[10px] tracking-[0.3em] uppercase mb-1">My Account</p>
          <h1 className="font-display text-3xl font-semibold text-navy">Hello, {user?.name?.split(' ')[0]}</h1>
        </div>
        <button onClick={handleLogout} className="font-ui text-[11px] uppercase tracking-widest text-grey hover:text-navy transition-colors border border-grey-light px-5 py-2.5 rounded-lg hover:border-navy">
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/account/orders" className="group bg-white border border-grey-light rounded-2xl p-6 hover:border-navy transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-navy/5 flex items-center justify-center group-hover:bg-navy/10 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-navy">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
                <path d="M9 12h6M9 16h4" />
              </svg>
            </div>
            <div>
              <p className="font-ui text-xs font-semibold uppercase tracking-widest text-navy">My Orders</p>
              <p className="font-body text-grey text-xs mt-0.5">Track and manage your orders</p>
            </div>
          </div>
        </Link>

        <Link href="/account/profile" className="group bg-white border border-grey-light rounded-2xl p-6 hover:border-navy transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-navy/5 flex items-center justify-center group-hover:bg-navy/10 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-navy">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </div>
            <div>
              <p className="font-ui text-xs font-semibold uppercase tracking-widest text-navy">Profile</p>
              <p className="font-body text-grey text-xs mt-0.5">{user?.email}</p>
            </div>
          </div>
        </Link>

        <Link href="/wishlist" className="group bg-white border border-grey-light rounded-2xl p-6 hover:border-navy transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-navy/5 flex items-center justify-center group-hover:bg-navy/10 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-navy">
                <path d="M12 21C12 21 4 16 4 9.5A5 5 0 0 1 12 6a5 5 0 0 1 8 3.5C20 16 12 21 12 21Z" />
              </svg>
            </div>
            <div>
              <p className="font-ui text-xs font-semibold uppercase tracking-widest text-navy">Wishlist</p>
              <p className="font-body text-grey text-xs mt-0.5">Saved items</p>
            </div>
          </div>
        </Link>

        <Link href="/shop" className="group bg-beige/40 border border-grey-light rounded-2xl p-6 hover:border-gold transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-gold">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <div>
              <p className="font-ui text-xs font-semibold uppercase tracking-widest text-gold">Shop Now</p>
              <p className="font-body text-grey text-xs mt-0.5">Explore new arrivals</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

function AccountPageContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return user ? <AccountDashboard /> : <AuthForm />
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center"><div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" /></div>}>
      <AccountPageContent />
    </Suspense>
  )
}
