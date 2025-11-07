/**
 * Product Types
 * Shared type definitions for product data
 */

export interface Product {
  id: number
  name: string
  price: string
  currency_iso: string
  currency_symbol: string
  link: string
  image: string | null
  merchant: {
    name: string
    logo_url: string
  }
  in_stock: boolean
}

