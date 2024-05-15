import { ComponentProps } from 'react'

import { Row } from '@view/components/layout/utils/Layout'
import { WindowControlButtons } from '@view/components/button/WindowControlButtons'
import { useThemeContext } from '@view/hooks'

export const TitleBar = ({ children, ...props }: ComponentProps<'header'>): JSX.Element => {
  const theme = useThemeContext()

  return (
    <header
      style={{
        backgroundColor: theme.color.base,
        borderColor: theme.color.separator
      }}
      className={
        'fixed top-0 h-[32px] w-full title_bar flex flex-row overflow-x-visible border-b-[1px]'
      }
      {...props}
    >
      <Row className={'mr-[120px] flex-1 justify-center items-center'}>{children}</Row>
      <WindowControlButtons />
    </header>
  )
}
