import { MouseEvent } from 'react'

import { CharacterKey } from '@common/workspace/types'
import { useAppDispatch, useContextMenuController, useHookWorkspaceCharacterHierarchy } from '@view/hooks'
import { Text } from '@view/ui'
import { IpcSocket } from '@common/socket'
import { registerCharacterToTabs, registerProfileToTabs } from '@view/store/stateWorkspaceFocusCharacters'

export const useCharacterFileContextMenu = (
  characterKey: CharacterKey,
  setMutable: (state: boolean) => void,
  menuId?: string
): {
  openContextMenu: (event: MouseEvent) => void
  CharacterContextMenu: () => JSX.Element
} => {
  const socket = IpcSocket.ipcRenderer
  const dispatcher = useAppDispatch()
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
          <ContextItem
            onClick={(): void => {
              if (characterKey.type === 'character') {
                dispatcher(registerCharacterToTabs(characterKey))
              } else if (characterKey.type === 'profile') {
                dispatcher(registerProfileToTabs(characterKey))
              }
            }}
          >
            <Text size={'xs'}>Open</Text>
          </ContextItem>
        )}
        <ContextItem
          onClick={(): void => {
            setMutable(true)
          }}
        >
          <Text size={'xs'}>Rename</Text>
        </ContextItem>
        <ContextItem
          onClick={(): void => {
            socket.request(`workspace/hierarchy/characters/delete/${characterKey.type}`, characterKey)
            fetchCharacterHierarchy()
          }}
        >
          <Text size={'xs'}>Delete</Text>
        </ContextItem>
      </ContextMenu>
    )
  }

  return {
    openContextMenu,
    CharacterContextMenu
  }
}
