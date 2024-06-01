import { ComponentProps } from 'react'

import { twMerge } from 'tailwind-merge'

export const CentralizedDiv = ({ className, children, ...props }: ComponentProps<'div'>): JSX.Element => {
  return (
    <div className={twMerge('w-full h-full bg-transparent', className, 'flex justify-center items-center')} {...props}>
      {children}
    </div>
  )
}

export const Column = ({ className, children, ...props }: ComponentProps<'div'>): JSX.Element => {
  return (
    <div className={twMerge('w-full h-full bg-transparent', className, 'flex flex-col')} {...props}>
      {children}
    </div>
  )
}

export const Row = ({ className, children, ...props }: ComponentProps<'div'>): JSX.Element => {
  return (
    <div className={twMerge('w-full h-full bg-transparent', className, 'flex flex-row')} {...props}>
      {children}
    </div>
  )
}
