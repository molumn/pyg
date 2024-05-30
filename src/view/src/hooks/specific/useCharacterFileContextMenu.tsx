import { MouseEvent } from 'react'

import { CharacterKey } from '@common/workspace/types'
import { useContextMenuController } from '@view/hooks'
import { Text } from '@view/ui'

export const useCharacterFileContextMenu = (
  characterKey: CharacterKey,
  menuId?: string
): {
  openContextMenu: (event: MouseEvent) => void
  CharacterContextMenu: () => JSX.Element
} => {
  const { openContextMenu, ContextMenu, ContextItem } = useContextMenuController(menuId ?? '')

  // todo : create method
  // todo : open method

  const creatable: string[] = []
  if (characterKey.type === 'character') creatable.push('Profile')
  if (characterKey.type === 'category') creatable.push('Category', 'Character')

  const CharacterContextMenu = (): JSX.Element => {
    return (
      <ContextMenu className={'w-[140px] flex flex-col p-1 rounded'}>
        {...creatable.map(
          (type): JSX.Element => (
            <ContextItem key={`context-item-${type}`}>
              <Text size={'xs'}>{`New ${type}`}</Text>
            </ContextItem>
          )
        )}
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
