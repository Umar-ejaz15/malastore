import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

// One-time admin account creation. Safe to call multiple times — idempotent.
export async function POST() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    return NextResponse.json({ error: 'ADMIN_EMAIL and ADMIN_PASSWORD must be set in env' }, { status: 400 })
  }

  const existing = await db.select({ id: users.id, role: users.role }).from(users).where(eq(users.email, email)).limit(1)
  if (existing.length > 0) {
    if (existing[0].role === 'admin') {
      return NextResponse.json({ message: 'Admin account already exists', email })
    }
    // Upgrade existing account to admin
    await db.update(users).set({ role: 'admin' }).where(eq(users.email, email))
    return NextResponse.json({ message: 'Existing account upgraded to admin', email })
  }

  const passwordHash = await bcrypt.hash(password, 12)
  await db.insert(users).values({ name: 'Admin', email, passwordHash, role: 'admin' })
  return NextResponse.json({ message: 'Admin account created', email }, { status: 201 })
}
