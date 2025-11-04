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
  const initiateLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID

    if (!clientId) {
      console.error('Google OAuth Client ID not found in environment variables')
      return
    }

    // Generate CSRF token
    const state = generateStateToken()
    sessionStorage.setItem('oauth_state', state)

    // Build OAuth2 URL
    const redirectUri = window.location.origin
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'token',
      scope: YOUTUBE_SCOPES.join(' '),
      state
    })

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`

    // Redirect to Google OAuth2
    window.location.href = authUrl
  }

  return { initiateLogin }
}
