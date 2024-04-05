import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { themeClass } from '../utils'

export const TitleBarSection = ({
  className,
  children,
  ...props
}: ComponentProps<'header'>): ReactNode => {
  return (
    <header
      className={twMerge(
        'fixed h-[32px] w-full titlebar flex flex-row overflow-x-visible',
        themeClass.dust.primary,
        className
      )}
      {...props}
    >
      {children}
    </header>
  )
}
