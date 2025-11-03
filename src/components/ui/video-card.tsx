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
  className
}: VideoCardProps) {
  return (
    <div
      className={cn(
        'group cursor-pointer overflow-hidden rounded-lg transition-transform hover:scale-105',
        className
      )}
    >
      {/* Thumbnail */}
      <div className='relative aspect-video w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800'>
        <Image
          src={thumbnail}
          alt={title}
          fill
          quality={75}
          className='object-cover'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>

      {/* Video Info */}
      <div className='mt-3 space-y-1'>
        <h3 className='line-clamp-2 text-sm leading-tight font-semibold text-gray-900 dark:text-white'>
          {title}
        </h3>

        {channelTitle && <p className='text-xs text-gray-600 dark:text-gray-400'>{channelTitle}</p>}

        {publishedAt && (
          <p className='text-xs text-gray-500 dark:text-gray-500'>{formatDateToBRT(publishedAt)}</p>
        )}
      </div>
    </div>
  )
}
