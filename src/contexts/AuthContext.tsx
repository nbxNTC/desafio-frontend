'use client'

import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { parseOAuth2Response, verifyState } from '@/utils/oauth'
import {
  storeAuthSession,
  updateUserInfo,
  clearAuthSession,
  fetchAndUpdateUserProfile
} from '@/actions/auth'
import { log } from '@/utils/logger'

// Types
interface UserInfo {
  name: string
  email: string
  picture: string
}

interface AuthState {
  isAuthenticated: boolean
  accessToken: string | null
  tokenExpiresAt: number | null
  user: UserInfo | null
}

type AuthAction =
  | {
      type: 'LOGIN'
      payload: { accessToken: string; expiresIn: number; user?: UserInfo }
    }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: UserInfo }

interface AuthContextValue extends AuthState {
  signOut: () => void
}

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  tokenExpiresAt: null,
  user: null
}

// Reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN': {
      const expiresAt = Date.now() + action.payload.expiresIn * 1000
      const newState = {
        isAuthenticated: true,
        accessToken: action.payload.accessToken,
        tokenExpiresAt: expiresAt,
        user: action.payload.user || state.user
      }

      // Store in cookies via server action
      storeAuthSession(action.payload.accessToken, action.payload.expiresIn, action.payload.user)

      return newState
    }

    case 'LOGOUT': {
      // Clear cookies via server action
      clearAuthSession()
      return initialState
    }

    case 'UPDATE_USER': {
      const newState = {
        ...state,
        user: action.payload
      }

      // Update cookies via server action
      updateUserInfo(action.payload)

      return newState
    }

    default:
      return state
  }
}

// Context
const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
  initialSession?: AuthState | null
}

export function AuthProvider({ children, initialSession }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialSession || initialState)
  const router = useRouter()
  const pathname = usePathname()

  // Handle OAuth2 callback
  useEffect(() => {
    const handleOAuthCallback = async () => {
      // Only process if we have a hash in the URL
      if (!window.location.hash) return

      try {
        const response = parseOAuth2Response()

        // Check if this is an OAuth response
        if (!response.accessToken && !response.error) return

        // Handle errors
        if (response.error) {
          log({
            severity: 'error',
            context: 'AuthProvider',
            message: `OAuth2 error: ${response.error} - ${response.errorDescription || 'No description'}`
          })
          window.history.replaceState(null, '', pathname)
          return
        }

        // Verify state to prevent CSRF attacks
        if (response.state && !verifyState(response.state)) {
          log({
            severity: 'error',
            context: 'AuthProvider',
            message: 'State verification failed - possible CSRF attack'
          })
          window.history.replaceState(null, '', pathname)
          return
        }

        // Store access token if present
        if (response.accessToken && response.expiresIn) {
          dispatch({
            type: 'LOGIN',
            payload: {
              accessToken: response.accessToken,
              expiresIn: response.expiresIn
            }
          })

          log({
            severity: 'info',
            context: 'AuthProvider',
            message: 'User authenticated successfully'
          })

          // Clean up URL hash
          window.history.replaceState(null, '', pathname)

          // Redirect to home if not already there
          if (pathname !== '/') router.push('/')
        }
      } catch (error) {
        log({
          severity: 'error',
          context: 'AuthProvider',
          message: error instanceof Error ? error.message : 'Failed to process OAuth callback'
        })
      }
    }

    handleOAuthCallback()
  }, [pathname, router])

  // Fetch user profile on mount if authenticated
  useEffect(() => {
    const loadUserProfile = async () => {
      if (state.isAuthenticated && state.accessToken) {
        const userInfo = await fetchAndUpdateUserProfile()
        if (userInfo) {
          dispatch({
            type: 'UPDATE_USER',
            payload: userInfo
          })
        }
      }
    }

    loadUserProfile()
  }, [state.isAuthenticated, state.accessToken])

  const signOut = async () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
