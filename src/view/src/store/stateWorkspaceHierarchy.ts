import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CharacterKey } from '@common/workspace/types'
import { IpcSocket } from '@common/socket'
import { RootState } from '@view/store/root'

const initialState: {
  character: CharacterKey | undefined
} = {
  character: undefined
}

export const updateCharacterHierarchyFromMain = createAsyncThunk('WorkspaceHierarchy/fetchCharacterHierarchy', async (): Promise<CharacterKey | undefined> => {
  const socket = IpcSocket.ipcRenderer
  return await socket.request('workspace/hierarchy/characters/list')
})

export const stateWorkspaceHierarchySlice = createSlice({
  name: 'WorkspaceHierarchy',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateCharacterHierarchyFromMain.fulfilled, (state, action): void => {
      state.character = action.payload
    })
  }
})

export const selectWorkspaceCharacterHierarchyKey = (state: RootState): CharacterKey | undefined => state.WorkspaceHierarchyState.character
