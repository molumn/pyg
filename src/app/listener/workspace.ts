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

const createWorkspace = (_key: WorkspaceKey): boolean => {
  // todo : create workspace
  const key = _key

  key.isExisted = fs.existsSync(key.rootPath)

  return Workspace.createWorkspace(key)
}

const registerWorkspace = (_key: WorkspaceKey): boolean => {
  const key = store.localStores.workspaceStore.get((store) => {
    return store.createdWorkspaces[_key.name]
  })

  if (!key) return false

  return Workspace.registerWorkspace(_key.name)
}

const readFile = async (fileNode: FileNode): Promise<FileContent> => {
  return readWorkspaceFile(fileNode.path, fileNode.name)
}

const saveFile = async (fileContent: FileContent): Promise<boolean> => {
  return saveWorkspaceFile(fileContent)
}

export function registerWorkspaceListener(socket: MainProcessSocket): void {
  socket.on('workspace/create', createWorkspace)

  socket.handle('workspace/open', registerWorkspace)
  socket.handle('workspace/close', Workspace.unregisterWorkspace)
  socket.handle('workspace/file/read', readFile)
  socket.handle('workspace/file/save', saveFile)
  socket.handle('workspace/list/created', getCreatedWorkspace)

  socket.handle('workspace/hierarchy/characters/list', () => Workspace.instance?.hierarchy.characters.rootKey)
  socket.handleLazy(
    'workspace/hierarchy/characters/read/character',
    () => Workspace.instance,
    (instance) => instance?.hierarchy.characters.readCharacter
  )
  socket.handleLazy(
    'workspace/hierarchy/characters/read/profile',
    () => Workspace.instance,
    (instance) => instance?.hierarchy.characters.readProfile
  )
  socket.handleLazy(
    'workspace/hierarchy/characters/save/character',
    () => Workspace.instance,
    (instance) => instance?.hierarchy.characters.saveCharacter
  )
  socket.handleLazy(
    'workspace/hierarchy/characters/save/profile',
    () => Workspace.instance,
    (instance) => instance?.hierarchy.characters.saveProfile
  )
  socket.handleLazy(
    'workspace/hierarchy/characters/create/category',
    () => Workspace.instance,
    (instance) => instance?.hierarchy.characters.createCategory
  )
  socket.handleLazy(
    'workspace/hierarchy/characters/create/character',
    () => Workspace.instance,
    (instance) => instance?.hierarchy.characters.createCharacter
  )
  socket.handleLazy(
    'workspace/hierarchy/characters/create/profile',
    () => Workspace.instance,
    (instance) => instance?.hierarchy.characters.createProfile
  )
}
