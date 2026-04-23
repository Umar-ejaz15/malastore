'use client'

import { useState } from 'react'

export function NewsletterSection() {
  const [email, setEmail]         = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    // Sanity integration: POST to newsletter webhook
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="relative overflow-hidden py-20 px-8 text-center bg-gradient-to-r from-navy via-charcoal to-slate">
      {/* Decorative orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-120px', left: '-120px', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-80px', right: '-80px', width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-lg mx-auto">
        <p className="font-ui text-gold mb-3" style={{ fontSize: 10, letterSpacing: '0.4em' }}>
          JOIN THE CIRCLE
        </p>
        <h2
          className="font-display italic font-normal text-off-white leading-tight mb-2"
          style={{ fontSize: 'clamp(1.7rem, 4vw, 2.3rem)' }}
        >
          Exclusive Offers &amp; New Arrivals
        </h2>
        <p className="font-body text-off-white/70 mb-9" style={{ fontSize: 15 }}>
          Be the first to know — new collections, curated edits, and private sales.
        </p>

        <form onSubmit={handleSubmit} className="flex rounded-lg overflow-hidden">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="flex-1 bg-off-white/5 font-body text-off-white placeholder:text-off-white/40 outline-none transition-colors px-5 py-3.5 border border-gold/20 focus:border-gold focus:ring-2 focus:ring-gold/10"
            style={{
              fontSize: 15,
            }}
          />
          <button
            type="submit"
            className="bg-gold hover:bg-gold-light text-navy font-ui font-bold whitespace-nowrap px-7 py-3.5 transition-colors duration-200"
            style={{ fontSize: 11, letterSpacing: '0.22em' }}
          >
            {submitted ? '✓ Subscribed' : 'SUBSCRIBE'}
          </button>
        </form>

        <p className="font-ui text-off-white/50 mt-4" style={{ fontSize: 10, letterSpacing: '0.2em' }}>
          NO SPAM, EVER — UNSUBSCRIBE ANYTIME
        </p>
      </div>
    </section>
  )
}
