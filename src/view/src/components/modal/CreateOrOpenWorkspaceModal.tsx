import { VscAdd, VscClose, VscEdit, VscFolderOpened } from 'react-icons/vsc'

import { WorkspaceKey } from '@common/type'

import { Button, ColoredButton, ReactIcon, Text } from '@view/ui'
import { Column, GrowingDiv, Hover, Modal, Row } from '@view/components/layout/utils'

export const CreateOrOpenWorkspaceModal = () => {
  const workspaces: WorkspaceKey[] = [
    {
      name: 'hello',
      rootPath: '././',
      type: 'demo',
      isExisted: false
    },
    {
      name: 'hello',
      rootPath: '././',
      type: 'demo',
      isExisted: false
    },
    {
      name: 'hello',
      rootPath: '././',
      type: 'demo',
      isExisted: false
    }
  ]

  return (
    <Modal modalId={'CreateOrOpenWorkspace'} className={'w-[80vw] h-[80vh] px-3 py-2 rounded'}>
      <Column>
        <Row className={'h-auto'}>
          <GrowingDiv />
          {/* Search Bar */}
          <ColoredButton className={'w-[25px] h-[25px] centralize rounded'}>
            <ReactIcon reactIconType={VscAdd} />
          </ColoredButton>
        </Row>
        <div className={'h-3'} />
        {...workspaces.map((workspace) => (
          <Hover key={`workspaces-element-${workspace.rootPath}`} className={'h-[40px] rounded px-3 centralize overflow-x-hidden'}>
            <Row className={'items-center'}>
              <Text size={'md'}>{workspace.name}</Text>
              <div className={'w-[150px]'} />
              <Text size={'2xs'}>{`path: ${workspace.rootPath}`}</Text>
              <GrowingDiv />
              <Button className={'w-[30px] h-[30px] centralize rounded-xl'}>
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
        ))}
      </Column>
    </Modal>
  )
}
