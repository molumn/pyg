import { ReactNode } from 'react'

import { Frame } from './components/Frame'
import { Row } from './components/layout/utils/Layout'
import GrowingDiv from './components/base/GrowingDiv'
import { TitleBarSection } from './components/TitleBar'
import { StarterSidebar } from './components/layout/start/StarterSidebar'
import { useStarterSidebarOptions } from './hooks/useStarterSidebarOptions'
import { StarterWorkspaceUtility } from './components/layout/start/StarterWorkspaceUtility'
import { DisplayOptional } from './components/layout/utils/DisplayOptional'

export const StartPage = (): ReactNode => {
  const { options, updateOptions } = useStarterSidebarOptions()

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
          <StarterSidebar options={options} updateOptions={updateOptions} />
          <DisplayOptional optional={options.focus === 'workspace'} children={<StarterWorkspaceUtility />} />
          <DisplayOptional optional={options.focus === 'configuration'} children={<StarterWorkspaceUtility />} />
        </Row>
      </Frame>
    </>
  )
}
