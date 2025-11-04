'use server'

import { cookies } from 'next/headers'

// Cookie configuration
const AUTH_COOKIE_NAME = 'youtube_auth_session'

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/'
}

// Types
interface AuthSession {
  accessToken: string
  tokenExpiresAt: number
  user?: {
    name: string
    email: string
    picture: string
  }
}

/**
 * Store authentication session in a single cookie
 */
export async function storeAuthSession(
  accessToken: string,
  expiresIn: number,
  userInfo?: { name: string; email: string; picture: string }
) {
  const cookieStore = await cookies()
  const tokenExpiresAt = Date.now() + expiresIn * 1000

  const session: AuthSession = {
    accessToken,
    tokenExpiresAt,
    user: userInfo
  }

  cookieStore.set(AUTH_COOKIE_NAME, JSON.stringify(session), {
    ...COOKIE_OPTIONS,
    maxAge: expiresIn
  })
}

/**
 * Update user info in the auth session cookie
 */
export async function updateUserInfo(userInfo: { name: string; email: string; picture: string }) {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get(AUTH_COOKIE_NAME)

  if (!authCookie?.value) return

  try {
    const session: AuthSession = JSON.parse(authCookie.value)
    const maxAge = Math.max(0, Math.floor((session.tokenExpiresAt - Date.now()) / 1000))

    const updatedSession: AuthSession = {
      ...session,
      user: userInfo
    }

    cookieStore.set(AUTH_COOKIE_NAME, JSON.stringify(updatedSession), {
      ...COOKIE_OPTIONS,
      maxAge
    })
  } catch {
    // Invalid session, clear it
    await clearAuthSession()
  }
}

/**
 * Clear authentication session cookie
 */
export async function clearAuthSession() {
  const cookieStore = await cookies()
  cookieStore.delete(AUTH_COOKIE_NAME)
}

/**
 * Get authentication session from cookie
 */
export async function getAuthSession() {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get(AUTH_COOKIE_NAME)

  if (!authCookie?.value) {
    return null
  }

  try {
    const session: AuthSession = JSON.parse(authCookie.value)

    // Check if token is expired
    if (Date.now() >= session.tokenExpiresAt) {
      await clearAuthSession()
      return null
    }

    return {
      isAuthenticated: true,
      accessToken: session.accessToken,
      tokenExpiresAt: session.tokenExpiresAt,
      user: session.user || null
    }
  } catch {
    // Invalid session format, clear it
    await clearAuthSession()
    return null
  }
}

/**
 * Fetch user profile from Google People API and update session
 * @returns User profile information or null if failed
 */
export async function fetchAndUpdateUserProfile() {
  try {
    const { peopleService } = await import('@/services/people')
    const profile = await peopleService.getMyProfile()

    // Extract user info from profile
    const userInfo = {
      name: profile.names?.[0]?.displayName || '',
      email: profile.emailAddresses?.[0]?.value || '',
      picture: profile.photos?.[0]?.url || ''
    }

    return userInfo
  } catch (error) {
    const { log } = await import('@/utils/logger')
    log({
      severity: 'error',
      context: 'fetchAndUpdateUserProfile',
      message: error instanceof Error ? error.message : 'Failed to fetch user profile'
    })
    return null
  }
}
