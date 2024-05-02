import React, { ComponentProps } from 'react'

import { twMerge } from 'tailwind-merge'

export const CentralizedDiv = ({
  className,
  children,
  ...props
}: ComponentProps<'div'>): JSX.Element => {
  console.log(children)
  return (
    <div
      className={twMerge(
        'w-full h-full flex justify-center items-center bg-transparent',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export const Column = ({ className, children, ...props }: ComponentProps<'div'>): JSX.Element => {
  return (
    <div className={twMerge('w-full h-full flex flex-col bg-transparent', className)} {...props}>
      {children}
    </div>
  )
}

export const Row = ({ className, children, ...props }: ComponentProps<'div'>): JSX.Element => {
  return (
    <div className={twMerge('w-full h-full flex flex-row bg-transparent', className)} {...props}>
      {children}
    </div>
  )
}

// export const GroupedDiv = ({ className, children, ...props }: ComponentProps<'div'>): JSX.Element => {
//   return (
//     <div className={twMerge('group', className)} {...props}>
//       {children}
//     </div>
//   )
// }
