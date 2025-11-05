/**
 * User information interface
 */
export interface UserInfo {
  name: string
  email: string
  picture: string
}

/**
 * Authentication state interface
 */
export interface AuthState {
  accessToken?: string
  tokenExpiresAt?: number
  user?: UserInfo
}

/**
 * Authentication session stored in cookies
 */
export interface AuthSession {
  accessToken: string
  tokenExpiresAt: number
  user: UserInfo
}

/**
 * OAuth2 response interface
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
