import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { ThemeSchema } from '@common/theme'

import { useThemeContext } from '@view/hooks'

type InputProps = {
  label?: string
  fontSize?: keyof ThemeSchema['font']['size']
} & ComponentProps<'input'>
export const Input = ({ label = 'input', fontSize = 'sm', className, children, ...props }: InputProps): JSX.Element => {
  const theme = useThemeContext()

  return (
    <>
      <label
        style={{
          fontSize: '0.8rem'
        }}
        htmlFor={label}
      >
        {label}
      </label>
      <input
        id={label}
        style={{
          backgroundColor: theme.color.base,
          borderColor: theme.color.separator,
          fontSize: theme.font.size[fontSize]
        }}
        className={twMerge('border-2 rounded px-2', className)}
        {...props}
      />
      {children}
    </>
  )
}
