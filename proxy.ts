import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth'

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const session = await getSessionFromRequest(req)

  // ── Admin routes ────────────────────────────────────────────────────────────
  if (pathname.startsWith('/admin')) {
    // Skip the login page — accessible without session
    if (pathname === '/admin/login') return NextResponse.next()
    if (!session) return NextResponse.redirect(new URL('/admin/login', req.url))
    if (session.role !== 'admin') return NextResponse.redirect(new URL('/', req.url))
    return NextResponse.next()
  }

  // ── Account routes — admins never land here ─────────────────────────────────
  if (pathname === '/account' || pathname.startsWith('/account/')) {
    if (session?.role === 'admin') {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
    // Protect sub-routes that require any login
    if (!session && (pathname.startsWith('/account/orders') || pathname.startsWith('/account/profile'))) {
      return NextResponse.redirect(new URL('/account?redirect=' + encodeURIComponent(pathname), req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/admin', '/account', '/account/:path*'],
}
