type Theme = 'dust'

export const themeClass: {
  [theme in Theme]: {
    sections: {
      header: string
      body: string
      footer: string
    }
    control: {
      minimize: string
      maximize: string
      close: string
    }
    form: {
      base: string
      label: string
      input: string
      submit: string
      media: string
    }
  }
} = {
  dust: {
    sections: {
      header: 'bg-dust-primary text-dust-text-heavy',
      body: 'bg-dust-light text-dust-text-base',
      footer: 'bg-dust-secondary text-dust-text-heavy'
    },
    control: {
      minimize:
        'bg-transparent text-dust-text-base hover:bg-dust-handling-highlight focus:bg-dust-handling-highlight',
      maximize:
        'bg-transparent text-dust-text-base hover:bg-dust-handling-highlight focus:bg-dust-handling-highlight',
      close:
        'bg-transparent text-dust-text-base hover:bg-dust-handling-warning focus:bg-dust-handling-warning'
    },
    form: {
      base: 'bg-dust-light text-dust-text-base',
      label: 'text-dust-text-base',
      input: 'ring-dust-utility focus:bg-dust-handling-highlight focus:ring-dust-concentrate',
      submit: 'bg-dust-primary hover:bg-dust-concentrate',
      media: 'bg-dust-primary'
    }
  }
}
