import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { orders, returns } from '@/lib/db/schema'
import { getSession } from '@/lib/auth'
import { eq, and } from 'drizzle-orm'

// GET /api/orders/[id] — get a single order (must belong to logged-in user)
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const order = await db.query.orders.findFirst({
    where: and(eq(orders.id, id), eq(orders.userId, session.userId)),
    with: { items: true, returns: true },
  })

  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  return NextResponse.json({ order })
}

// POST /api/orders/[id] — request a return
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const { reason } = await req.json()

  if (!reason) return NextResponse.json({ error: 'Return reason is required' }, { status: 400 })

  const order = await db.query.orders.findFirst({
    where: and(eq(orders.id, id), eq(orders.userId, session.userId)),
  })

  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  if (!['delivered'].includes(order.status)) {
    return NextResponse.json({ error: 'Only delivered orders can be returned' }, { status: 400 })
  }

  const [ret] = await db.insert(returns).values({ orderId: id, reason }).returning()
  await db.update(orders).set({ status: 'return_requested', updatedAt: new Date() }).where(eq(orders.id, id))

  return NextResponse.json({ return: ret }, { status: 201 })
}
