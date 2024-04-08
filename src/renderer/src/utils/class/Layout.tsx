import { ComponentProps, ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'

export const CentralizedDiv = ({
  className,
  children,
  ...props
}: ComponentProps<'div'>): ReactNode => {
  return (
    <div
      className={twMerge('flex justify-center items-center bg-transparent', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export const Column = ({ className, children, ...props }: ComponentProps<'div'>): ReactNode => {
  return (
    <div
      className={twMerge('flex flex-col justify-center bg-transparent', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export const Row = ({ className, children, ...props }: ComponentProps<'div'>): ReactNode => {
  return (
    <div
      className={twMerge('flex flex-row items-center bg-transparent', className)}
      {...props}
    >
      {children}
    </div>
  )
}

// export const GroupedDiv = ({ className, children, ...props }: ComponentProps<'div'>): ReactNode => {
//   return (
//     <div className={twMerge('group', className)} {...props}>
//       {children}
//     </div>
//   )
// }
