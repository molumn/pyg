import { MouseEvent } from 'react'

import { CharacterKey } from '@common/workspace/types'
import { useContextMenuController, useHookWorkspaceCharacterHierarchy } from '@view/hooks'
import { Text } from '@view/ui'
import { IpcSocket } from '@common/socket'

export const useCharacterFileContextMenu = (
  characterKey: CharacterKey,
  menuId?: string
): {
  openContextMenu: (event: MouseEvent) => void
  CharacterContextMenu: () => JSX.Element
} => {
  const socket = IpcSocket.ipcRenderer
  const { openContextMenu, ContextMenu, ContextItem } = useContextMenuController(menuId ?? '')
  const { fetchCharacterHierarchy } = useHookWorkspaceCharacterHierarchy()

  // todo : create method
  // todo : open method

  const createNodeButtons: JSX.Element[] = []

  if (characterKey.type === 'character') {
    createNodeButtons.push(
      <ContextItem
        onClick={(): void => {
          socket.request('workspace/hierarchy/characters/create/profile', characterKey.path)
          fetchCharacterHierarchy()
        }}
      >
        <Text size={'xs'}>New Profile</Text>
      </ContextItem>
    )
  } else if (characterKey.type === 'category') {
    createNodeButtons.push(
      <ContextItem
        onClick={(): void => {
          socket.request('workspace/hierarchy/characters/create/category', characterKey.path)
          fetchCharacterHierarchy()
        }}
      >
        <Text size={'xs'}>New Category</Text>
      </ContextItem>
    )
    createNodeButtons.push(
      <ContextItem
        onClick={(): void => {
          socket.request('workspace/hierarchy/characters/create/character', characterKey.path)
          fetchCharacterHierarchy()
        }}
      >
        <Text size={'xs'}>New Character</Text>
      </ContextItem>
    )
  }

  const CharacterContextMenu = (): JSX.Element => {
    return (
      <ContextMenu className={'w-[140px] flex flex-col p-1 rounded'}>
        {...createNodeButtons}
        {characterKey.type === 'category' ? (
          <></>
        ) : (
          <ContextItem>
            <Text size={'xs'}>Open</Text>
          </ContextItem>
        )}
      </ContextMenu>
    )
  }

  return {
    openContextMenu,
    CharacterContextMenu
  }
}
