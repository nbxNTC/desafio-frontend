import Image from 'next/image'
import { cn } from '@/lib/utils'
import { formatDateToBRT } from '@/utils/dateFormatter'

interface VideoCardProps {
  videoId: string
  title: string
  thumbnail: string
  channelTitle?: string
  publishedAt?: string
  className?: string
  priority?: boolean
}

/**
 * Video card component to display YouTube video information
 * Shows thumbnail, title, channel name and publish date
 */
export function VideoCard({
  title,
  thumbnail,
  channelTitle,
  publishedAt,
  className,
  priority = false
}: VideoCardProps) {
  return (
    <div
      data-cy='video-card'
      className={cn(
        'group cursor-pointer overflow-hidden rounded-lg transition-transform hover:scale-105',
        className
      )}
    >
      {/* Thumbnail */}
      <div
        data-cy='video-thumbnail'
        className='relative aspect-video w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800'
      >
        <Image
          src={thumbnail}
          alt={title}
          fill
          quality={60}
          className='object-cover'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          priority={priority}
        />
      </div>

      {/* Video Info */}
      <div className='mt-3 space-y-1'>
        <h3
          data-cy='video-title'
          className='line-clamp-2 text-sm leading-tight font-semibold text-gray-900 dark:text-white'
        >
          {title}
        </h3>

        {channelTitle && (
          <p data-cy='video-channel' className='text-xs text-gray-600 dark:text-gray-400'>
            {channelTitle}
          </p>
        )}

        {publishedAt && (
          <p data-cy='video-date' className='text-xs text-gray-500 dark:text-gray-500'>
            {formatDateToBRT(publishedAt)}
          </p>
        )}
      </div>
    </div>
  )
}
