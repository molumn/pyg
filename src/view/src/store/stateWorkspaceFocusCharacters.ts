import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CharacterContent, CharacterKey, CharacterProfileContent } from '@common/workspace/types'
import { IpcSocket } from '@common/socket'
import { RootState } from '@view/store/root'

type CharacterTab = {
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

export const stateWorkspaceFocusCharactersSlice = createSlice({
  name: 'WorkspaceFocusCharacters',
  initialState,
  reducers: {
    unregisterCharacterTabByCharacterPath: (state, action): void => {
      if (state.focusedCharacters.length === 0) return

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
        if (state.focusedCharacters.find((tab) => tab.character.path === action.payload.character.path)) return

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
          state.focusedCharacters[index].profile = action.payload.profile
          return
        }

        state.focusedCharacters = [
          ...state.focusedCharacters.slice(0, state.focusedIndex + 1),
          action.payload,
          ...state.focusedCharacters.slice(state.focusedIndex + 1, state.focusedCharacters.length)
        ]

        state.focusedIndex += 1
      })
  }
})

export const selectFocusedCharacterTab = (state: RootState): CharacterTab | undefined => state.WorkspaceFocusCharacters.focusedCharacters[state.WorkspaceFocusCharacters.focusedIndex]
export const selectRegisteredCharacterTabs = (state: RootState): CharacterTab[] => state.WorkspaceFocusCharacters.focusedCharacters
export const selectIndexOfFocusedCharactedTab = (state: RootState): number => state.WorkspaceFocusCharacters.focusedIndex

export const { unregisterCharacterTabByCharacterPath, focusCharacterTabByPath, focusCharacterTabByIndex } = stateWorkspaceFocusCharactersSlice.actions
