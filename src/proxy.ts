import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAuthSession } from './actions/auth'

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const publicAuthRoutes = ['/login', '/create-account']
  const homeRoute = '/'

  // Check if user is logged in
  const session = await getAuthSession()
  const isAuthenticated = !!session

  // Redirect logged-in users away from auth pages
  if (publicAuthRoutes.some((publicRoute) => pathname.includes(publicRoute)) && isAuthenticated) {
    return NextResponse.redirect(new URL(homeRoute, req.url))
  }

  // Redirect non-logged-in users to login page
  if (
    pathname.includes('/app') &&
    !publicAuthRoutes.some((publicRoute) => pathname.includes(publicRoute)) &&
    !isAuthenticated
  ) {
    return NextResponse.redirect(new URL('/app/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|apple-icon|icon|favicon|.*\\.png$|.*\\.svg$).*)']
}
