'use client'

import { useState } from 'react'
import Link from 'next/link'

type Tab = 'login' | 'register'

const inputClass = 'w-full border border-grey-light bg-white text-navy font-body text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-colors px-4 py-3 rounded-lg'
const labelClass = 'font-ui text-[10px] uppercase tracking-widest text-grey block mb-1.5'

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>('login')
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirm: '' })

  const handleLogin = (e: { preventDefault(): void }) => e.preventDefault()
  const handleRegister = (e: { preventDefault(): void }) => e.preventDefault()

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 bg-beige/20">

      <div className="mb-8 text-center">
        <Link href="/" className="font-display text-3xl font-semibold text-navy inline-block">
          Mal<span className="text-gold">ā</span>
        </Link>
        <p className="font-ui text-grey text-[10px] tracking-[0.3em] uppercase mt-1">Member Access</p>
      </div>

      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-grey-light p-8">

        {/* Tab switcher */}
        <div className="flex border-b border-grey-light mb-7">
          {(['login', 'register'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 font-ui text-[11px] uppercase tracking-widest transition-colors relative ${
                tab === t ? 'text-navy' : 'text-grey hover:text-navy'
              }`}
            >
              {t === 'login' ? 'Sign In' : 'Register'}
              {tab === t && <span className="absolute bottom-0 left-0 right-0 h-px bg-gold" />}
            </button>
          ))}
        </div>

        {/* Login */}
        {tab === 'login' && (
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <h1 className="font-display text-2xl font-semibold text-navy text-center mb-1">Welcome Back</h1>

            <div>
              <label className={labelClass}>Email</label>
              <input type="email" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} required className={inputClass} placeholder="your@email.com"/>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className={labelClass}>Password</label>
                <button type="button" className="font-ui text-[10px] text-grey hover:text-gold transition-colors">Forgot password?</button>
              </div>
              <input type="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} required className={inputClass} placeholder="••••••••"/>
            </div>

            <button type="submit" className="w-full bg-navy text-white font-ui text-xs font-semibold uppercase tracking-widest py-3.5 rounded-lg hover:bg-charcoal transition-colors mt-1">
              Sign In
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-grey-light" />
              <span className="font-ui text-grey text-[10px] tracking-widest">OR</span>
              <div className="flex-1 h-px bg-grey-light" />
            </div>

            <button type="button" onClick={() => setTab('register')} className="w-full border border-grey-light text-navy font-ui text-xs uppercase tracking-widest py-3.5 rounded-lg hover:border-navy transition-colors">
              Create Account
            </button>
          </form>
        )}

        {/* Register */}
        {tab === 'register' && (
          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            <h1 className="font-display text-2xl font-semibold text-navy text-center mb-1">
              Join Mal<span className="text-gold">ā</span>
            </h1>

            <div>
              <label className={labelClass}>Full Name</label>
              <input type="text" value={registerForm.name} onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })} required className={inputClass} placeholder="Ayesha Khan"/>
            </div>

            <div>
              <label className={labelClass}>Email</label>
              <input type="email" value={registerForm.email} onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} required className={inputClass} placeholder="your@email.com"/>
            </div>

            <div>
              <label className={labelClass}>Password</label>
              <input type="password" value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} required className={inputClass} placeholder="••••••••"/>
            </div>

            <div>
              <label className={labelClass}>Confirm Password</label>
              <input type="password" value={registerForm.confirm} onChange={(e) => setRegisterForm({ ...registerForm, confirm: e.target.value })} required className={inputClass} placeholder="••••••••"/>
            </div>

            <button type="submit" className="w-full bg-gold text-navy font-ui text-xs font-bold uppercase tracking-widest py-3.5 rounded-lg hover:bg-gold-dark transition-colors mt-1">
              Create Account
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-grey-light" />
              <span className="font-ui text-grey text-[10px] tracking-widest">OR</span>
              <div className="flex-1 h-px bg-grey-light" />
            </div>

            <button type="button" onClick={() => setTab('login')} className="w-full border border-grey-light text-navy font-ui text-xs uppercase tracking-widest py-3.5 rounded-lg hover:border-navy transition-colors">
              Sign In Instead
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
