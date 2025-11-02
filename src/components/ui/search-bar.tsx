'use client'

import { useState, useEffect, ComponentProps, FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from '@/components/ui/input-group'
import { cn } from '@/lib/utils'

interface SearchBarProps extends ComponentProps<'div'> {
  onSearch?: (query: string) => void
  placeholder?: string
}

export function SearchBar({
  className,
  onSearch,
  placeholder = 'Search',
  ...props
}: SearchBarProps) {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')
  const router = useRouter()

  // Initialize query from URL params on mount
  useEffect(() => {
    const queryParam = searchParams.get('q')
    if (queryParam) {
      setQuery(queryParam)
    }
  }, [searchParams])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmedQuery = query.trim()

    if (trimmedQuery) {
      if (onSearch) {
        onSearch(trimmedQuery)
      }
      // Navigate to results page with query param
      router.push(`/results?q=${encodeURIComponent(trimmedQuery)}`)
    }
  }

  const handleClear = () => {
    setQuery('')
  }

  return (
    <div className={cn('flex w-full max-w-2xl', className)} {...props}>
      <form onSubmit={handleSubmit} className='flex w-full'>
        <InputGroup className='h-10 rounded-l-full'>
          <InputGroupInput
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className='pl-4'
          />

          {query && (
            <InputGroupAddon align='inline-end'>
              <InputGroupButton
                className='cursor-pointer'
                type='button'
                variant='ghost'
                size='icon-xs'
                onClick={handleClear}
                aria-label='Clear search'
              >
                <svg
                  className='h-4 w-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </InputGroupButton>
            </InputGroupAddon>
          )}
        </InputGroup>

        <Button
          type='submit'
          variant='outline'
          size='icon'
          className='h-10 cursor-pointer rounded-l-none rounded-r-full border-l-0 px-8 hover:bg-gray-100 dark:hover:bg-gray-800'
        >
          <svg
            className='h-5 w-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </Button>
      </form>
    </div>
  )
}
