import { WindowType } from '../../../../shared/types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../root'

export interface WindowState {
  type: WindowType
}

const initialState: WindowState = {
  type: await window.ipc('request-window-type')
}

export const fetchWindowType = createAsyncThunk('window/fetchType', async () => {
  return await window.ipc('request-window-type')
})

export const setWindowType = createAsyncThunk('window/setType', async (type: WindowType) => {
  await window.ipc('set-window-type', type)
  return type
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
  }
})

export const selectWindowType = (state: RootState) => state.window.type
