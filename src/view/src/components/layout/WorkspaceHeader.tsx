import { VscLayoutSidebarLeft, VscLayoutSidebarLeftOff } from 'react-icons/vsc'

import { useHookWorkspaceSidebarGateKeeper, useThemeContext } from '@view/hooks'

import { Button, ReactIcon } from '@view/ui'

import { GrowingDiv, Row } from '@view/components/layout/utils'
import { WindowControlButtons } from '@view/components/button'

export const WorkspaceHeader = (): JSX.Element => {
  const theme = useThemeContext()

  const { sidebarViewOpened, reverseSidebarView } = useHookWorkspaceSidebarGateKeeper()
  // todo : header util buttons
  // todo : header blur background color

  return (
    <header
      style={{
        backgroundColor: theme.color.base,
        borderColor: theme.color.separator
      }}
      className={'fixed top-0 h-[32px] w-full title_bar flex flex-row overflow-x-visible border-b-[1px]'}
    >
      <Row className={'mr-[120px] flex-1 justify-center items-center'}>
        <div className={'w-[40px] h-[32px] centralize'}>
          <Button className={'w-[25px] h-[24px] rounded centralize'} onClick={reverseSidebarView}>
            {sidebarViewOpened ? <ReactIcon reactIconType={VscLayoutSidebarLeft} size={16} /> : <ReactIcon reactIconType={VscLayoutSidebarLeftOff} size={16} />}
          </Button>
        </div>
        <GrowingDiv />
      </Row>
      <WindowControlButtons />
    </header>
  )
}
