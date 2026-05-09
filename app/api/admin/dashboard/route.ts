import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { orders, users, returns } from '@/lib/db/schema'
import { getSession } from '@/lib/auth'
import { eq, count, sum, desc } from 'drizzle-orm'

export async function GET() {
  const session = await getSession()
  if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const [totalOrdersResult] = await db.select({ count: count() }).from(orders)
  const [totalRevenueResult] = await db.select({ sum: sum(orders.total) }).from(orders).where(eq(orders.status, 'delivered'))
  const [pendingOrdersResult] = await db.select({ count: count() }).from(orders).where(eq(orders.status, 'pending'))
  const [totalCustomersResult] = await db.select({ count: count() }).from(users).where(eq(users.role, 'customer'))
  const [openReturnsResult] = await db.select({ count: count() }).from(returns).where(eq(returns.status, 'requested'))

  // Orders needing a verification call (pending status)
  const pendingVerification = await db.query.orders.findMany({
    where: eq(orders.status, 'pending'),
    orderBy: [desc(orders.createdAt)],
    with: {
      items: { columns: { productName: true, quantity: true, size: true } },
      user: { columns: { id: true, name: true, email: true, phone: true } },
    },
  })

  const recentOrders = await db.query.orders.findMany({
    where: (o, { ne }) => ne(o.status, 'pending'),
    orderBy: [desc(orders.createdAt)],
    limit: 8,
    with: { items: true, user: { columns: { id: true, name: true, email: true } } },
  })

  return NextResponse.json({
    stats: {
      totalOrders: Number(totalOrdersResult.count),
      totalRevenue: Number(totalRevenueResult.sum ?? 0),
      pendingOrders: Number(pendingOrdersResult.count),
      totalCustomers: Number(totalCustomersResult.count),
      openReturns: Number(openReturnsResult.count),
    },
    pendingVerification,
    recentOrders,
  })
}
