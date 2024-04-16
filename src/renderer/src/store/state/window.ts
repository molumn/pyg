import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../root'

export interface WindowState {
  maximized: boolean
}

const initialState: WindowState = {
  maximized: await window.windowStatus.getWindowIsMaximized()
}

export const fetchWindowIsMaximized = createAsyncThunk('window/fetchIsMaximized', async () => {
  return await window.windowStatus.getWindowIsMaximized()
})

export const windowSlice = createSlice({
  name: 'window',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWindowIsMaximized.fulfilled, (state, action) => {
      state.maximized = action.payload
    })
  }
})

export const selectWindowIsMaximized = (state: RootState): boolean => state.window.maximized
