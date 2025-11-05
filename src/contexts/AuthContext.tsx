'use client'

import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react'
import {
  storeAuthSession,
  updateUserInfo,
  clearAuthSession,
  handleOAuth2Callback
} from '@/actions/auth'
import type { AuthState, UserInfo } from '@/types/auth'

// Types
type AuthAction =
  | {
      type: 'LOGIN'
      payload: { accessToken: string; expiresIn: number; user: UserInfo }
    }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: UserInfo }

interface AuthContextValue extends AuthState {
  signOut: () => void
}

// Reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN': {
      const expiresAt = Date.now() + action.payload.expiresIn * 1000

      const newState = {
        accessToken: action.payload.accessToken,
        tokenExpiresAt: expiresAt,
        user: action.payload.user
      }

      // Store in cookies via server action
      storeAuthSession(action.payload.accessToken, action.payload.expiresIn, action.payload.user)

      return newState
    }

    case 'LOGOUT': {
      // Clear cookies via server action
      clearAuthSession()
      return {}
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
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

interface AuthProviderProps {
  children: ReactNode
  initialSession?: AuthState
}

export function AuthProvider({ children, initialSession }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialSession || {})

  // Handle OAuth2 callback on mount
  useEffect(() => {
    const handleOAuth2 = async () => {
      const hash = window.location.hash

      // Check if hash contains OAuth2 response
      if (hash && hash.includes('access_token')) {
        // Process OAuth2 callback
        const result = await handleOAuth2Callback(hash)

        // Clear hash from URL
        window.history.replaceState(null, '', window.location.pathname + window.location.search)

        if (result.success && result.accessToken && result.expiresIn && result.user) {
          // Dispatch login action with OAuth2 data
          dispatch({
            type: 'LOGIN',
            payload: {
              accessToken: result.accessToken,
              expiresIn: result.expiresIn,
              user: result.user
            }
          })
        } else {
          // Handle OAuth2 error
          console.error('OAuth2 authentication failed:', result.error, result.errorDescription)
        }
      }
    }

    handleOAuth2()
  }, [])

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
