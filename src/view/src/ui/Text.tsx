import { useThemeContext } from '@view/hooks'
import { ThemeSchema } from '@common/theme'
import { useState } from 'react'

export type TextProps = {
  size: keyof ThemeSchema['font']['size']
  className?: string
  children: string
}
export const Text = ({ size, ...props }: TextProps): JSX.Element => {
  const theme = useThemeContext()

  return (
    <p
      style={{
        fontSize: theme.font.size[size],
        color: theme.color.text
      }}
      {...props}
    />
  )
}

export type MutableTextProps = {
  text?: string
  mutableStatus: boolean
  onEnter: (text: string) => void
  size: keyof ThemeSchema['font']['size']
  className?: string
}
export const MutableText = ({ text = '', mutableStatus, onEnter, ...props }: MutableTextProps): JSX.Element => {
  const theme = useThemeContext()

  if (mutableStatus) {
    return (
      <textarea
        style={{
          borderColor: theme.color.separator,
          fontSize: theme.font.size['xs']
        }}
        rows={1}
        className={'h-auto w-auto centralize bg-transparent border-[1px] rounded resize-none'}
        onKeyDown={(event): void => {
          if (event.key === 'Enter') {
            console.log(event.target.value)
            onEnter(event.target.value)
          }
        }}
      >
        {text}
      </textarea>
    )
  } else {
    return <Text {...props}>{text}</Text>
  }
}
