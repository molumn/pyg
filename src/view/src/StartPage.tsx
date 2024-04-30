import React from 'react'

import { useStarterSidebarOptions } from './hooks'

import GrowingDiv from './components/base/GrowingDiv'

import { Frame } from './components/Frame'
import { Row } from './components/layout/utils/Layout'
import { DisplayOptional } from './components/layout/utils/DisplayOptional'
import { StarterSidebar } from './components/layout/start/StarterSidebar'
import { StarterWorkspaceUtility } from './components/layout/start/StarterWorkspaceUtility'
import { TitleBarSection } from './components/TitleBar'

export const StartPage = (): JSX.Element => {
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
          <DisplayOptional optional={options.focus === 'workspace'}>
            <StarterWorkspaceUtility />
          </DisplayOptional>
          <DisplayOptional optional={options.focus === 'configuration'}>
            <StarterWorkspaceUtility />
          </DisplayOptional>
        </Row>
      </Frame>
    </>
  )
}
