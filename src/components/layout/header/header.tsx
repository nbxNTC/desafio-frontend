import { Logo } from './logo'
import { SearchSection } from './search-section'
import { UserSection } from './user-section'

/**
 * Main header component
 * Sticky header with logo, search bar, and user section
 */
export function Header() {
  return (
    <header className='sticky top-0 z-50 w-full bg-white'>
      <div className='flex h-14 items-center justify-between gap-2 px-2 sm:gap-4 sm:px-5'>
        <Logo />
        <SearchSection />
        <UserSection />
      </div>
    </header>
  )
}
