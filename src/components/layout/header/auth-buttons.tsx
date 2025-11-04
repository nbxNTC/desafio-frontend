'use client'

import { Button } from '@/components/ui'
import { useGoogleLogin } from '@/hooks/useGoogleLogin'

/**
 * Authentication buttons component
 * Displays sign-in and create account buttons for unauthenticated users
 */
export function AuthButtons() {
  const { initiateLogin } = useGoogleLogin()

  const handleSignIn = () => {
    initiateLogin()
  }

  return (
    <>
      <Button variant='ghost' size='sm' onClick={handleSignIn} data-cy='auth-sign-in-button'>
        Sign-in
      </Button>

      <Button
        variant='outline'
        size='sm'
        onClick={handleSignIn}
        data-cy='auth-create-account-button'
      >
        <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
          />
        </svg>
        Create account
      </Button>
    </>
  )
}
