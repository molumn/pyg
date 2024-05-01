import React from 'react'

import GrowingDiv from './components/layout/utils/GrowingDiv'

import { Frame } from './components/layout/Frame'
import { StarterWorkspaceUtility } from './components/layout/start/StarterWorkspaceUtility'
import { TitleBarSection } from './components/TitleBar'
import { TabbableArea, TabButton, TabSidebar, TabView, TabViewArea } from './components/layout/utils/TabbableArea'
import { twMerge } from 'tailwind-merge'
import { themeClass } from './utils'

export const StartPage = (): JSX.Element => {
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
        <TabbableArea layout={'row'}>
          <TabSidebar className={twMerge('w-[280px] px-2 py-3', themeClass.dust.start.sidebar)}>
            <TabButton name={'workspace'} activateClassName={'bg-dust-concentrate'}/>
            <TabButton name={'configuration'} />
          </TabSidebar>
          <TabViewArea className={'w-full'}>
            <TabView name={'workspace'}>
              <StarterWorkspaceUtility />
            </TabView>
          </TabViewArea>
        </TabbableArea>
      </Frame>
    </>
  )
}
