import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { themeClass } from '../utils'
import { WindowControlButtons } from './button/WindowControlButtons'
import { Row } from '../utils/class/Layout'

export const TitleBarSection = ({
  className,
  children,
  ...props
}: ComponentProps<'header'>): ReactNode => {
  return (
    <header
      className={twMerge(
        'fixed h-[32px] w-full titlebar flex flex-row overflow-x-visible',
        themeClass.dust.sections.header,
        className
      )}
      {...props}
    >
      <Row className={'flex-1 justify-center items-center'}>{children}</Row>
      <WindowControlButtons />
    </header>
  )
}
