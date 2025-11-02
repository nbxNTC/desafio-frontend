import { log } from '@/utils/logger'
import axios, { AxiosError } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

// Proxy configuration for the API
const API_BASE_URL = process.env.API_URL

// Helper function to proxy requests
async function proxyRequest(req: NextRequest, method: string) {
  try {
    const url = new URL(req.url)
    const apiPath = url.searchParams.get('path') || ''
    const targetUrl = API_BASE_URL + apiPath

    // Prepare headers
    const headers: Record<string, string> = {
      accept: 'application/json',
      'Content-Type': 'application/json'
    }

    // Copy authorization headers if they exist
    // const session = await auth()
    // if (session?.accessToken) headers['Authorization'] = `Bearer ${session.accessToken}`

    const data = await req.json().catch(() => undefined)

    // Make the request to the API
    const response = await axios({
      method: method.toLowerCase(),
      url: targetUrl,
      headers,
      data,
      timeout: 30000 // 30 seconds timeout
    })

    // Return the API response
    return NextResponse.json(response.data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>

    log({
      severity: 'error',
      context: 'API Proxy',
      message: axiosError.response?.data.message || axiosError.message,
      stack: axiosError.stack
    })

    // If it's an axios error with API response
    if (axiosError.response?.data)
      return NextResponse.json(
        { message: axiosError.response.data.message || 'API Error' },
        { status: axiosError.response.status }
      )

    // Other errors (timeout, network, etc)
    return NextResponse.json({ error: axiosError.message }, { status: 500 })
  }
}

// Handlers for each HTTP method
export async function GET(req: NextRequest) {
  return proxyRequest(req, 'GET')
}

export async function POST(req: NextRequest) {
  return proxyRequest(req, 'POST')
}

export async function PUT(req: NextRequest) {
  return proxyRequest(req, 'PUT')
}

export async function PATCH(req: NextRequest) {
  return proxyRequest(req, 'PATCH')
}

export async function DELETE(req: NextRequest) {
  return proxyRequest(req, 'DELETE')
}
