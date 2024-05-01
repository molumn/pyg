import React, { ComponentProps } from 'react'

export const DisplayOptional = ({
  display,
  slideIn,
  className,
  children
}: { display?: boolean, slideIn: 'Left' | 'Light' } & ComponentProps<'div'>): JSX.Element => {
  if (!display) return <div className={className}></div>
  return <div className={'w-full h-full'}>{children}</div>
}
