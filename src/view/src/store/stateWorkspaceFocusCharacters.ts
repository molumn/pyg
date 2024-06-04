import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CharacterContent, CharacterKey, CharacterProfileContent } from '@common/workspace/types'
import { IpcSocket } from '@common/socket'
import { RootState } from '@view/store/root'

export type CharacterTab = {
  character: CharacterContent
  profile?: CharacterContent
}

const initialState: {
  focusedIndex: number
  focusedCharacters: CharacterTab[]
} = {
  focusedIndex: -1,
  focusedCharacters: []
}

export const registerCharacterToTabs = createAsyncThunk('WorkspaceFocusCharacters/registerCharacterToTabs', async (key: CharacterKey): Promise<CharacterTab> => {
  const content: CharacterContent = await IpcSocket.ipcRenderer.request('workspace/hierarchy/characters/read/character', key)
  return {
    character: content
  }
})

export const registerProfileToTabs = createAsyncThunk('WorkspaceFocusCharacters/registerProfileToTabs', async (key: CharacterKey): Promise<CharacterTab> => {
  const content: CharacterProfileContent = await IpcSocket.ipcRenderer.request('workspace/hierarchy/characters/read/profile', key)
  return {
    character: content.parentContent,
    profile: content
  }
})

export const saveTabCharacterContent = createAsyncThunk(
  'WorkspaceFocusCharacters/saveTabCharacterContent',
  async (args: { character: CharacterContent; newContent: string }): Promise<{ character: CharacterContent; newContent: string }> => {
    const characterContent: CharacterContent = {
      path: args.character.path,
      filename: args.character.filename,
      content: args.newContent
    }

    await IpcSocket.ipcRenderer.request('workspace/hierarchy/characters/save/character', characterContent)
    return args
  }
)

export const saveTabProfileContent = createAsyncThunk(
  'WorkspaceFocusCharacters/saveTabProfileContent',
  async (args: { profile: CharacterContent; newContent: string }): Promise<{ profile: CharacterContent; newContent: string }> => {
    const characterContent: CharacterContent = {
      path: args.profile.path,
      filename: args.profile.filename,
      content: args.newContent
    }

    await IpcSocket.ipcRenderer.request('workspace/hierarchy/characters/save/profile', characterContent)
    return args
  }
)

export const stateWorkspaceFocusCharactersSlice = createSlice({
  name: 'WorkspaceFocusCharacters',
  initialState,
  reducers: {
    unregisterCharacterTabByCharacterPath: (state, action): void => {
      if (state.focusedCharacters.length <= 1) {
        state.focusedCharacters = []
        state.focusedIndex = -1
        return
      }

      let index = state.focusedIndex

      if (state.focusedCharacters[state.focusedIndex].character.path !== action.payload) {
        const find = state.focusedCharacters.find((tab) => tab.character.path === action.payload)

        if (!find) return
        else {
          index = state.focusedCharacters.indexOf(find)
        }
      }

      state.focusedCharacters = state.focusedCharacters.splice(index - 1, 1)
      state.focusedIndex -= 1
    },
    focusCharacterTabByPath: (state, action): void => {
      const index = state.focusedCharacters.findIndex((tab) => tab.character.path === action.payload)
      if (index < 0) return

      state.focusedIndex = index
    },
    focusCharacterTabByIndex: (state, action): void => {
      state.focusedIndex = action.payload % state.focusedCharacters.length
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerCharacterToTabs.fulfilled, (state, action): void => {
        const index = state.focusedCharacters.findIndex((tab) => tab.character.path === action.payload.character.path)
        if (index >= 0) {
          state.focusedCharacters[index] = {
            character: state.focusedCharacters[index]!.character,
            profile: undefined
          }
          return
        }

        state.focusedCharacters = [
          ...state.focusedCharacters.slice(0, state.focusedIndex + 1),
          action.payload,
          ...state.focusedCharacters.slice(state.focusedIndex + 1, state.focusedCharacters.length)
        ]

        state.focusedIndex += 1
      })
      .addCase(registerProfileToTabs.fulfilled, (state, action): void => {
        const index = state.focusedCharacters.findIndex((tab) => tab.character.path === action.payload.character.path)
        if (index >= 0) {
          state.focusedCharacters[index] = action.payload
          return
        }

        state.focusedCharacters = [
          ...state.focusedCharacters.slice(0, state.focusedIndex + 1),
          action.payload,
          ...state.focusedCharacters.slice(state.focusedIndex + 1, state.focusedCharacters.length)
        ]

        state.focusedIndex += 1
      })
      .addCase(saveTabCharacterContent.fulfilled, (state, action): void => {
        const index = state.focusedCharacters.findIndex((tab) => tab.character.path === action.payload.character.path)
        if (index < 0) return
        state.focusedCharacters[index].character.content = action.payload.newContent
      })
      .addCase(saveTabProfileContent.fulfilled, (state, action): void => {
        const index = state.focusedCharacters.findIndex((tab) => tab.profile?.path === action.payload.profile.path)
        if (index < 0) return

        const temp = state.focusedCharacters[index].profile
        if (!temp) return
        temp.content = action.payload.newContent
      })
  }
})

export const selectFocusedCharacterTab = (state: RootState): CharacterTab | undefined => state.WorkspaceFocusCharacters.focusedCharacters[state.WorkspaceFocusCharacters.focusedIndex]
export const selectRegisteredCharacterTabs = (state: RootState): CharacterTab[] => state.WorkspaceFocusCharacters.focusedCharacters
export const selectIndexOfFocusedCharacterTab = (state: RootState): number => state.WorkspaceFocusCharacters.focusedIndex

export const { unregisterCharacterTabByCharacterPath, focusCharacterTabByPath, focusCharacterTabByIndex } = stateWorkspaceFocusCharactersSlice.actions
