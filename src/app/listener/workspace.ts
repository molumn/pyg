import fs from 'fs'

import { WorkspaceKey } from '@common/type'
import { MainProcessSocket } from '@common/socket/main-process'
import { CharacterContent, CharacterKey, CharacterProfileContent } from '@common/workspace/types'
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

  socket.handle('workspace/hierarchy/characters/read/character', (key: CharacterKey) => Workspace.instance?.hierarchy.characters.readCharacter(key))
  socket.handle('workspace/hierarchy/characters/read/profile', (key: CharacterKey) => Workspace.instance?.hierarchy.characters.readProfile(key))
  socket.handle('workspace/hierarchy/characters/save/character', (content: CharacterContent) => Workspace.instance?.hierarchy.characters.saveCharacter(content))
  socket.handle('workspace/hierarchy/characters/save/profile', (content: CharacterProfileContent) => Workspace.instance?.hierarchy.characters.saveProfile(content))
  socket.handle('workspace/hierarchy/characters/create/category', (parent: string, child: string) => Workspace.instance?.hierarchy.characters.createCategory(parent, child))
  socket.handle('workspace/hierarchy/characters/create/character', (parent: string, child: string) => Workspace.instance?.hierarchy.characters.createCharacter(parent, child))
  socket.handle('workspace/hierarchy/characters/create/profile', (parent: string, child: string) => Workspace.instance?.hierarchy.characters.createProfile(parent, child))
}
