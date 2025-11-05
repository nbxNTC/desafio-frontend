'use client'

import { useAuth } from '@/contexts/AuthContext'
import { UserMenu } from './user-menu'
import { AuthButtons } from './auth-buttons'

/**
 * User section component for the header
 * Conditionally renders user menu or auth buttons based on authentication status
 */
export function UserSection() {
  const { user } = useAuth()

  return (
    <div className='flex shrink-0 items-center gap-2'>{user ? <UserMenu /> : <AuthButtons />}</div>
  )
}
