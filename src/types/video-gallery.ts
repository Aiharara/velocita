/**
 * Video Gallery Type Definitions
 * Ensures type safety for video-gallery.json data structure
 */

export interface Video {
  url: string
  label: string
  poster: string
}

export interface BrandVideos {
  name: string
  videos: Video[]
}

export interface VideoGallery {
  [brandKey: string]: BrandVideos
}

/**
 * Type-safe helper to access brand videos
 * Returns undefined if brand or video index doesn't exist
 */
export function getVideo(gallery: VideoGallery, brand: string, index: number): Video | undefined {
  return gallery[brand]?.videos?.[index]
}

/**
 * Type-safe helper to get brand name
 */
export function getBrandName(gallery: VideoGallery, brand: string): string | undefined {
  return gallery[brand]?.name
}
