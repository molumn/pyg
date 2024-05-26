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

export const requestCreateWorkspaceCharacterCategoryDir = createAsyncThunk(
  'WorkspaceHierarchy/requestCreateWorkspaceCharacterCategoryDir',
  async (args: { parentPath: string; categoryName: string }): Promise<boolean> => {
    const socket = IpcSocket.ipcRenderer
    return await socket.request('workspace/hierarchy/characters/create/category', args.parentPath, args.categoryName)
  }
)
export const requestCreateWorkspaceCharacterFile = createAsyncThunk(
  'WorkspaceHierarchy/requestCreateWorkspaceCharacterCategoryDir',
  async (args: { parentPath: string; characterName: string }): Promise<boolean> => {
    const socket = IpcSocket.ipcRenderer
    return await socket.request('workspace/hierarchy/characters/create/character', args.parentPath, args.characterName)
  }
)
export const requestCreateWorkspaceCharacterProfileFile = createAsyncThunk(
  'WorkspaceHierarchy/requestCreateWorkspaceCharacterCategoryDir',
  async (args: { parentPath: string; profileName: string }): Promise<boolean> => {
    const socket = IpcSocket.ipcRenderer
    return await socket.request('workspace/hierarchy/characters/create/profile', args.parentPath, args.profileName)
  }
)

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
