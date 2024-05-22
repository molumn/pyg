import { useState } from 'react'

import {
  VscArchive,
  VscBookmark,
  VscLayoutSidebarLeft,
  VscLayoutSidebarLeftOff
} from 'react-icons/vsc'

import { useThemeContext, occupyWorkspaceTitleBarButtons } from '@view/hooks'

import { Button } from '@view/ui'
import { ReactIcon } from '@view/ui'

import { Frame } from '@view/components/layout/Frame'
import { Row } from '@view/components/layout/utils/Layout'
import { GrowingDiv } from '@view/components/layout/utils/GrowingDiv'
import { TitleBar } from '@view/components/layout/TitleBar'
import {
  WorkspaceFooter,
  WorkspaceSidebar,
  WorkspaceSandboxArea
} from './components/layout/workspace'

export const WorkspacePage = (): JSX.Element => {
  const theme = useThemeContext()
  const [sidebarOnOff, setSidebarOnOff] = useState(true)

  const { buttonList, selectedWorkspaceSidebarTypeButton, onButtonFocus, WorkspaceTitleBarButton } =
    occupyWorkspaceTitleBarButtons([
      [
        'project',
        <ReactIcon
          reactIconType={VscArchive}
          key={'workspace-sidebar-button-src-project'}
          size={16}
        />
      ],
      [
        'flag',
        <ReactIcon
          reactIconType={VscBookmark}
          key={'workspace-sidebar-button-src-flag'}
          size={16}
        />
      ]
    ])

  return (
    <>
      <TitleBar>
        <Button
          className={'w-[40px] h-[32px] centralize'}
          onClick={(): void => setSidebarOnOff(!sidebarOnOff)}
        >
          {sidebarOnOff ? (
            <ReactIcon reactIconType={VscLayoutSidebarLeft} size={16} />
          ) : (
            <ReactIcon reactIconType={VscLayoutSidebarLeftOff} size={16} />
          )}
        </Button>
        {...buttonList.map((button) => (
          <WorkspaceTitleBarButton
            button={button}
            key={`workspace-sidebar-button-${button[0]}`}
            className={'w-[32px] h-[32px] centralize'}
            onClick={onButtonFocus(button[0])}
          />
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
