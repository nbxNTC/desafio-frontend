import { youtubeService } from '@/services/youtube'
import { YouTubeVideosListResponse } from '@/types/youtube'
import { log } from '@/utils/logger'

/**
 * Custom hook to fetch videos from a specific category
 * @param categoryId - Video category ID
 * @param maxResults - Maximum number of results
 * @param regionCode - Region code for localized content
 * @returns Promise with videos from the specified category or undefined if error
 */
export async function useCategoryVideos(
  categoryId: string,
  maxResults: number,
  regionCode: string
): Promise<YouTubeVideosListResponse | undefined> {
  try {
    const results = await youtubeService.getVideosByCategory(categoryId, maxResults, regionCode)
    return results
  } catch (error) {
    log({
      severity: 'error',
      context: 'useCategoryVideos',
      message: error instanceof Error ? error.message : 'Failed to fetch category videos',
      stack: error instanceof Error ? error.stack : undefined
    })
    throw error
  }
}
