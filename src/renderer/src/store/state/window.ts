import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../root'
import { Socket } from '../../../../shared/socket'

export interface WindowState {
  maximized: boolean
}

const initialState: WindowState = {
  maximized: await Socket.requester(window).request('windowStatus', 'getWindowIsMaximized')
}

export const fetchWindowIsMaximized = createAsyncThunk('window/fetchIsMaximized', async () => {
  const rv: boolean = await Socket.requester(window).request('windowStatus', 'getWindowIsMaximized')
  return rv
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
