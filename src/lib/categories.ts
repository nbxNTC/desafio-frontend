/**
 * YouTube video categories
 * Common category IDs used on YouTube
 */
export const VIDEO_CATEGORIES = {
  MUSIC: '10',
  GAMING: '20',
  SPORTS: '17',
  ENTERTAINMENT: '24',
  EDUCATION: '27',
  SCIENCE_TECHNOLOGY: '28',
  COMEDY: '23',
  PEOPLE_BLOGS: '22',
  NEWS_POLITICS: '25',
  HOWTO_STYLE: '26'
} as const

/**
 * Category configuration for home page
 */
export interface CategoryConfig {
  id: string
  name: string
  enabled: boolean
}

export const HOME_CATEGORIES: CategoryConfig[] = [
  { id: VIDEO_CATEGORIES.MUSIC, name: 'Music', enabled: true },
  { id: VIDEO_CATEGORIES.GAMING, name: 'Gaming', enabled: true },
  { id: VIDEO_CATEGORIES.ENTERTAINMENT, name: 'Entertainment', enabled: true },
  { id: VIDEO_CATEGORIES.SCIENCE_TECHNOLOGY, name: 'Science & Technology', enabled: true }
]
