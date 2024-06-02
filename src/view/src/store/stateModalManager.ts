import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@view/store/root'

export type DialogType = 'dialogNewCharacterNode'

export type ModalType = 'CreateOrOpenWorkspace' | DialogType

const initialState: {
  opened: boolean
  registeredModalType: ModalType | undefined
} = {
  opened: false,
  registeredModalType: undefined
}

export const stateModalManagerSlice = createSlice({
  name: 'ModalManager',
  initialState,
  reducers: {
    registerModal: (state, action): void => {
      state.registeredModalType = action.payload
      state.opened = true
    },
    unregisterModal: (state): void => {
      state.opened = false
    }
  }
})

export const selectModalIsOpened = (state: RootState): boolean => state.ModalManagerState.opened
export const selectModalType = (state: RootState): ModalType | undefined => state.ModalManagerState.registeredModalType

export const { registerModal } = stateModalManagerSlice.actions
