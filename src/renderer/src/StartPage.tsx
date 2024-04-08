import { ReactNode } from 'react'

import { Frame } from './components/Frame'
import { Column, Row } from './utils/class/Layout'
import { twMerge } from 'tailwind-merge'
import { themeClass } from './utils'

export const StartPage = (): ReactNode => {
  return (
    <Frame>
      <Row>
        <Column className={twMerge('w-[280px] px-2 py-3', themeClass.dust.start.sidebar)}>
          aside
        </Column>
        <Column className={twMerge('flex-1 px-4 py-3', themeClass.dust.sections.footer)}>
          content
        </Column>
      </Row>
    </Frame>
  )
}
