import { useEffect, useState } from 'react'
import { VscAdd, VscClose, VscEdit, VscFolderOpened } from 'react-icons/vsc'

import { WorkspaceKey } from '@common/type'
import { IpcSocket } from '@common/socket'

import { useModalRegister, useWorkspaceRegister } from '@view/hooks'

import { Button, ColoredButton, ReactIcon, Text } from '@view/ui'
import { Column, GrowingDiv, Hover, Modal, Row } from '@view/components/layout/utils'

const WorkspaceKeyNode = ({ workspace }: { workspace: WorkspaceKey }): JSX.Element => {
  const { unregisterModal } = useModalRegister()
  const { onOpenWorkspace } = useWorkspaceRegister()

  // todo : coloring
  return (
    <Hover className={'h-[40px] rounded px-3 centralize overflow-x-hidden'}>
      <Row className={'items-center'}>
        <Text size={'md'}>{workspace.name}</Text>
        <div className={'w-[150px]'} />
        <Text size={'2xs'}>{`path: ${workspace.rootPath}`}</Text>
        <GrowingDiv />
        <Button
          className={'w-[30px] h-[30px] centralize rounded-xl'}
          onClick={(): void => {
            onOpenWorkspace(workspace)()
            unregisterModal()()
          }}
        >
          <ReactIcon size={15} reactIconType={VscFolderOpened} />
        </Button>
        <div className={'w-[10px]'} />
        <Button className={'w-[30px] h-[30px] centralize rounded-xl'}>
          <ReactIcon size={15} reactIconType={VscEdit} />
        </Button>
        <div className={'w-[10px]'} />
        <Button className={'w-[30px] h-[30px] centralize rounded-xl'}>
          <ReactIcon size={15} reactIconType={VscClose} />
        </Button>
      </Row>
    </Hover>
  )
}

export const CreateOrOpenWorkspaceModal = (): JSX.Element => {
  const [workspaces, setWorkspaces] = useState<WorkspaceKey[]>([])

  useEffect(() => {
    async function reloadCreatedWorkspace(): Promise<void> {
      const workspaces: WorkspaceKey[] = await IpcSocket.ipcRenderer.request('workspace/list/created')
      setWorkspaces(workspaces)
    }
    reloadCreatedWorkspace()
  }, [setWorkspaces])

  // todo : coloring
  return (
    <Modal modalId={'CreateOrOpenWorkspace'} className={'w-[80vw] h-[80vh] px-3 py-2 rounded'}>
      <Column className={'items-center'}>
        <Row className={'h-auto items-center'}>
          <Column>
            {/* Text Input : Name */}
            {/* Text Input : Path */}
          </Column>
          <ColoredButton className={'w-[25px] h-[25px] centralize rounded'}>
            <ReactIcon reactIconType={VscAdd} />
          </ColoredButton>
        </Row>
        <Hover className={'w-[200px] h-[30px] centralize rounded-t'}>
          <Text size={'md'}>Workspace Lists</Text>
        </Hover>
        <div className={'h-3'} />
        <Column className={'bg-[#1E1F22] rounded px-3 py-2'}>{...workspaces.map((workspace) => <WorkspaceKeyNode key={`workspaces-element-${workspace.rootPath}`} workspace={workspace} />)}</Column>
      </Column>
    </Modal>
  )
}
