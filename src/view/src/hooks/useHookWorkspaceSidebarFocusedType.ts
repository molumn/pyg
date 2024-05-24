import { selectWorkspaceViewFocusedType, WorkspaceSidebarTabType } from '@view/store/stateWorkspaceView'
import { useAppSelector } from '@view/hooks/hook'

export const useHookWorkspaceSidebarFocusedType = (): {
  focusedSidebarType: WorkspaceSidebarTabType
  checkFocused: (tabName: WorkspaceSidebarTabType) => boolean
} => {
  const focusedSidebarType = useAppSelector(selectWorkspaceViewFocusedType)
  const checkFocused = (tabName: WorkspaceSidebarTabType): boolean => focusedSidebarType === tabName

  return {
    focusedSidebarType,
    checkFocused
  }
}
