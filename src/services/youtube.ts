import { youtubeApi } from '@/lib/apis/youtube'
import {
  YouTubeSearchListResponse,
  YouTubeVideosListResponse,
  YouTubeVideoUploadRequest,
  YouTubeVideoUploadResponse
} from '@/types/youtube'

export const youtubeService = {
  /**
   * Search for videos on YouTube
   * @param query - Search term
   * @param maxResults - Maximum number of results
   * @param pageToken - Token for pagination
   * @returns Promise with video search results
   */
  async searchVideos(
    query: string,
    maxResults: number,
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
  },

  /**
   * Get most popular videos
   * @param maxResults - Maximum number of results
   * @param regionCode - Region code for localized content
   * @param pageToken - Token for pagination
   * @returns Promise with popular videos
   */
  async getMostPopularVideos(
    maxResults: number,
    regionCode: string,
    pageToken?: string
  ): Promise<YouTubeVideosListResponse> {
    const response = await youtubeApi.get<YouTubeVideosListResponse>('/videos', {
      params: {
        part: 'snippet',
        chart: 'mostPopular',
        maxResults,
        regionCode,
        pageToken
      }
    })

    return response.data
  },

  /**
   * Get most popular videos by category
   * @param categoryId - Video category ID
   * @param maxResults - Maximum number of results
   * @param regionCode - Region code for localized content
   * @param pageToken - Token for pagination
   * @returns Promise with popular videos from the specified category
   */
  async getVideosByCategory(
    categoryId: string,
    maxResults: number,
    regionCode: string,
    pageToken?: string
  ): Promise<YouTubeVideosListResponse> {
    const response = await youtubeApi.get<YouTubeVideosListResponse>('/videos', {
      params: {
        part: 'snippet',
        chart: 'mostPopular',
        videoCategoryId: categoryId,
        maxResults,
        regionCode,
        pageToken
      }
    })

    return response.data
  },

  /**
   * Upload a video to YouTube
   * @param videoFile - Video file to upload
   * @param metadata - Video metadata (title, description, category, privacy status)
   * @returns Promise with uploaded video information
   */
  async uploadVideo(
    videoFile: File,
    metadata: YouTubeVideoUploadRequest
  ): Promise<YouTubeVideoUploadResponse> {
    // Create form data with video metadata
    const formData = new FormData()
    formData.append('video', videoFile)
    formData.append('snippet', JSON.stringify(metadata.snippet))
    formData.append('status', JSON.stringify(metadata.status))

    // Use the upload endpoint with resumable upload
    const response = await youtubeApi.post<YouTubeVideoUploadResponse>(
      'https://www.googleapis.com/upload/youtube/v3/videos',
      formData,
      {
        params: {
          part: 'snippet,status',
          uploadType: 'multipart'
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    return response.data
  }
}
