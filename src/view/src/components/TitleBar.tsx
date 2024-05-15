import React, { ComponentProps } from 'react'

import { Row } from '@view/components/layout/utils/Layout'
import { WindowControlButtons } from '@view/components/button/WindowControlButtons'

export const TitleBar = ({ children, ...props }: ComponentProps<'header'>): JSX.Element => {
  return (
    <header
      className={
        'fixed top-0 h-[32px] w-full title_bar flex flex-row overflow-x-visible border-gray-500 border-b-[1px]'
      }
      {...props}
    >
      <Row className={'mr-[120px] flex-1 justify-center items-center'}>{children}</Row>
      <WindowControlButtons />
    </header>
  )
}
