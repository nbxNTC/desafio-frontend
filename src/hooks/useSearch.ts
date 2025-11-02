import { searchVideos } from '@/services/search'
import { YouTubeSearchListResponse } from '@/types/youtube'
import { log } from '@/utils/logger'

export async function useSearch(
  query: string,
  maxResults: number = 12
): Promise<YouTubeSearchListResponse | null> {
  if (!query.trim()) {
    return null
  }

  try {
    const results = await searchVideos(query, maxResults)
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
