type Theme =
  | 'dust'

export const themeClass: {
  [theme in Theme]: {
    primary: string
    secondary: string
    concentrate: string
    utility: string
    light: string
    text: {
      heavy: string
      base: string
    }
    handling: {
      highlight: string
      warning: string
    }
  }
} = {
  dust: {
    primary: 'bg-dust-primary text-dust-text-heavy',
    secondary: 'bg-dust-secondary text-dust-text-heavy',
    concentrate: 'bg-dust-concentrate text-dust-text-base',
    utility: 'bg-dust-utility text-dust-text-base',
    light: 'bg-dust-light text-dust-text-base',
    text: {
      heavy: 'text-dust-text-heavy',
      base: 'text-dust-text-base'
    },
    handling: {
      highlight:
        'hover:bg-dust-handling-highlight group-hover:bg-dust-handling-highlight ' +
        'focus:bg-dust-handling-highlight group-focus:bg-dust-handling-highlight focus-within:bg-dust-handling-highlight',
      warning:
        'hover:bg-dust-handling-warning group-hover:bg-dust-handling-warning ' +
        'focus:bg-dust-handling-warning group-focus:bg-dust-handling-warning focus-within:bg-dust-handling-warning '
    }
  }
}
