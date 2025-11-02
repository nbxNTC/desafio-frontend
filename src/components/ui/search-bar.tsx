'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSearchHistory } from '@/contexts/SearchHistoryContext'
import { Button } from '@/components/ui'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from '@/components/ui/input-group'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { history, addSearch, removeSearch } = useSearchHistory()

  const [query, setQuery] = useState('')
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  // Initialize query from URL params on mount
  useEffect(() => {
    const queryParam = searchParams.get('q')
    if (queryParam) setQuery(queryParam)
  }, [searchParams])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const trimmedQuery = query.trim()

    if (trimmedQuery) {
      // Add to history
      addSearch(trimmedQuery)

      // Navigate to results page with query param
      router.push(`/results?q=${encodeURIComponent(trimmedQuery)}`)

      // Close history dropdown
      setIsPopoverOpen(false)
    }
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setQuery('')
  }

  const handleHistoryItemClick = (historyQuery: string) => {
    setQuery(historyQuery)
    setIsPopoverOpen(false)
    addSearch(historyQuery)
    router.push(`/results?q=${encodeURIComponent(historyQuery)}`)
  }

  const handleRemoveHistoryItem = (historyQuery: string, e: React.MouseEvent) => {
    e.stopPropagation()
    removeSearch(historyQuery)
  }

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <div className='relative flex w-full max-w-2xl'>
        <form onSubmit={handleSubmit} className='flex w-full'>
          <PopoverTrigger asChild>
            <InputGroup className='h-10 rounded-l-full'>
              <InputGroupInput
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search'
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
          </PopoverTrigger>

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

        {/* Search History Popover */}
        {history.length > 0 && (
          <PopoverContent
            onOpenAutoFocus={(e) => e.preventDefault()}
            className='w-(--radix-popover-trigger-width) p-0'
            align='start'
            sideOffset={4}
          >
            <div className='max-h-80 overflow-y-auto py-2'>
              {history.map((historyQuery, index) => (
                <div
                  key={`${historyQuery}-${index}`}
                  className='group flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800'
                  onClick={() => handleHistoryItemClick(historyQuery)}
                >
                  <div className='flex items-center gap-3'>
                    <svg
                      className='h-4 w-4 text-gray-500'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                    <span className='text-sm text-gray-700 dark:text-gray-300'>{historyQuery}</span>
                  </div>
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon-sm'
                    onClick={(e) => handleRemoveHistoryItem(historyQuery, e)}
                    className='cursor-pointer opacity-0 transition-opacity group-hover:opacity-100'
                    aria-label='Remove from history'
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
                  </Button>
                </div>
              ))}
            </div>
          </PopoverContent>
        )}
      </div>
    </Popover>
  )
}
