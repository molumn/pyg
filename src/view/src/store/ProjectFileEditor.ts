import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { FileContent, FileNode } from '@common/workspace/files'
import { IpcSocket } from '@common/socket'
import { RootState } from '@view/store/index'

const initialState: {
  focusedFileContent: FileContent | undefined
  registeredFileContents: {
    [path: string]: FileContent
  }
} = {
  focusedFileContent: undefined,
  registeredFileContents: {}
}

export const registerFileContentByFileNode = createAsyncThunk(
  'ProjectFileEditorState/requestContent',
  async (fileNode: FileNode): Promise<FileContent> => {
    const socket = IpcSocket.requester
    const response: FileContent = await socket.request('workspace', 'readFile', fileNode)
    return response
  }
)

export const ProjectFileEditorStateSlice = createSlice({
  name: 'ProjectFileEditorState',
  initialState,
  reducers: {
    focusFileContentByPath: (state, action): void => {
      const path = action.payload.path
      const fileContentOrNull = state.registeredFileContents[path]
      if (fileContentOrNull) {
        state.focusedFileContent = fileContentOrNull
      }
    },
    updateContentByPath: (state, action): void => {
      const path = action.payload.path
      const content = action.payload.content
      const fileContentOrNull = state.registeredFileContents[path]
      if (fileContentOrNull) {
        fileContentOrNull.content = content
      }
    },
    saveFileContentByPath: (state, action): void => {
      const socket = IpcSocket.requester
      const path = action.payload.path
      const fileContentOrNull = state.registeredFileContents[path]
      if (fileContentOrNull) {
        socket.request('workspace', 'saveFile', fileContentOrNull)
      }
    },
    unregisterFileContentByPath: (state, action): void => {
      const path = action.payload.path
      const fileContentOrNull = state.registeredFileContents[path]
      if (fileContentOrNull) {
        delete state.registeredFileContents[path]
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerFileContentByFileNode.fulfilled, (state, action): void => {
      const fileContent: FileContent = action.payload
      state.registeredFileContents[fileContent.path] = fileContent
    })
  }
})

export const useFocusedFileContent = (state: RootState): FileContent | undefined =>
  state.ProjectFileEditorState.focusedFileContent
export const useRegisteredFileContents = (
  state: RootState
): {
  [path: string]: FileContent
} => state.ProjectFileEditorState.registeredFileContents

export const {
  focusFileContentByPath,
  updateContentByPath,
  saveFileContentByPath,
  unregisterFileContentByPath
} = ProjectFileEditorStateSlice.actions
