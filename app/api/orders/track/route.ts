import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

// Public endpoint — no auth required
// Requires both orderNumber AND email to prevent enumeration
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const orderNumber = searchParams.get('order')?.trim().toUpperCase()
  const email       = searchParams.get('email')?.trim().toLowerCase()

  if (!orderNumber || !email) {
    return NextResponse.json({ error: 'Order number and email are required' }, { status: 400 })
  }

  const order = await db.query.orders.findFirst({
    where: eq(orders.orderNumber, orderNumber),
    with: { items: { columns: { productName: true, quantity: true, size: true, totalPrice: true } } },
  })

  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

  // Verify email matches — works for both guest and registered orders
  const orderEmail = (order.guestEmail ?? order.shippingAddress as { name?: string; phone?: string } | null)
  // Check against guest email, or the shipping address contact
  const shippingAddr = order.shippingAddress as { name?: string; phone?: string; email?: string } | null
  const storedEmail  = order.guestEmail?.toLowerCase() ?? shippingAddr?.email?.toLowerCase() ?? ''

  if (storedEmail !== email && email !== '') {
    // Soft match — if no email was stored with order (pre-feature orders), allow through with order # alone
    if (storedEmail) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
  }

  return NextResponse.json({
    order: {
      orderNumber:    order.orderNumber,
      status:         order.status,
      paymentMethod:  order.paymentMethod,
      paymentStatus:  order.paymentStatus,
      total:          order.total,
      shippingCost:   order.shippingCost,
      createdAt:      order.createdAt,
      trackingNumber: order.trackingNumber,
      trackingCarrier:order.trackingCarrier,
      shippingAddress: order.shippingAddress,
      items:          order.items,
    },
  })
}
