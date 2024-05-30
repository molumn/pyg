import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const AccordHorizontal = ({ animate, className, children, ...props }: { animate: boolean } & ComponentProps<'div'>): JSX.Element => {
  return (
    <div className={twMerge(className, 'transition-all duration-500 overflow-hidden max-h-full', animate ? '' : 'max-h-0')} {...props}>
      {children}
    </div>
  )
}

export const AccordVertical = ({ animate, className, children, ...props }: { animate: boolean } & ComponentProps<'div'>): JSX.Element => {
  return (
    <div className={twMerge(className, 'transition-all duration-500 overflow-hidden max-w-full', animate ? '' : 'max-w-0')} {...props}>
      {children}
    </div>
  )
}
