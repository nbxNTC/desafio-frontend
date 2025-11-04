import Link from 'next/link'

/**
 * YouTube logo component for the header
 * Displays the YouTube icon and brand name
 */
export function Logo() {
  return (
    <Link href='/' className='flex shrink-0 items-center gap-1'>
      <div className='flex items-center'>
        <svg viewBox='0 0 24 24' className='h-10 w-10 text-red-600' fill='currentColor'>
          <path d='M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z' />
        </svg>

        <span className='ml-1 hidden text-xl font-bold tracking-tight sm:block'>
          <span className='text-gray-900 dark:text-white'>You</span>
          <span className='text-gray-900 dark:text-white'>Tube</span>
        </span>
      </div>
    </Link>
  )
}
