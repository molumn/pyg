import { createContext, useEffect, useState } from 'react'

const defaultValue: ThemeSchema = {
  color: {
    base: '#2B2D30',
    icon: '#DEE0E4',
    separator: '#1E1F22'
  }
}
export const ThemeContext = createContext<ThemeSchema>(defaultValue)

export const ThemeProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [themeSchema, setThemeSchema] = useState<ThemeSchema>(defaultValue)

  useEffect(() => {
    const refreshTheme = async () => {
      // const response: ThemeSchema = IpcSocket.requester.request()
      // setThemeSchema(response)
    }
    refreshTheme()
  }, [])

  return <ThemeContext.Provider value={themeSchema}>{children}</ThemeContext.Provider>
}
