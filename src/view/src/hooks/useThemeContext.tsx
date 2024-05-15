import { useContext } from 'react'

import { ThemeContext } from '@view/components/provider/ThemeProvider'

export const useThemeContext = () => {
  return useContext(ThemeContext)
}
