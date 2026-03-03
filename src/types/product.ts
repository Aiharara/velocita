/**
 * Product Type Definitions
 * Ensures type safety for exhaust-system.json data structure
 */

export interface Product {
  brand: string
  brandLabel: string
  model: string
  modelLabel: string
  imageCount: number
  images: string[]
  priceRMB: string
  priceAUD: string
}
