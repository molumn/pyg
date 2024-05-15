import React, { useState } from 'react'

import {
  VscArchive,
  VscBookmark,
  VscLayoutSidebarLeft,
  VscLayoutSidebarLeftOff
} from 'react-icons/vsc'

import { twMerge } from 'tailwind-merge'

import { useWorkspaceSidebarButtons } from './hooks'

import { Frame } from './components/layout/Frame'
import { Row } from './components/layout/utils/Layout'
import { GrowingDiv } from './components/layout/utils/GrowingDiv'
import { DisplayOptional } from './components/layout/utils/DisplayOptional'

import { TitleBar } from './components/TitleBar'
import {
  WorkspaceFooter,
  WorkspaceSidebar,
  WorkspaceSandboxArea
} from './components/layout/workspace'

export const WorkspacePage = (): JSX.Element => {
  const [sidebarOnOff, setSidebarOnOff] = useState(true)

  const {
    buttonList,
    selectedWorkspaceSidebarTypeButton,
    checkWorkspaceSidebarTypeButton,
    onButtonFocus
  } = useWorkspaceSidebarButtons([
    ['project', <VscArchive key={'workspace-sidebar-button-src-project'} />],
    ['flag', <VscBookmark key={'workspace-sidebar-button-src-flag'} />]
  ])

  return (
    <>
      <TitleBar>
        <button
          className={'w-[40px] h-full centralize'}
          onClick={() => setSidebarOnOff(!sidebarOnOff)}
        >
          {sidebarOnOff ? (
            <VscLayoutSidebarLeft size={20} />
          ) : (
            <VscLayoutSidebarLeftOff size={20} />
          )}
        </button>
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
      </TitleBar>
      <Frame className={'flex flex-col'}>
        <Row className={'w-auto'}>
          <WorkspaceSidebar sidebarOnOff={sidebarOnOff} />
          <WorkspaceSandboxArea
            selectedWorkspaceSidebarTypeButton={selectedWorkspaceSidebarTypeButton}
          />
        </Row>
        <WorkspaceFooter />
      </Frame>
    </>
  )
}
