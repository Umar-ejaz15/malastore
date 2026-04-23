'use client'

import { useState } from 'react'

type Tab = 'login' | 'register'

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>('login')
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirm: '' })

  const handleLogin = (e: React.FormEvent) => e.preventDefault()
  const handleRegister = (e: React.FormEvent) => e.preventDefault()

  const inputClass = 'w-full border border-beige bg-ivory text-brown font-body focus:outline-none focus:border-gold/70 transition-colors px-4 py-3'

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20">

      {/* Logo */}
      <div className="mb-10 text-center">
        <p className="font-display italic text-3xl text-brown">
          Mal<span className="text-gold-dark">ā</span>
        </p>
        <p className="font-ui text-brown-light mt-1" style={{ fontSize: 10, letterSpacing: '0.3em' }}>
          MEMBER ACCESS
        </p>
      </div>

      <div className="w-full max-w-sm">

        {/* Tab switcher */}
        <div className="flex border-b border-beige mb-8">
          {(['login', 'register'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 font-ui transition-colors relative ${
                tab === t ? 'text-brown' : 'text-brown-light hover:text-brown'
              }`}
              style={{ fontSize: 11, letterSpacing: '0.2em' }}
            >
              {t === 'login' ? 'SIGN IN' : 'REGISTER'}
              {tab === t && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-gold" />
              )}
            </button>
          ))}
        </div>

        {/* Login */}
        {tab === 'login' && (
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <h1 className="font-display italic text-2xl text-brown text-center mb-1">Welcome Back</h1>

            <div>
              <label className="font-ui text-brown-light block mb-1.5" style={{ fontSize: 10, letterSpacing: '0.2em' }}>
                EMAIL
              </label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                required
                className={inputClass}
                style={{ fontSize: 14 }}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="font-ui text-brown-light" style={{ fontSize: 10, letterSpacing: '0.2em' }}>
                  PASSWORD
                </label>
                <button
                  type="button"
                  className="font-ui text-brown-light hover:text-gold transition-colors"
                  style={{ fontSize: 10, letterSpacing: '0.12em' }}
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
                className={inputClass}
                style={{ fontSize: 14 }}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brown text-mala-white font-ui font-semibold py-4 hover:bg-brown-mid transition-colors duration-300 mt-1"
              style={{ fontSize: 11, letterSpacing: '0.22em' }}
            >
              SIGN IN
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-beige" />
              <span className="font-ui text-sand-dark" style={{ fontSize: 10, letterSpacing: '0.2em' }}>OR</span>
              <div className="flex-1 h-px bg-beige" />
            </div>

            <button
              type="button"
              onClick={() => setTab('register')}
              className="w-full border border-beige text-brown font-ui py-4 hover:border-brown transition-colors"
              style={{ fontSize: 11, letterSpacing: '0.2em' }}
            >
              CREATE ACCOUNT
            </button>
          </form>
        )}

        {/* Register */}
        {tab === 'register' && (
          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            <h1 className="font-display italic text-2xl text-brown text-center mb-1">
              Join Mal<span className="text-gold-dark">ā</span>
            </h1>

            <div>
              <label className="font-ui text-brown-light block mb-1.5" style={{ fontSize: 10, letterSpacing: '0.2em' }}>
                FULL NAME
              </label>
              <input
                type="text"
                value={registerForm.name}
                onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                required
                className={inputClass}
                style={{ fontSize: 14 }}
                placeholder="Ayesha Khan"
              />
            </div>

            <div>
              <label className="font-ui text-brown-light block mb-1.5" style={{ fontSize: 10, letterSpacing: '0.2em' }}>
                EMAIL
              </label>
              <input
                type="email"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                required
                className={inputClass}
                style={{ fontSize: 14 }}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="font-ui text-brown-light block mb-1.5" style={{ fontSize: 10, letterSpacing: '0.2em' }}>
                PASSWORD
              </label>
              <input
                type="password"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                required
                className={inputClass}
                style={{ fontSize: 14 }}
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="font-ui text-brown-light block mb-1.5" style={{ fontSize: 10, letterSpacing: '0.2em' }}>
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                value={registerForm.confirm}
                onChange={(e) => setRegisterForm({ ...registerForm, confirm: e.target.value })}
                required
                className={inputClass}
                style={{ fontSize: 14 }}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gold text-brown font-ui font-bold py-4 hover:bg-gold-dark transition-colors duration-300 mt-1"
              style={{ fontSize: 11, letterSpacing: '0.22em' }}
            >
              CREATE ACCOUNT
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-beige" />
              <span className="font-ui text-sand-dark" style={{ fontSize: 10, letterSpacing: '0.2em' }}>OR</span>
              <div className="flex-1 h-px bg-beige" />
            </div>

            <button
              type="button"
              onClick={() => setTab('login')}
              className="w-full border border-beige text-brown font-ui py-4 hover:border-brown transition-colors"
              style={{ fontSize: 11, letterSpacing: '0.2em' }}
            >
              SIGN IN INSTEAD
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
