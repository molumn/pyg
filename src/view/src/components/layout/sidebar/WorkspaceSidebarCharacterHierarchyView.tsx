import { useEffect, useState } from 'react'

import { BiCategory } from 'react-icons/bi'
import { GiCharacter } from 'react-icons/gi'
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md'

import { CharacterKey } from '@common/workspace/types'

import { useHookWorkspaceCharacterHierarchy, useMutableText } from '@view/hooks'

import { ReactIcon, Text } from '@view/ui'

import { Column, Row } from '@view/components/layout/utils'

import { useCharacterFileContextMenu } from '@view/hooks/specific'
import { IpcSocket } from '@common/socket'

export const WorkspaceSidebarCharacterHierarchyView = (): JSX.Element => {
  const { characterHierarchyKey, fetchCharacterHierarchy } = useHookWorkspaceCharacterHierarchy()

  useEffect(() => {
    fetchCharacterHierarchy()
  }, [])

  const DisplayCategory = ({ characterKey, depth }: { characterKey: CharacterKey; depth: number }): JSX.Element => {
    const [collapse, setCollapse] = useState(false)
    const { setMutableState, MutableTextComponent } = useMutableText(characterKey.name, async (text) => {
      const bool: boolean = await IpcSocket.ipcRenderer.request('workspace/hierarchy/characters/rename/category', characterKey, text)
      if (bool) fetchCharacterHierarchy()
    })

    const { openContextMenu, CharacterContextMenu } = useCharacterFileContextMenu(characterKey, setMutableState)

    return (
      <>
        <CharacterContextMenu />
        <Row style={{ paddingLeft: `${depth * 15}px` }} className={'h-[20px] w-full items-center gap-0.5 hover:bg-[#FFFFFF22]'} onContextMenu={openContextMenu}>
          <ReactIcon size={12} reactIconType={collapse ? MdKeyboardArrowRight : MdKeyboardArrowDown} onClick={(): void => setCollapse(!collapse)} />
          <ReactIcon size={12} reactIconType={BiCategory} />
          <MutableTextComponent size={'xs'} />
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
    const { setMutableState, MutableTextComponent } = useMutableText(characterKey.name, async (text) => {
      const bool: boolean = await IpcSocket.ipcRenderer.request('workspace/hierarchy/characters/rename/character', characterKey, text)
      if (bool) fetchCharacterHierarchy()
    })

    const { openContextMenu, CharacterContextMenu } = useCharacterFileContextMenu(characterKey, setMutableState)

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
          <MutableTextComponent size={'xs'} />
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
    const { setMutableState, MutableTextComponent } = useMutableText(characterKey.name, async (text) => {
      const bool: boolean = await IpcSocket.ipcRenderer.request('workspace/hierarchy/characters/rename/profile', characterKey, text)
      if (bool) fetchCharacterHierarchy()
    })

    const { openContextMenu, CharacterContextMenu } = useCharacterFileContextMenu(characterKey, setMutableState)

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
          <MutableTextComponent size={'xs'} />
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

  return (
    <>
      {/* todo : Navbar */}
      <Column className={'h-auto py-3 px-2'}>
        <DisplayNode depth={0} characterKey={characterHierarchyKey} />
      </Column>
    </>
  )
}
