import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { orders, orderItems } from '@/lib/db/schema'
import { getSession, generateOrderNumber } from '@/lib/auth'
import { eq, or, desc } from 'drizzle-orm'

// GET /api/orders — orders for the logged-in user (by userId OR by contact email)
export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const userOrders = await db.query.orders.findMany({
    where: (o, { or: orFn, eq: eqFn }) =>
      orFn(eqFn(o.userId, session.userId), eqFn(o.guestEmail, session.email)),
    with: { items: true },
    orderBy: [desc(orders.createdAt)],
  })

  return NextResponse.json({ orders: userOrders })
}

// POST /api/orders — create a new order (guest or authenticated)
export async function POST(req: NextRequest) {
  try {
    const session = await getSession()
    const body = await req.json()

    const {
      contact,      // { firstName, lastName, email, phone }
      shipping,     // { address, city, province, postal }
      paymentMethod,
      items,
      subtotal,
      shippingCost,
      total,
    } = body

    if (!contact || !shipping || !paymentMethod || !items?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const orderNumber = generateOrderNumber()
    const contactEmail = (contact.email as string).toLowerCase().trim()

    const shippingAddress = {
      name:     `${contact.firstName} ${contact.lastName}`.trim(),
      email:    contactEmail,
      phone:    contact.phone,
      address:  shipping.address,
      city:     shipping.city,
      province: shipping.province,
      postal:   shipping.postal,
    }

    const [order] = await db.insert(orders).values({
      orderNumber,
      userId:      session?.userId ?? null,
      // Always store guest contact info for easy lookup and backfill
      guestName:  `${contact.firstName} ${contact.lastName}`.trim(),
      guestEmail:  contactEmail,
      guestPhone:  contact.phone,
      status:      'pending',
      paymentMethod,
      paymentStatus: 'pending',
      subtotal:    String(subtotal),
      shippingCost: String(shippingCost),
      total:       String(total),
      shippingAddress,
    }).returning({ id: orders.id, orderNumber: orders.orderNumber })

    const itemRows = items.map((item: {
      product: { id: string; name: string; slug: string; sku?: string; price: number }
      quantity: number
      size?: string
      imageUrl?: string
    }) => ({
      orderId:     order.id,
      productId:   item.product.id,
      productName: item.product.name,
      productSlug: item.product.slug,
      productSku:  item.product.sku ?? null,
      size:        item.size ?? null,
      quantity:    item.quantity,
      unitPrice:   String(item.product.price),
      totalPrice:  String(item.product.price * item.quantity),
      imageUrl:    item.imageUrl ?? null,
    }))

    await db.insert(orderItems).values(itemRows)

    return NextResponse.json({ orderId: order.id, orderNumber: order.orderNumber }, { status: 201 })
  } catch (err) {
    console.error('Create order error:', err)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
