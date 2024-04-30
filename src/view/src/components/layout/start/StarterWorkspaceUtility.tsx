import React, { useEffect, useState } from 'react'

import { twMerge } from 'tailwind-merge'
import { themeClass } from '../../../utils'

import { hash } from '../../../../../common/hash'
import { WorkspaceKey } from '../../../../../common/type'
import { IpcSocket } from '../../../../../common/socket'

import GrowingDiv from '../../base/GrowingDiv'
import { Column, Row } from '../utils/Layout'
import { DisplayOptional } from '../utils/DisplayOptional'
import { WorkspaceEntryButton } from '../../button/WorkspaceEntryButton'

type StarterWorkspaceLayout = 'list' | 'new'

export const StarterWorkspaceUtility = (): JSX.Element => {
  const [createdWorkspaces, resetCreatedWorkspaces] = useState<WorkspaceKey[]>([])

  useEffect(() => {
    async function fetchCreatedWorkspace(): Promise<void> {
      const socket = IpcSocket.requester
      const response: WorkspaceKey[] = await socket.request('workspace', 'getCreatedWorkspaces')
      resetCreatedWorkspaces(response)
    }
    if (createdWorkspaces.length === 0) {
      fetchCreatedWorkspace()
    }
  }, [])

  const [layout, setLayout] = useState<StarterWorkspaceLayout>('list')

  return (
    <>
      <DisplayOptional optional={layout === 'list'}>
        <Column className={twMerge('flex-1 px-4 py-3', themeClass.dust.sections.footer)}>
          <Row className={'h-[40px] px-1 items-center'}>
            <GrowingDiv />
            <button
              className={
                'w-[60px] h-[25px] flex items-center justify-center rounded-[5px] bg-dust-utility'
              }
              onClick={() => setLayout('new')}
            >
              New
            </button>
          </Row>
          {createdWorkspaces.map((key) => {
            return <WorkspaceEntryButton key={hash(key.name)} workspaceKey={key} />
          })}
        </Column>
      </DisplayOptional>
      <DisplayOptional optional={layout === 'new'}>
        <Column className={twMerge('flex-1 px-4 py-3 gap-2', themeClass.dust.sections.footer)}>
          <Row className={'h-[40px] px-1 items-center'}>
            <button
              className={
                'w-[60px] h-[25px] flex items-center justify-center rounded-[5px] bg-dust-utility'
              }
              onClick={(): void => setLayout('list')}
            >
              Back
            </button>
            <GrowingDiv />
            <button
              className={
                'w-[80px] h-[25px] flex items-center justify-center rounded-[5px] bg-dust-utility'
              }
              onClick={(): void => setLayout('list')}
            >
              Create
            </button>
          </Row>
          <div>
            Workspace Name : <input />
          </div>
          <div>
            Workspace Location : <input />
          </div>
        </Column>
      </DisplayOptional>
    </>
  )
}
