import { createContext, useEffect, useState } from 'react'

import { IpcSocket } from '@common/socket'
import { defaultThemeSchema, ThemeSchema } from '@common/theme'

export const ThemeContext = createContext<ThemeSchema>(defaultThemeSchema)

export const ThemeProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [themeSchema, setThemeSchema] = useState<ThemeSchema>(defaultThemeSchema)

  useEffect(() => {
    const refreshTheme = async (): Promise<void> => {
      // todo : request theme
      const response: ThemeSchema = await IpcSocket.ipcRenderer.request('')
      if (!response) return
      setThemeSchema(response)
    }
    refreshTheme()
  }, [])

  return <ThemeContext.Provider value={themeSchema}>{children}</ThemeContext.Provider>
}
