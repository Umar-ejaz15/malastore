import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { returns } from '@/lib/db/schema'
import { getSession } from '@/lib/auth'
import { desc } from 'drizzle-orm'

export async function GET() {
  const session = await getSession()
  if (!session || session.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const allReturns = await db.query.returns.findMany({
    orderBy: [desc(returns.createdAt)],
    with: {
      order: {
        with: {
          items: true,
          user: { columns: { id: true, name: true, email: true } },
        },
      },
    },
  })

  return NextResponse.json({ returns: allReturns })
}
