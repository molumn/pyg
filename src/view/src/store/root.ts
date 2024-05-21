import { configureStore } from '@reduxjs/toolkit'

import { ProjectFileEditorStateSlice } from './ProjectFileEditor'
import { ProjectFileNodeStateSlice } from '@view/store/ProjectFileNode'

export const store = configureStore({
  reducer: {
    ProjectFileEditorState: ProjectFileEditorStateSlice.reducer,
    ProjectFileNodeState: ProjectFileNodeStateSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
