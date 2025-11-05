import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb'
    }
  }
}

export default nextConfig
