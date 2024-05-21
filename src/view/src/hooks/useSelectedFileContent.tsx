import { useAppDispatch, useAppSelector } from '@view/hooks'

import { FileContent, FileNode } from '@common/workspace/files'
import {
  focusFileContentByPath,
  useFocusedFileContent,
  useRegisteredFileContents,
  unregisterFileContentByPath,
  registerFileContentByFileNode,
  saveFileContentByPath,
  updateContentByPath
} from '@view/store/ProjectFileEditor'

export const useSelectedFileContent = (): {
  focusedFileContent: FileContent | undefined
  focusFileContent: (path: string) => void
} => {
  const dispatcher = useAppDispatch()

  const focusedFileContent = useAppSelector(useFocusedFileContent)
  const focusFileContent = (path: string): void => {
    dispatcher(focusFileContentByPath(path))
  }

  return {
    focusedFileContent,
    focusFileContent
  }
}

export const useFileContentsHandler = (): {
  registeredFileContents: {
    [path: string]: FileContent
  }
  registerFileContent: (fileNode: FileNode) => void
  unregisterFileContent: (path: string) => void
  updateContent: (path: string, content: string) => void
  saveFileContent: (path: string) => void
} => {
  const dispatcher = useAppDispatch()

  const registeredFileContents = useAppSelector(useRegisteredFileContents)
  const registerFileContent = (fileNode: FileNode): void => {
    dispatcher(registerFileContentByFileNode(fileNode))
  }
  const unregisterFileContent = (path: string): void => {
    dispatcher(saveFileContentByPath({ path }))
    dispatcher(unregisterFileContentByPath({ path }))
  }
  const updateContent = (path: string, content: string): void => {
    dispatcher(
      updateContentByPath({
        path,
        content
      })
    )
  }
  const saveFileContent = (path: string): void => {
    dispatcher(saveFileContentByPath({ path }))
  }

  return {
    registeredFileContents,
    registerFileContent,
    unregisterFileContent,
    updateContent,
    saveFileContent
  }
}
