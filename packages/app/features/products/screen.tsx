/**
 * Products Screen
 * Main screen for displaying products
 * Includes loading, error, and empty states with pull-to-refresh
 */

import { Button, H1, Paragraph, Spinner, YStack, useTheme, GradientBackground, ProductCard } from '@my/ui'
import { AlertCircle, RefreshCw } from '@tamagui/lucide-icons'
import { useCallback, useEffect, useState } from 'react'
import { FlatList, RefreshControl, type ListRenderItem } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { fetchProducts, type Product } from '../../services/api'

export function ProductsScreen() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const insets = useSafeAreaInsets()
  const theme = useTheme()
  
  // Get theme-aware color for refresh control
  const refreshColor = theme.blue10?.get() || '#007AFF'

  const loadProducts = useCallback(async (isRefresh = false) => {
    try {
      if (!isRefresh) {
        setLoading(true)
      }
      setError(null)

      const data = await fetchProducts(4)
      setProducts(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load products'
      setError(errorMessage)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  // Load products on mount
  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const handleRefresh = useCallback(() => {
    setRefreshing(true)
    loadProducts(true)
  }, [loadProducts])

  const handleRetry = useCallback(() => {
    loadProducts()
  }, [loadProducts])

  const renderItem: ListRenderItem<Product> = useCallback(
    ({ item }) => <ProductCard product={item} />,
    []
  )

  const keyExtractor = useCallback((item: Product) => item.id.toString(), [])

  // Loading State
  if (loading && !refreshing) {
    return (
      <YStack
        flex={1}
        justify="center"
        items="center"
        paddingTop={insets.top}
        paddingBottom={insets.bottom}
        overflow="hidden"
        accessible={true}
        accessibilityLabel="Loading products"
        accessibilityRole="progressbar"
      >
        <GradientBackground />
        <Spinner size="large" color="$blue10" zIndex={10} />
        <Paragraph marginTop="$4" color="$color11" zIndex={10} accessible={true}>
          Loading products...
        </Paragraph>
      </YStack>
    )
  }

  // Error State
  if (error) {
    return (
      <YStack
        flex={1}
        justify="center"
        items="center"
        gap="$4"
        padding="$4"
        paddingTop={insets.top}
        paddingBottom={insets.bottom}
        overflow="hidden"
        accessible={true}
        accessibilityRole="alert"
      >
        <GradientBackground />
        <AlertCircle size={64} color="$red10" zIndex={10} accessible={false} />
        <H1 color="$color12" textAlign="center" zIndex={10} accessible={true}>
          Oops!
        </H1>
        <Paragraph
          color="$color11"
          textAlign="center"
          maxWidth={400}
          zIndex={10}
          accessible={true}
          accessibilityLabel={`Error: ${error}`}
        >
          {error}
        </Paragraph>
        <Button
          size="$4"
          theme="blue"
          icon={RefreshCw}
          onPress={handleRetry}
          zIndex={10}
          accessible={true}
          accessibilityLabel="Retry loading products"
          accessibilityHint="Attempts to reload the products"
        >
          Try Again
        </Button>
      </YStack>
    )
  }

  // Empty State
  if (products.length === 0) {
    return (
      <YStack
        flex={1}
        justify="center"
        items="center"
        gap="$4"
        padding="$4"
        paddingTop={insets.top}
        paddingBottom={insets.bottom}
        overflow="hidden"
        accessible={true}
      >
        <GradientBackground />
        <Paragraph
          size="$6"
          color="$color11"
          textAlign="center"
          zIndex={10}
          accessible={true}
          accessibilityRole="text"
        >
          No products available at the moment.
        </Paragraph>
        <Button
          size="$4"
          theme="blue"
          icon={RefreshCw}
          onPress={handleRetry}
          zIndex={10}
          accessible={true}
          accessibilityLabel="Refresh to check for products"
        >
          Refresh
        </Button>
      </YStack>
    )
  }

  // List of Products
  return (
    <YStack 
      flex={1} 
      paddingTop={insets.top} 
      paddingBottom={insets.bottom}
      overflow="hidden"
    >
      <GradientBackground />
      <YStack padding="$4" paddingBottom="$2" zIndex={10}>
        <H1
          color="$color12"
          accessible={true}
          accessibilityRole="header"
          accessibilityLabel="Xbox Series X Products"
        >
          Xbox Series X Products
        </H1>
        <Paragraph color="$color11" accessible={true}>
          {products.length} {products.length === 1 ? 'product' : 'products'} available
        </Paragraph>
      </YStack>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{
          padding: 16,
          gap: 16,
          zIndex: 10,
        }}
        style={{ zIndex: 10 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[refreshColor]}
            tintColor={refreshColor}
            accessibilityLabel="Pull to refresh products"
          />
        }
        // Performance optimizations
        removeClippedSubviews={true}
        maxToRenderPerBatch={4}
        initialNumToRender={4}
        windowSize={5}
        accessible={true}
        accessibilityLabel="List of products"
        accessibilityRole="list"
      />
    </YStack>
  )
}

