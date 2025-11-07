/**
 * ProductCard Component
 * Displays a single product with merchant information
 * Fully accessible with proper labels and touch targets
 */

import { Button, Card, H3, Image, Paragraph, XStack, YStack } from 'tamagui'
import { ExternalLink } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { Linking, Platform, useColorScheme } from 'react-native'
import type { Product } from './product-types'

interface ProductCardProps {
  product: Product
}

export const ProductCard = memo(({ product }: ProductCardProps) => {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  console.log('product', product)
  const handleOpenLink = async () => {
    try {
      const canOpen = await Linking.canOpenURL(product.link)
      if (canOpen) {
        await Linking.openURL(product.link)
      }
    } catch (error) {
      console.error('Failed to open URL:', error)
    }
  }

  const formattedPrice = `${product.currency_symbol == '&pound;' ? '£' : product.currency_symbol}${Number.parseFloat(product.price).toFixed(2)}`

  // Glassmorphic styles for both light and dark mode
  const cardStyles = isDark ? {
    backgroundColor: 'rgba(30, 30, 30, 0.6)' as const,
    borderColor: 'rgba(60, 60, 60, 0.8)' as const,
  } : {
    backgroundColor: 'rgba(255, 255, 255, 0.6)' as const,
    borderColor: 'rgba(255, 255, 255, 0.8)' as const,
  }

  return (
    <Card
      elevate
      size="$4"
      bordered
      // @ts-ignore - rgba colors work fine
      backgroundColor={cardStyles.backgroundColor}
      // @ts-ignore - rgba colors work fine
      borderColor={cardStyles.borderColor}
      borderWidth={1.5}
      animation="quick"
      pressStyle={{ scale: 0.98 }}
      zIndex={10}
      // @ts-ignore - Web-only style for backdrop blur
      style={Platform.OS === 'web' ? { backdropFilter: 'blur(20px)' } : undefined}
      shadowColor="$shadowColor"
      shadowOpacity={0.1}
      shadowRadius={30}
      shadowOffset={{ width: 0, height: 10 }}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${product.name} at ${product.merchant.name} for ${formattedPrice}`}
      accessibilityHint="Double tap to view product details"
    >
      <Card.Header padded>
        <YStack gap="$2">
          {/* Product Image */}
          {product.image && (
            <Image
              source={{ uri: product.image }}
              width="100%"
              height={200}
              resizeMode="contain"
              // @ts-ignore - rgba colors work fine
              bg={isDark ? 'rgba(40, 40, 40, 0.5)' : 'rgba(255, 255, 255, 0.8)'}
              borderRadius="$4"
              accessible={true}
              accessibilityLabel={`Product image for ${product.name}`}
            />
          )}

          {/* Product Name */}
          <H3
            size="$4"
            fontWeight="600"
            color="$color12"
            numberOfLines={2}
            textTransform="none"
            letterSpacing={0}
            marginTop="$1.5"
            accessible={true}
            accessibilityRole="header"
          >
            {product.name}
          </H3>

          {/* Price */}
          <Paragraph
            size="$6"
            fontWeight="700"
            color="$color12"
            accessible={true}
            accessibilityLabel={`Price: ${formattedPrice}`}
          >
            {formattedPrice}
          </Paragraph>

          {/* Merchant Info */}
          <XStack gap="$2" alignItems="center">
            <Image
              source={{ uri: product.merchant.logo_url }}
              width={28}
              height={28}
              resizeMode="contain"
              borderRadius="$2"
              accessible={true}
              accessibilityLabel={`${product.merchant.name} logo`}
            />
            <Paragraph
              size="$3"
              color="$color11"
              flex={1}
              accessible={true}
              accessibilityLabel={`Sold by ${product.merchant.name}`}
            >
              {product.merchant.name}
            </Paragraph>
          </XStack>

          {/* Stock Status */}
          {!product.in_stock && (
            <Paragraph
              size="$3"
              color="$red10"
              fontWeight="600"
              accessible={true}
              accessibilityRole="alert"
            >
              Out of Stock
            </Paragraph>
          )}
        </YStack>
      </Card.Header>

      <Card.Footer paddingHorizontal="$4" paddingBottom="$4" paddingTop="$2">
        <Button
          size="$4"
          theme="blue"
          icon={ExternalLink}
          onPress={handleOpenLink}
          disabled={!product.in_stock}
          opacity={product.in_stock ? 1 : 0.5}
          width="100%"
          accessible={true}
          accessibilityLabel={`View product at ${product.merchant.name}`}
          accessibilityHint="Opens external browser"
          accessibilityRole="button"
          // Ensure minimum touch target size (44x44 on iOS, 48x48 on Android)
          minHeight={Platform.OS === 'ios' ? 44 : 48}
        >
          View Product
        </Button>
      </Card.Footer>
    </Card>
  )
})

ProductCard.displayName = 'ProductCard'

