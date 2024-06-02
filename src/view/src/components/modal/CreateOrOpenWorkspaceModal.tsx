import { ComponentProps, useEffect, useState } from 'react'
import { VscAdd, VscClose, VscEdit, VscFolder, VscFolderOpened } from 'react-icons/vsc'

import { WorkspaceKey } from '@common/type'
import { IpcSocket } from '@common/socket'

import { useModalRegister, useWorkspaceRegister } from '@view/hooks'

import { Button, ColoredButton, FatalButton, FilePathInput, Form, Input, ReactIcon, Text } from '@view/ui'
import { Column, Gap, GrowingDiv, Hover, Modal, Row } from '@view/components/layout/utils'

const WorkspaceCreateForm = (props: ComponentProps<typeof Form>): JSX.Element => {
  return (
    <Form
      style={{
        backgroundColor: '#1E1F22'
      }}
      {...props}
    >
      <Column className={'w-full justify-center flex-1'}>
        <Input label={'Workspace Name'} className={'h-[30px]'} defaultValue={'new'} />
        <Gap gap={10} />
        <Input label={'Workspace Path'} className={'h-[30px]'} defaultValue={'~/'}>
          <FilePathInput
            dialogProperties={['openDirectory']}
            onResult={async (filepath): Promise<void> => {
              const input = document.getElementById('Workspace Path')
              if (!input) return
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              input.value = filepath
            }}
            className={'w-[26px] h-[26px] rounded'}
          >
            <ReactIcon reactIconType={VscFolder} />
          </FilePathInput>
        </Input>
      </Column>
      <Gap gap={'20%'} />
      <Column className={'w-[10%] centralize'}>
        <GrowingDiv />
        <Row className={'h-auto'}>
          <ColoredButton className={'w-[25px] h-[25px] centralize rounded'} type={'submit'}>
            <ReactIcon reactIconType={VscAdd} />
          </ColoredButton>
        </Row>
      </Column>
    </Form>
  )
}

const WorkspaceKeyNode = ({ workspace, onOpenWorkspace, onRemoveWorkspace }: { workspace: WorkspaceKey; onOpenWorkspace: () => void; onRemoveWorkspace: () => void }): JSX.Element => {
  const { unregisterModal } = useModalRegister()

  // todo : coloring
  return (
    <Hover className={'h-[40px] rounded px-3 centralize overflow-x-hidden'}>
      <Row className={'items-center'}>
        <div className={'w-1/4'}>
          <Text size={'md'}>{workspace.isExisted ? workspace.name : `${workspace.name} - [deleted]`}</Text>
        </div>
        <div className={'w-1/2'}>
          <Text size={'2xs'}>{`path: ${workspace.rootPath}`}</Text>
        </div>
        <GrowingDiv />
        <Button
          className={'w-[30px] h-[30px] centralize rounded-xl'}
          onClick={(): void => {
            onOpenWorkspace()
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
        {workspace.isExisted ? (
          <FatalButton className={'w-[30px] h-[30px] centralize rounded-xl'}>
            <ReactIcon size={15} reactIconType={VscClose} />
          </FatalButton>
        ) : (
          <Button className={'w-[30px] h-[30px] centralize rounded-xl'} onClick={onRemoveWorkspace}>
            <ReactIcon size={15} reactIconType={VscClose} />
          </Button>
        )}
      </Row>
    </Hover>
  )
}

export const CreateOrOpenWorkspaceModal = (): JSX.Element => {
  const [workspaces, setWorkspaces] = useState<WorkspaceKey[]>([])
  async function reloadCreatedWorkspace(): Promise<void> {
    const workspaces: WorkspaceKey[] = await IpcSocket.ipcRenderer.request('workspace/list/created')
    setWorkspaces(workspaces)
  }

  reloadCreatedWorkspace()
  useEffect(() => {
    reloadCreatedWorkspace()
  }, [setWorkspaces])

  const { onOpenWorkspace, onCreateWorkspace, onRemoveWorkspace } = useWorkspaceRegister()

  // todo : coloring
  return (
    <Modal modalId={'CreateOrOpenWorkspace'} className={'w-[70vw] h-[70vh] px-3 py-2 rounded'}>
      <Column className={'items-center'}>
        <div
          style={{
            backgroundColor: '#1E1F22'
          }}
          className={'w-[200px] h-[40px] self-start centralize rounded-t'}
        >
          <Text size={'md'}>Create Workspace</Text>
        </div>
        <WorkspaceCreateForm
          className={'h-auto w-full flex flex-row items-center px-3 py-2 rounded rounded-tl-[0px]'}
          onSubmitCaptured={async (workspaceName, workspacePath): Promise<void> => {
            await onCreateWorkspace(workspaceName, workspacePath)()
            await reloadCreatedWorkspace()
          }}
        />
        <Gap gap={30} />
        <div
          style={{
            backgroundColor: '#1E1F22'
          }}
          className={'w-[200px] h-[40px] self-start centralize rounded-t'}
        >
          <Text size={'md'}>Workspace Lists</Text>
        </div>
        <Column className={'bg-[#1E1F22] px-3 py-2 rounded rounded-tl-[0px] overflow-y-scroll'}>
          {...workspaces.map((workspace) => (
            <WorkspaceKeyNode key={`workspaces-element-${workspace.rootPath}`} workspace={workspace} onOpenWorkspace={onOpenWorkspace(workspace)} onRemoveWorkspace={onRemoveWorkspace(workspace)} />
          ))}
        </Column>
      </Column>
    </Modal>
  )
}
