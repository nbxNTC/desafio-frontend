'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui'
import { useAuth } from '@/contexts/AuthContext'

/**
 * User menu dropdown component
 * Displays user profile picture and dropdown with user info and sign out option
 */
export function UserMenu() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = () => {
    signOut()
  }

  const handleUpload = () => {
    router.push('/upload')
  }

  return (
    <>
      <Button
        className='hidden md:flex'
        variant='secondary'
        size='sm'
        onClick={handleUpload}
        data-cy='upload-video-button'
        aria-label='Upload video'
      >
        <svg
          className='mr-2 h-4 w-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          aria-hidden='true'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
        </svg>
        Upload video
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='icon-sm'
            className='relative overflow-hidden rounded-full p-0'
            data-cy='user-menu-button'
            aria-label={`User menu - ${user?.name || 'User'}`}
          >
            {user?.picture ? (
              <Image src={user.picture} alt={user.name || 'User'} fill className='object-cover' />
            ) : (
              <div
                className='flex h-full w-full items-center justify-center bg-gray-300'
                role='img'
                aria-label='Default user avatar'
              >
                <svg
                  className='h-5 w-5 text-gray-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                  />
                </svg>
              </div>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-56'>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm leading-none font-medium'>
                {user?.name || 'Username not available'}
              </p>
              <p className='text-muted-foreground text-xs leading-none'>
                {user?.email || 'E-mail not available'}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <div className='md:hidden'>
            <DropdownMenuItem onClick={handleUpload} className='cursor-pointer' role='menuitem'>
              <svg
                className='mr-2 h-4 w-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 4v16m8-8H4'
                />
              </svg>
              Upload video
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </div>

          <DropdownMenuItem onClick={handleSignOut} className='cursor-pointer' role='menuitem'>
            <svg
              className='mr-2 h-4 w-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
              />
            </svg>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
