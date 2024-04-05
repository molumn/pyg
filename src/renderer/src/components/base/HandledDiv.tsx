import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { themeClass } from '../../utils'

export const HandledDiv = ({
  warn = false,
  group = true,
  className,
  children,
  ...props
}: ComponentProps<'div'> & { warn?: boolean; group?: boolean }): ReactNode => {
  return (
    <div className={className} {...props}>
      <div
        className={twMerge(
          group ? 'group' : '',
          className,
          warn ? themeClass.dust.handling.warning : themeClass.dust.handling.highlight
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}
