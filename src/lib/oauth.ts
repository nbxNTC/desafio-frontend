/**
 * Google OAuth2 configuration and utilities
 */

const OAUTH2_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth'

// YouTube API scopes
export const YOUTUBE_SCOPES = {
  READONLY: 'https://www.googleapis.com/auth/youtube.readonly',
  FORCE_SSL: 'https://www.googleapis.com/auth/youtube.force-ssl',
  UPLOAD: 'https://www.googleapis.com/auth/youtube.upload'
} as const

/**
 * OAuth2 configuration interface
 */
interface OAuth2Config {
  clientId: string
  redirectUri: string
  scopes: string[]
  state?: string
  includeGrantedScopes?: boolean
}

/**
 * Generate a random state token for CSRF protection
 */
function generateStateToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * Build OAuth2 authorization URL
 */
export function buildAuthUrl(config: OAuth2Config): string {
  const state = config.state || generateStateToken()

  // Store state in sessionStorage for verification later
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('oauth_state', state)
  }

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: 'token',
    scope: config.scopes.join(' '),
    state,
    include_granted_scopes: config.includeGrantedScopes ? 'true' : 'false'
  })

  return `${OAUTH2_ENDPOINT}?${params.toString()}`
}

/**
 * Initiate OAuth2 sign-in flow
 */
export function initiateOAuth2SignIn(
  clientId: string,
  scopes: string[] = [YOUTUBE_SCOPES.READONLY]
) {
  const redirectUri = window.location.origin

  const authUrl = buildAuthUrl({
    clientId,
    redirectUri,
    scopes,
    includeGrantedScopes: true
  })

  // Redirect to Google OAuth2 authorization page
  window.location.href = authUrl
}

/**
 * Parse OAuth2 response from URL hash
 */
export interface OAuth2Response {
  accessToken?: string
  tokenType?: string
  expiresIn?: number
  scope?: string
  state?: string
  error?: string
  errorDescription?: string
}

export function parseOAuth2Response(): OAuth2Response {
  if (typeof window === 'undefined') return {}

  const hash = window.location.hash.substring(1)
  const params = new URLSearchParams(hash)

  return {
    accessToken: params.get('access_token') || undefined,
    tokenType: params.get('token_type') || undefined,
    expiresIn: params.get('expires_in') ? parseInt(params.get('expires_in')!) : undefined,
    scope: params.get('scope') || undefined,
    state: params.get('state') || undefined,
    error: params.get('error') || undefined,
    errorDescription: params.get('error_description') || undefined
  }
}

/**
 * Verify OAuth2 state to prevent CSRF attacks
 */
export function verifyState(receivedState: string): boolean {
  if (typeof window === 'undefined') return false

  const storedState = sessionStorage.getItem('oauth_state')
  sessionStorage.removeItem('oauth_state')

  return storedState === receivedState
}

/**
 * Store access token in localStorage
 */
export function storeAccessToken(token: string, expiresIn: number) {
  if (typeof window === 'undefined') return

  const expiresAt = Date.now() + expiresIn * 1000

  localStorage.setItem('youtube_access_token', token)
  localStorage.setItem('youtube_token_expires_at', expiresAt.toString())
}

/**
 * Get stored access token
 */
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null

  const token = localStorage.getItem('youtube_access_token')
  const expiresAt = localStorage.getItem('youtube_token_expires_at')

  if (!token || !expiresAt) return null

  // Check if token is expired
  if (Date.now() >= parseInt(expiresAt)) {
    clearAccessToken()
    return null
  }

  return token
}

/**
 * Clear stored access token
 */
export function clearAccessToken() {
  if (typeof window === 'undefined') return

  localStorage.removeItem('youtube_access_token')
  localStorage.removeItem('youtube_token_expires_at')
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getAccessToken() !== null
}
