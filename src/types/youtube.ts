// YouTube Data API v3 Types

export interface YouTubeThumbnail {
  url: string
  width: number
  height: number
}

export interface YouTubeThumbnails {
  default?: YouTubeThumbnail
  medium?: YouTubeThumbnail
  high?: YouTubeThumbnail
  standard?: YouTubeThumbnail
  maxres?: YouTubeThumbnail
}

export interface YouTubeSearchResultId {
  kind: string
  videoId?: string
  channelId?: string
  playlistId?: string
}

export interface YouTubeSearchResultSnippet {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: YouTubeThumbnails
  channelTitle: string
  liveBroadcastContent: 'upcoming' | 'live' | 'none'
}

export interface YouTubeSearchResult {
  kind: 'youtube#searchResult'
  etag: string
  id: YouTubeSearchResultId
  snippet: YouTubeSearchResultSnippet
}

export interface YouTubeSearchListResponse {
  kind: 'youtube#searchListResponse'
  etag: string
  nextPageToken?: string
  prevPageToken?: string
  regionCode?: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
  items: YouTubeSearchResult[]
}

export interface YouTubeSearchParams {
  q: string // Search query
  part?: string // Default: 'snippet'
  maxResults?: number // Default: 5, Max: 50
  pageToken?: string
  order?: 'date' | 'rating' | 'relevance' | 'title' | 'videoCount' | 'viewCount'
  type?: 'video' | 'channel' | 'playlist' | string // Can be comma-separated
  channelId?: string
  channelType?: 'any' | 'show'
  eventType?: 'completed' | 'live' | 'upcoming'
  regionCode?: string
  relevanceLanguage?: string
  safeSearch?: 'moderate' | 'none' | 'strict'
  videoCaption?: 'any' | 'closedCaption' | 'none'
  videoCategoryId?: string
  videoDefinition?: 'any' | 'high' | 'standard'
  videoDimension?: '2d' | '3d' | 'any'
  videoDuration?: 'any' | 'long' | 'medium' | 'short'
  videoEmbeddable?: 'any' | 'true'
  videoLicense?: 'any' | 'creativeCommon' | 'youtube'
  videoSyndicated?: 'any' | 'true'
  videoType?: 'any' | 'episode' | 'movie'
}

// YouTube Videos API Types
export interface YouTubeVideoSnippet {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: YouTubeThumbnails
  channelTitle: string
  tags?: string[]
  categoryId: string
  liveBroadcastContent: 'upcoming' | 'live' | 'none'
  defaultLanguage?: string
  localized?: {
    title: string
    description: string
  }
  defaultAudioLanguage?: string
}

export interface YouTubeVideo {
  kind: 'youtube#video'
  etag: string
  id: string
  snippet: YouTubeVideoSnippet
}

export interface YouTubeVideosListResponse {
  kind: 'youtube#videoListResponse'
  etag: string
  nextPageToken?: string
  prevPageToken?: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
  items: YouTubeVideo[]
}
