import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { WindowControlButtons } from './button/WindowControlButtons'

import { Row } from './layout/utils/Layout'
import { themeClass } from '../utils'

export const TitleBarSection = ({
  className,
  children,
  ...props
}: ComponentProps<'header'>): ReactNode => {
  return (
    <header
      className={twMerge(
        'fixed top-0 h-[32px] w-full titlebar flex flex-row overflow-x-visible',
        themeClass.dust.sections.header,
        className
      )}
      {...props}
    >
      <Row className={'mr-[120px] flex-1 justify-center items-center'}>{children}</Row>
      <WindowControlButtons />
    </header>
  )
}
