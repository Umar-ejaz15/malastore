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

      {/* Gold circle checkmark */}
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
        style={{ border: '1.5px solid #C9A84C' }}
      >
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none" className="text-gold">
          <path
            d="M8 20L16 28L32 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <p className="font-ui text-gold mb-4" style={{ fontSize: 10, letterSpacing: '0.35em' }}>
        ORDER CONFIRMED
      </p>

      <h1 className="font-display italic text-4xl md:text-5xl text-brown leading-tight mb-3">
        Thank you for shopping with Mal<span className="text-gold-dark">ā</span>
      </h1>

      <p className="font-body text-brown-light mb-8" style={{ fontSize: 16 }}>
        Your order has been received and is being processed.
      </p>

      {/* Order number */}
      <div className="bg-off-white border border-beige px-8 py-5 mb-6 w-full">
        <p className="font-ui text-brown-light mb-1" style={{ fontSize: 10, letterSpacing: '0.2em' }}>
          ORDER NUMBER
        </p>
        <p className="font-display italic text-2xl text-brown">{orderNumber}</p>
      </div>

      <p className="font-body text-brown-mid mb-2" style={{ fontSize: 15 }}>
        Estimated delivery: 3–5 business days
      </p>
      <p className="font-body text-brown-light mb-10" style={{ fontSize: 13 }}>
        Our team will contact you shortly to confirm your order details.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
        <Link
          href="/account"
          className="inline-flex items-center justify-center font-ui font-semibold border border-brown text-brown hover:bg-brown hover:text-mala-white transition-colors duration-300 px-8 py-4"
          style={{ fontSize: 11, letterSpacing: '0.22em' }}
        >
          TRACK ORDER
        </Link>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center font-ui font-semibold bg-brown text-mala-white hover:bg-brown-mid transition-colors duration-300 px-8 py-4"
          style={{ fontSize: 11, letterSpacing: '0.22em' }}
        >
          CONTINUE SHOPPING
        </Link>
      </div>
    </div>
  )
}
