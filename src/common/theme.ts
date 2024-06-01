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
  size: {
    '3xs': string
    '2xs': string
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
    '4xl': string
  }
}

export type ThemeSchema = {
  color: ThemeColorSchema
  font: ThemeFontSchema
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
  },
  font: {
    size: {
      '3xs': '0.6rem',
      '2xs': '0.7rem',
      xs: '0.8rem',
      sm: '0.9rem',
      md: '1rem',
      lg: '1.1rem',
      xl: '1.2rem',
      '2xl': '1.4rem',
      '3xl': '1.6rem',
      '4xl': '2rem'
    }
  }
}
