import { createContext, useEffect, useState } from 'react'

import { IpcSocket } from '@common/socket'

const defaultValue: ThemeSchema = {
  color: {
    base: '#2B2D30',
    icon: '#DEE0E4',
    hover: {
      button: '#43454A',
      fatal: '#EA0000CD'
    },
    separator: '#1E1F22',
    text: '#EEEEEE'
  }
}
export const ThemeContext = createContext<ThemeSchema>(defaultValue)

export const ThemeProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [themeSchema, setThemeSchema] = useState<ThemeSchema>(defaultValue)

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
