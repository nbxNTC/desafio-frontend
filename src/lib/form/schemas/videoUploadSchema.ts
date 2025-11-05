import yup from '../yupConfig'
import { PrivacyStatus } from '@/constants/videoUpload'

/**
 * Schema for YouTube video upload form validation
 * Based on required fields from YouTube Data API v3 videos.insert endpoint
 */
export const videoUploadSchema = yup.object({
  title: yup
    .string()
    .required('Video title is required')
    .min(1, 'Title must have at least 1 character')
    .max(100, 'Title cannot exceed 100 characters'),
  description: yup
    .string()
    .required('Video description is required')
    .max(5000, 'Description cannot exceed 5000 characters'),
  categoryId: yup.string().required('Category is required'),
  privacyStatus: yup
    .string()
    .oneOf(
      [PrivacyStatus.PUBLIC, PrivacyStatus.PRIVATE, PrivacyStatus.UNLISTED],
      'Invalid privacy status'
    )
    .required('Privacy status is required'),
  video: yup
    .mixed<File>()
    .required('Video file is required')
    .test('fileSize', 'File size must be less than 100MB', (value) => {
      if (!value) return false
      const file = value as File
      // 100MB in bytes
      const maxSize = 100 * 1024 * 1024
      return file.size <= maxSize
    })
    .test('fileType', 'File must be a video', (value) => {
      if (!value) return false
      const file = value as File
      return file.type.startsWith('video/') || file.type === 'application/octet-stream'
    })
})

export type VideoUploadFormData = yup.InferType<typeof videoUploadSchema>
