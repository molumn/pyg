type ThemeColorSchema = {
  base: string
  icon: string
  hover: {
    area: string
    button: string
    fatal: string
  }
  separator: string
  text: string
  button: string
}

type ThemeFontSchema = {
  // size: {
  //   xxs: string
  //   xs: string
  //   sm: string
  //   md: string
  //   lg: string
  //   xl: string
  //   xxl: string
  // }
}

export type ThemeSchema = {
  color: ThemeColorSchema
}

export const defaultThemeSchema: ThemeSchema = {
  color: {
    base: '#2B2D30',
    icon: '#DEE0E4',
    hover: {
      area: '#214282',
      button: '#43454A',
      fatal: '#EA0000CD'
    },
    separator: '#1E1F22',
    text: '#EEEEEE',
    button: '#5a5d63'
  }
}
