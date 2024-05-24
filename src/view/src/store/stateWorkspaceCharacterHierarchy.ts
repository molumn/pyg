import { createSlice } from '@reduxjs/toolkit'

const initialState: {
  rootKey: any
} = {
  rootKey: ''
}

export const stateWorkspaceCharacterHierarchyStateSlice = createSlice({
  name: 'WorkspaceCharacterHierarchy',
  initialState,
  reducers: {}
})
