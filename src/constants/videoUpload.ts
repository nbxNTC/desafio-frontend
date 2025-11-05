/**
 * YouTube video category IDs
 * Reference: https://developers.google.com/youtube/v3/docs/videoCategories/list
 */
export enum VideoCategoryId {
  FILM_AND_ANIMATION = '1',
  AUTOS_AND_VEHICLES = '2',
  MUSIC = '10',
  PETS_AND_ANIMALS = '15',
  SPORTS = '17',
  TRAVEL_AND_EVENTS = '19',
  GAMING = '20',
  PEOPLE_AND_BLOGS = '22',
  COMEDY = '23',
  ENTERTAINMENT = '24',
  NEWS_AND_POLITICS = '25',
  HOWTO_AND_STYLE = '26',
  EDUCATION = '27',
  SCIENCE_AND_TECHNOLOGY = '28'
}

/**
 * YouTube video privacy status options
 */
export enum PrivacyStatus {
  PUBLIC = 'public',
  UNLISTED = 'unlisted',
  PRIVATE = 'private'
}

/**
 * YouTube video categories
 * Reference: https://developers.google.com/youtube/v3/docs/videoCategories/list
 */
export const VIDEO_CATEGORIES = [
  { id: VideoCategoryId.FILM_AND_ANIMATION, name: 'Film & Animation' },
  { id: VideoCategoryId.AUTOS_AND_VEHICLES, name: 'Autos & Vehicles' },
  { id: VideoCategoryId.MUSIC, name: 'Music' },
  { id: VideoCategoryId.PETS_AND_ANIMALS, name: 'Pets & Animals' },
  { id: VideoCategoryId.SPORTS, name: 'Sports' },
  { id: VideoCategoryId.TRAVEL_AND_EVENTS, name: 'Travel & Events' },
  { id: VideoCategoryId.GAMING, name: 'Gaming' },
  { id: VideoCategoryId.PEOPLE_AND_BLOGS, name: 'People & Blogs' },
  { id: VideoCategoryId.COMEDY, name: 'Comedy' },
  { id: VideoCategoryId.ENTERTAINMENT, name: 'Entertainment' },
  { id: VideoCategoryId.NEWS_AND_POLITICS, name: 'News & Politics' },
  { id: VideoCategoryId.HOWTO_AND_STYLE, name: 'Howto & Style' },
  { id: VideoCategoryId.EDUCATION, name: 'Education' },
  { id: VideoCategoryId.SCIENCE_AND_TECHNOLOGY, name: 'Science & Technology' }
] as const

export const PRIVACY_STATUS_OPTIONS = [
  { value: PrivacyStatus.PUBLIC, label: 'Public' },
  { value: PrivacyStatus.UNLISTED, label: 'Unlisted' },
  { value: PrivacyStatus.PRIVATE, label: 'Private' }
] as const
