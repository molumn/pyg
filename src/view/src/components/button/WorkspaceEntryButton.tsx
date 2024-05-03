import React from 'react'

import { PiDotsThreeVertical } from 'react-icons/pi'

import { WorkspaceKey } from '../../../../common/type'
import { IpcSocket } from '../../../../common/socket'

import { Column, Row } from '../layout/utils/Layout'

export const WorkspaceEntryButton = ({
  workspaceKey,
  fetchWorkspaceKeys = async (): Promise<void> => {}
}: {
  workspaceKey: WorkspaceKey
  fetchWorkspaceKeys?: () => Promise<void>
}): JSX.Element => {
  const onClick = async (): Promise<void> => {
    await fetchWorkspaceKeys()
    if (workspaceKey.isExisted)
      IpcSocket.requester.command('windowControl', 'onChangeToWorkspace', workspaceKey)
  }

  return (
    <Row
      className={
        'group w-full h-[50px] px-3 py-1 rounded-xl items-center hover:bg-dust-concentrate'
      }
    >
      <Column className={'grow'} onClick={onClick}>
        <p>{workspaceKey.name + (workspaceKey.isExisted ? '' : ` -- Deleted`)}</p>
        <label className={'text-xs text-dust-text-base'}>{workspaceKey.rootPath}</label>
      </Column>
      <button
        className={
          'w-[35px] h-[35px] rounded-full hidden group-hover:flex justify-center items-center hover:bg-dust-primary'
        }
        onClick={(): void => {
          // todo : on click about
        }}
      >
        <PiDotsThreeVertical />
      </button>
    </Row>
  )
}
