import React, { ComponentProps } from 'react'

export const DisplayOptional = ({
  display,
  div,
  className,
  children
}: { display?: boolean; div?: boolean } & ComponentProps<'div'>): JSX.Element => {
  if (div) {
    if (!display) return <div className={className}></div>
    return <div className={'w-full h-full'}>{children}</div>
  } else {
    if (!display) return <></>
    return <>{children}</>
  }
}
