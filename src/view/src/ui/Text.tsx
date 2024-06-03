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
  onBlur: () => void
  size: keyof ThemeSchema['font']['size']
  className?: string
}
export const MutableText = ({ text = '', mutableStatus, onEnter, onBlur, ...props }: MutableTextProps): JSX.Element => {
  const theme = useThemeContext()

  if (mutableStatus) {
    return (
      <textarea
        style={{
          borderColor: theme.color.separator,
          fontSize: theme.font.size['xs'],
          color: theme.color.text
        }}
        rows={1}
        className={'h-auto w-auto centralize bg-transparent border-[1px] rounded resize-none'}
        onKeyDown={(event): void => {
          if (event.key === 'Enter') {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onEnter(event.target.value)
          } else if (event.key === 'Escape') {
            onBlur()
          }
        }}
        onBlur={onBlur}
        autoFocus={true}
        onFocus={(event) => event.target.select()}
      >
        {text}
      </textarea>
    )
  } else {
    return <Text {...props}>{text}</Text>
  }
}
