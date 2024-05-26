import { configureStore } from '@reduxjs/toolkit'
import { stateWorkspaceViewSlice } from '@view/store/stateWorkspaceView'
import { stateWorkspaceHierarchySlice } from '@view/store/stateWorkspaceHierarchy'

export const store = configureStore({
  reducer: {
    WorkspaceViewState: stateWorkspaceViewSlice.reducer,
    WorkspaceHierarchyState: stateWorkspaceHierarchySlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
