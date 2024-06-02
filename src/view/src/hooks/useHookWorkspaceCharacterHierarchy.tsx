import { CharacterKey } from '@common/workspace/types'

import { useAppDispatch, useAppSelector } from '@view/hooks/hook'
import {
  requestCreateWorkspaceCharacterCategoryDir,
  requestCreateWorkspaceCharacterFile,
  requestCreateWorkspaceCharacterProfileFile,
  selectWorkspaceCharacterHierarchyKey,
  updateCharacterHierarchyFromMain
} from '@view/store/stateWorkspaceHierarchy'

export const useHookWorkspaceCharacterHierarchy = () => {
  const dispatcher = useAppDispatch()

  const characterHierarchyKey = useAppSelector(selectWorkspaceCharacterHierarchyKey)

  const fetchCharacterHierarchy = (): void => {
    dispatcher(updateCharacterHierarchyFromMain())
    console.log(characterHierarchyKey)
  }

  const createCategory = async (parent: CharacterKey, categoryName: string): Promise<void> => {
    dispatcher(
      requestCreateWorkspaceCharacterCategoryDir({
        parentPath: parent.path,
        categoryName
      })
    )
    fetchCharacterHierarchy()
  }
  const createCharacter = async (parent: CharacterKey, characterName: string): Promise<void> => {
    dispatcher(
      requestCreateWorkspaceCharacterFile({
        parentPath: parent.path,
        characterName
      })
    )
    fetchCharacterHierarchy()
  }
  const createProfile = async (parent: CharacterKey, profileName: string): Promise<void> => {
    dispatcher(
      requestCreateWorkspaceCharacterProfileFile({
        parentPath: parent.path,
        profileName
      })
    )
    fetchCharacterHierarchy()
  }

  return {
    characterHierarchyKey,
    fetchCharacterHierarchy,
    createCategory,
    createCharacter,
    createProfile
  }
}
