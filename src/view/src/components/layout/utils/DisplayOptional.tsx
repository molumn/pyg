import React, { ComponentProps } from 'react'

export const DisplayOptional = ({
  optional,
  children
}: { optional?: boolean } & ComponentProps<'div'>): JSX.Element => {
  if (!optional) return <></>
  return <>{children}</>
}
