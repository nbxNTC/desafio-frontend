import { storeOAuthState } from '@/actions/auth'

/**
 * YouTube API scopes
 */
const YOUTUBE_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/youtube.upload'
] as const

/**
 * Generate random state token for CSRF protection
 */
function generateStateToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * Hook to handle Google OAuth2 login
 * @returns Function to initiate Google login flow
 */
export function useGoogleLogin() {
  const initiateLogin = async () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID
    const oAuthRedirectUrl = process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URL

    if (!clientId || !oAuthRedirectUrl) {
      console.error('Google OAuth Client ID or Redirect URL not found in environment variables')
      return
    }

    // Generate CSRF token
    const state = generateStateToken()

    // Store state in cookie via server action
    await storeOAuthState(state)

    // Build OAuth2 URL
    const redirectUri = window.location.origin
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'token',
      scope: YOUTUBE_SCOPES.join(' '),
      state
    })

    const authUrl = `${oAuthRedirectUrl}/auth?${params.toString()}`

    // Redirect to Google OAuth2
    window.location.href = authUrl
  }

  return { initiateLogin }
}
