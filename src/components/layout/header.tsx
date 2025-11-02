'use client'

import * as React from 'react'
import Link from 'next/link'
import { SearchBar, Button } from '@/components/ui'

export function Header() {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query)
    // TODO: Implementar navegação e busca usando Context API
  }

  return (
    <header className='sticky top-0 z-50 w-full bg-white'>
      <div className='flex h-14 items-center justify-between gap-4 px-5'>
        {/* Logo do YouTube */}
        <Link href='/' className='flex shrink-0 items-center gap-1'>
          <div className='flex items-center'>
            <svg viewBox='0 0 24 24' className='h-10 w-10 text-red-600' fill='currentColor'>
              <path d='M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z' />
            </svg>

            <span className='ml-1 text-xl font-bold tracking-tight'>
              <span className='text-gray-900 dark:text-white'>You</span>
              <span className='text-gray-900 dark:text-white'>Tube</span>
            </span>
          </div>
        </Link>

        {/* Barra de Busca */}
        <div className='mx-auto flex max-w-2xl flex-1 justify-center'>
          <SearchBar onSearch={handleSearch} placeholder='Search' className='w-full' />
        </div>

        {/* Botões de Login e Cadastro */}
        <div className='flex shrink-0 items-center gap-2'>
          <Button variant='ghost' size='sm' asChild>
            <Link href='/login'>Sign-in</Link>
          </Button>

          <Button variant='outline' size='sm' asChild>
            <Link href='/cadastro'>
              <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                />
              </svg>
              Create account
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
