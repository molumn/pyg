import { useEffect, useState } from 'react'

import { BiCategory } from 'react-icons/bi'
import { GiCharacter } from 'react-icons/gi'

import { CharacterKey } from '@common/workspace/types'

import { useHookWorkspaceCharacterHierarchy, useModalController, useThemeContext } from '@view/hooks'

import { Button, ReactIcon, Text } from '@view/ui'

import { Column, Row } from '@view/components/layout/utils'
import { WorkspaceSidebarHierarchyViewTemplate } from '@view/components/layout/sidebar'

export const WorkspaceSidebarCharacterHierarchyView = (): JSX.Element => {
  const { characterHierarchyKey, fetchCharacterHierarchy } = useHookWorkspaceCharacterHierarchy()

  useEffect(() => {
    fetchCharacterHierarchy()
  }, [])

  const DisplayNode = ({ characterKey }: { characterKey: CharacterKey | undefined }): JSX.Element => {
    if (!characterKey) return <></>
    else if (characterKey.type === 'category') return <DisplayCategory characterKey={characterKey} />
    else if (characterKey.type === 'character') return <DisplayCharacter characterKey={characterKey} />
    else if (characterKey.type === 'profile') return <DisplayProfile characterKey={characterKey} />
    else return <></>
  }

  const DisplayCategory = ({ characterKey }: { characterKey: CharacterKey }): JSX.Element => {
    const [collapse, setCollapse] = useState(false)
    const { Modal, openModal } = useModalController('mouseRelative')

    return (
      <>
        <Modal className={'w-auto flex flex-col gap-1 px-2 py-2 rounded-[8px]'}>
          <Button className={'rounded text-start px-1'} onClick={(): void => console.log('add category')}>
            <Text size={'sm'}>Add Category</Text>
          </Button>
          <Button className={'rounded text-start px-1'} onClick={(): void => console.log('add character')}>
            <Text size={'sm'}>Add Character</Text>
          </Button>
        </Modal>
        <Row onContextMenu={openModal}>
          <ReactIcon reactIconType={BiCategory} onClick={(): void => setCollapse(!collapse)} />
          <Text size={'xs'}>{characterKey.name}</Text>
        </Row>
        <Column style={{ display: collapse ? 'none' : '' }} className={'h-auto pl-2'}>
          {...Object.keys(characterKey.children).map((key) => (
            <DisplayNode key={`workspace-character-hierarchy-profile-${characterKey.children[key]?.path}`} characterKey={characterKey.children[key]} />
          ))}
        </Column>
      </>
    )
  }

  const DisplayCharacter = ({ characterKey }: { characterKey: CharacterKey }): JSX.Element => {
    const [collapse, setCollapse] = useState(false)
    const { Modal, openModal } = useModalController('mouseRelative')

    return (
      <>
        <Modal className={'w-auto flex flex-col gap-1 px-2 py-2 rounded-[8px]'}>
          <Button className={'rounded text-start px-1'} onClick={(): void => console.log('add profile')}>
            <Text size={'sm'}>Add Profile</Text>
          </Button>
        </Modal>
        <Row onDoubleClick={(): void => console.log('open')} onContextMenu={openModal}>
          <ReactIcon reactIconType={GiCharacter} onClick={(): void => setCollapse(!collapse)} />
          <Text size={'xs'}>{characterKey.name}</Text>
        </Row>
        <Column style={{ display: collapse ? 'none' : '' }} className={'h-auto pl-2'}>
          {...Object.keys(characterKey.children).map((key) => (
            <DisplayNode key={`workspace-character-hierarchy-profile-${characterKey.children[key]?.path}`} characterKey={characterKey.children[key]} />
          ))}
        </Column>
      </>
    )
  }

  const DisplayProfile = ({ characterKey }: { characterKey: CharacterKey }): JSX.Element => {
    return (
      <Row onDoubleClick={(): void => console.log('open')}>
        <ReactIcon reactIconType={GiCharacter} />
        <Text size={'xs'}>{characterKey.name}</Text>
      </Row>
    )
  }

  return (
    <WorkspaceSidebarHierarchyViewTemplate>
      {/* todo : Navbar */}
      <Column className={'h-auto py-3 px-2'}>
        <DisplayNode characterKey={characterHierarchyKey} />
      </Column>
    </WorkspaceSidebarHierarchyViewTemplate>
  )
}
