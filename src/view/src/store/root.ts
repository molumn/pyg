import { configureStore } from '@reduxjs/toolkit'
import { stateWorkspaceViewSlice } from '@view/store/stateWorkspaceView'

export const store = configureStore({
  reducer: {
    WorkspaceViewState: stateWorkspaceViewSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
