/**
 * Google People API Types
 * Based on: https://developers.google.com/people/api/rest/v1/people
 */

export interface PersonName {
  displayName?: string
  familyName?: string
  givenName?: string
  displayNameLastFirst?: string
  unstructuredName?: string
}

export interface PersonEmailAddress {
  value?: string
  type?: string
  formattedType?: string
}

export interface PersonPhoto {
  url?: string
  default?: boolean
}

export interface PersonMetadata {
  source?: {
    type?: string
    id?: string
  }
  primary?: boolean
  verified?: boolean
}

export interface Person {
  resourceName?: string
  etag?: string
  names?: PersonName[]
  photos?: PersonPhoto[]
  emailAddresses?: PersonEmailAddress[]
  metadata?: PersonMetadata
}
