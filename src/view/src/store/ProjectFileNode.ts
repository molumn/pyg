import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { FileNode } from '@common/workspace/files'
import { IpcSocket } from '@common/socket'

import { RootState } from '@view/store/root'

const initialState: {
  root: FileNode | undefined
} = {
  root: undefined
}

export const updateRootNode = createAsyncThunk(
  'ProjectFileNode/updateRootNode',
  async (): Promise<FileNode | undefined> => {
    const socket = IpcSocket.ipcRenderer
    return await socket.request('workspace', 'getRootNode')
  }
)

export const ProjectFileNodeStateSlice = createSlice({
  name: 'ProjectFileNode',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateRootNode.fulfilled, (state, action): void => {
      state.root = action.payload
    })
  }
})

export const selectRootNode = (state: RootState): FileNode | undefined =>
  state.ProjectFileNodeState.root
