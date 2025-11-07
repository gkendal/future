/**
 * API Service for fetching products
 * Handles network errors and data validation gracefully
 */

import type { Product } from '@my/ui'

export type { Product }

export interface ApiResponse {
  widget: {
    data: {
      offers: Array<{
        id: number
        offer: {
          name: string
          price: string
          currency_iso: string
          currency_symbol: string
          link: string
          in_stock: boolean
        }
        image: string | null
        merchant: {
          id: number
          name: string
          url: string
          logo_url: string
        }
      }>
    }
  }
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

const API_URL =
  'https://search-api.fie.future.net.uk/widget.php?id=review&model_name=xbox_series_x&area=GB'

/**
 * Fetch products from the API
 * @param limit - Number of products to return (default: 4)
 * @returns Array of Product objects
 * @throws ApiError on network or parsing errors
 */
export async function fetchProducts(limit = 4): Promise<Product[]> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout

    const response = await fetch(API_URL, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new ApiError(`HTTP error! status: ${response.status}`, response.status)
    }

    const data: ApiResponse = await response.json()

    // Validate response structure
    if (!data?.widget?.data?.offers) {
      throw new ApiError('Invalid API response structure')
    }

    // Transform and validate products
    const products: Product[] = data.widget.data.offers
      .filter((item) => {
        // Filter out invalid products
        return (
          item?.id &&
          item?.offer?.name &&
          item?.offer?.price &&
          item?.offer?.link &&
          item?.merchant?.name
        )
      })
      .slice(0, limit) // Take only the requested number
      .map((item) => ({
        id: item.id,
        name: item.offer.name,
        price: item.offer.price,
        currency_iso: item.offer.currency_iso || 'GBP',
        currency_symbol: item.offer.currency_symbol || '£',
        link: item.offer.link,
        image: item.image || null,
        merchant: {
          name: item.merchant.name,
          logo_url: item.merchant.logo_url,
        },
        in_stock: item.offer.in_stock ?? true,
      }))

    if (products.length === 0) {
      throw new ApiError('No valid products found')
    }

    return products
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiError('Request timeout')
      }
      throw new ApiError(error.message)
    }

    throw new ApiError('An unexpected error occurred')
  }
}

