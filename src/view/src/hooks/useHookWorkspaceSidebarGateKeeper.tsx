import { useAppDispatch, useAppSelector } from '@view/hooks/hook'
import { selectWorkspaceViewSidebarOpened, stateWorkspaceViewSlice } from '@view/store/stateWorkspaceView'

export const useHookWorkspaceSidebarGateKeeper = (): {
  sidebarViewOpened: boolean
  openSidebarView: () => void
  closeSidebarView: () => void
  reverseSidebarView: () => void
} => {
  const sidebarViewOpened = useAppSelector(selectWorkspaceViewSidebarOpened)
  const dispatcher = useAppDispatch()

  const openSidebarView = (): void => {
    dispatcher(stateWorkspaceViewSlice.actions.openSidebar())
  }
  const closeSidebarView = (): void => {
    dispatcher(stateWorkspaceViewSlice.actions.closeSidebar())
  }

  const reverseSidebarView = (): void => {
    if (sidebarViewOpened) closeSidebarView()
    else openSidebarView()
  }

  return {
    sidebarViewOpened,
    openSidebarView,
    closeSidebarView,
    reverseSidebarView
  }
}
