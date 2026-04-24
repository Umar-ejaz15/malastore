'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'

type Step = 1 | 2 | 3

const provinces = ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'Islamabad']

const inputClass = 'w-full border border-grey-light bg-white text-navy font-body text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-colors px-4 py-3 rounded-lg'
const labelClass = 'font-ui text-[10px] uppercase tracking-widest text-grey block mb-1.5'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const [step, setStep] = useState<Step>(1)

  const [contact, setContact] = useState({ firstName: '', lastName: '', email: '', phone: '' })
  const [shipping, setShipping] = useState({ address: '', city: '', province: 'Punjab', postal: '' })
  const [payment, setPayment] = useState({ method: 'cod', cardNumber: '', expiry: '', cvv: '' })

  const steps = [
    { n: 1, label: 'Contact' },
    { n: 2, label: 'Shipping' },
    { n: 3, label: 'Payment' },
  ]

  const handleNext = () => { if (step < 3) setStep((s) => (s + 1) as Step) }
  const handleBack = () => { if (step > 1) setStep((s) => (s - 1) as Step) }
  const handlePlaceOrder = () => { clearCart(); router.push('/order-success') }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

      {/* Header */}
      <div className="text-center mb-10">
        <p className="font-display text-2xl font-semibold text-navy">
          Mal<span className="text-gold">ā</span>
        </p>
        <p className="font-ui text-grey text-[10px] tracking-[0.3em] uppercase mt-1">Secure Checkout</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center mb-10">
        {steps.map((s, i) => (
          <div key={s.n} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-ui text-xs font-semibold transition-colors ${
                step === s.n ? 'bg-navy text-white' : step > s.n ? 'bg-gold text-navy' : 'bg-beige text-grey'
              }`}>
                {step > s.n ? (
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7L5.5 10.5L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : s.n}
              </div>
              <span className={`font-ui text-[10px] uppercase tracking-widest transition-colors ${step === s.n ? 'text-navy' : 'text-grey'}`}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-16 sm:w-24 h-px mx-3 mb-5 transition-colors ${step > s.n ? 'bg-gold' : 'bg-grey-light'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 items-start">

        {/* Form */}
        <div className="bg-white rounded-2xl border border-grey-light p-6 sm:p-8">

          {step === 1 && (
            <div>
              <h2 className="font-display text-2xl font-semibold text-navy mb-6">Contact Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>First Name</label>
                  <input type="text" value={contact.firstName} onChange={(e) => setContact({ ...contact, firstName: e.target.value })} className={inputClass} placeholder="Ayesha"/>
                </div>
                <div>
                  <label className={labelClass}>Last Name</label>
                  <input type="text" value={contact.lastName} onChange={(e) => setContact({ ...contact, lastName: e.target.value })} className={inputClass} placeholder="Khan"/>
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>Email</label>
                  <input type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} className={inputClass} placeholder="ayesha@example.com"/>
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>Phone</label>
                  <input type="tel" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} className={inputClass} placeholder="+92 300 0000000"/>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-display text-2xl font-semibold text-navy mb-6">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className={labelClass}>Address</label>
                  <input type="text" value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} className={inputClass} placeholder="House 14, Street 5, DHA Phase 6"/>
                </div>
                <div>
                  <label className={labelClass}>City</label>
                  <input type="text" value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} className={inputClass} placeholder="Lahore"/>
                </div>
                <div>
                  <label className={labelClass}>Province</label>
                  <select value={shipping.province} onChange={(e) => setShipping({ ...shipping, province: e.target.value })} className={`${inputClass} cursor-pointer`}>
                    {provinces.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>Postal Code</label>
                  <input type="text" value={shipping.postal} onChange={(e) => setShipping({ ...shipping, postal: e.target.value })} className={inputClass} placeholder="54000"/>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-display text-2xl font-semibold text-navy mb-6">Payment Method</h2>
              <div className="flex flex-col gap-3 mb-6">
                {[
                  { value: 'cod', label: 'Cash on Delivery', sub: 'Pay when your order arrives' },
                  { value: 'card', label: 'Credit / Debit Card', sub: 'Visa, Mastercard, UnionPay' },
                ].map((opt) => (
                  <label key={opt.value} className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${
                    payment.method === opt.value ? 'border-navy bg-beige/20' : 'border-grey-light hover:border-grey'
                  }`}>
                    <input type="radio" name="payment" value={opt.value} checked={payment.method === opt.value} onChange={() => setPayment({ ...payment, method: opt.value })} className="mt-0.5 accent-gold"/>
                    <div>
                      <p className="font-ui text-xs font-semibold uppercase tracking-widest text-navy">{opt.label}</p>
                      <p className="font-body text-grey text-xs mt-0.5">{opt.sub}</p>
                    </div>
                  </label>
                ))}
              </div>

              {payment.method === 'card' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className={labelClass}>Card Number</label>
                    <input type="text" value={payment.cardNumber} onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })} className={inputClass} placeholder="0000 0000 0000 0000" maxLength={19}/>
                  </div>
                  <div>
                    <label className={labelClass}>Expiry</label>
                    <input type="text" value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} className={inputClass} placeholder="MM / YY" maxLength={7}/>
                  </div>
                  <div>
                    <label className={labelClass}>CVV</label>
                    <input type="text" value={payment.cvv} onChange={(e) => setPayment({ ...payment, cvv: e.target.value })} className={inputClass} placeholder="000" maxLength={4}/>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between mt-10">
            <button onClick={handleBack} className={`font-ui text-xs uppercase tracking-widest text-grey hover:text-navy transition-colors ${step === 1 ? 'invisible' : ''}`}>
              ← Back
            </button>
            {step < 3 ? (
              <button onClick={handleNext} className="bg-navy text-white font-ui text-xs font-semibold uppercase tracking-widest px-10 py-3.5 rounded-lg hover:bg-charcoal transition-colors">
                Continue →
              </button>
            ) : (
              <button onClick={handlePlaceOrder} className="bg-gold text-navy font-ui text-xs font-bold uppercase tracking-widest px-10 py-3.5 rounded-lg hover:bg-gold-dark transition-colors">
                Place Order
              </button>
            )}
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:sticky lg:top-24 bg-beige/30 rounded-2xl border border-grey-light p-6">
          <h3 className="font-display text-xl font-semibold text-navy mb-5">Your Order</h3>

          <div className="flex flex-col gap-4 mb-5 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                <div className="w-12 aspect-3/4 shrink-0 overflow-hidden rounded-md relative bg-beige">
                  <PlaceholderImage variant={item.product.imgVariant} />
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center bg-navy text-white rounded-full font-ui text-[9px]">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-ui text-xs font-semibold text-navy leading-snug">{item.product.name}</p>
                  {item.size && (
                    <p className="font-ui text-[9px] uppercase tracking-widest text-grey mt-0.5">Size {item.size}</p>
                  )}
                  <p className="font-body text-sm text-navy mt-0.5">Rs. {(item.product.price * item.quantity).toLocaleString('en-PK')}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-grey-light pt-4 flex flex-col gap-2.5">
            <div className="flex justify-between">
              <span className="font-ui text-[10px] uppercase tracking-widest text-grey">Subtotal</span>
              <span className="font-body text-sm text-navy">Rs. {total.toLocaleString('en-PK')}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-ui text-[10px] uppercase tracking-widest text-grey">Shipping</span>
              <span className="font-ui text-[10px] font-semibold text-gold uppercase tracking-wider">Free</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-grey-light mt-1">
              <span className="font-ui text-xs uppercase tracking-widest font-semibold text-navy">Total</span>
              <span className="font-display text-lg font-semibold text-navy">Rs. {total.toLocaleString('en-PK')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
