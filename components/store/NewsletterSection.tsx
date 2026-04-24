'use client'

import { useState } from 'react'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="relative overflow-hidden py-20 px-6 text-center bg-navy">
      <div
        className="absolute pointer-events-none top-0 left-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute pointer-events-none bottom-0 right-0 w-80 h-80 translate-x-1/3 translate-y-1/3 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-lg mx-auto">
        <p className="font-ui text-gold text-[10px] tracking-[0.35em] uppercase mb-4">
          Stay in the Loop
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-off-white leading-snug mb-3">
          New Arrivals & Exclusive Offers
        </h2>
        <p className="font-body text-off-white/60 text-sm mb-9 leading-relaxed">
          Be the first to know — new collections, curated edits, and private sales.
        </p>

        <form onSubmit={handleSubmit} className="flex rounded-lg overflow-hidden shadow-lg">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="flex-1 bg-white/5 font-body text-sm text-off-white placeholder:text-off-white/40 outline-none px-5 py-4 border border-gold/20 focus:border-gold transition-colors"
          />
          <button
            type="submit"
            className="bg-gold hover:bg-gold-light text-navy font-ui font-bold text-[11px] tracking-[0.2em] uppercase whitespace-nowrap px-7 py-4 transition-colors duration-200"
          >
            {submitted ? '✓ Done' : 'Subscribe'}
          </button>
        </form>

        <p className="font-ui text-off-white/30 text-[10px] tracking-widest uppercase mt-4">
          No spam, ever — unsubscribe anytime
        </p>
      </div>
    </section>
  )
}
