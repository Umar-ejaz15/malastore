import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { orders } from '@/lib/db/schema'
import { getSession } from '@/lib/auth'
import { desc, eq, like, or } from 'drizzle-orm'

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const search = searchParams.get('search')

  let query = db.query.orders.findMany({
    orderBy: [desc(orders.createdAt)],
    with: {
      items: true,
      user: { columns: { id: true, name: true, email: true } },
      returns: true,
    },
    where: status ? eq(orders.status, status as 'pending') : undefined,
  })

  const allOrders = await query

  const filtered = search
    ? allOrders.filter((o) => {
        const q = search.toLowerCase()
        return (
          o.orderNumber.toLowerCase().includes(q) ||
          o.guestEmail?.toLowerCase().includes(q) ||
          o.guestName?.toLowerCase().includes(q) ||
          o.user?.email?.toLowerCase().includes(q) ||
          o.user?.name?.toLowerCase().includes(q)
        )
      })
    : allOrders

  return NextResponse.json({ orders: filtered })
}
