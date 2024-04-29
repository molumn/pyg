import { ComponentProps, ReactNode } from 'react'

export const DisplayOptional = ({ optional, children }: { optional?: boolean } & ComponentProps<'div'>): ReactNode => {
  if (!optional) return <></>
  return children
}
