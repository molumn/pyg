type ThemeColorSchema = {
  base: string
  icon: string
  hover: {
    button: string
    fatal: string
  }
  separator: string
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

type ThemeSchema = {
  color: ThemeColorSchema
}
