import React, { useEffect, useState } from 'react'

import { twMerge } from 'tailwind-merge'

import { themeClass } from '@view/utils'

import { WorkspaceKey } from '@common/type'
import { IpcSocket } from '@common/socket'

import { GrowingDiv } from '@view/components/layout/utils/GrowingDiv'
import { Column, Row } from '@view/components/layout/utils/Layout'
import { DisplayOptional } from '@view/components/layout/utils/DisplayOptional'

import { WorkspaceEntryButton } from '@view/components/button/WorkspaceEntryButton'

type StarterWorkspaceLayout = 'list' | 'new'

export const StarterWorkspaceUtility = (): JSX.Element => {
  const [createdWorkspaces, resetCreatedWorkspaces] = useState<WorkspaceKey[]>([])

  async function fetchCreatedWorkspace(): Promise<void> {
    const socket = IpcSocket.requester
    const response: WorkspaceKey[] = await socket.request('workspace', 'getCreatedWorkspaces')
    resetCreatedWorkspaces(response)
  }

  useEffect(() => {
    if (createdWorkspaces.length === 0) {
      fetchCreatedWorkspace()
    }
  }, [])

  const [layout, setLayout] = useState<StarterWorkspaceLayout>('list')

  return (
    <>
      <DisplayOptional display={layout === 'list'}>
        <Column className={twMerge('flex-1 px-4 py-3', themeClass.dust.sections.body)}>
          <Row className={'h-[40px] px-1 items-center'}>
            <GrowingDiv />
            <button
              className={
                'w-[60px] h-[25px] flex items-center justify-center rounded-[5px] bg-dust-utility'
              }
              onClick={(): void => setLayout('new')}
            >
              New
            </button>
          </Row>
          {...createdWorkspaces.map((key) => {
            return (
              <WorkspaceEntryButton
                key={`workspace-entry-button-[${key.name}]`}
                workspaceKey={key}
                fetchWorkspaceKeys={fetchCreatedWorkspace}
              />
            )
          })}
        </Column>
      </DisplayOptional>
      <DisplayOptional display={layout === 'new'}>
        <Column className={twMerge('flex-1 px-4 py-3 gap-2', themeClass.dust.sections.body)}>
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
              onClick={async (): Promise<void> => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const name = document.getElementById('workspace-new-name')?.value ?? ''
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const path = document.getElementById('workspace-new-path')?.value ?? ''

                const socket = IpcSocket.requester
                if (!(await socket.request('nodeUtilities', 'checkDirectoryIsFree', path))) {
                  return
                }

                const key: WorkspaceKey = {
                  name,
                  type: 'planning-game',
                  rootPath: path,
                  isExisted: false
                }

                socket.command('workspace', 'createWorkspace', key)
              }}
            >
              Create
            </button>
            <div className={'w-[5px]'}></div>
            <button
              className={
                'w-[120px] h-[25px] flex items-center justify-center rounded-[5px] bg-gray-300'
              }
              onClick={(): void => IpcSocket.requester.command('workspace', 'createDemo')}
            >
              Create Demo
            </button>
          </Row>
          <div>
            Workspace Name : <input id={'workspace-new-name'} className={''} />
          </div>
          <div>
            Workspace Location : <input id={'workspace-new-path'} className={''} />
          </div>
        </Column>
      </DisplayOptional>
    </>
  )
}
