import { youtubeService } from '@/services/youtube'
import { YouTubeSearchListResponse } from '@/types/youtube'
import { log } from '@/utils/logger'

export async function useSearch(
  query: string,
  maxResults: number
): Promise<YouTubeSearchListResponse | undefined> {
  if (!query.trim()) return

  try {
    const results = await youtubeService.searchVideos(query, maxResults)
    return results
  } catch (error) {
    log({
      severity: 'error',
      context: 'useSearch',
      message: error instanceof Error ? error.message : 'Failed to search videos',
      stack: error instanceof Error ? error.stack : undefined
    })
    throw error
  }
}
