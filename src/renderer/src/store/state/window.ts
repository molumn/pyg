import { WindowType } from '../../../../shared/types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../root'

export interface WindowState {
  type: WindowType,
  maximized: boolean
}

const initialState: WindowState = {
  type: await window.ipc('request-window-type'),
  maximized: await window.ipc('request-window-is-maximized')
}

export const fetchWindowType = createAsyncThunk('window/fetchType', async () => {
  return await window.ipc('request-window-type')
})

export const setWindowType = createAsyncThunk('window/setType', async (type: WindowType) => {
  await window.ipc('set-window-type', type)
  return type
})

export const fetchWindowIsMaximized = createAsyncThunk('window/fetchIsMaximized', async () => {
  return await window.ipc('request-window-is-maximized')
})

export const windowSlice = createSlice({
  name: 'window',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWindowType.fulfilled, (state, action) => {
        state.type = action.payload
      })
      .addCase(setWindowType.fulfilled, (state, action) => {
        state.type = action.payload
      })
      .addCase(fetchWindowIsMaximized.fulfilled, (state, action) => {
        state.maximized = action.payload
      })
  }
})

export const selectWindowType = (state: RootState) => state.window.type
export const selectWindowIsMaximized = (state: RootState) => state.window.maximized
