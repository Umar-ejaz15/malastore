'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

export interface AuthUser {
  userId: string
  name: string
  email: string
  role: 'customer' | 'admin'
}

interface AuthContextValue {
  user: AuthUser | null
  loading: boolean
  login:    (email: string, password: string) => Promise<{ error?: string; user?: AuthUser }>
  register: (name: string, email: string, password: string) => Promise<{ error?: string; user?: AuthUser }>
  logout:   () => Promise<void>
  refresh:  () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser]     = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me')
      if (res.ok) { const d = await res.json(); setUser(d.user) }
      else setUser(null)
    } catch { setUser(null) }
    finally  { setLoading(false) }
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const login = async (email: string, password: string) => {
    const res  = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
    const data = await res.json()
    if (!res.ok) return { error: data.error }
    setUser(data.user)
    return { user: data.user as AuthUser }
  }

  const register = async (name: string, email: string, password: string) => {
    const res  = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) })
    const data = await res.json()
    if (!res.ok) return { error: data.error }
    setUser(data.user)
    return { user: data.user as AuthUser }
  }

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    window.dispatchEvent(new CustomEvent('auth:logout'))
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
