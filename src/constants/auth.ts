/**
 * Cookie names for authentication
 */
export const AUTH_COOKIE_NAME = 'youtube_auth_session'
export const OAUTH_STATE_COOKIE = 'oauth_state'

/**
 * Cookie configuration options
 */
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/'
} as const
