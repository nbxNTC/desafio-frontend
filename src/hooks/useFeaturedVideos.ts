import { youtubeService } from '@/services/youtube'
import { YouTubeVideosListResponse } from '@/types/youtube'
import { log } from '@/utils/logger'

/**
 * Custom hook to fetch featured (most popular) videos
 * @param maxResults - Maximum number of results
 * @param regionCode - Region code for localized content
 * @returns Promise with featured videos or undefined if error
 */
export async function useFeaturedVideos(
  maxResults: number,
  regionCode: string
): Promise<YouTubeVideosListResponse | undefined> {
  try {
    const results = await youtubeService.getMostPopularVideos(maxResults, regionCode)
    return results
  } catch (error) {
    log({
      severity: 'error',
      context: 'useFeaturedVideos',
      message: error instanceof Error ? error.message : 'Failed to fetch featured videos',
      stack: error instanceof Error ? error.stack : undefined
    })
    throw error
  }
}
