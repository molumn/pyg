import React from 'react'

import { VscArchive, VscBookmark } from 'react-icons/vsc'

import { twMerge } from 'tailwind-merge'

import { Row } from './components/layout/utils/Layout'
import { Frame } from './components/layout/Frame'
import { TitleBarSection } from './components/TitleBar'
import GrowingDiv from './components/layout/utils/GrowingDiv'
import { WorkspaceFooter, WorkspaceSandboxArea } from './components/layout/workspace'
import { useWorkspaceSidebarButtons } from './hooks'
import { DisplayOptional } from './components/layout/utils/DisplayOptional'
import { WorkspaceProjectSidebar } from './components/layout/workspace/sidebar'

export const WorkspacePage = (): JSX.Element => {
  const { buttonList, selectedWorkspaceSidebarTypeButton, onButtonFocus } =
    useWorkspaceSidebarButtons([
      ['project', <VscArchive key={'workspace-sidebar-button-src-project'} />],
      ['flag', <VscBookmark key={'workspace-sidebar-button-src-flag'} />]
    ])

  return (
    <>
      <TitleBarSection className={'px-2 gap-1'}>
        {...buttonList.map((button) => (
          <button
            key={`workspace-sidebar-button-${button[0]}`}
            className={twMerge(
              'w-[32px] h-[32px] centralize',
              selectedWorkspaceSidebarTypeButton === button[0] ? 'bg-dust-concentrate' : ''
            )}
            onClick={onButtonFocus(button[0])}
          >
            {button[1]}
          </button>
        ))}
        <GrowingDiv />
      </TitleBarSection>
      <Frame className={'flex flex-col'}>
        <Row className={'w-auto'}>
          <DisplayOptional display={selectedWorkspaceSidebarTypeButton === 'project'}>
            <WorkspaceProjectSidebar />
          </DisplayOptional>
          <WorkspaceSandboxArea
            selectedWorkspaceSidebarTypeButton={selectedWorkspaceSidebarTypeButton}
          />
        </Row>
        <WorkspaceFooter />
      </Frame>
    </>
  )
}
