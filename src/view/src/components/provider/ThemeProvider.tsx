import { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext<ThemeSchema>({
  color: {
    base: '#2B2D30',
    separator: '#1E1F22'
  }
})

export const ThemeProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [themeSchema, setThemeSchema] = useState<ThemeSchema>({
    color: {
      base: '#2B2D30',
      separator: '#1E1F22'
    }
  })

  useEffect(() => {
    const refreshTheme = async () => {
      // const response: ThemeSchema = IpcSocket.requester.request()
      // setThemeSchema(response)
    }
    refreshTheme()
  }, [])

  return <ThemeContext.Provider value={themeSchema}>{children}</ThemeContext.Provider>
}
