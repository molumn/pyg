import { FileContent, FileNode, FilePointer, FileType } from '../../shared/fileutils'
import { IpcListenerType } from './index'

export type WorkspaceIpcCallbacks = {
  onOpenFile: (pointer: FilePointer) => FileContent
  onSaveFile: (pointer: FilePointer, buffer: string) => boolean
  onCreateFile: (parent: FilePointer, filename: string, type: FileType) => FileNode
  onCreateDirectory: (parent: FilePointer, dirname: string) => FileNode
}

export const WorkspaceIpcListeners: IpcListenerType<WorkspaceIpcCallbacks> = {
  onOpenFile: (_, pointer: FilePointer): FileContent => {
  },
  onSaveFile: (_, pointer: FilePointer, buffer: string): boolean => {
  },
  onCreateFile: (_, parent: FilePointer, relpath: string, type: FileType): FileNode => {
  },
  onCreateDirectory: (_, parent: FilePointer, relpath: string): FileNode => {
  },
}
