import { useAppDispatch, useAppSelector } from '@view/hooks/hook'
import { selectWorkspaceViewSidebarOpened, stateWorkspaceViewSlice } from '@view/store/stateWorkspaceView'

export const useHookWorkspaceSidebarGateKeeper = (): {
  sidebarViewOpened: boolean
  openSidebarView: () => Promise<void>
  closeSidebarView: () => Promise<void>
  reverseSidebarView: () => Promise<void>
} => {
  const sidebarViewOpened = useAppSelector(selectWorkspaceViewSidebarOpened)
  const dispatcher = useAppDispatch()

  const openSidebarView = async (): Promise<void> => {
    dispatcher(stateWorkspaceViewSlice.actions.openSidebar())
  }
  const closeSidebarView = async (): Promise<void> => {
    dispatcher(stateWorkspaceViewSlice.actions.closeSidebar())
  }

  const reverseSidebarView = async (): Promise<void> => {
    if (sidebarViewOpened) await closeSidebarView()
    else await openSidebarView()
  }

  return {
    sidebarViewOpened,
    openSidebarView,
    closeSidebarView,
    reverseSidebarView
  }
}
