'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  if (!user) return null

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/account" className="font-ui text-[10px] uppercase tracking-widest text-grey hover:text-navy transition-colors">← Account</Link>
        <span className="text-grey-light">/</span>
        <span className="font-ui text-[10px] uppercase tracking-widest text-navy">Profile</span>
      </div>

      <h1 className="font-display text-3xl font-semibold text-navy mb-8">My Profile</h1>

      <div className="bg-white border border-grey-light rounded-2xl p-8">
        <div className="flex items-center gap-5 mb-8 pb-8 border-b border-grey-light">
          <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center">
            <span className="font-display text-2xl text-white">{user.name.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <p className="font-display text-xl font-semibold text-navy">{user.name}</p>
            <p className="font-body text-grey text-sm">{user.email}</p>
            {user.role === 'admin' && (
              <span className="inline-block mt-1 font-ui text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gold/15 text-gold border border-gold/20">
                Admin
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <label className="font-ui text-[10px] uppercase tracking-widest text-grey block mb-1.5">Full Name</label>
            <input defaultValue={user.name} className="w-full border border-grey-light bg-white text-navy font-body text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-colors px-4 py-3 rounded-lg" />
          </div>
          <div>
            <label className="font-ui text-[10px] uppercase tracking-widest text-grey block mb-1.5">Email Address</label>
            <input defaultValue={user.email} disabled className="w-full border border-grey-light bg-beige/30 text-grey font-body text-sm px-4 py-3 rounded-lg cursor-not-allowed" />
            <p className="font-body text-grey text-[11px] mt-1">Email cannot be changed.</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-8 pt-8 border-t border-grey-light">
          <button onClick={handleLogout} className="font-ui text-[11px] uppercase tracking-widest text-grey hover:text-red-500 transition-colors">
            Sign Out
          </button>
          {user.role === 'admin' && (
            <Link href="/admin" className="font-ui text-xs uppercase tracking-widest bg-gold text-navy px-6 py-2.5 rounded-lg hover:bg-gold-light transition-colors font-semibold">
              Admin Dashboard →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
