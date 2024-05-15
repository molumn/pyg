import { useContext } from 'react'

import { ThemeContext } from '@view/components/provider/ThemeProvider'

export const useThemeContext = (): ThemeSchema => {
  return useContext(ThemeContext)
}
