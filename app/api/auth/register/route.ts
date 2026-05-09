import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { users, orders } from '@/lib/db/schema'
import { signToken, cookieOptions } from '@/lib/auth'
import { eq, and, isNull } from 'drizzle-orm'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()

    const existing = await db.select({ id: users.id }).from(users).where(eq(users.email, normalizedEmail)).limit(1)
    if (existing.length > 0) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 12)
    const [user] = await db.insert(users).values({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      role: 'customer',
    }).returning({ id: users.id, email: users.email, name: users.name, role: users.role })

    // Link any guest orders placed with this email to the new account
    await db
      .update(orders)
      .set({ userId: user.id })
      .where(and(eq(orders.guestEmail, normalizedEmail), isNull(orders.userId)))

    const token = await signToken({ userId: user.id, email: user.email, name: user.name, role: user.role })
    const opts = cookieOptions()

    const res = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } }, { status: 201 })
    res.cookies.set(opts.name, token, opts)
    return res
  } catch (err) {
    console.error('Register error:', err)
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 })
  }
}
