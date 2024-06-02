import fs from 'fs'
import path from 'path'

import { app } from 'electron'

import { WorkspaceKey } from '@common/type'
import { MainProcessSocket } from '@common/socket/main-process'
import { CharacterContent, CharacterKey, CharacterProfileContent } from '@common/workspace/types'
import { FileContent, FileNode } from '@common/workspace/files'

import store from '@lib/store'
import { readWorkspaceFile, saveWorkspaceFile } from '@lib/workspace/file-io'

import { Workspace } from '@app/structure/workspace'

const getCreatedWorkspace = (): WorkspaceKey[] => {
  const createdWorkspace: WorkspaceKey[] = []
  store.localStores.workspaceStore.refreshStatus()
  store.localStores.workspaceStore.edit((store) => {
    for (const key in store.createdWorkspaces) {
      createdWorkspace.push(store.createdWorkspaces[key])
    }
  })
  return createdWorkspace
}

const removeCreatedWorkspace = (key: WorkspaceKey): void => {
  store.localStores.workspaceStore.edit((store) => {
    const find = store.createdWorkspaces[key.name]
    if (!find) return

    delete store.createdWorkspaces[key.name]
  })
}

const createWorkspace = (_key: WorkspaceKey): boolean => {
  // todo : create workspace
  const key = _key

  key.isExisted = fs.existsSync(key.rootPath)

  if (key.rootPath[0] === '~' || key.rootPath[0] === '.') key.rootPath = path.join(app.getPath('home'), key.rootPath.slice(1))
  key.rootPath = path.resolve('/', key.rootPath)

  return Workspace.createWorkspace(key)
}

const readFile = async (fileNode: FileNode): Promise<FileContent> => {
  return readWorkspaceFile(fileNode.path, fileNode.name)
}

const saveFile = async (fileContent: FileContent): Promise<boolean> => {
  return saveWorkspaceFile(fileContent)
}

export function registerWorkspaceListener(socket: MainProcessSocket): void {
  socket.on('workspace/create', createWorkspace)

  socket.handle('workspace/open', (key: WorkspaceKey) => Workspace.registerWorkspace(key.name))
  socket.handle('workspace/close', Workspace.unregisterWorkspace)
  socket.handle('workspace/file/read', readFile)
  socket.handle('workspace/file/save', saveFile)
  socket.handle('workspace/list/created', getCreatedWorkspace)
  socket.on('workspace/list/remove', removeCreatedWorkspace)

  socket.handle('workspace/hierarchy/characters/list', () => Workspace.instance?.hierarchy.characters.rootKey)

  socket.handle('workspace/hierarchy/characters/read/character', (key: CharacterKey) => Workspace.instance?.hierarchy.characters.readCharacter(key))
  socket.handle('workspace/hierarchy/characters/read/profile', (key: CharacterKey) => Workspace.instance?.hierarchy.characters.readProfile(key))
  socket.handle('workspace/hierarchy/characters/save/character', (content: CharacterContent) => Workspace.instance?.hierarchy.characters.saveCharacter(content))
  socket.handle('workspace/hierarchy/characters/save/profile', (content: CharacterProfileContent) => Workspace.instance?.hierarchy.characters.saveProfile(content))
  socket.handle('workspace/hierarchy/characters/create/category', (parent: string) => Workspace.instance?.hierarchy.characters.createCategory(parent))
  socket.handle('workspace/hierarchy/characters/create/character', (parent: string) => Workspace.instance?.hierarchy.characters.createCharacter(parent))
  socket.handle('workspace/hierarchy/characters/create/profile', (parent: string) => Workspace.instance?.hierarchy.characters.createProfile(parent))
}
