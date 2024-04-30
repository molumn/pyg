import React from 'react'

import { PiDotsThreeVertical } from 'react-icons/pi'

import { WorkspaceKey } from '../../../../common/type'
import { IpcSocket } from '../../../../common/socket'

import { Column, Row } from '../layout/utils/Layout'

export const WorkspaceEntryButton = ({
  workspaceKey
}: {
  workspaceKey: WorkspaceKey
}): JSX.Element => {
  return (
    <Row
      className={
        'group w-full h-[50px] px-3 py-1 rounded-xl items-center hover:bg-dust-concentrate'
      }
    >
      <Column
        className={'grow'}
        onClick={(): void =>
          IpcSocket.requester.command('windowControl', 'onChangeToWorkspace', workspaceKey)
        }
      >
        <p>{workspaceKey.name}</p>
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
