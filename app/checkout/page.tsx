'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { PlaceholderImage } from '@/components/ui/PlaceholderImage'

type Step = 1 | 2 | 3

const provinces = ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'Islamabad']

const inputClass =
  'w-full border border-beige bg-off-white text-brown font-body focus:outline-none focus:border-gold/70 transition-colors px-4 py-3'

const labelClass = 'font-ui text-brown-light block mb-1.5'

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
      <div className="text-center mb-12">
        <p className="font-display italic text-2xl text-brown">
          Mal<span className="text-gold-dark">ā</span>
        </p>
        <p className="font-ui text-brown-light mt-1" style={{ fontSize: 10, letterSpacing: '0.3em' }}>
          SECURE CHECKOUT
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center mb-12">
        {steps.map((s, i) => (
          <div key={s.n} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-ui transition-colors ${
                  step === s.n
                    ? 'bg-brown text-mala-white'
                    : step > s.n
                    ? 'bg-gold text-brown'
                    : 'bg-beige text-brown-light'
                }`}
                style={{ fontSize: 11 }}
              >
                {step > s.n ? (
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7L5.5 10.5L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  s.n
                )}
              </div>
              <span
                className={`font-ui transition-colors ${step === s.n ? 'text-brown' : 'text-brown-light'}`}
                style={{ fontSize: 10, letterSpacing: '0.18em' }}
              >
                {s.label.toUpperCase()}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-16 sm:w-24 h-px mx-3 mb-5 transition-colors ${step > s.n ? 'bg-gold' : 'bg-beige'}`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 items-start">

        {/* Form */}
        <div className="border border-beige p-6 sm:p-8">

          {/* Step 1: Contact */}
          {step === 1 && (
            <div>
              <h2 className="font-display italic text-2xl text-brown mb-6">Contact Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} style={{ fontSize: 10, letterSpacing: '0.2em' }}>FIRST NAME</label>
                  <input
                    type="text"
                    value={contact.firstName}
                    onChange={(e) => setContact({ ...contact, firstName: e.target.value })}
                    className={inputClass}
                    style={{ fontSize: 14 }}
                    placeholder="Ayesha"
                  />
                </div>
                <div>
                  <label className={labelClass} style={{ fontSize: 10, letterSpacing: '0.2em' }}>LAST NAME</label>
                  <input
                    type="text"
                    value={contact.lastName}
                    onChange={(e) => setContact({ ...contact, lastName: e.target.value })}
                    className={inputClass}
                    style={{ fontSize: 14 }}
                    placeholder="Khan"
                  />
                </div>
                <div className="col-span-2">
                  <label className={labelClass} style={{ fontSize: 10, letterSpacing: '0.2em' }}>EMAIL</label>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    className={inputClass}
                    style={{ fontSize: 14 }}
                    placeholder="ayesha@example.com"
                  />
                </div>
                <div className="col-span-2">
                  <label className={labelClass} style={{ fontSize: 10, letterSpacing: '0.2em' }}>PHONE</label>
                  <input
                    type="tel"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    className={inputClass}
                    style={{ fontSize: 14 }}
                    placeholder="+92 300 0000000"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Shipping */}
          {step === 2 && (
            <div>
              <h2 className="font-display italic text-2xl text-brown mb-6">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className={labelClass} style={{ fontSize: 10, letterSpacing: '0.2em' }}>ADDRESS</label>
                  <input
                    type="text"
                    value={shipping.address}
                    onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                    className={inputClass}
                    style={{ fontSize: 14 }}
                    placeholder="House 14, Street 5, DHA Phase 6"
                  />
                </div>
                <div>
                  <label className={labelClass} style={{ fontSize: 10, letterSpacing: '0.2em' }}>CITY</label>
                  <input
                    type="text"
                    value={shipping.city}
                    onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                    className={inputClass}
                    style={{ fontSize: 14 }}
                    placeholder="Lahore"
                  />
                </div>
                <div>
                  <label className={labelClass} style={{ fontSize: 10, letterSpacing: '0.2em' }}>PROVINCE</label>
                  <select
                    value={shipping.province}
                    onChange={(e) => setShipping({ ...shipping, province: e.target.value })}
                    className={`${inputClass} cursor-pointer`}
                    style={{ fontSize: 14 }}
                  >
                    {provinces.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className={labelClass} style={{ fontSize: 10, letterSpacing: '0.2em' }}>POSTAL CODE</label>
                  <input
                    type="text"
                    value={shipping.postal}
                    onChange={(e) => setShipping({ ...shipping, postal: e.target.value })}
                    className={inputClass}
                    style={{ fontSize: 14 }}
                    placeholder="54000"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div>
              <h2 className="font-display italic text-2xl text-brown mb-6">Payment Method</h2>
              <div className="flex flex-col gap-3 mb-6">
                {[
                  { value: 'cod', label: 'Cash on Delivery', sub: 'Pay when your order arrives' },
                  { value: 'card', label: 'Credit / Debit Card', sub: 'Visa, Mastercard, UnionPay' },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-start gap-4 p-4 border cursor-pointer transition-colors ${
                      payment.method === opt.value
                        ? 'border-brown bg-ivory'
                        : 'border-beige hover:border-sand'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={opt.value}
                      checked={payment.method === opt.value}
                      onChange={() => setPayment({ ...payment, method: opt.value })}
                      className="mt-0.5 accent-gold"
                    />
                    <div>
                      <p className="font-ui text-brown" style={{ fontSize: 11, letterSpacing: '0.15em' }}>
                        {opt.label.toUpperCase()}
                      </p>
                      <p className="font-body text-brown-light mt-0.5" style={{ fontSize: 13 }}>{opt.sub}</p>
                    </div>
                  </label>
                ))}
              </div>

              {payment.method === 'card' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className={labelClass} style={{ fontSize: 10, letterSpacing: '0.2em' }}>CARD NUMBER</label>
                    <input
                      type="text"
                      value={payment.cardNumber}
                      onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                      className={inputClass}
                      style={{ fontSize: 14 }}
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                    />
                  </div>
                  <div>
                    <label className={labelClass} style={{ fontSize: 10, letterSpacing: '0.2em' }}>EXPIRY</label>
                    <input
                      type="text"
                      value={payment.expiry}
                      onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                      className={inputClass}
                      style={{ fontSize: 14 }}
                      placeholder="MM / YY"
                      maxLength={7}
                    />
                  </div>
                  <div>
                    <label className={labelClass} style={{ fontSize: 10, letterSpacing: '0.2em' }}>CVV</label>
                    <input
                      type="text"
                      value={payment.cvv}
                      onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                      className={inputClass}
                      style={{ fontSize: 14 }}
                      placeholder="000"
                      maxLength={4}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={handleBack}
              className={`font-ui text-brown-light hover:text-brown transition-colors ${step === 1 ? 'invisible' : ''}`}
              style={{ fontSize: 11, letterSpacing: '0.15em' }}
            >
              &#8592; BACK
            </button>
            {step < 3 ? (
              <button
                onClick={handleNext}
                className="bg-brown text-mala-white font-ui font-semibold px-10 py-3.5 hover:bg-brown-mid transition-colors duration-300"
                style={{ fontSize: 11, letterSpacing: '0.22em' }}
              >
                CONTINUE &#8594;
              </button>
            ) : (
              <button
                onClick={handlePlaceOrder}
                className="bg-gold text-brown font-ui font-bold px-10 py-3.5 hover:bg-gold-dark transition-colors duration-300"
                style={{ fontSize: 11, letterSpacing: '0.22em' }}
              >
                PLACE ORDER
              </button>
            )}
          </div>
        </div>

        {/* Order summary sidebar */}
        <div className="lg:sticky lg:top-24 border border-beige p-6">
          <h3 className="font-display italic text-xl text-brown mb-5">Your Order</h3>

          <div className="flex flex-col gap-4 mb-5 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                <div className="w-12 aspect-3/4 shrink-0 overflow-hidden relative bg-off-white">
                  <PlaceholderImage variant={item.product.imgVariant} />
                  <span
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center bg-brown text-mala-white rounded-full font-ui"
                    style={{ fontSize: 9 }}
                  >
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-ui text-brown leading-snug" style={{ fontSize: 11, letterSpacing: '0.08em' }}>
                    {item.product.name}
                  </p>
                  {item.size && item.size !== 'Unstitched' && (
                    <p className="font-ui text-brown-light mt-0.5" style={{ fontSize: 9, letterSpacing: '0.15em' }}>
                      SIZE {item.size}
                    </p>
                  )}
                  <p className="font-body text-brown mt-0.5" style={{ fontSize: 13 }}>
                    Rs. {(item.product.price * item.quantity).toLocaleString('en-PK')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-beige pt-4 flex flex-col gap-2.5">
            <div className="flex justify-between">
              <span className="font-ui text-brown-light" style={{ fontSize: 10, letterSpacing: '0.15em' }}>SUBTOTAL</span>
              <span className="font-body text-brown" style={{ fontSize: 14 }}>Rs. {total.toLocaleString('en-PK')}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-ui text-brown-light" style={{ fontSize: 10, letterSpacing: '0.15em' }}>SHIPPING</span>
              <span className="font-ui text-gold" style={{ fontSize: 10, letterSpacing: '0.08em' }}>FREE</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-beige mt-1">
              <span className="font-ui text-brown" style={{ fontSize: 11, letterSpacing: '0.15em' }}>TOTAL</span>
              <span className="font-display italic text-lg text-brown">Rs. {total.toLocaleString('en-PK')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
