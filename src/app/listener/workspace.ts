import fs from 'fs'

import { WorkspaceKey } from '@common/type'
import { MainProcessSocket } from '@common/socket/main-process'
import { IpcMainEventCopy, IpcMainInvokeEventCopy } from '@common/socket/impl'
import { FileContent, FileNode } from '@common/workspace/files'

import store from '@lib/store'

import { Workspace } from '@app/structure/workspace'
import { readWorkspaceFile, saveWorkspaceFile } from '@lib/workspace/file-io'

const getCreatedWorkspace = (): WorkspaceKey[] => {
  const createdWorkspace: WorkspaceKey[] = []
  store.localStores.workspaceStore.get((store) => {
    for (const key in store.createdWorkspaces) {
      createdWorkspace.push(store.createdWorkspaces[key])
    }
  })
  return createdWorkspace
}

const createWorkspace = (_: IpcMainEventCopy, _key: WorkspaceKey): boolean => {
  // todo : create workspace
  const key = _key

  key.isExisted = fs.existsSync(key.rootPath)

  return Workspace.createWorkspace(key)
}

const registerWorkspace = (_: IpcMainInvokeEventCopy, _key: WorkspaceKey): boolean => {
  const key = store.localStores.workspaceStore.get((store) => {
    return store.createdWorkspaces[_key.name]
  })

  if (!key) {
    Workspace.createWorkspace(_key)
  }

  return Workspace.registerWorkspace(_key.name)
}

const readFile = async (_: IpcMainInvokeEventCopy, fileNode: FileNode): Promise<FileContent> => {
  return readWorkspaceFile(fileNode)
}

const saveFile = async (_: IpcMainInvokeEventCopy, fileContent: FileContent): Promise<boolean> => {
  return saveWorkspaceFile(fileContent)
}

export function registerWorkspaceListener(socket: MainProcessSocket): void {
  socket.handle('workspace', 'getCreatedWorkspaces', getCreatedWorkspace)
  socket.on('workspace', 'createWorkspace', createWorkspace)
  socket.handle('workspace', 'registerWorkspace', registerWorkspace)
  socket.handle('workspace', 'unregisterWorkspace', (): void => Workspace.unregisterWorkspace())
  socket.handle('workspace', 'readFile', readFile)
  socket.handle('workspace', 'saveFile', saveFile)
  socket.handle(
    'workspace',
    'getRootNode',
    async (): Promise<FileNode | undefined> => Workspace.instance?.rootNode
  )
}
