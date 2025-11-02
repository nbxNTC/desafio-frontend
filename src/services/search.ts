import { youtubeApi } from '@/lib/api'
import { YouTubeSearchListResponse } from '@/types/youtube'

/**
 * Search for videos on YouTube
 * @param query - Search term
 * @param maxResults - Maximum number of results (default: 10)
 * @param pageToken - Token for pagination
 * @returns Promise with video search results
 */
export async function searchVideos(
  query: string,
  maxResults: number = 10,
  pageToken?: string
): Promise<YouTubeSearchListResponse> {
  const response = await youtubeApi.get<YouTubeSearchListResponse>('/search', {
    params: {
      q: query,
      part: 'snippet',
      type: 'video',
      maxResults,
      pageToken,
      order: 'relevance'
    }
  })

  return response.data
}
