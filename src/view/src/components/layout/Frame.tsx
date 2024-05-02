import React, { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { themeClass } from '../../utils'

export const Frame = ({ className, children, ...props }: ComponentProps<'div'>): JSX.Element => {
  return (
    <div
      className={twMerge(
        'w-full h-[calc(100lvh-32px)] relative top-[32px]',
        themeClass.dust.sections.body,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}