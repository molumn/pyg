import { ReactNode } from 'react'

import { Frame } from './components/Frame'
import GrowingDiv from './components/base/GrowingDiv'
import { TitleBarSection } from './components/TitleBar'

export const WorkspacePage = (): ReactNode => {
  return (
    <>
      <TitleBarSection>
        <div className={'w-[135px]'}>left</div>
        <GrowingDiv />
        <div>center</div>
        <GrowingDiv />
        <div>right</div>
      </TitleBarSection>
      <Frame></Frame>
    </>
  )
}
