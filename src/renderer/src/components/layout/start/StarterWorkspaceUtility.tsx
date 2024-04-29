import { ReactNode, useEffect, useState } from 'react'
import { WorkspaceKey } from '../../../../../shared/types'
import { Socket } from '../../../../../shared/socket'
import { twMerge } from 'tailwind-merge'
import { themeClass } from '../../../utils'
import { WorkspaceEntryButton } from '../../button/WorkspaceEntryButton'
import { hash } from '../../../../../shared/hash'
import { Column, Row } from '../utils/Layout'
import GrowingDiv from '../../base/GrowingDiv'
import { DisplayOptional } from '../utils/DisplayOptional'

type StarterWorkspaceLayout = 'list' | 'new'

export const StarterWorkspaceUtility = (): ReactNode => {
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

  const [layout, setLayout] = useState<StarterWorkspaceLayout>('list')

  return (
    <>
      <DisplayOptional optional={layout === 'list'}>
        <Column className={twMerge('flex-1 px-4 py-3', themeClass.dust.sections.footer)}>
          <Row className={'h-[40px] px-1 items-center'}>
            <GrowingDiv />
            <button className={'w-[60px] h-[25px] flex items-center justify-center rounded-[5px] bg-dust-utility'} onClick={() => setLayout('new')}>New</button>
          </Row>
          {createdWorkspaces.map((key) => {
            return <WorkspaceEntryButton key={hash(key.name)} workspaceKey={key} />
          })}
        </Column>
      </DisplayOptional>
      <DisplayOptional optional={layout === 'new'}>
        <Column className={twMerge('flex-1 px-4 py-3 gap-2', themeClass.dust.sections.footer)}>
          <Row className={'h-[40px] px-1 items-center'}>
            <button className={'w-[60px] h-[25px] flex items-center justify-center rounded-[5px] bg-dust-utility'} onClick={() => setLayout('list')}>Back</button>
            <GrowingDiv />
            <button className={'w-[80px] h-[25px] flex items-center justify-center rounded-[5px] bg-dust-utility'} onClick={() => setLayout('list')}>Create</button>
          </Row>
          <div>Workspace Name : <input /></div>
          <div>Workspace Location : <input /></div>
        </Column>
      </DisplayOptional>
    </>
  )
}
