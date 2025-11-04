import { SearchBar } from '@/components/ui'

/**
 * Search section component for the header
 * Contains the centered search bar
 */
export function SearchSection() {
  return (
    <div className='mx-auto flex max-w-2xl flex-1 justify-center'>
      <SearchBar />
    </div>
  )
}
