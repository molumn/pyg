import { useEffect, useState } from 'react'

import { BiCategory } from 'react-icons/bi'
import { GiCharacter } from 'react-icons/gi'
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md'

import { CharacterKey } from '@common/workspace/types'

import { useHookWorkspaceCharacterHierarchy } from '@view/hooks'

import { ReactIcon, Text } from '@view/ui'

import { Column, Row } from '@view/components/layout/utils'

import { useCharacterFileContextMenu } from '@view/hooks/specific'

const DisplayCategory = ({ characterKey, depth }: { characterKey: CharacterKey; depth: number }): JSX.Element => {
  const [collapse, setCollapse] = useState(false)
  const { openContextMenu, CharacterContextMenu } = useCharacterFileContextMenu(characterKey)

  return (
    <>
      <CharacterContextMenu />
      <Row style={{ paddingLeft: `${depth * 15}px` }} className={'h-[20px] w-full items-center gap-0.5 hover:bg-[#FFFFFF22]'} onContextMenu={openContextMenu}>
        <ReactIcon size={12} reactIconType={collapse ? MdKeyboardArrowRight : MdKeyboardArrowDown} onClick={(): void => setCollapse(!collapse)} />
        <ReactIcon size={12} reactIconType={BiCategory} />
        <Text size={'xs'}>{characterKey.name}</Text>
      </Row>
      <Column style={{ display: collapse ? 'none' : '' }} className={'h-auto'}>
        {...Object.keys(characterKey.children).map((key) => (
          <DisplayNode key={`workspace-character-hierarchy-profile-${characterKey.children[key]?.path}`} depth={depth + 1} characterKey={characterKey.children[key]} />
        ))}
      </Column>
    </>
  )
}

const DisplayCharacter = ({ characterKey, depth }: { characterKey: CharacterKey; depth: number }): JSX.Element => {
  const [collapse, setCollapse] = useState(false)
  const { openContextMenu, CharacterContextMenu } = useCharacterFileContextMenu(characterKey)

  return (
    <>
      <CharacterContextMenu />
      <Row
        style={{ paddingLeft: `${depth * 15}px` }}
        className={'h-[20px] w-full items-center gap-0.5 hover:bg-[#FFFFFF22]'}
        onDoubleClick={(): void => console.log('open')}
        onContextMenu={openContextMenu}
      >
        <ReactIcon size={12} reactIconType={collapse ? MdKeyboardArrowRight : MdKeyboardArrowDown} onClick={(): void => setCollapse(!collapse)} />
        <ReactIcon size={12} reactIconType={GiCharacter} />
        <Text size={'xs'}>{characterKey.name}</Text>
      </Row>
      <Column style={{ display: collapse ? 'none' : '' }} className={'h-auto'}>
        {...Object.keys(characterKey.children).map((key) => (
          <DisplayNode key={`workspace-character-hierarchy-profile-${characterKey.children[key]?.path}`} depth={depth + 1} characterKey={characterKey.children[key]} />
        ))}
      </Column>
    </>
  )
}

const DisplayProfile = ({ characterKey, depth }: { characterKey: CharacterKey; depth: number }): JSX.Element => {
  const { openContextMenu, CharacterContextMenu } = useCharacterFileContextMenu(characterKey)

  return (
    <>
      <CharacterContextMenu />
      <Row
        style={{ paddingLeft: `${depth * 15 + 12}px` }}
        className={'h-[20px] w-full items-center gap-0.5 hover:bg-[#FFFFFF22]'}
        onContextMenu={openContextMenu}
        onDoubleClick={(): void => console.log('open')}
      >
        <ReactIcon size={12} reactIconType={GiCharacter} />
        <Text size={'xs'}>{characterKey.name}</Text>
      </Row>
    </>
  )
}

const DisplayNode = ({ characterKey, depth }: { characterKey?: CharacterKey; depth: number }): JSX.Element => {
  if (!characterKey) return <></>
  else if (characterKey.type === 'category') return <DisplayCategory depth={depth} characterKey={characterKey} />
  else if (characterKey.type === 'character') return <DisplayCharacter depth={depth} characterKey={characterKey} />
  else if (characterKey.type === 'profile') return <DisplayProfile depth={depth} characterKey={characterKey} />
  else return <></>
}

export const WorkspaceSidebarCharacterHierarchyView = (): JSX.Element => {
  const { characterHierarchyKey, fetchCharacterHierarchy } = useHookWorkspaceCharacterHierarchy()

  useEffect(() => {
    fetchCharacterHierarchy()
  }, [])

  return (
    <>
      {/* todo : Navbar */}
      <Column className={'h-auto py-3 px-2'}>
        <DisplayNode depth={0} characterKey={characterHierarchyKey} />
      </Column>
    </>
  )
}
