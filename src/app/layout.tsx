import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'

import { Header } from '@/components/layout/header'
import { SearchHistoryProvider } from '@/contexts/SearchHistoryContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { getAuthSession } from '@/actions/auth'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto'
})

export const metadata: Metadata = {
  title: 'YouTube Clone',
  description:
    'Watch, search, and discover videos with our YouTube-inspired platform. Built with Next.js, TypeScript, and YouTube Data API v3.',
  keywords: ['youtube', 'videos', 'streaming', 'video platform', 'watch videos', 'video search'],
  authors: [{ name: 'Mario Sergio Araujo Cabral' }],
  creator: 'Mario Sergio Araujo Cabral',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'YouTube Clone',
    description: 'Watch, search, and discover videos with our YouTube-inspired platform.',
    siteName: 'YouTube Clone'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Clone',
    description: 'Watch, search, and discover videos with our YouTube-inspired platform.'
  },
  icons: {
    icon: '/youtube-icon.svg',
    apple: '/youtube-icon.svg'
  }
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  // Get initial auth session from server-side cookies
  const initialSession = await getAuthSession()

  return (
    <html lang='en' className={roboto.variable}>
      <body className='antialiased'>
        <AuthProvider initialSession={initialSession}>
          <SearchHistoryProvider>
            <Header />
            {children}
          </SearchHistoryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
