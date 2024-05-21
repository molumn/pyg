import { configureStore } from '@reduxjs/toolkit'

import { ProjectFileEditorStateSlice } from './ProjectFileEditor'

export const store = configureStore({
  reducer: {
    ProjectFileEditorState: ProjectFileEditorStateSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
