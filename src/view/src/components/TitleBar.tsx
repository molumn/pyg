import React, { ComponentProps } from 'react'

import { twMerge } from 'tailwind-merge'

import { themeClass } from '@view/utils'

import { Row } from '@view/components/layout/utils/Layout'
import { WindowControlButtons } from '@view/components/button/WindowControlButtons'

export const TitleBarSection = ({
  className,
  children,
  ...props
}: ComponentProps<'header'>): JSX.Element => {
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
