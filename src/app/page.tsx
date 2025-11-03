import { useFeaturedVideos } from '@/hooks/useFeaturedVideos'
import { useCategoryVideos } from '@/hooks/useCategoryVideos'
import { VideoSection } from '@/components/ui/video-section'
import { HOME_CATEGORIES } from '@/lib/categories'

export default async function Home() {
  try {
    // Fetch featured videos and category videos in parallel
    const [featuredData, ...categoryData] = await Promise.all([
      useFeaturedVideos(12, 'US'),
      ...HOME_CATEGORIES.filter((cat) => cat.enabled).map((cat) =>
        useCategoryVideos(cat.id, 8, 'US')
      )
    ])

    return (
      <div className='container mx-auto space-y-5 px-4 py-8'>
        {/* Featured Videos Section */}
        {featuredData && featuredData.items.length > 0 && (
          <VideoSection
            title='Featured Videos'
            description='Most popular videos right now'
            data={featuredData}
          />
        )}

        {/* Category Sections */}
        {categoryData.map((data, index) => {
          if (!data || data.items.length === 0) return null

          const category = HOME_CATEGORIES.filter((cat) => cat.enabled)[index]
          if (!category) return null

          return (
            <VideoSection
              key={category.id}
              title={category.name}
              description={`Popular ${category.name.toLowerCase()} videos`}
              data={data}
            />
          )
        })}

        {/* No content fallback */}
        {(!featuredData || featuredData.items.length === 0) &&
          categoryData.every((data) => !data || data.items.length === 0) && (
            <div className='text-center text-gray-600 dark:text-gray-400'>
              <p>No videos available at the moment</p>
            </div>
          )}
      </div>
    )
  } catch (error) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center text-red-600 dark:text-red-400'>
          <p>Error: {error instanceof Error ? error.message : 'Failed to load videos'}</p>
        </div>
      </div>
    )
  }
}
