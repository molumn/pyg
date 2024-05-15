import React, { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const DisplayOptional = ({
  display = false,
  className,
  children
}: { display?: boolean; div?: boolean } & ComponentProps<'div'>): JSX.Element => {
  return (
    <div
      className={twMerge(
        className,
        `w-full h-full overflow-hidden transition-[max-height] duration-500 ease-in-out ${display ? '' : 'max-h-0 max-w-0'}`
      )}
    >
      {children}
    </div>
  )
}
