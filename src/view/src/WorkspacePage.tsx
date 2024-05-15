import React, { useState } from 'react'

import {
  VscArchive,
  VscBookmark,
  VscLayoutSidebarLeft,
  VscLayoutSidebarLeftOff
} from 'react-icons/vsc'

import { twMerge } from 'tailwind-merge'

import { useThemeContext, useWorkspaceSidebarButtons } from './hooks'

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
  const theme = useThemeContext()
  const [sidebarOnOff, setSidebarOnOff] = useState(true)

  const {
    buttonList,
    selectedWorkspaceSidebarTypeButton,
    checkWorkspaceSidebarTypeButton,
    onButtonFocus
  } = useWorkspaceSidebarButtons([
    [
      'project',
      <VscArchive
        key={'workspace-sidebar-button-src-project'}
        size={16}
        style={{ color: theme.color.icon }}
      />
    ],
    [
      'flag',
      <VscBookmark
        key={'workspace-sidebar-button-src-flag'}
        size={16}
        style={{ color: theme.color.icon }}
      />
    ]
  ])

  return (
    <>
      <TitleBar>
        <button
          style={{ color: theme.color.icon }}
          className={'w-[40px] h-[32px] centralize'}
          onClick={() => setSidebarOnOff(!sidebarOnOff)}
        >
          {sidebarOnOff ? (
            <VscLayoutSidebarLeft size={16} />
          ) : (
            <VscLayoutSidebarLeftOff size={16} />
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
