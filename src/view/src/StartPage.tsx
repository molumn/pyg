import React from 'react'

import { useTabArea } from '@view/hooks/useTabs'

import { Frame } from '@view/components/layout/Frame'
import { Column, Row } from '@view/components/layout/utils/Layout'
import { GrowingDiv } from '@view/components/layout/utils/GrowingDiv'
import { DisplayOptional } from '@view/components/layout/utils/DisplayOptional'

import { TitleBarSection } from '@view/components/TitleBar'
import { StarterWorkspaceUtility } from '@view/components/layout/start/StarterWorkspaceUtility'

export const StartPage = (): JSX.Element => {
  const { checkTab, TabButton } = useTabArea(['workspace', 'configuration'])

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
          <Column className={'w-[280px] px-2 py-3 gap-1 bg-dust-utility'}>
            <TabButton name={'workspace'}>workspace</TabButton>
            <TabButton name={'configuration'}>configuration</TabButton>
          </Column>
          <DisplayOptional display={checkTab('workspace')}>
            <StarterWorkspaceUtility />
          </DisplayOptional>
          <DisplayOptional display={checkTab('configuration')}>configuration</DisplayOptional>
        </Row>
      </Frame>
    </>
  )
}
