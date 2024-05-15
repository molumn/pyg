import React, { ComponentProps } from 'react'

import { twMerge } from 'tailwind-merge'
import { useThemeContext } from '@view/hooks'

export const Frame = ({ className, children, ...props }: ComponentProps<'div'>): JSX.Element => {
  const theme = useThemeContext()

  return (
    <div
      style={{
        backgroundColor: theme.color.base
      }}
      className={twMerge(className, 'w-full h-[calc(100lvh-32px)] relative top-[32px]')}
      {...props}
    >
      {children}
    </div>
  )
}
