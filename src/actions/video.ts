'use server'

import { youtubeService } from '@/services/youtube'
import { YouTubeVideoUploadRequest, YouTubeVideoUploadResponse } from '@/types/youtube'

interface UploadVideoParams {
  video: File
  title: string
  description: string
  categoryId: string
  privacyStatus: 'public' | 'private' | 'unlisted'
}

/**
 * Server action to upload a video to YouTube
 * This must be executed on the server side to protect API credentials
 */
export async function uploadVideoAction(
  params: UploadVideoParams
): Promise<YouTubeVideoUploadResponse> {
  try {
    const { video, title, description, categoryId, privacyStatus } = params

    // Validate video file
    if (!video) {
      throw new Error('Video file is required')
    }

    // Validate required fields
    if (!title || !description || !categoryId || !privacyStatus) {
      throw new Error('All fields are required')
    }

    // Prepare metadata for upload
    const metadata: YouTubeVideoUploadRequest = {
      snippet: {
        title,
        description,
        categoryId
      },
      status: {
        privacyStatus
      }
    }

    // Upload video using the YouTube service
    const response = await youtubeService.uploadVideo(video, metadata)

    return response
  } catch (error) {
    console.error('Upload video action error:', error)
    throw new Error(
      error instanceof Error ? error.message : 'Failed to upload video. Please try again.'
    )
  }
}
