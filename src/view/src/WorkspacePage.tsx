import React, { useState } from 'react'

import { VscBookmark, VscGithubProject } from 'react-icons/vsc'

import { twMerge } from 'tailwind-merge'

import { Frame } from './components/layout/Frame'
import {
  WorkspaceFooter,
  WorkspaceSection, WorkspaceSectionSidebarType
} from './components/layout/workspace'
import { TitleBarSection } from './components/TitleBar'
import GrowingDiv from './components/layout/utils/GrowingDiv'

export const WorkspacePage = (): JSX.Element => {
  const [sectionSidebar, setSectionSidebar] = useState<WorkspaceSectionSidebarType>('project')

  const chooseSectionSidebar = (name: WorkspaceSectionSidebarType) => () => {
    setSectionSidebar(name)
  }

  return (
    <>
      <TitleBarSection className={'px-2 gap-1'}>
        <button className={twMerge('w-[32px] h-[32px] mt-1 rounded-t-xl centralize', sectionSidebar === 'project' ? 'bg-dust-concentrate workspace-section-type' : '')} onClick={chooseSectionSidebar('project')}><VscGithubProject /></button>
        <button className={twMerge('w-[32px] h-[32px] mt-1 rounded-t-xl centralize', sectionSidebar === 'flag' ? 'bg-dust-concentrate workspace-section-type' : '')} onClick={chooseSectionSidebar('flag')}><VscBookmark /></button>
        <GrowingDiv />
      </TitleBarSection>
      <Frame className={'flex flex-col'}>
        <WorkspaceSection sidebar={sectionSidebar} />
        <WorkspaceFooter />
      </Frame>
    </>
  )
}
