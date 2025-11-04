/**
 * OAuth2 utilities
 */

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
