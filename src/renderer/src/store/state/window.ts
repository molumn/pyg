import { WindowType } from "../../../../shared/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../root";

export interface WindowState {
  type: WindowType
}

const initialState: WindowState = {
  type: await window.ipc('request-window-type')
}

export const windowSlice = createSlice({
  name: 'window',
  initialState,
  reducers: {
    setLogin: state => {
      state.type = 'login'
      window.ipc('set-window-type', 'login')
    },
    setStart: state => {
      state.type = 'start'
      window.ipc('set-window-type', 'start')
    },
    setWorkspace: state => {
      state.type = 'workspace'
      window.ipc('set-window-type', 'workspace')
    }
  }
})

export const { setLogin, setStart, setWorkspace } = windowSlice.actions

export const selectWindowType = (state: RootState) => state.window.type
