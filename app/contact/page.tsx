'use client'

import { useState } from 'react'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

const contactInfo = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-gold shrink-0 mt-0.5">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z"/>
        <circle cx="12" cy="9" r="2.5"/>
      </svg>
    ),
    label: 'Address',
    value: '14-B, Gulberg III\nLahore, Punjab 54660\nPakistan',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-gold shrink-0 mt-0.5">
        <path d="M22 16.92V20a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 2 4.18 2 2 0 0 1 4 2h3.09a2 2 0 0 1 2 1.72c.09.74.29 1.47.59 2.17a2 2 0 0 1-.45 2.11L8.09 9.1a16 16 0 0 0 6.81 6.81l1.1-1.14a2 2 0 0 1 2.11-.45c.7.3 1.43.5 2.17.59A2 2 0 0 1 22 16.92Z"/>
      </svg>
    ),
    label: 'Phone',
    value: '+92 42 3456 7890\n+92 300 0000000',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-gold shrink-0 mt-0.5">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M2 7l10 7 10-7"/>
      </svg>
    ),
    label: 'Email',
    value: 'hello@mala.pk\nsupport@mala.pk',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-gold shrink-0 mt-0.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    label: 'Store Hours',
    value: 'Mon – Sat: 10am – 8pm\nSun: 12pm – 6pm',
  },
]

const inputClass = 'w-full border-2 border-grey-light bg-off-white text-navy font-body focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all px-4 py-3 rounded-lg'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <div className="bg-gradient-soft min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        <Breadcrumb items={[{ label: 'Contact' }]} />

        {/* Header */}
        <div className="mt-12 mb-16">
          <p className="font-ui text-gold uppercase text-sm font-semibold tracking-widest mb-4">Get in Touch</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-navy leading-tight max-w-3xl">
            We'd Love to Hear From You
          </h1>
          <p className="text-grey max-w-2xl text-lg mt-6">
            Have questions about our collections, shipping, or anything else? Reach out to us and we'll get back to you shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 items-start">

          {/* Contact Information */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 mb-12">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex gap-4 items-start p-6 bg-off-white rounded-xl border border-grey-light hover:shadow-md transition-shadow">
                  {item.icon}
                  <div>
                    <p className="font-ui text-gold uppercase text-xs font-semibold tracking-widest mb-2">
                      {item.label}
                    </p>
                    <p className="font-body text-navy whitespace-pre-line leading-relaxed text-sm">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div
              className="relative overflow-hidden rounded-xl border border-grey-light shadow-sm"
              style={{ height: 280, background: 'linear-gradient(135deg, #F8F9FA 0%, #E8E4D9 40%, #D4C5A9 70%)' }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-navy/5 to-gold/5">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                </div>
                <p className="font-ui text-navy font-semibold uppercase text-sm tracking-wider">Find Us in Lahore</p>
                <p className="font-body text-grey text-sm">Gulberg III, Lahore</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-off-white rounded-xl border border-grey-light p-8 shadow-sm">
            <h2 className="font-display text-3xl font-bold text-navy mb-8">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-ui text-navy text-xs font-semibold uppercase tracking-widest block mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className={inputClass}
                    placeholder="Ayesha Khan"
                  />
                </div>
                <div>
                  <label className="font-ui text-navy text-xs font-semibold uppercase tracking-widest block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className={inputClass}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="font-ui text-navy text-xs font-semibold uppercase tracking-widest block mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                  className={inputClass}
                  placeholder="Order Enquiry / Collaboration / Other"
                />
              </div>

              <div>
                <label className="font-ui text-navy text-xs font-semibold uppercase tracking-widest block mb-2">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={6}
                  className={`${inputClass} resize-none`}
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                disabled={sent}
                className={`w-full font-ui font-bold py-4 rounded-lg uppercase tracking-wider text-sm transition-all duration-300 ${
                  sent
                    ? 'bg-emerald text-off-white'
                    : 'bg-navy text-off-white hover:bg-charcoal hover:shadow-lg'
                }`}
              >
                {sent ? '✓ Message Sent' : 'Send Message'}
              </button>
            </form>

            {sent && (
              <p className="mt-4 text-center text-emerald font-semibold text-sm">Thank you! We'll be in touch shortly.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
