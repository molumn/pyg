import { useAppDispatch, useAppSelector } from '@view/hooks/hook'
import { selectWorkspaceCharacterHierarchyKey, updateCharacterHierarchyFromMain } from '@view/store/stateWorkspaceHierarchy'

export const useHookWorkspaceCharacterHierarchy = () => {
  const dispatcher = useAppDispatch()

  const characterHierarchyKey = useAppSelector(selectWorkspaceCharacterHierarchyKey)

  const fetchCharacterHierarchy = (): void => {
    dispatcher(updateCharacterHierarchyFromMain())
  }

  // todo : create category/character/profile method

  return {
    characterHierarchyKey,
    fetchCharacterHierarchy
  }
}
