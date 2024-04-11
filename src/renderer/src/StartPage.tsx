import { ReactNode } from 'react'

import { Frame } from './components/Frame'
import { Column, Row } from './utils/class/Layout'
import { twMerge } from 'tailwind-merge'
import { themeClass } from './utils'
import GrowingDiv from './components/base/GrowingDiv'
import { TitleBarSection } from './components/TitleBar'

export const StartPage = (): ReactNode => {
  return (
    <>
      <TitleBarSection>
        <div className={'w-[135px]'}>left</div>
        <GrowingDiv />
        <div>center</div>
        <GrowingDiv />
        <div>right</div>
      </TitleBarSection>
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
    </>
  )
}
