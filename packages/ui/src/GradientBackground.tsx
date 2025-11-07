/**
 * GradientBackground Component
 * Displays a beautiful radial gradient background that adapts to theme
 * Uses multiple SVG radial gradients for a modern, layered effect
 */

import { Stack } from 'tamagui'
import { useColorScheme } from 'react-native'
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg'

// Gradient Background Component with proper radial gradients that adapt to theme
export const GradientBackground = () => {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'
  
  // Define colors based on theme
  const colors = isDark ? {
    base: '#000000',
    purple: '#4c1d95',
    lightBlue: '#1e3a8a',
    blue: '#1e40af',
  } : {
    base: '#ffffff',
    purple: '#e0e7ff',
    lightBlue: '#dbeafe',
    blue: '#dbeafe',
  }
  
  return (
    <Stack
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={0}
    >
      <Svg
        width="100%"
        height="100%"
        style={{ position: 'absolute' }}
      >
        <Defs>
          {/* Top left purple radial */}
          <RadialGradient
            id="purpleGradient"
            cx="10%"
            cy="10%"
            r="50%"
          >
            <Stop offset="0%" stopColor={colors.purple} stopOpacity={isDark ? "0.3" : "0.6"} />
            <Stop offset="50%" stopColor={colors.purple} stopOpacity={isDark ? "0.1" : "0.2"} />
            <Stop offset="100%" stopColor={colors.base} stopOpacity="0" />
          </RadialGradient>
          
          {/* Bottom right blue radial */}
          <RadialGradient
            id="lightBlueGradient"
            cx="90%"
            cy="90%"
            r="55%"
          >
            <Stop offset="0%" stopColor={colors.lightBlue} stopOpacity={isDark ? "0.25" : "0.5"} />
            <Stop offset="50%" stopColor={colors.lightBlue} stopOpacity={isDark ? "0.1" : "0.2"} />
            <Stop offset="100%" stopColor={colors.base} stopOpacity="0" />
          </RadialGradient>
          
          {/* Center blue radial */}
          <RadialGradient
            id="blueGradient"
            cx="40%"
            cy="50%"
            r="45%"
          >
            <Stop offset="0%" stopColor={colors.blue} stopOpacity={isDark ? "0.2" : "0.4"} />
            <Stop offset="50%" stopColor={colors.blue} stopOpacity={isDark ? "0.08" : "0.15"} />
            <Stop offset="100%" stopColor={colors.base} stopOpacity="0" />
          </RadialGradient>
        </Defs>
        
        {/* Base color */}
        <Rect x="0" y="0" width="100%" height="100%" fill={colors.base} />
        
        {/* Apply radial gradients */}
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#purpleGradient)" />
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#lightBlueGradient)" />
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#blueGradient)" />
      </Svg>
    </Stack>
  )
}

