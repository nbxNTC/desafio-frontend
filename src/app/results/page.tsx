import { useSearch } from '@/hooks/useSearch'
import { VideoCard } from '@/components/ui/video-card'

interface ResultsPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const params = await searchParams
  const query = params.q

  if (!query) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center text-gray-600 dark:text-gray-400'>
          <p>No search query provided</p>
        </div>
      </div>
    )
  }

  try {
    const data = await useSearch(query)

    if (!data || data.items.length === 0) {
      return (
        <div className='container mx-auto px-4 py-8'>
          <div className='text-center text-gray-600 dark:text-gray-400'>
            <p>No results found for &quot;{query}&quot;</p>
          </div>
        </div>
      )
    }

    return (
      <div className='container mx-auto px-4 py-8'>
        {/* Search info */}
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
            Search results for &quot;{query}&quot;
          </h1>
          <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
            {data.pageInfo.totalResults.toLocaleString()} results
          </p>
        </div>

        {/* Results grid */}
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {data.items.map((item) => {
            const { id, snippet } = item
            const videoId = typeof id === 'string' ? id : id.videoId

            if (!videoId || !snippet) return null

            const thumbnail =
              snippet.thumbnails.medium?.url ||
              snippet.thumbnails.default?.url ||
              snippet.thumbnails.high?.url ||
              ''

            if (!thumbnail) return null

            return (
              <VideoCard
                key={videoId}
                videoId={videoId}
                title={snippet.title}
                thumbnail={thumbnail}
                channelTitle={snippet.channelTitle}
                publishedAt={snippet.publishedAt}
              />
            )
          })}
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center text-red-600 dark:text-red-400'>
          <p>Error: {error instanceof Error ? error.message : 'Failed to search videos'}</p>
        </div>
      </div>
    )
  }
}
