import { VideoUploadForm } from '@/components/forms/VideoUploadForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Upload Video',
  description: 'Upload and share your video content'
}

/**
 * Video upload page
 * Server Component that renders the video upload form
 */
export default function UploadPage() {
  return (
    <div className='mx-auto max-w-3xl px-4 py-8'>
      <div className='mb-8'>
        <h1 className='mb-2 text-3xl font-bold'>Upload Video</h1>
        <p className='text-gray-600'>Share your content with the world</p>
      </div>

      <div className='rounded-lg border bg-white p-6 shadow-sm'>
        <VideoUploadForm />
      </div>

      {/* Information Section */}
      <div className='mt-8 rounded-lg border border-blue-100 bg-blue-50 p-4'>
        <h2 className='mb-2 flex items-center text-sm font-semibold text-blue-900'>
          <svg className='mr-2 h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          Important Information
        </h2>
        <ul className='space-y-1 text-sm text-blue-800'>
          <li>• Maximum file size: 256GB</li>
          <li>• Accepted formats: All video formats</li>
          <li>• Videos from unverified API projects will be restricted to private viewing mode</li>
          <li>• Make sure you have the rights to upload and share your content</li>
        </ul>
      </div>
    </div>
  )
}
