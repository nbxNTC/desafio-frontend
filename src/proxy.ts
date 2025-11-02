import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const publicAuthRoutes = ['/login', '/create-account']
  const homeRoute = '/'

  // Check if user is logged in (using cookie or session token)
  const token = req.cookies.get('auth-token')?.value
  const isLoggedIn = Boolean(token)

  // Redirect logged-in users away from auth pages
  if (publicAuthRoutes.some((publicRoute) => pathname.includes(publicRoute)) && isLoggedIn) {
    return NextResponse.redirect(new URL(homeRoute, req.url))
  }

  // Redirect non-logged-in users to login page
  if (
    pathname.includes('/app') &&
    !publicAuthRoutes.some((publicRoute) => pathname.includes(publicRoute)) &&
    !isLoggedIn
  ) {
    return NextResponse.redirect(new URL('/app/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|apple-icon|icon|favicon|.*\\.png$|.*\\.svg$).*)']
}
