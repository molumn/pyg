import { ReactNode } from 'react'
import { WorkspaceKey } from '../../../../shared/types'
import { Socket } from '../../../../shared/socket'
import { Column, Row } from '../../utils/class/Layout'
import { PiDotsThreeVertical } from 'react-icons/pi'

export const WorkspaceEntryButton = ({ workspaceKey }: { workspaceKey: WorkspaceKey }): ReactNode => {
  return <Row
    className={'group w-full h-[50px] px-3 rounded-xl items-center hover:bg-dust-concentrate'}
  >
    <Column
      className={'grow'}
      onClick={() =>
        Socket.requester(window).command('windowControl', 'onChangeToWorkspace', workspaceKey)
      }
    >
      <p>{workspaceKey.name}</p>
      <label className={'text-xs text-dust-text-base'}>{workspaceKey.rootPath}</label>
    </Column>
    <button className={'w-[35px] h-[35px] rounded-full hidden group-hover:flex justify-center items-center hover:bg-dust-primary'} onClick={() => console.log('about')}>
      <PiDotsThreeVertical />
    </button>
  </Row>
}
