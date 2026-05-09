'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { ProductImage } from '@/components/ui/ProductImage'
import { SizeGuide } from '@/components/store/SizeGuide'
import type { CartItem, SiteSettings } from '@/types'

type PaymentMethod = 'jazzcash' | 'bank' | 'cod'

const provinces = ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'Islamabad', 'Gilgit-Baltistan', 'AJK']

// ── Shared styles ─────────────────────────────────────────────────────────────
const inp = 'w-full bg-white border border-[#ddd8cf] text-[#1a2744] font-body text-sm placeholder:text-[#b8b0a4] focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/10 transition-all duration-200 px-4 py-3 rounded-xl'
const inpErr = 'border-red-300 bg-red-50/30'
const lbl = 'font-ui text-[10px] uppercase tracking-widest text-[#8a8178] block mb-1.5'
const err = 'font-body text-[11px] text-red-500 mt-1 flex items-center gap-1'

interface FormErrors { [k: string]: string }

export function CheckoutClient({ settings }: { settings: SiteSettings }) {
  const router      = useRouter()
  const { items, total, clearCart } = useCart()
  const { user }    = useAuth()

  // ── Settings ────────────────────────────────────────────────────────────────
  const jazzcashNumber   = settings.jazzcashNumber         ?? '0328 8428987'
  const jazzcashName     = settings.bankDetails?.accountTitle ?? 'Kashmala Tariq'
  const bankName         = settings.bankDetails?.bankName     ?? 'Meezan Bank'
  const bankAccountTitle = settings.bankDetails?.accountTitle ?? 'KASHMALA TARIQ'
  const bankAccountNo    = settings.bankDetails?.accountNumber ?? '77020114213714'
  const codCharge        = settings.codDeliveryCharge         ?? 250
  const whatsappRaw      = settings.whatsappNumber            ?? '03257166006'
  const whatsappDisplay  = whatsappRaw.replace(/(\d{4})(\d{7})/, '$1 $2')
  const whatsappLink     = `https://wa.me/92${whatsappRaw.replace(/\D/g, '').replace(/^0/, '')}`

  // ── Form state ──────────────────────────────────────────────────────────────
  const [firstName, setFirstName] = useState('')
  const [lastName,  setLastName]  = useState('')
  const [email,     setEmail]     = useState('')
  const [phone,     setPhone]     = useState('')
  const [address,   setAddress]   = useState('')
  const [city,      setCity]      = useState('')
  const [province,  setProvince]  = useState('Punjab')
  const [postal,    setPostal]    = useState('')
  const [method,    setMethod]    = useState<PaymentMethod | null>(null)
  const [errors,    setErrors]    = useState<FormErrors>({})
  const [placing,   setPlacing]   = useState(false)
  const [sizeGuide, setSizeGuide] = useState(false)

  // Pre-fill from session
  useEffect(() => {
    if (!user) return
    const parts = user.name.trim().split(' ')
    setFirstName(parts[0] ?? '')
    setLastName(parts.slice(1).join(' '))
    setEmail(user.email)
  }, [user])

  const deliveryCharge = method === 'cod' ? codCharge : method ? 0 : null
  const grandTotal     = total + (deliveryCharge ?? 0)

  const clr = (k: string) => setErrors(p => ({ ...p, [k]: '' }))

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = () => {
    const e: FormErrors = {}
    if (!firstName.trim()) e.firstName = 'Required'
    if (!lastName.trim())  e.lastName  = 'Required'
    if (!email.trim())     e.email     = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email'
    if (!phone.trim())     e.phone     = 'Required'
    if (!address.trim())   e.address   = 'Required'
    if (!city.trim())      e.city      = 'Required'
    if (!postal.trim())    e.postal    = 'Required'
    if (!method)           e.method    = 'Choose a payment method'
    setErrors(e)
    if (Object.keys(e).length) {
      document.querySelector('[data-err]')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    return !Object.keys(e).length
  }

  // ── Submit ──────────────────────────────────────────────────────────────────
  const placeOrder = async () => {
    if (!validate()) return
    setPlacing(true)
    try {
      const charge = method === 'cod' ? codCharge : 0
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact:       { firstName, lastName, email, phone },
          shipping:      { address, city, province, postal },
          paymentMethod: method,
          items:         items.map((item: CartItem) => ({
            product:  { id: item.product.id, name: item.product.name, slug: item.product.slug, sku: item.product.sku, price: item.product.price },
            quantity: item.quantity,
            size:     item.size,
          })),
          subtotal:     total,
          shippingCost: charge,
          total:        total + charge,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      clearCart()
      router.push(`/order-success?order=${encodeURIComponent(data.orderNumber)}&email=${encodeURIComponent(email)}`)
    } catch {
      alert('Something went wrong. Please try again or contact us on WhatsApp.')
    } finally {
      setPlacing(false)
    }
  }

  if (items.length === 0) return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <p className="font-display text-2xl font-semibold text-navy mb-2">Your cart is empty</p>
      <p className="font-body text-grey text-sm mb-8">Add some items before checking out.</p>
      <Link href="/shop" className="font-ui text-xs uppercase tracking-widest bg-navy text-white px-8 py-3.5 rounded-xl hover:bg-charcoal transition-colors inline-block">
        Browse Collection
      </Link>
    </div>
  )

  return (
    <>
      <div className="min-h-screen bg-[#faf9f6]">

        {/* ── Top bar ────────────────────────────────────────────────────────── */}
        <div className="border-b border-[#eae6de] bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
            <Link href="/" className="relative block" style={{ width: 110, height: 42 }}>
              <Image src="/logo.jpeg" alt="Mala By Kashmala" fill style={{ objectFit: 'contain' }} priority />
            </Link>
            <div className="flex items-center gap-2 text-[#9d9690]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span className="font-ui text-[10px] uppercase tracking-widest">Secure Checkout</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">

            {/* ════════════════════════════════════════════════════════════════
                LEFT: FORM
            ════════════════════════════════════════════════════════════════ */}
            <div className="space-y-6">

              {/* ── Contact ─────────────────────────────────────────────────── */}
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-ui text-[10px] uppercase tracking-widest text-[#9d9690]">01</span>
                  <h2 className="font-display text-lg font-semibold text-navy">Contact</h2>
                  {!user && (
                    <span className="ml-auto font-body text-xs text-[#9d9690]">
                      <Link href="/account" className="text-[#c9a84c] hover:underline font-medium">Sign in</Link> to auto-fill
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={lbl}>First Name</label>
                    <input type="text" value={firstName}
                      onChange={e => { setFirstName(e.target.value); clr('firstName') }}
                      className={`${inp} ${errors.firstName ? inpErr : ''}`}
                      placeholder="Ayesha" data-err={errors.firstName || undefined}
                    />
                    {errors.firstName && <p className={err}><span>·</span>{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className={lbl}>Last Name</label>
                    <input type="text" value={lastName}
                      onChange={e => { setLastName(e.target.value); clr('lastName') }}
                      className={`${inp} ${errors.lastName ? inpErr : ''}`}
                      placeholder="Khan"
                    />
                    {errors.lastName && <p className={err}><span>·</span>{errors.lastName}</p>}
                  </div>
                  <div className="col-span-2">
                    <label className={lbl}>Email Address</label>
                    <input type="email" value={email}
                      onChange={e => { setEmail(e.target.value); clr('email') }}
                      className={`${inp} ${errors.email ? inpErr : ''}`}
                      placeholder="ayesha@email.com"
                    />
                    {errors.email && <p className={err}><span>·</span>{errors.email}</p>}
                    <p className="font-body text-[11px] text-[#b8b0a4] mt-1.5">Your order confirmation goes here</p>
                  </div>
                  <div className="col-span-2">
                    <label className={lbl}>Phone Number</label>
                    <input type="tel" value={phone}
                      onChange={e => { setPhone(e.target.value); clr('phone') }}
                      className={`${inp} ${errors.phone ? inpErr : ''}`}
                      placeholder="0300 0000000"
                    />
                    {errors.phone && <p className={err}><span>·</span>{errors.phone}</p>}
                    <p className="font-body text-[11px] text-[#b8b0a4] mt-1.5">We call to confirm before dispatch</p>
                  </div>
                </div>
              </section>

              <div className="border-t border-[#eae6de]" />

              {/* ── Shipping ─────────────────────────────────────────────────── */}
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-ui text-[10px] uppercase tracking-widest text-[#9d9690]">02</span>
                  <h2 className="font-display text-lg font-semibold text-navy">Shipping Address</h2>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className={lbl}>Street Address</label>
                    <input type="text" value={address}
                      onChange={e => { setAddress(e.target.value); clr('address') }}
                      className={`${inp} ${errors.address ? inpErr : ''}`}
                      placeholder="House 12, Street 5, DHA Phase 6"
                    />
                    {errors.address && <p className={err}><span>·</span>{errors.address}</p>}
                  </div>
                  <div>
                    <label className={lbl}>City</label>
                    <input type="text" value={city}
                      onChange={e => { setCity(e.target.value); clr('city') }}
                      className={`${inp} ${errors.city ? inpErr : ''}`}
                      placeholder="Lahore"
                    />
                    {errors.city && <p className={err}><span>·</span>{errors.city}</p>}
                  </div>
                  <div>
                    <label className={lbl}>Province</label>
                    <select value={province} onChange={e => setProvince(e.target.value)}
                      className={`${inp} cursor-pointer`}>
                      {provinces.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className={lbl}>Postal Code</label>
                    <input type="text" value={postal}
                      onChange={e => { setPostal(e.target.value); clr('postal') }}
                      className={`${inp} ${errors.postal ? inpErr : ''}`}
                      placeholder="54000"
                    />
                    {errors.postal && <p className={err}><span>·</span>{errors.postal}</p>}
                  </div>
                </div>
              </section>

              <div className="border-t border-[#eae6de]" />

              {/* ── Payment ──────────────────────────────────────────────────── */}
              <section>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-ui text-[10px] uppercase tracking-widest text-[#9d9690]">03</span>
                  <h2 className="font-display text-lg font-semibold text-navy">Payment</h2>
                </div>
                <p className="font-body text-sm text-[#9d9690] mb-5">
                  JazzCash and Bank Transfer include free delivery.
                </p>

                {errors.method && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-red-400 shrink-0">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <p className="font-body text-sm text-red-600">{errors.method}</p>
                  </div>
                )}

                {/* Method selector */}
                <div className="space-y-2.5 mb-6">
                  {([
                    {
                      value: 'jazzcash' as PaymentMethod,
                      label: 'JazzCash',
                      sub: 'Mobile wallet · Free delivery',
                      badge: 'Free Delivery',
                      badgeColor: 'text-[#c9a84c] bg-[#c9a84c]/10',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="5" y="2" width="14" height="20" rx="2"/>
                          <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none"/>
                          <line x1="9" y1="6" x2="15" y2="6"/>
                        </svg>
                      ),
                    },
                    {
                      value: 'bank' as PaymentMethod,
                      label: 'Bank Transfer',
                      sub: `${bankName} · Free delivery`,
                      badge: 'Free Delivery',
                      badgeColor: 'text-[#c9a84c] bg-[#c9a84c]/10',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M3 22h18M3 12h18M3 7l9-5 9 5M4 12v10M8 12v10M12 12v10M16 12v10M20 12v10"/>
                        </svg>
                      ),
                    },
                    {
                      value: 'cod' as PaymentMethod,
                      label: 'Cash on Delivery',
                      sub: `Pay when it arrives · +Rs. ${codCharge.toLocaleString('en-PK')} charge`,
                      badge: `+Rs. ${codCharge.toLocaleString('en-PK')}`,
                      badgeColor: 'text-[#1a2744] bg-[#1a2744]/8',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="1" y="6" width="22" height="14" rx="2"/>
                          <circle cx="12" cy="13" r="3"/>
                          <line x1="5" y1="13" x2="5.01" y2="13" strokeWidth="2"/>
                          <line x1="19" y1="13" x2="19.01" y2="13" strokeWidth="2"/>
                        </svg>
                      ),
                    },
                  ] as const).map(opt => {
                    const active = method === opt.value
                    return (
                      <label key={opt.value}
                        className={`flex items-center gap-4 px-4 py-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                          active
                            ? 'border-[#1a2744] bg-[#1a2744]/2 shadow-sm'
                            : 'border-[#ddd8cf] hover:border-[#b8b0a4] bg-white'
                        }`}>
                        <input type="radio" name="payment" value={opt.value}
                          checked={active}
                          onChange={() => { setMethod(opt.value); clr('method') }}
                          className="sr-only"
                        />
                        {/* Custom radio */}
                        <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          active ? 'border-[#1a2744] bg-[#1a2744]' : 'border-[#c8c0b8]'
                        }`}>
                          {active && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className={`shrink-0 transition-colors ${active ? 'text-[#1a2744]' : 'text-[#9d9690]'}`}>
                          {opt.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-ui text-xs font-semibold uppercase tracking-widest text-[#1a2744]">{opt.label}</p>
                            <span className={`font-ui text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${opt.badgeColor}`}>
                              {opt.badge}
                            </span>
                          </div>
                          <p className="font-body text-xs text-[#9d9690] mt-0.5">{opt.sub}</p>
                        </div>
                        {active && (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-[#1a2744]">
                            <path d="M2 7L5.5 10.5L12 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                          </svg>
                        )}
                      </label>
                    )
                  })}
                </div>

                {/* Payment instructions */}
                {method === 'jazzcash' && (
                  <PaymentDetail
                    title="Send to JazzCash"
                    rows={[
                      ['Number', jazzcashNumber],
                      ['Name',   jazzcashName],
                      ['Amount', `Rs. ${total.toLocaleString('en-PK')}`],
                      ['Delivery', 'Free'],
                    ]}
                    whatsapp={{ link: whatsappLink, number: whatsappDisplay }}
                  />
                )}
                {method === 'bank' && (
                  <PaymentDetail
                    title="Bank Transfer"
                    rows={[
                      ['Bank',    bankName],
                      ['Title',   bankAccountTitle],
                      ['Account', bankAccountNo],
                      ['Amount',  `Rs. ${total.toLocaleString('en-PK')}`],
                      ['Delivery', 'Free'],
                    ]}
                    whatsapp={{ link: whatsappLink, number: whatsappDisplay }}
                  />
                )}
                {method === 'cod' && (
                  <div className="bg-[#f5f4f0] border border-[#eae6de] rounded-xl p-5">
                    <div className="flex justify-between mb-2">
                      <span className="font-ui text-[10px] uppercase tracking-widest text-[#9d9690]">Order Amount</span>
                      <span className="font-body text-sm text-[#1a2744]">Rs. {total.toLocaleString('en-PK')}</span>
                    </div>
                    <div className="flex justify-between mb-3">
                      <span className="font-ui text-[10px] uppercase tracking-widest text-[#9d9690]">Delivery Charge</span>
                      <span className="font-body text-sm text-[#1a2744]">Rs. {codCharge.toLocaleString('en-PK')}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-[#ddd8cf]">
                      <span className="font-ui text-[10px] uppercase tracking-widest font-semibold text-[#1a2744]">Pay on Delivery</span>
                      <span className="font-display text-base font-semibold text-[#1a2744]">Rs. {(total + codCharge).toLocaleString('en-PK')}</span>
                    </div>
                    <p className="font-body text-xs text-[#9d9690] mt-3 leading-relaxed">
                      Please keep the exact amount ready. We will call to confirm before dispatch.
                    </p>
                  </div>
                )}
              </section>

              <div className="border-t border-[#eae6de]" />

              {/* ── Total + CTA ──────────────────────────────────────────────── */}
              <section>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-ui text-[10px] uppercase tracking-widest text-[#9d9690]">Subtotal</span>
                  <span className="font-body text-sm text-[#1a2744]">Rs. {total.toLocaleString('en-PK')}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-ui text-[10px] uppercase tracking-widest text-[#9d9690]">Delivery</span>
                  {deliveryCharge === null
                    ? <span className="font-body text-sm text-[#9d9690]">—</span>
                    : deliveryCharge === 0
                      ? <span className="font-ui text-[10px] font-bold uppercase tracking-wider text-[#c9a84c]">Free</span>
                      : <span className="font-body text-sm text-[#1a2744]">Rs. {deliveryCharge.toLocaleString('en-PK')}</span>
                  }
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#eae6de] mb-6">
                  <span className="font-ui text-sm uppercase tracking-widest font-semibold text-[#1a2744]">Total</span>
                  <span className="font-display text-2xl font-semibold text-[#1a2744]">
                    {deliveryCharge === null
                      ? <span className="text-[#9d9690] text-xl">Rs. {total.toLocaleString('en-PK')}+</span>
                      : <>Rs. {grandTotal.toLocaleString('en-PK')}</>
                    }
                  </span>
                </div>

                <button onClick={placeOrder} disabled={placing}
                  className="w-full bg-[#1a2744] hover:bg-[#0f1a30] active:scale-[0.99] text-white font-ui text-xs font-bold uppercase tracking-widest py-4 rounded-xl transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-3 shadow-sm">
                  {placing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Placing Order…
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                      Place Order
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-5 mt-4">
                  {[
                    'Secure Checkout',
                    'Easy Returns',
                    'Fast Delivery',
                  ].map(t => (
                    <span key={t} className="font-ui text-[9px] uppercase tracking-widest text-[#b8b0a4]">{t}</span>
                  ))}
                </div>

                <p className="text-center font-body text-[11px] text-[#b8b0a4] mt-3">
                  Questions?{' '}
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
                    className="text-[#c9a84c] hover:underline">Chat on WhatsApp</a>
                </p>
              </section>
            </div>

            {/* ════════════════════════════════════════════════════════════════
                RIGHT: ORDER SUMMARY (sticky)
            ════════════════════════════════════════════════════════════════ */}
            <aside className="lg:sticky lg:top-6 space-y-4">

              {/* Items */}
              <div className="bg-white border border-[#eae6de] rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0ece5]">
                  <h3 className="font-ui text-[10px] uppercase tracking-widest font-semibold text-[#1a2744]">
                    Your Order · {items.length} item{items.length !== 1 ? 's' : ''}
                  </h3>
                  <button onClick={() => setSizeGuide(true)}
                    className="font-ui text-[9px] uppercase tracking-widest text-[#c9a84c] hover:underline">
                    Size Guide
                  </button>
                </div>

                <div className="divide-y divide-[#f5f2ec] max-h-72 overflow-y-auto">
                  {items.map(item => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-3.5 px-5 py-3.5">
                      <div className="w-14 aspect-3/4 shrink-0 rounded-lg overflow-hidden bg-[#f5f4f0] relative">
                        <ProductImage
                          sanityImage={item.product.sanityImages?.[0]}
                          fallbackVariant={item.product.imgVariant}
                          alt={item.product.name}
                          sizes="56px"
                        />
                        <span className="absolute -top-1 -right-1 w-4.5 h-4.5 flex items-center justify-center bg-[#1a2744] text-white rounded-full font-ui text-[8px] font-bold">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <p className="font-ui text-[11px] font-semibold text-[#1a2744] leading-snug">{item.product.name}</p>
                        {item.size && <p className="font-ui text-[9px] uppercase tracking-widest text-[#9d9690] mt-0.5">Size {item.size}</p>}
                        <p className="font-body text-sm text-[#1a2744] font-semibold mt-1">
                          Rs. {(item.product.price * item.quantity).toLocaleString('en-PK')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-5 py-4 border-t border-[#f0ece5] bg-[#faf9f6] space-y-2">
                  <div className="flex justify-between">
                    <span className="font-ui text-[9px] uppercase tracking-widest text-[#9d9690]">Subtotal</span>
                    <span className="font-body text-sm text-[#1a2744]">Rs. {total.toLocaleString('en-PK')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-ui text-[9px] uppercase tracking-widest text-[#9d9690]">Delivery</span>
                    {deliveryCharge === null
                      ? <span className="font-body text-sm text-[#9d9690]">—</span>
                      : deliveryCharge === 0
                        ? <span className="font-ui text-[9px] font-bold uppercase tracking-wider text-[#c9a84c]">Free</span>
                        : <span className="font-body text-sm text-[#1a2744]">Rs. {deliveryCharge.toLocaleString('en-PK')}</span>
                    }
                  </div>
                  <div className="flex justify-between pt-2.5 border-t border-[#eae6de]">
                    <span className="font-ui text-[10px] uppercase tracking-widest font-semibold text-[#1a2744]">Total</span>
                    <span className="font-display text-lg font-semibold text-[#1a2744]">
                      {deliveryCharge === null
                        ? <span className="text-[#9d9690]">Rs. {total.toLocaleString('en-PK')}+</span>
                        : <>Rs. {grandTotal.toLocaleString('en-PK')}</>
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp support */}
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white border border-[#eae6de] rounded-xl hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-200 group">
                <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.46 0 .12 5.34.1 11.93c0 2.1.55 4.16 1.6 5.97L0 24l6.27-1.65a11.94 11.94 0 0 0 5.77 1.47h.01c6.58 0 11.93-5.34 11.94-11.93 0-3.18-1.24-6.18-3.48-8.41Z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-ui text-[10px] uppercase tracking-widest text-[#9d9690] mb-0.5">WhatsApp Support</p>
                  <p className="font-body text-sm font-semibold text-[#1a2744] group-hover:text-emerald-700 transition-colors">
                    {whatsappDisplay}
                  </p>
                </div>
              </a>

            </aside>
          </div>
        </div>
      </div>

      {/* ── Size Guide modal ──────────────────────────────────────────────────── */}
      {sizeGuide && (
        <div className="fixed inset-0 z-60 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-0 sm:p-6"
          onClick={() => setSizeGuide(false)}>
          <div className="bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl shadow-2xl max-h-[88vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-[#eae6de] px-6 py-4 flex items-center justify-between">
              <div>
                <p className="font-ui text-[9px] uppercase tracking-widest text-[#c9a84c] mb-0.5">Fit & Measurements</p>
                <h2 className="font-display text-xl font-semibold text-[#1a2744]">Size Guide</h2>
              </div>
              <button onClick={() => setSizeGuide(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#9d9690] hover:bg-[#f5f4f0] transition-colors">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="px-6 py-5"><SizeGuide /></div>
          </div>
        </div>
      )}
    </>
  )
}

// ── Payment detail card ───────────────────────────────────────────────────────
function PaymentDetail({
  title, rows, whatsapp,
}: {
  title: string
  rows: [string, string][]
  whatsapp: { link: string; number: string }
}) {
  return (
    <div className="space-y-3">
      <div className="bg-[#faf6ec] border border-[#e8dfc0] rounded-xl p-5">
        <p className="font-ui text-[10px] uppercase tracking-widest text-[#b89a3a] mb-3 font-semibold">{title}</p>
        <div className="space-y-2">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4">
              <span className="font-ui text-[9px] uppercase tracking-wider text-[#9d9690]">{k}</span>
              <span className={`font-body text-sm font-semibold text-right break-all select-all ${v === 'Free' ? 'text-[#c9a84c]' : 'text-[#1a2744]'}`}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp CTA */}
      <a href={whatsapp.link} target="_blank" rel="noopener noreferrer"
        className="flex items-start gap-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100/70 transition-colors">
        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M20.52 3.48A11.93 11.93 0 0 0 12.04 0C5.46 0 .12 5.34.1 11.93c0 2.1.55 4.16 1.6 5.97L0 24l6.27-1.65a11.94 11.94 0 0 0 5.77 1.47h.01c6.58 0 11.93-5.34 11.94-11.93 0-3.18-1.24-6.18-3.48-8.41Z"/>
          </svg>
        </div>
        <div>
          <p className="font-ui text-[10px] uppercase tracking-widest text-emerald-700 font-semibold mb-0.5">
            Send Payment Screenshot
          </p>
          <p className="font-body text-base font-semibold text-[#1a2744]">{whatsapp.number}</p>
          <p className="font-body text-xs text-[#9d9690] mt-1 leading-relaxed">
            After placing your order, send your payment proof here on WhatsApp to confirm.
          </p>
        </div>
      </a>
    </div>
  )
}
