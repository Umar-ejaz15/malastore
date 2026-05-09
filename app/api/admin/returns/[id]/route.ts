import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { returns, orders } from '@/lib/db/schema'
import { getSession } from '@/lib/auth'
import { eq } from 'drizzle-orm'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  const { status, adminNotes } = await req.json()

  const [updated] = await db.update(returns)
    .set({ status, adminNotes, updatedAt: new Date() })
    .where(eq(returns.id, id))
    .returning()

  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Sync order status with return status
  if (status === 'approved' || status === 'received') {
    await db.update(orders).set({ status: 'return_requested', updatedAt: new Date() }).where(eq(orders.id, updated.orderId))
  } else if (status === 'refunded') {
    await db.update(orders).set({ status: 'returned', paymentStatus: 'refunded', updatedAt: new Date() }).where(eq(orders.id, updated.orderId))
  }

  return NextResponse.json({ return: updated })
}
