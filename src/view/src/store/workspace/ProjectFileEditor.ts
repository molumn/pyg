import { createSlice } from '@reduxjs/toolkit'
import { FileContent } from '../../../../common/workspace/files'
import { RootState } from '../root'

const initialState: {
  registeredFileContents: FileContent[]
  selectedFileContent: FileContent | null
} = {
  registeredFileContents: [],
  selectedFileContent: null
}

export const ProjectFileEditorStateSlice = createSlice({
  name: 'ProjectFileEditorState',
  initialState,
  reducers: {
    registerFileContent: (state, action): void => {
      console.log('registerFileContent', action.payload)
      if (state.registeredFileContents.find((content) => content.path === action.payload.path))
        return

      state.registeredFileContents.push(action.payload)
      state.selectedFileContent = action.payload
    },
    unregisterFileContentByPath: (state, action): void => {
      console.log(action.payload)
      const find = state.registeredFileContents.find((content) => content.path === action.payload)
      if (!find) return
      const index = state.registeredFileContents.indexOf(find)

      if (index <= -1) return

      state.registeredFileContents.splice(index, 1)
      if (state.registeredFileContents.length === 0) {
        state.selectedFileContent = null
      } else {
        state.selectedFileContent = state.registeredFileContents[index - 1]
      }
    },
    changeContentOfSelectedFileContent(state, action): void {
      if (!state.selectedFileContent) return
      state.selectedFileContent.content = action.payload.content
    },
    selectFocusFileContentByPath(state, action): void {
      const find = state.registeredFileContents.find((content) => content.path === action.payload)
      if (find) state.selectedFileContent = find
    }
  }
})

export const selectRegisteredFileContents = (state: RootState): FileContent[] =>
  state.ProjectFileEditorState.registeredFileContents

export const selectSelectedFileContentInRegisteredFileContents = (
  state: RootState
): FileContent | null => state.ProjectFileEditorState.selectedFileContent

export const {
  registerFileContent,
  unregisterFileContentByPath,
  changeContentOfSelectedFileContent,
  selectFocusFileContentByPath
} = ProjectFileEditorStateSlice.actions
