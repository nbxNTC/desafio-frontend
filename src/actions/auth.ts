'use server'

import { cookies } from 'next/headers'
import { peopleService } from '@/services/people'
import { log } from '@/utils/logger'
import { AUTH_COOKIE_NAME, OAUTH_STATE_COOKIE, COOKIE_OPTIONS } from '@/constants/auth'
import type { AuthSession, OAuth2Response, UserInfo } from '@/types/auth'

/**
 * Parse OAuth2 response from URL hash string
 * @param hash - URL hash string (e.g., '#access_token=...')
 */
export async function parseOAuth2Hash(hash: string): Promise<OAuth2Response> {
  const params = new URLSearchParams(hash.substring(1))
  const expiresInStr = params.get('expires_in')

  return {
    accessToken: params.get('access_token') || undefined,
    tokenType: params.get('token_type') || undefined,
    expiresIn: expiresInStr ? parseInt(expiresInStr) : undefined,
    scope: params.get('scope') || undefined,
    state: params.get('state') || undefined,
    error: params.get('error') || undefined,
    errorDescription: params.get('error_description') || undefined
  }
}

/**
 * Verify OAuth2 state from stored value
 * @param receivedState - State received from OAuth2 callback
 * @param storedState - State stored before OAuth2 flow
 */
export async function verifyStateFromValue(
  receivedState: string,
  storedState: string | undefined
): Promise<boolean> {
  return storedState === receivedState
}

/**
 * Store authentication session in a single cookie
 */
export async function storeAuthSession(accessToken: string, expiresIn: number, userInfo: UserInfo) {
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
export async function updateUserInfo(userInfo: UserInfo) {
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

  if (!authCookie?.value) return

  try {
    const session: AuthSession = JSON.parse(authCookie.value)

    // Check if token is expired
    if (Date.now() >= session.tokenExpiresAt) {
      await clearAuthSession()
      return
    }

    return session
  } catch {
    // Invalid session format, clear it
    await clearAuthSession()
    return
  }
}

/**
 * Fetch user profile from Google People API
 * @param accessToken - OAuth2 access token
 * @returns User profile information or null if failed
 */
export async function fetchUserProfile(accessToken: string) {
  try {
    const profile = await peopleService.fetchUserProfile(accessToken)

    // Extract user info from profile
    const userInfo = {
      name: profile.names?.[0]?.displayName || '',
      email: profile.emailAddresses?.[0]?.value || '',
      picture: profile.photos?.[0]?.url || ''
    }

    return userInfo
  } catch (error) {
    log({
      severity: 'error',
      context: 'fetchUserProfile',
      message: error instanceof Error ? error.message : 'Failed to fetch user profile'
    })
    return
  }
}

/**
 * Handle complete OAuth2 authentication flow from hash
 * Validates OAuth response, verifies state, fetches user profile
 * @param hash - URL hash containing OAuth2 response
 * @returns Authentication data or error
 */
export async function handleOAuth2Callback(hash: string) {
  try {
    const cookieStore = await cookies()

    // Parse OAuth2 response from hash
    const oauthResponse = await parseOAuth2Hash(hash)

    // Handle OAuth errors
    if (oauthResponse.error) {
      log({
        severity: 'error',
        context: 'handleOAuth2Callback',
        message: `OAuth2 error: ${oauthResponse.error} - ${oauthResponse.errorDescription}`
      })

      // Clear state cookie
      cookieStore.delete(OAUTH_STATE_COOKIE)

      return {
        success: false,
        error: oauthResponse.error,
        errorDescription: oauthResponse.errorDescription
      }
    }

    // Validate OAuth response
    if (!oauthResponse.accessToken || !oauthResponse.expiresIn) {
      log({
        severity: 'error',
        context: 'handleOAuth2Callback',
        message: 'Invalid OAuth2 response: missing access token or expires_in'
      })

      // Clear state cookie
      cookieStore.delete(OAUTH_STATE_COOKIE)

      return {
        success: false,
        error: 'invalid_response',
        errorDescription: 'Missing required OAuth2 parameters'
      }
    }

    // Verify state to prevent CSRF attacks
    if (oauthResponse.state) {
      const storedState = cookieStore.get(OAUTH_STATE_COOKIE)?.value
      const isStateValid = await verifyStateFromValue(oauthResponse.state, storedState)

      if (!isStateValid) {
        log({
          severity: 'error',
          context: 'handleOAuth2Callback',
          message: 'State verification failed - possible CSRF attack'
        })

        // Clear state cookie
        cookieStore.delete(OAUTH_STATE_COOKIE)

        return {
          success: false,
          error: 'invalid_state',
          errorDescription: 'State verification failed'
        }
      }
    }

    // Clear state cookie after verification
    cookieStore.delete(OAUTH_STATE_COOKIE)

    // Fetch user profile
    const userInfo = await fetchUserProfile(oauthResponse.accessToken)

    if (!userInfo) {
      log({
        severity: 'info',
        context: 'handleOAuth2Callback',
        message: 'Failed to fetch user profile, proceeding without user info'
      })

      return {
        success: false,
        error: 'user_info_unavailable',
        errorDescription: 'User info not available'
      }
    }

    log({
      severity: 'info',
      context: 'handleOAuth2Callback',
      message: 'User authenticated successfully via OAuth2'
    })

    // Return successful authentication data
    return {
      success: true,
      accessToken: oauthResponse.accessToken,
      expiresIn: oauthResponse.expiresIn,
      user: userInfo
    }
  } catch (error) {
    log({
      severity: 'error',
      context: 'handleOAuth2Callback',
      message: error instanceof Error ? error.message : 'Unexpected error during OAuth2 callback'
    })

    // Clear state cookie on error
    const cookieStore = await cookies()
    cookieStore.delete(OAUTH_STATE_COOKIE)

    return {
      success: false,
      error: 'unexpected_error',
      errorDescription: error instanceof Error ? error.message : 'Unexpected error occurred'
    }
  }
}

/**
 * Store OAuth state in cookie for CSRF protection
 * @param state - The OAuth state token to store
 */
export async function storeOAuthState(state: string) {
  const cookieStore = await cookies()

  cookieStore.set(OAUTH_STATE_COOKIE, state, {
    ...COOKIE_OPTIONS,
    maxAge: 60 * 10 // 10 minutes
  })
}
