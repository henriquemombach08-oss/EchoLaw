import { NextRequest, NextResponse } from 'next/server'

const SESSION_COOKIE = 'sb-zjuvtuxxsrmqffnbhopq-auth-token'

const PROTECTED = ['/analise', '/historico', '/dashboard']
const AUTH_PAGES = ['/login', '/register']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasSession = request.cookies.has(SESSION_COOKIE)

  if (PROTECTED.some(p => pathname.startsWith(p)) && !hasSession) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (AUTH_PAGES.some(p => pathname.startsWith(p)) && hasSession) {
    return NextResponse.redirect(new URL('/analise/nova', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
