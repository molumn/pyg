import { twMerge } from 'tailwind-merge'

type Theme =
  | 'dust'
  | 'picnic'
  | 'warm'
  | 'mud'

type ThemeColor = {
  primary: string,
  secondary: string,
  highlight: string,
  heavy: string,
  light: string,
}

export const themeClass: {
  [theme in Theme]: ThemeColor
} = {
  dust: {
    primary: twMerge('bg-dust-primary text-dust-light'),
    secondary: twMerge('bg-dust-secondary text-dust-light'),
    highlight: twMerge('bg-dust-highlight text-dust-light'),
    heavy: twMerge('bg-dust-heavy text-dust-light'),
    light: twMerge('bg-dust-light text-dust-heavy'),
  },
  picnic: {
    primary: twMerge('bg-picnic-primary text-picnic-light'),
    secondary: twMerge('bg-picnic-secondary text-picnic-light'),
    highlight: twMerge('bg-picnic-highlight text-picnic-light'),
    heavy: twMerge('bg-picnic-heavy text-picnic-light'),
    light: twMerge('bg-picnic-light text-picnic-heavy'),
  },
  warm: {
    primary: twMerge('bg-warm-primary text-warm-light'),
    secondary: twMerge('bg-warm-secondary text-warm-light'),
    highlight: twMerge('bg-warm-highlight text-warm-light'),
    heavy: twMerge('bg-warm-heavy text-warm-light'),
    light: twMerge('bg-warm-light text-warm-heavy'),
  },
  mud: {
    primary: twMerge('bg-mud-primary text-mud-light'),
    secondary: twMerge('bg-mud-secondary text-mud-light'),
    highlight: twMerge('bg-mud-highlight text-mud-light'),
    heavy: twMerge('bg-mud-heavy text-mud-light'),
    light: twMerge('bg-mud-light text-mud-heavy'),
  },
}

export const themeBackgroundClass = {
  dust: {
    primary: 'bg-dust-primary',
    secondary: 'bg-dust-secondary',
    highlight: 'bg-dust-highlight',
    heavy: 'bg-dust-heavy',
    light: 'bg-dust-light',
  },
  picnic: {
    primary: 'bg-picnic-primary',
    secondary: 'bg-picnic-secondary',
    highlight: 'bg-picnic-highlight',
    heavy: 'bg-picnic-heavy',
    light: 'bg-picnic-light',
  },
  warm: {
    primary: 'bg-warm-primary',
    secondary: 'bg-warm-secondary',
    highlight: 'bg-warm-highlight',
    heavy: 'bg-warm-heavy',
    light: 'bg-warm-light',
  },
  mud: {
    primary: 'bg-mud-primary',
    secondary: 'bg-mud-secondary',
    highlight: 'bg-mud-highlight',
    heavy: 'bg-mud-heavy',
    light: 'bg-mud-light',
  },
}

export const themeTextClass = {
  dust: {
    primary: 'text-dust-light',
    secondary: 'text-dust-light',
    highlight: 'text-dust-light',
    heavy: 'text-dust-light',
    light: 'text-dust-heavy',
  },
  picnic: {
    primary: 'text-picnic-light',
    secondary: 'text-picnic-light',
    highlight: 'text-picnic-light',
    heavy: 'text-picnic-light',
    light: 'text-picnic-heavy',
  },
  warm: {
    primary: 'text-warm-light',
    secondary: 'text-warm-light',
    highlight: 'text-warm-light',
    heavy: 'text-warm-light',
    light: 'text-warm-heavy',
  },
  mud: {
    primary: 'text-mud-light',
    secondary: 'text-mud-light',
    highlight: 'text-mud-light',
    heavy: 'text-mud-light',
    light: 'text-mud-heavy',
  },
}
