import { peopleApi } from '@/lib/apis/people'
import { Person } from '@/types/people'

/**
 * Google People API Service
 * Provides methods to interact with Google People API
 */
export const peopleService = {
  /**
   * Get authenticated user's profile information
   * @param personFields - Fields to retrieve (comma-separated)
   * @returns Promise with user's profile information
   */
  async getMyProfile(): Promise<Person> {
    const response = await peopleApi.get<Person>('/people/me', {
      params: {
        personFields: 'names,emailAddresses,photos'
      }
    })

    return response.data
  }
}
