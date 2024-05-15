import React, { useState } from 'react'

import { PiDotsThreeVertical } from 'react-icons/pi'

import { WorkspaceKey } from '@common/type'
import { IpcSocket } from '@common/socket'

import { Column, Row } from '@view/components/layout/utils/Layout'
import { twMerge } from 'tailwind-merge'

export const WorkspaceEntryButton = ({
  workspaceKey,
  fetchWorkspaceKeys = async (): Promise<void> => {}
}: {
  workspaceKey: WorkspaceKey
  fetchWorkspaceKeys?: () => Promise<void>
}): JSX.Element => {
  // const onClick = async (): Promise<void> => {
  //   await fetchWorkspaceKeys()
  // }
  //
  // return (
  //   <Row
  //     className={
  //       'group w-full h-[50px] px-3 py-1 rounded-xl items-center hover:bg-dust-concentrate'
  //     }
  //   >
  //     <Column className={'grow'} onClick={onClick}>
  //       <p className={workspaceKey.isExisted ? 'text-gray-900' : 'text-gray-400'}>
  //         {workspaceKey.name + (workspaceKey.isExisted ? '' : ` -- Deleted`)}
  //       </p>
  //       <label className={'text-xs text-dust-text-base'}>{workspaceKey.rootPath}</label>
  //     </Column>
  //     <div className={'centralize'}>
  //       <button
  //         className={
  //           'w-[25px] h-[25px] rounded-full hidden group-hover:flex justify-center items-center hover:bg-dust-primary'
  //         }
  //       >
  //         <PiDotsThreeVertical />
  //       </button>
  //     </div>
  //   </Row>
  // )
  // todo
  return <></>
}
