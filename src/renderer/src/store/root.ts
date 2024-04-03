import { configureStore } from '@reduxjs/toolkit'
import { windowSlice } from './state/window'

export const store = configureStore({
  reducer: {
    window: windowSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
