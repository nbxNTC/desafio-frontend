'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input, Label, NativeSelect, NativeSelectOption, Textarea } from '@/components/ui'
import { useForm } from '@/lib/form'
import { videoUploadSchema, type VideoUploadFormData } from '@/lib/form/schemas/videoUploadSchema'
import { uploadVideoAction } from '@/actions/video'
import {
  VIDEO_CATEGORIES,
  PRIVACY_STATUS_OPTIONS,
  VideoCategoryId,
  PrivacyStatus
} from '@/constants/videoUpload'

/**
 * Video upload form component
 * Handles video file selection, metadata input, and upload to YouTube
 */
export function VideoUploadForm() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string>('')
  const [selectedFileName, setSelectedFileName] = useState<string>('')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    isSubmitting
  } = useForm<VideoUploadFormData>({
    schema: videoUploadSchema,
    defaultValues: {
      privacyStatus: PrivacyStatus.PRIVATE,
      categoryId: VideoCategoryId.FILM_AND_ANIMATION
    },
    onSubmit: async (data: VideoUploadFormData) => {
      setIsUploading(true)
      setUploadError('')
      setUploadProgress(0)

      try {
        console.log(data)
        // Call server action to upload video with direct params
        const response = await uploadVideoAction({
          video: data.video,
          title: data.title,
          description: data.description,
          categoryId: data.categoryId,
          privacyStatus: data.privacyStatus
        })

        // Simulate progress update (in real scenario, use upload progress callback)
        setUploadProgress(100)

        // Redirect to video page or home after successful upload
        setTimeout(() => {
          router.push(`/?upload=success&videoId=${response.id}`)
        }, 1000)
      } catch (error) {
        console.error('Upload error:', error)
        setUploadError(
          error instanceof Error ? error.message : 'Failed to upload video. Please try again.'
        )
        setIsUploading(false)
      }
    }
  })

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFileName(file.name)
      setValue('video', file)
      setUploadError('')
    }
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {/* Video File Upload */}
      <div className='space-y-2'>
        <Label htmlFor='video' required>
          Video File
        </Label>
        <div className='flex items-center gap-3'>
          <input
            ref={fileInputRef}
            type='file'
            accept='video/*'
            onChange={handleFileSelect}
            className='hidden'
            id='video-file-input'
          />
          <Button type='button' variant='outline' onClick={handleBrowseClick}>
            Choose File
          </Button>
          <span className='text-sm text-gray-600'>{selectedFileName || 'No file selected'}</span>
        </div>
        {errors.video && <p className='text-sm text-red-500'>{errors.video.message}</p>}
      </div>

      {/* Title */}
      <div className='space-y-2'>
        <Label htmlFor='title' required>
          Title
        </Label>
        <Input
          id='title'
          type='text'
          placeholder='Enter video title'
          {...register('title')}
          disabled={isUploading}
        />
        {errors.title && <p className='text-sm text-red-500'>{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div className='space-y-2'>
        <Label htmlFor='description' required>
          Description
        </Label>
        <Textarea
          id='description'
          rows={5}
          placeholder='Tell viewers about your video'
          {...register('description')}
          disabled={isUploading}
        />
        {errors.description && <p className='text-sm text-red-500'>{errors.description.message}</p>}
      </div>

      {/* Category */}
      <div className='space-y-2'>
        <Label htmlFor='categoryId' required>
          Category
        </Label>
        <NativeSelect id='categoryId' {...register('categoryId')} disabled={isUploading}>
          {VIDEO_CATEGORIES.map((category) => (
            <NativeSelectOption key={category.id} value={category.id}>
              {category.name}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        {errors.categoryId && <p className='text-sm text-red-500'>{errors.categoryId.message}</p>}
      </div>

      {/* Privacy Status */}
      <div className='space-y-2'>
        <Label htmlFor='privacyStatus' required>
          Privacy
        </Label>
        <NativeSelect id='privacyStatus' {...register('privacyStatus')} disabled={isUploading}>
          {PRIVACY_STATUS_OPTIONS.map((option) => (
            <NativeSelectOption key={option.value} value={option.value}>
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        {errors.privacyStatus && (
          <p className='text-sm text-red-500'>{errors.privacyStatus.message}</p>
        )}
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <div className='space-y-2'>
          <div className='flex items-center justify-between text-sm'>
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className='h-2 w-full overflow-hidden rounded-full bg-gray-200'>
            <div
              className='h-full bg-blue-600 transition-all duration-300'
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Error Message */}
      {uploadError && (
        <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
          <p className='text-sm text-red-600'>{uploadError}</p>
        </div>
      )}

      {/* Submit Button */}
      <div className='flex justify-end gap-3'>
        <Button
          type='button'
          variant='outline'
          onClick={() => router.back()}
          disabled={isUploading}
        >
          Cancel
        </Button>
        <Button type='submit' disabled={isSubmitting || isUploading}>
          {isUploading ? 'Uploading...' : 'Upload Video'}
        </Button>
      </div>
    </form>
  )
}
