import { useColorScheme } from 'react-native'
import {
  TamaguiProvider,
  type TamaguiProviderProps,
  ToastProvider,
  Theme,
  config,
  isWeb,
} from '@my/ui'

export function Provider({
  children,
  defaultTheme,
  ...rest
}: Omit<TamaguiProviderProps, 'config'> & { defaultTheme?: string }) {
  const colorScheme = useColorScheme()
  const theme = defaultTheme ?? (colorScheme === 'dark' ? 'dark' : 'light')

  return (
    <TamaguiProvider config={config} defaultTheme={theme} {...rest}>
      <Theme>
        {children}
      </Theme>
    </TamaguiProvider>
  )
}
