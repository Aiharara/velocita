/**
 * Installation Guide Type Definitions
 * Ensures type safety for installation-guides.json data structure
 */

export interface Guide {
  label: string
  folder_path: string
  images: string[]
  videos: string[]
}

export interface GuidesData {
  [key: string]: Guide
}

/**
 * Timeline Item - 时间线项目
 */
export interface TimelineItem {
  year: string | number
  title: string
  description: string
}
