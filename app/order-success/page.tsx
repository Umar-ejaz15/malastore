import Link from 'next/link'

function getOrderNumber() {
  const now = new Date('2026-04-20')
  const seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate()
  return `OD-2026-${(seed % 9000) + 1000}`
}

export default function OrderSuccessPage() {
  const orderNumber = getOrderNumber()

  return (
    <div className="max-w-lg mx-auto px-4 py-24 flex flex-col items-center text-center">

      <div className="w-20 h-20 rounded-full border border-gold/60 flex items-center justify-center mb-7">
        <svg width="32" height="32" viewBox="0 0 40 40" fill="none" className="text-gold">
          <path d="M8 20L16 28L32 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <p className="font-ui text-gold text-[10px] tracking-[0.35em] uppercase mb-4">Order Confirmed</p>

      <h1 className="font-display text-4xl md:text-5xl font-semibold text-navy leading-tight mb-3">
        Thank you for shopping with<br />
        <span className="text-gold">Mala By Kashmala</span>
      </h1>

      <p className="font-body text-grey text-sm mb-8 leading-relaxed">
        Your order has been received and is being processed. Our team will contact you shortly to confirm your order details.
      </p>

      <div className="bg-beige/50 border border-grey-light rounded-xl px-8 py-5 mb-6 w-full">
        <p className="font-ui text-grey text-[10px] tracking-widest uppercase mb-2">Order Number</p>
        <p className="font-display text-2xl font-semibold text-navy">{orderNumber}</p>
      </div>

      <p className="font-body text-grey text-sm mb-1">Estimated delivery: 3–5 business days</p>

      <div className="flex flex-col sm:flex-row gap-3 w-full justify-center mt-10">
        <Link
          href="/account"
          className="inline-flex items-center justify-center font-ui text-xs font-semibold uppercase tracking-widest border border-navy text-navy hover:bg-navy hover:text-white transition-colors px-8 py-4 rounded-lg"
        >
          Track Order
        </Link>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center font-ui text-xs font-semibold uppercase tracking-widest bg-navy text-white hover:bg-charcoal transition-colors px-8 py-4 rounded-lg"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
