import React from 'react'

import GrowingDiv from './components/layout/utils/GrowingDiv'

import { Frame } from './components/layout/Frame'
import { StarterWorkspaceUtility } from './components/layout/start/StarterWorkspaceUtility'
import { TitleBarSection } from './components/TitleBar'
import { useTabArea } from './hooks/useTabs'
import { Column, Row } from './components/layout/utils/Layout'
import { DisplayOptional } from './components/layout/utils/DisplayOptional'

export const StartPage = (): JSX.Element => {
  const { selectedTab, TabButton } = useTabArea(['workspace', 'configuration'])

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
          <DisplayOptional display={selectedTab === 'workspace'}>
            <StarterWorkspaceUtility />
          </DisplayOptional>
        </Row>
        {/*<TabbableArea layout={'row'}>*/}
        {/*  <TabSidebar className={twMerge('w-[280px] px-2 py-3', themeClass.dust.start.sidebar)}>*/}
        {/*    <TabButton name={'workspace'} activateClassName={'bg-dust-concentrate'}>*/}
        {/*      Workspace*/}
        {/*    </TabButton>*/}
        {/*    <TabButton name={'configuration'}>Configuration</TabButton>*/}
        {/*  </TabSidebar>*/}
        {/*  <TabViewArea className={'w-full'}>*/}
        {/*    <TabView name={'workspace'}>*/}
        {/*      <StarterWorkspaceUtility />*/}
        {/*    </TabView>*/}
        {/*  </TabViewArea>*/}
        {/*</TabbableArea>*/}
      </Frame>
    </>
  )
}
