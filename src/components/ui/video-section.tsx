'use client'

import { useState } from 'react'
import { VideoCard } from '@/components/ui/video-card'
import { Button } from '@/components/ui/button'
import { YouTubeVideosListResponse } from '@/types/youtube'

interface VideoSectionProps {
  title: string
  description?: string
  data: YouTubeVideosListResponse
}

const INITIAL_DISPLAY_COUNT = 4

export function VideoSection({ title, description, data }: VideoSectionProps) {
  const [showAll, setShowAll] = useState(false)

  if (!data || data.items.length === 0) return null

  const displayedItems = showAll ? data.items : data.items.slice(0, INITIAL_DISPLAY_COUNT)
  const hasMoreVideos = data.items.length > INITIAL_DISPLAY_COUNT

  return (
    <section>
      {/* Section header */}
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>{title}</h2>
        {description && (
          <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>{description}</p>
        )}
      </div>

      {/* Videos grid */}
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {displayedItems.map((item) => {
          const { id, snippet } = item

          if (!snippet) return null

          const thumbnail =
            snippet.thumbnails.medium?.url ||
            snippet.thumbnails.default?.url ||
            snippet.thumbnails.high?.url ||
            ''

          if (!thumbnail) return null

          return (
            <VideoCard
              key={id}
              videoId={id}
              title={snippet.title}
              thumbnail={thumbnail}
              channelTitle={snippet.channelTitle}
              publishedAt={snippet.publishedAt}
            />
          )
        })}
      </div>

      {/* Show More button */}
      {hasMoreVideos && !showAll && (
        <div className='mt-4 flex justify-center'>
          <Button
            onClick={() => setShowAll(true)}
            variant='outline'
            className='px-8 py-2 text-sm font-medium'
            data-cy='video-section-show-more-button'
          >
            Show more ({data.items.length - INITIAL_DISPLAY_COUNT} more videos)
          </Button>
        </div>
      )}
    </section>
  )
}
