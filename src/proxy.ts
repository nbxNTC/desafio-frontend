import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAuthSession } from './actions/auth'

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const privateRoutes = ['/upload']
  const authRoutes = ['/login', '/create-account']

  // Check if user is logged in
  const session = await getAuthSession()
  const isAuthenticated = !!session

  // If user is logged in and tries to access auth routes, redirect to home
  if (authRoutes.some((publicRoute) => pathname.includes(publicRoute)) && isAuthenticated) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // If user is not logged in and tries to access private routes, redirect to home
  if (!isAuthenticated && privateRoutes.some((privateRoute) => pathname.includes(privateRoute))) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|apple-icon|icon|favicon|.*\\.png$|.*\\.svg$).*)']
}
