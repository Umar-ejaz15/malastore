import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users, orders } from '@/lib/db/schema'
import { getSession } from '@/lib/auth'
import { eq, count, desc } from 'drizzle-orm'

export async function GET() {
  const session = await getSession()
  if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const customers = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      phone: users.phone,
      createdAt: users.createdAt,
      orderCount: count(orders.id),
    })
    .from(users)
    .leftJoin(orders, eq(orders.userId, users.id))
    .where(eq(users.role, 'customer'))
    .groupBy(users.id)
    .orderBy(desc(users.createdAt))

  return NextResponse.json({ customers })
}
