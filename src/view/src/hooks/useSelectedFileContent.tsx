import { useAppDispatch, useAppSelector } from '@view/hooks/index'

import { FileContent } from '@common/workspace/files'
import { IpcSocket } from '@common/socket'

import {
  changeContentOfSelectedFileContent,
  selectFocusFileContentByPath,
  selectRegisteredFileContents,
  selectSelectedFileContentInRegisteredFileContents,
  unregisterFileContentByPath
} from '@view/store/workspace/ProjectFileEditor'

export const useSelectedFileContent = (): {
  registeredFileContents: FileContent[]
  selectedFileContent: FileContent | null
  saveSelectedFileContent: (content: string) => Promise<void>
  selectFileContent: (path: string) => void
  unregisterFileContent: (path: string) => void
} => {
  const registeredFileContents = useAppSelector(selectRegisteredFileContents)
  const selectedFileContent: FileContent | null = useAppSelector(
    selectSelectedFileContentInRegisteredFileContents
  )
  const dispatcher = useAppDispatch()

  const saveSelectedFileContent = async (content: string): Promise<void> => {
    dispatcher(changeContentOfSelectedFileContent({ content }))

    await IpcSocket.requester.request('workspace', 'saveFile', selectedFileContent)
  }

  return {
    registeredFileContents,
    selectedFileContent,
    saveSelectedFileContent,
    selectFileContent: (path: string) => dispatcher(selectFocusFileContentByPath(path)),
    unregisterFileContent: (path: string) => dispatcher(unregisterFileContentByPath(path))
  }
}
