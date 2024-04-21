import { ReactNode, useEffect, useState } from 'react'

import { Frame } from './components/Frame'
import { Column, Row } from './utils/class/Layout'
import { twMerge } from 'tailwind-merge'
import { themeClass } from './utils'
import GrowingDiv from './components/base/GrowingDiv'
import { TitleBarSection } from './components/TitleBar'
import { Socket } from '../../shared/socket'
import { WorkspaceKey } from '../../shared/types'

export const StartPage = (): ReactNode => {
  const [createdWorkspaces, resetCreatedWorkspaces] = useState<WorkspaceKey[]>([])

  useEffect(() => {
    async function fetchCreatedWorkspace(): Promise<void> {
      const socket = Socket.requester(window)
      const response: WorkspaceKey[] = await socket.request('workspace', 'getCreatedWorkspaces')
      resetCreatedWorkspaces(response)
    }
    if (createdWorkspaces.length === 0) {
      fetchCreatedWorkspace()
    }
  }, [])

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
          <Column className={twMerge('w-[280px] px-2 py-3', themeClass.dust.start.sidebar)}>
            aside
          </Column>
          <Column className={twMerge('flex-1 px-4 py-3', themeClass.dust.sections.footer)}>
            {createdWorkspaces.map((key) => {
              return (
                <button
                  key={`start-page-workspace-button${key.name}`}
                  onClick={() =>
                    Socket.requester(window).command('windowControl', 'onChangeToWorkspace', key)
                  }
                >
                  {key.name}
                </button>
              )
            })}
          </Column>
        </Row>
      </Frame>
    </>
  )
}
