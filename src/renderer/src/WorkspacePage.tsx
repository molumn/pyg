import { ReactNode } from 'react'

import { Frame } from './components/Frame'
import { WorkspaceFooter, WorkspaceHeader, WorkspaceSection, WorkspaceTitleBar } from './components/layout/workspace'

export const WorkspacePage = (): ReactNode => {
  return (
    <>
      <WorkspaceTitleBar />
      <Frame className={'flex flex-col'}>
        <WorkspaceHeader />
        <WorkspaceSection />
        <WorkspaceFooter />
      </Frame>
    </>
  )
}
