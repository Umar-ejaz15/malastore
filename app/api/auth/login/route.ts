import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { users, orders } from '@/lib/db/schema'
import { signToken, cookieOptions } from '@/lib/auth'
import { eq, and, isNull } from 'drizzle-orm'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const [user] = await db.select().from(users).where(eq(users.email, email.toLowerCase().trim())).limit(1)
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    // Link any previous guest orders placed with this email to this account
    await db
      .update(orders)
      .set({ userId: user.id })
      .where(and(eq(orders.guestEmail, user.email), isNull(orders.userId)))

    const token = await signToken({ userId: user.id, email: user.email, name: user.name, role: user.role })
    const opts = cookieOptions()

    const res = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } })
    res.cookies.set(opts.name, token, opts)
    return res
  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json({ error: 'Login failed. Please try again.' }, { status: 500 })
  }
}
