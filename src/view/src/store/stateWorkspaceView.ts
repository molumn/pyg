import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@view/store/root'

export type WorkspaceSidebarTabType = 'Character Hierarchy' | 'Plot Hierarchy' | 'Scene Hierarchy' | 'Timeline Hierarchy' | 'Scripts Hierarchy'

const initialState: {
  sidebarOpened: boolean
  focusedSidebarType: WorkspaceSidebarTabType
} = {
  sidebarOpened: true,
  focusedSidebarType: 'Character Hierarchy'
}

export const stateWorkspaceViewSlice = createSlice({
  name: 'WorkspaceView',
  initialState,
  reducers: {
    openSidebar: (state): void => {
      state.sidebarOpened = true
    },
    closeSidebar: (state): void => {
      state.sidebarOpened = false
    },
    focusSidebar: (state, action): void => {
      state.focusedSidebarType = action.payload.focused
    }
  }
})

export const selectWorkspaceViewSidebarOpened = (state: RootState): boolean => state.WorkspaceViewState.sidebarOpened
export const selectWorkspaceViewFocusedType = (state: RootState): WorkspaceSidebarTabType => state.WorkspaceViewState.focusedSidebarType
