import axios, { AxiosInstance } from 'axios'
import { log } from '@/utils/logger'

/**
 * YouTube API configuration
 * This service is designed to run on the server-side (SSR)
 */
const YOUTUBE_API_BASE_URL = process.env.YOUTUBE_API_BASE_URL
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

if (!GOOGLE_API_KEY) {
  log({
    severity: 'warn',
    context: 'YouTube API Configuration',
    message: 'GOOGLE_API_KEY is not configured in environment variables'
  })
}

/**
 * Axios instance configured to access YouTube API directly
 * Should only be used in server-side code (Server Components, Server Actions, API Routes)
 */
export const youtubeApi: AxiosInstance = axios.create({
  baseURL: YOUTUBE_API_BASE_URL,
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
 * Axios interceptor to handle YouTube API errors
 */
youtubeApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.error) {
      // YouTube API error format
      const apiError = error.response.data.error
      log({
        severity: 'error',
        context: 'YouTube API',
        message: apiError.message,
        payload: {
          code: apiError.code,
          errors: apiError.errors
        }
      })
    } else {
      // Generic error (network, timeout, etc)
      log({
        severity: 'error',
        context: 'YouTube API',
        message: error.message,
        stack: error.stack
      })
    }
    return Promise.reject(error)
  }
)
