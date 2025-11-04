import axios, { AxiosInstance } from 'axios'
import { cookies } from 'next/headers'
import { log } from '@/utils/logger'

/**
 * Google People API configuration
 * Used for accessing user profile information
 */
const PEOPLE_API_BASE_URL = process.env.PEOPLE_API_BASE_URL
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

if (!GOOGLE_API_KEY) {
  log({
    severity: 'warn',
    context: 'People API Configuration',
    message: 'GOOGLE_API_KEY is not configured in environment variables'
  })
}

/**
 * Axios instance configured to access Google People API
 * Requires OAuth2 authentication via access token stored in cookies
 * Should only be used in server-side code (Server Components, Server Actions, API Routes)
 */
export const peopleApi: AxiosInstance = axios.create({
  baseURL: PEOPLE_API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  params: {
    key: GOOGLE_API_KEY
  }
})

/**
 * Axios request interceptor to add access token from cookies
 */
peopleApi.interceptors.request.use(
  async (config) => {
    try {
      const cookieStore = await cookies()
      const authCookie = cookieStore.get('youtube_auth_session')

      if (authCookie?.value) {
        const session = JSON.parse(authCookie.value)
        if (session.accessToken) {
          config.headers.Authorization = `Bearer ${session.accessToken}`
        }
      }
    } catch (error) {
      log({
        severity: 'warn',
        context: 'Google People API',
        message: 'Failed to retrieve access token from cookies',
        stack: error instanceof Error ? error.stack : undefined
      })
    }
    return config
  },
  (error) => Promise.reject(error)
)

/**
 * Axios response interceptor to handle People API errors
 */
peopleApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.error) {
      // Google API error format
      const apiError = error.response.data.error
      log({
        severity: 'error',
        context: 'Google People API',
        message: apiError.message,
        payload: {
          code: apiError.code,
          status: apiError.status
        }
      })
    } else {
      // Generic error (network, timeout, etc)
      log({
        severity: 'error',
        context: 'Google People API',
        message: error.message,
        stack: error.stack
      })
    }
    return Promise.reject(error)
  }
)
